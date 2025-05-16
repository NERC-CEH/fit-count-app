/* eslint-disable no-param-reassign */
import { useRef, useCallback } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { removeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Main } from '@flumens';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonIcon,
  IonBadge,
  IonImg,
  IonButton,
} from '@ionic/react';
import species from 'common/data/index';
import './styles.scss';

// constant for max species per slide
const MAX_SPECIES_PER_SLIDE = 6;

// props type for SpeciesMainComponent
export type Props = {
  sample: any;
  onSelect: (sp: any) => void;
  onDecreaseCount: (e: React.MouseEvent, sp: any) => void;
};

// split array into chunks of six
const intoChunksOfSix = (
  slidesArray: any[][],
  item: any,
  index: number
): any[][] => {
  const slideIndex = Math.floor(index / MAX_SPECIES_PER_SLIDE);

  // edge case: create new slide if needed
  if (!slidesArray[slideIndex]) {
    slidesArray[slideIndex] = [];
  }

  slidesArray[slideIndex].push(item);

  return slidesArray;
};

// functional component for SpeciesMainComponent
const SpeciesMainComponent = (props: Props) => {
  const { t } = useTranslation();

  const { sample, onSelect, onDecreaseCount } = props;

  // ref for slides
  const slideRef = useRef<any>(null);

  // get occurrence count for a species
  const getOccurrenceCount = useCallback(
    (sp: any): React.ReactNode => {
      const bySpeciesId = (occ: any) => occ.data.taxon.id === sp.id;
      const occurrence = sample.occurrences.find(bySpeciesId);

      // edge case: no occurrence
      if (!occurrence) {
        return null;
      }

      const { count } = occurrence.data;

      // edge case: count is zero or less
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
    },
    [sample]
  );

  // render a single species tile
  const getSpeciesTile = useCallback(
    (sp: any, i: number): React.ReactNode => {
      // edge case: filler tile
      if (!sp) {
        return (
          <IonCol key={i} className="species-tile-filler">
            <div className="species-tile-container" />
          </IonCol>
        );
      }

      const { name, id } = sp;

      // handle select and decrease
      const selectSpecies = () => onSelect(sp);
      const decreaseCount = (e: React.MouseEvent) => onDecreaseCount(e, sp);
      const count = getOccurrenceCount(sp);

      return (
        <IonCol
          key={i}
          className="species-tile"
          size="6"
          onClick={selectSpecies}
        >
          {count}
          <div className="species-tile-container">
            {!!count && (
              <IonButton className="count-decrement" onClick={decreaseCount}>
                <IonIcon icon={removeOutline} color="danger" />
              </IonButton>
            )}
            <IonImg src={`/images/${id}.png`} />
            <IonLabel>{t(name)}</IonLabel>
          </div>
        </IonCol>
      );
    },
    [onSelect, onDecreaseCount, getOccurrenceCount, t]
  );

  // render a single slide of species
  const getSpeciesSlide = useCallback(
    (slideSpecies: any[], slideIndex: number): React.ReactNode => {
      const fillerCount = MAX_SPECIES_PER_SLIDE - slideSpecies.length;
      const speciesTiles = [...slideSpecies, ...new Array(fillerCount)].map(
        getSpeciesTile
      );

      return (
        <SwiperSlide key={slideIndex}>
          <IonGrid>
            <IonRow>{speciesTiles}</IonRow>
          </IonGrid>
        </SwiperSlide>
      );
    },
    [getSpeciesTile]
  );

  const bySortId = (a: any, b: any) => a.sort - b.sort;
  const getSpeciesProfile = (occ: any) => {
    const byId = (sp: any) => sp.id === occ.data.taxon.id;
    return species.find(byId);
  };

  const speciesPerSlide = sample.occurrences
    .map(getSpeciesProfile)
    .sort(bySortId)
    .reduce(intoChunksOfSix, [] as any[][]);

  const speciesSlides = speciesPerSlide.map(getSpeciesSlide);

  return (
    <Main className="species-list">
      <Swiper
        ref={slideRef}
        modules={[Pagination]}
        pagination
        direction="vertical"
        centeredSlides
        slidesPerView="auto"
      >
        {speciesSlides}
      </Swiper>
    </Main>
  );
};

export default observer(SpeciesMainComponent);
