import React from 'react';
import { Trans as T } from 'react-i18next';

export default function RequiredLabel() {
  return (
    <span className="warning">
      (<T>required</T>)
    </span>
  );
}
