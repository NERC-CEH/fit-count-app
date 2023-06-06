import userModel from 'models/user';
import appModel from 'models/app';
import config from 'common/config';
import axios, { AxiosRequestConfig } from 'axios';
import { isAxiosNetworkError, HandledError, device } from '@flumens';

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

    return response.data;
  } catch (error: any) {
    if (isAxiosNetworkError(error))
      throw new HandledError(
        'Request aborted because of a network issue (timeout or similar).'
      );

    throw error;
  }
}

export default async function syncActivities(loader: any, toast: any) {
  if (!device.isOnline || !userModel.isLoggedIn()) return;

  try {
    await loader.show('Please wait...');

    const data = await fetchActivitiesReport();

    appModel.attrs.activities = data;
    appModel.save();
  } catch (err: any) {
    toast.error(err);
  }

  loader.hide();
}
