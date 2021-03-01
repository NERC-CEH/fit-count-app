import { observer } from 'mobx-react';
import React from 'react';
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
} from '@ionic/react';
import { Main, toast } from '@apps';
import { informationCircleOutline } from 'ionicons/icons';
import species from 'common/data/index';
import clsx from 'clsx';
import './styles.scss';

const wip = () => toast.warn('Sorry, this is still WIP.');

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
  });

  slideRef = React.createRef();

  getSpeciesTile = (sp, i) => {
    const { onSelect } = this.props;

    const { name, thumbnail } = sp;

    const selectSpecies = () => onSelect(sp);

    const viewSpecies = e => {
      e.preventDefault();
      e.stopPropagation();
      wip();
    };

    return (
      <IonCol key={i} className="species-tile" size="6" onClick={selectSpecies}>
        {this.getOccurrenceCount(sp)}

        <div className="container">
          <div className="info-box" onClick={viewSpecies}>
            <IonIcon icon={informationCircleOutline} />
          </div>

          <IonImg src={thumbnail} />

          <IonLabel>{name}</IonLabel>
        </div>
      </IonCol>
    );
  };

  getOccurrenceCount = sp => {
    const { sample } = this.props;

    const bySpeciesId = occ => occ.attrs.taxon.id === sp.id;

    const occurrence = sample.occurrences.find(bySpeciesId);

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
    const speciesPerSlide = species.reduce(intoChunksOfSix, []);
    const speciesSlides = speciesPerSlide.map(this.getSpeciesSlide);

    return (
      <Main className="species-list">
        <IonSlides
          pager="true"
          onIonSlidesDidLoad={fixIonicSlideBug}
          options={{ direction: 'vertical' }}
        >
          {speciesSlides}
        </IonSlides>
      </Main>
    );
  }
}

export default SpeciesMainComponent;
