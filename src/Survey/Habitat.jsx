import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main } from '@apps';
import { NavContext } from '@ionic/react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const PAGE_INDEX = 2;

const NEXT_PAGE = 'flower';

class Habitat extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs.habitat = value;
    sample.save();

    const navigateToNextPage = () => this.context.navigate(NEXT_PAGE);

    setTimeout(navigateToNextPage, 50);
  };

  isValueValid = () => !!this.props.sample.attrs.habitat;

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs.habitat;

    return (
      <Page id="survey-habitat-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Location" />

        <Main>
          <Attr
            className="survey-radio-list  "
            attrConfig={surveyConfig.attrs.habitat}
            onValueChange={this.onValueChange}
            initialVal={value}
            model={sample}
          />
        </Main>

        <Footer isEnabled={this.isValueValid()} link={NEXT_PAGE} />
      </Page>
    );
  }
}

export default observer(Habitat);
