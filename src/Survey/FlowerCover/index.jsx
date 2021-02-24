import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Main, Attr } from '@apps';
import { NavContext } from '@ionic/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

const NEXT_PAGE = 'flower-count';

class FlowerCover extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['flower-cover'] = value;
    sample.save();

    const navigateToNextPage = () => this.context.navigate(NEXT_PAGE);

    setTimeout(navigateToNextPage, 50);
  };

  isValueValid = () => !!this.props.sample.attrs['flower-cover'];

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs['flower-cover'];

    return (
      <Page id="survey-flower-cover-page">
        <Header surveyProgressIndex={4} backButtonLabel="Selection" />

        <Main>
          <Attr
            attrConfig={surveyConfig.attrs['flower-cover']}
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

export default observer(FlowerCover);
