import { Trans as T } from 'react-i18next';
import './styles.scss';

export default function RequiredLabel() {
  return (
    <span className="required-label">
      (<T>required</T>)
    </span>
  );
}
