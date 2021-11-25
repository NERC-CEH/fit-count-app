import { isPlatform } from '@ionic/react';

import UK from 'common/images/ukFlag.svg';
import CY from 'common/images/cypFlag.svg';
import BR from 'common/images/braFlag.svg';
import SE from 'common/images/seFlag.svg';
import 'common/images/chlFlag.svg';
import 'common/images/argFlag.svg';

const countries = [
  {
    flag: UK,
    label: 'United Kingdom',
    value: 'UK',
  },
  {
    flag: CY,
    label: 'Cyprus',
    value: 'CY',
  },
  {
    flag: BR,
    label: 'Brazil',
    value: 'BR',
  },
];

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  countries.push(
    ...[
      {
        flag: SE,
        label: 'Sweden',
        value: 'SE',
      },
      // {
      //   flag: CL,
      //   label: 'Chile',
      //   value: 'CHL',
      // },
      // {
      //   flag: AR,
      //   label: 'Argentina',
      //   value: 'AR',
      // },
    ]
  );
}

export default countries;
