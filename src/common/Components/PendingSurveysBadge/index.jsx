import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { IonBadge } from '@ionic/react';
import './styles.scss';

function getPendingCount(savedSamples) {
  const byUploadStatus = sample => !sample.syncedAt;

  return savedSamples.filter(byUploadStatus).length;
}

function PendingSurveysBadge({ savedSamples }) {
  const count = getPendingCount(savedSamples);

  if (count <= 0) {
    return null;
  }

  return (
    <IonBadge color="secondary" className="pending-surveys-badge">
      {count}
    </IonBadge>
  );
}

PendingSurveysBadge.propTypes = exact({
  savedSamples: PropTypes.array.isRequired,
});

export default observer(PendingSurveysBadge);
