import React from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
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
import { Main } from '@apps';
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

const intoChunksOfSix = (slidesArray, item, index) => {
  const slideIndex = Math.floor(index / 6);

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
    onSelect: PropTypes.func,
    onDecreaseCount: PropTypes.func,
  });

  slideRef = React.createRef();

  getSpeciesTile = (sp, i) => {
    const { onSelect, onDecreaseCount } = this.props;

    const { name, thumbnail } = sp;

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

          <IonImg src={thumbnail} />

          <IonLabel>
            <T>{name}</T>
          </IonLabel>
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
    const speciesTiles = slideSpecies.map(this.getSpeciesTile);

    return (
      <IonSlide key={slideIndex}>
        <IonGrid>
          <IonRow>{speciesTiles}</IonRow>
        </IonGrid>
      </IonSlide>
    );
  };

  render() {
    const bySortId = (a, b) => a.sort - b.sort;
    const speciesPerSlide = species.sort(bySortId).reduce(intoChunksOfSix, []);

    const speciesSlides = speciesPerSlide.map(this.getSpeciesSlide);

    return (
      <Main className="species-list">
        <IonSlides
          pager="true"
          onIonSlidesDidLoad={fixIonicSlideBug}
          options={{
            direction: 'vertical',
            spaceBetween: -100,
          }}
        >
          {speciesSlides}
        </IonSlides>
      </Main>
    );
  }
}

export default SpeciesMainComponent;
