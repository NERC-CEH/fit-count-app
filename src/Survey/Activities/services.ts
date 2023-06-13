import * as Yup from 'yup';
import userModel from 'models/user';
import appModel, { ActivityProp } from 'models/app';
import config from 'common/config';
import axios, { AxiosRequestConfig } from 'axios';
import { isAxiosNetworkError, HandledError, device } from '@flumens';

const schemaBackend = Yup.object().shape({
  data: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      // country_name: Yup.string(),
      // country_code: Yup.string(),
      // website_url: Yup.string()
    })
  ),
});

async function fetchActivitiesReport() {
  const country_code = appModel.attrs.country;

  const url = `${config.backend.indicia.url}/index.php/services/rest/reports/projects/PoMS/get_projects_for_country.xml?country_for_project_tt_attribute_id=8&url_for_project_tt_attribute_id=10&countries_termlist_id=974&projects_termlist_id=1050&country_code=${country_code}`;

  const options: AxiosRequestConfig = {
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    timeout: 80000,
  };

  try {
    const { data: response } = await axios(options);

    const isValidResponse = await schemaBackend.isValid(response);
    if (!isValidResponse) throw new Error('Invalid server response.');

    const format = (activity: any) => {
      return {
        countryCode: activity.country_code,
        countryName: activity.country_name,
        id: activity.id,
        name: activity.name,
        websiteUrl: activity.website_url,
      };
    };

    const formatData = response.data.map(format);

    return formatData;
  } catch (error: any) {
    if (isAxiosNetworkError(error))
      throw new HandledError(
        'Request aborted because of a network issue (timeout or similar).'
      );

    throw error;
  }
}

const checkIfPastActivitiesStillActive = (data: ActivityProp[]) => {
  data.forEach((activity: ActivityProp, index: number) => {
    const expiredActivity = ![...appModel.attrs.pastActivities].includes(
      activity.id
    );

    if (expiredActivity) {
      appModel.attrs.pastActivities.splice(index, 1);
      appModel.save();
    }
  });
};

export default async function syncActivities() {
  if (!device.isOnline || !userModel.isLoggedIn()) return;

  try {
    const data = await fetchActivitiesReport();

    checkIfPastActivitiesStillActive(data);

    appModel.attrs.activities = data;
    appModel.save();
  } catch (err: any) {
    console.log(err);
  }
}
