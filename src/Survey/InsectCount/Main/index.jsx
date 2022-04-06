import React from 'react';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonIcon,
  IonSlides,
  IonSlide,
  IonBadge,
  IonImg,
  IonButton,
} from '@ionic/react';
import { Main } from '@flumens';
import { removeOutline } from 'ionicons/icons';
import species from 'common/data/index';
import clsx from 'clsx';

import './styles.scss';

const fixIonicSlideBug = e => {
  // TODO: remove once bug is fixed
  // https://github.com/ionic-team/ionic/issues/19641
  // https://github.com/ionic-team/ionic/issues/19638

  e.target.update();
};

const MAX_SPECIES_PER_SLIDE = 6;

const intoChunksOfSix = (slidesArray, item, index) => {
  const slideIndex = Math.floor(index / MAX_SPECIES_PER_SLIDE);

  if (!slidesArray[slideIndex]) {
    slidesArray[slideIndex] = []; // eslint-disable-line
  }

  slidesArray[slideIndex].push(item);

  return slidesArray;
};

@observer
class SpeciesMainComponent extends React.Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    staticContext: PropTypes.object, // eslint-disable-line
    i18n: PropTypes.object, // eslint-disable-line
    tReady: PropTypes.bool, // eslint-disable-line
    match: PropTypes.object, // eslint-disable-line
    t: PropTypes.func,
    onSelect: PropTypes.func,
    onDecreaseCount: PropTypes.func,
  });

  slideRef = React.createRef();

  getSpeciesTile = (sp, i) => {
    const { onSelect, onDecreaseCount, t } = this.props;

    const isFiller = !sp;
    if (isFiller) {
      return (
        <IonCol key={i} className="species-tile-filler">
          <div className="container" />
        </IonCol>
      );
    }

    const { name, id } = sp;

    const selectSpecies = () => onSelect(sp);

    const decreaseCount = e => onDecreaseCount(e, sp);

    const count = this.getOccurrenceCount(sp);

    return (
      <IonCol key={i} className="species-tile" size="6" onClick={selectSpecies}>
        {count}

        <div className="container">
          {!!count && (
            <IonButton className="count-decrement" onClick={decreaseCount}>
              <IonIcon icon={removeOutline} color="danger" />
            </IonButton>
          )}
          <IonImg src={`/images/${id}.png`} />;<IonLabel>{t(name)}</IonLabel>
        </div>
      </IonCol>
    );
  };

  getOccurrenceCount = sp => {
    const { sample } = this.props;

    const bySpeciesId = occ => occ.attrs.taxon.id === sp.id;

    const occurrence = sample.occurrences.find(bySpeciesId);

    if (!occurrence) {
      return null;
    }

    const { count } = occurrence.attrs;

    if (count <= 0) {
      return null;
    }

    return (
      <IonBadge
        color="secondary"
        className={clsx('badge', sample.hasCountdownTimedOut() && 'disabled')}
      >
        {count}
      </IonBadge>
    );
  };

  getSpeciesSlide = (slideSpecies, slideIndex) => {
    const fillerCount = MAX_SPECIES_PER_SLIDE - slideSpecies.length;

    const speciesTiles = [...slideSpecies, ...new Array(fillerCount)].map(
      this.getSpeciesTile
    );

    return (
      <IonSlide key={slideIndex}>
        <IonGrid>
          <IonRow>{speciesTiles}</IonRow>
        </IonGrid>
      </IonSlide>
    );
  };

  render() {
    const { sample } = this.props;

    const bySortId = (a, b) => a.sort - b.sort;
    const getSpeciesProfile = occ => {
      const byId = sp => sp.id === occ.attrs.taxon.id;
      return species.find(byId);
    };

    const speciesPerSlide = sample.occurrences
      .map(getSpeciesProfile)
      .sort(bySortId)
      .reduce(intoChunksOfSix, []);

    const speciesSlides = speciesPerSlide.map(this.getSpeciesSlide);

    return (
      <Main className="species-list">
        <IonSlides
          pager="true"
          onIonSlidesDidLoad={fixIonicSlideBug}
          options={{
            direction: 'vertical',
            centeredSlides: true,
            slidesPerView: 'auto',
          }}
        >
          {speciesSlides}
        </IonSlides>
      </Main>
    );
  }
}

export default withTranslation()(SpeciesMainComponent);
