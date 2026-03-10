import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Header, useLoader, useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'common/models/app';
import userModel from 'common/models/user';
import Main from './Main';

function SelectCountry() {
  const navigate = useContext(NavContext);
  const loader = useLoader();
  const toast = useToast();

  const onSelect = async (newValue: string) => {
    await loader.show('Please wait...');
    try {
      await userModel.updateUserCountrySetting(newValue);
      appModel.data.country = newValue;
      appModel.save();
      navigate.goBack();
    } catch (error: any) {
      toast.error(error);
    }

    loader.hide();
  };

  return (
    <Page id="country-select">
      <Header title="Country" />
      <Main appModel={appModel} onSelect={onSelect} />
    </Page>
  );
}

export default observer(SelectCountry);
