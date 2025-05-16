import axios, { AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { isAxiosNetworkError, HandledError, device } from '@flumens';
import config from 'common/config';
import appModel, { Activity } from 'models/app';
import userModel from '../user';

const schemaBackend = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      country_name: z.string().optional(),
      country_code: z.string().optional(),
      website_url: z.string().optional(),
    })
  ),
});

async function fetchActivitiesReport(token: string): Promise<Activity[]> {
  const countryCode = appModel.data.country;

  const url = `${config.backend.indicia.url}/index.php/services/rest/reports/projects/PoMS/get_projects_for_country.xml?country_for_project_tt_attribute_id=8&url_for_project_tt_attribute_id=10&countries_termlist_id=974&projects_termlist_id=1050&country_code=${countryCode}`;

  const options: AxiosRequestConfig = {
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    timeout: 80000,
  };

  try {
    const { data: response } = await axios(options);

    const isValidResponse = schemaBackend.safeParse(response).success;
    if (!isValidResponse) throw new Error('Invalid server response.');

    const format = (activity: any): Activity => {
      return {
        id: parseInt(activity.id, 10),
        name: activity.name,
        countryCode: activity.country_code,
        countryName: activity.country_name,
        websiteUrl: activity.website_url,
      };
    };

    return response.data.map(format);
  } catch (error: any) {
    if (isAxiosNetworkError(error))
      throw new HandledError(
        'Request aborted because of a network issue (timeout or similar).'
      );

    throw error;
  }
}

const checkIfPastActivitiesStillActive = (newActivities: Activity[]) => {
  const notExpired = (pastActivity: number) =>
    newActivities.find(
      (newActivity: Activity) => newActivity.id === pastActivity
    );

  const validPastActivities = appModel.data.pastActivities.filter(notExpired);
  appModel.data.pastActivities = validPastActivities;
  appModel.save();
};

async function fetchActivities(token: string) {
  try {
    const newActivities = await fetchActivitiesReport(token);
    checkIfPastActivitiesStillActive(newActivities);

    return newActivities;
  } catch (err: any) {
    console.log(err);
  }

  return null;
}

const extension: any = {
  async syncActivities() {
    if (!device.isOnline || !userModel.isLoggedIn()) return;

    console.log('Syncing activities');
    const token = await userModel.getAccessToken();
    const newActivities = await fetchActivities(token!);

    this.data.activities = newActivities;
    this.save();
  },
};

export { extension as default };
