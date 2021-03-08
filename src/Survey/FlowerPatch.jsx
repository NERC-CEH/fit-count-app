import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main, InfoButton, InfoMessage } from '@apps';
import { locationOutline } from 'ionicons/icons';
import { NavContext } from '@ionic/react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const PAGE_INDEX = 6;

const NEXT_PAGE = 'insect-count';

class FlowerPatch extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['flower-patch'] = value;
    sample.save();

    const navigateToNextPage = () => this.context.navigate(NEXT_PAGE);

    setTimeout(navigateToNextPage, 50);
  };

  isValueValid = () => !!this.props.sample.attrs['flower-patch'];

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs['flower-patch'];

    return (
      <Page id="survey-flower-patch-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Cover" />

        <Main>
          <InfoMessage icon={locationOutline}>
            Is your 50x50cm patch of <b>target flowers</b> growing:
            <InfoButton label="READ MORE" header="Flower patch">
              <p>
                The surroundings of a flower patch can affect its attractiveness
                to insects.
              </p>

              <p>
                Please indicate the situation that best describes the area
                around your flower patch (roughly within 5 metres).
              </p>
            </InfoButton>
          </InfoMessage>

          <Attr
            className="survey-radio-list"
            attrConfig={surveyConfig.attrs['flower-patch']}
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

export default observer(FlowerPatch);
