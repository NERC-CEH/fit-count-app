import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { IonItem, IonLabel } from '@ionic/react';

function LanguageItem(props) {
  const { language, value } = props;

  const onSelect = () => {
    props.appModel.attrs.language = value; // eslint-disable-line no-param-reassign
    props.appModel.save();
  };

  const onSelectWrap = () => onSelect(value);

  return (
    <IonItem
      key={language}
      onClick={onSelectWrap}
      className="pretty-button-language"
      detail
    >
      <IonLabel>{language}</IonLabel>
    </IonItem>
  );
}

LanguageItem.propTypes = exact({
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  appModel: PropTypes.object.isRequired,
});

export default LanguageItem;
