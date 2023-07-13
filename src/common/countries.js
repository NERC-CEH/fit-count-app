import { isPlatform } from '@ionic/react';
import AR from 'common/images/arFlag.svg';
import 'common/images/argFlag.svg';
import BR from 'common/images/braFlag.svg';
import CL from 'common/images/chlFlag.svg';
import CY from 'common/images/cypFlag.svg';
import DE from 'common/images/deFlag.svg';
import HR from 'common/images/hrFlag.svg';
import IE from 'common/images/ieFlag.svg';
import PT from 'common/images/ptFlag.svg';
import SE from 'common/images/seFlag.svg';
import UK from 'common/images/ukFlag.svg';

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
    warehouseId: 20082,
  },
  {
    flag: HR,
    label: 'Croatia',
    value: 'HR',
    warehouseId: 20645,
  },
  {
    flag: CL,
    label: 'Chile',
    value: 'CL',
    warehouseId: 18973,
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
        warehouseId: 20646,
      },
      {
        flag: AR,
        label: 'Argentina',
        value: 'AR',
        warehouseId: 18969,
      },
      {
        flag: PT,
        label: 'Portugal',
        value: 'PT',
        warehouseId: -1,
      },
    ]
  );
}

export default countries;
