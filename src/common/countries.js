import { isPlatform } from '@ionic/react';

import UK from 'common/images/ukFlag.svg';
import CY from 'common/images/cypFlag.svg';
import BR from 'common/images/braFlag.svg';
import SE from 'common/images/seFlag.svg';
import IE from 'common/images/ieFlag.svg';
import DE from 'common/images/deFlag.svg';
import CL from 'common/images/chlFlag.svg';
import 'common/images/argFlag.svg';

const countries = [
  {
    flag: UK,
    label: 'United Kingdom',
    value: 'UK',
    warehouseId: 18965,
  },
  {
    flag: CY,
    label: 'Cyprus',
    value: 'CY',
    warehouseId: 18967,
  },
  {
    flag: BR,
    label: 'Brazil',
    value: 'BR',
    warehouseId: 18971,
  },
  {
    flag: IE,
    label: 'Ireland',
    value: 'IE',
    warehouseId: 20076,
  },
  {
    flag: DE,
    label: 'Germany',
    value: 'DE',
    warehouseId: 20076,
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
        // warehouseId: -1,
      },

      {
        flag: CL,
        label: 'Chile',
        value: 'CH',
        warehouseId: 18973,
      },
      // {
      //   flag: AR,
      //   label: 'Argentina',
      //   value: 'AR',
      //   warehouseId: 18969
      // },
    ]
  );
}

export default countries;
