import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Main, Gallery, toast } from '@apps';
import {
  IonSlides,
  IonSlide,
  IonLifeCycleContext,
  IonCardContent,
} from '@ionic/react';
import speciesPhotos from 'common/data/photos.json';
import { Trans as T } from 'react-i18next';
import './styles.scss';

const wip = () => toast.warn('Sorry, this is still WIP.');

const fixIonicSlideBug = e => {
  // TODO: remove once bug is fixed
  // https://github.com/ionic-team/ionic/issues/19641
  // https://github.com/ionic-team/ionic/issues/19638

  e.target.update();
};

class SpeciesProfile extends React.Component {
  static contextType = IonLifeCycleContext;

  state = {
    showGallery: null,
    activeSlide: 0,
  };

  slider = React.createRef();

  getFullScreenPhotoViewer = () => {
    const { species } = this.props;
    const { showGallery } = this.state;

    let items = [];
    let initialSlide = 0;

    const setShowGallery = () =>
      this.setState({
        showGallery: false,
      });

    if (Number.isInteger(showGallery)) {
      const getImageSource = img => ({ src: img });
      items = species.images.map(getImageSource);
      initialSlide = showGallery;
    }

    if (!items.length) {
      return null;
    }

    return (
      <Gallery
        isOpen
        items={items}
        initialSlide={initialSlide}
        onClose={setShowGallery}
      />
    );
  };

  showPhotoInFullScreen = index => this.setState({ showGallery: index });

  getActiveSlide = async () => {
    const activeSlide = await this.slider.current.getActiveIndex();

    this.setState({
      activeSlide,
    });
  };

  getSlides = () => {
    const { species } = this.props;
    const { images } = species;

    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    const getSlide = (src, index) => {
      const showPhotoInFullScreenWrap = () => this.showPhotoInFullScreen(index);

      return (
        <IonSlide
          key={src}
          class="species-profile-photo"
          onClick={showPhotoInFullScreenWrap}
        >
          <img src={src} />
        </IonSlide>
      );
    };

    const slideImage = images.map(getSlide);

    return (
      <IonSlides
        pager
        options={slideOpts}
        ref={this.slider}
        onIonSlideWillChange={this.getActiveSlide}
        onIonSlidesDidLoad={fixIonicSlideBug}
      >
        {slideImage}
      </IonSlides>
    );
  };

  getCaption = ([, caption]) => {
    return (
      <li key={caption}>
        <T>{caption}</T>
      </li>
    );
  };

  byKey = (captureKey1, captureKey2) =>
    captureKey1[0].localeCompare(captureKey2[0]);

  render() {
    const { species } = this.props;

    if (!species.images) {
      wip();
      return null;
    }

    const { activeSlide } = this.state;

    const photo = speciesPhotos[activeSlide];
    const { groupId, extraText, picture, ...captions } = photo;

    const getCaptions = Object.entries(captions)
      .sort(this.byKey)
      .map(this.getCaption);

    return (
      <>
        {this.getFullScreenPhotoViewer()}

        <Main id="species-profile">
          {this.getSlides()}

          <div className="species-captions">
            <ol>{getCaptions}</ol>

            {extraText && (
              <div className="species-card-content">{extraText}</div>
            )}
          </div>

          <IonCardContent>
            {species.description && (
              <>
                <h3>
                  <T>Description</T>:
                </h3>
                <div className="species-card-content">
                  {species.description}
                </div>
              </>
            )}
          </IonCardContent>
        </Main>
      </>
    );
  }
}

SpeciesProfile.propTypes = exact({
  species: PropTypes.object,
});

export default SpeciesProfile;
