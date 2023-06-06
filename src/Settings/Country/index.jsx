import { useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { NavContext } from '@ionic/react';
import { Page, Header, useLoader, useToast } from '@flumens';
import syncActivities from 'Survey/Activities/services';
import Main from './Main';

function SelectCountry({ appModel }) {
  const navigate = useContext(NavContext);

  const loader = useLoader();
  const toast = useToast();

  const onSelect = e => {
    appModel.attrs.country = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();
    navigate.goBack();

    syncActivities(loader, toast);
  };

  return (
    <Page id="country-select">
      <Header title="Country" />
      <Main appModel={appModel} onSelect={onSelect} />
    </Page>
  );
}

SelectCountry.propTypes = exact({
  appModel: PropTypes.object.isRequired,
});

export default observer(SelectCountry);
