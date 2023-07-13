import { FC, ComponentProps } from 'react';
import { PhotoPicker, captureImage } from '@flumens';
import { observer } from 'mobx-react';
import { Capacitor } from '@capacitor/core';
import { useIonActionSheet, isPlatform } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import Media from 'models/media';
import Sample from 'models/sample';
import Occurrence from 'models/occurrence';
import config from 'common/config';
import './styles.scss';

export function usePromptImageSource() {
  const [presentActionSheet] = useIonActionSheet();
  const { t } = useTranslation();

  const message = (
    resolve: (value: boolean | PromiseLike<boolean | null> | null) => void
  ): void => {
    presentActionSheet({
      buttons: [
        { text: t('Gallery'), handler: () => resolve(false) },
        { text: t('Camera'), handler: () => resolve(true) },
        { text: t('Cancel'), role: 'cancel', handler: () => resolve(null) },
      ],
      header: t('Choose a method to upload a photo'),
    });
  };
  const promptMessage = () => new Promise<boolean | null>(message);
  return promptMessage;
}

interface Props extends Omit<ComponentProps<typeof PhotoPicker>, 'getImage'> {
  model: Sample | Occurrence;
}

const AppPhotoPicker: FC<Props> = ({ model, isDisabled, ...restProps }) => {
  const promptImageSource = usePromptImageSource();

  if (isDisabled && !model.media.length) return null;

  async function getImageWrap() {
    const shouldUseCamera = await promptImageSource();
    const cancelled = shouldUseCamera === null;
    if (cancelled) return null;

    const [image] = await captureImage({
      camera: shouldUseCamera,
    });

    if (!image) {
      return null;
    }

    const imageModel = await Media.getImageModel(
      isPlatform('hybrid') ? Capacitor.convertFileSrc(image) : image,
      config.dataPath
    );

    // TODO: remove once we migrate to the new Indicia models which don't add thumbnails
    delete imageModel.attrs.thumbnail;

    return imageModel;
  }

  return (
    <PhotoPicker
      getImage={getImageWrap}
      model={model}
      isDisabled={isDisabled}
      {...restProps}
    />
  );
};

export default observer(AppPhotoPicker);
