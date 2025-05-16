import { ComponentProps } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import { PhotoPicker, captureImage, useToast } from '@flumens';
import { useIonActionSheet, isPlatform } from '@ionic/react';
import config from 'common/config';
import Media from 'models/media';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';

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

const AppPhotoPicker = ({ model, isDisabled, ...restProps }: Props) => {
  const toast = useToast();

  if (isDisabled && !model.media.length) return null;

  async function onAdd(shouldUseCamera: boolean) {
    try {
      const photoURLs = await captureImage(
        shouldUseCamera ? { camera: true } : { multiple: true }
      );
      if (!photoURLs.length) return;

      const getImageModel = async (imageURL: string) =>
        Media.getImageModel(
          isPlatform('hybrid') ? Capacitor.convertFileSrc(imageURL) : imageURL,
          config.dataPath,
          true
        );
      const imageModels: Media[] = await Promise.all<any>(
        photoURLs.map(getImageModel)
      );

      model.media.push(...imageModels);
      model.save();
    } catch (e: any) {
      toast.error(e);
    }
  }
  const onRemove = (m: any) => m.destroy();

  return (
    <PhotoPicker
      onAdd={onAdd}
      onRemove={onRemove}
      isDisabled={isDisabled}
      {...restProps}
      value={model.media}
    />
  );
};

export default observer(AppPhotoPicker);
