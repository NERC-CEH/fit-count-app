import { isPlatform } from '@ionic/react';
import AI from 'common/images/aiFlag.svg';
import AR from 'common/images/arFlag.svg';
import 'common/images/argFlag.svg';
import BR from 'common/images/braFlag.svg';
import CL from 'common/images/chlFlag.svg';
import CY from 'common/images/cypFlag.svg';
import DE from 'common/images/deFlag.svg';
import HR from 'common/images/hrFlag.svg';
import IE from 'common/images/ieFlag.svg';
import MS from 'common/images/msFlag.svg';
import PT from 'common/images/ptFlag.svg';
import SE from 'common/images/seFlag.svg';
import UK from 'common/images/ukFlag.svg';

export type Country = {
  label: string;
  flag: string;
  value: string;
  warehouseId: number;
  coords: { lat: number; lng: number; zoom: number };
};

const countries: Country[] = [
  {
    label: 'United Kingdom',
    flag: UK,
    value: 'UK',
    warehouseId: 18965,
    coords: { lat: 53.5, lng: -2.5, zoom: 5 },
  },
  {
    flag: CY,
    label: 'Cyprus',
    value: 'CY',
    warehouseId: 18967,
    coords: { lat: 35.126413, lng: 33.429859, zoom: 8 },
  },
  {
    flag: BR,
    label: 'Brazil',
    value: 'BR',
    warehouseId: 18971,
    coords: { lat: -14.235004, lng: -51.92528, zoom: 4 },
  },
  {
    flag: IE,
    label: 'Ireland',
    value: 'IE',
    warehouseId: 20076,
    coords: { lat: 53.41291, lng: -8.24389, zoom: 6 },
  },
  {
    flag: DE,
    label: 'Germany',
    value: 'DE',
    warehouseId: 20082,
    coords: { lat: 51.165691, lng: 10.451526, zoom: 5 },
  },
  {
    flag: HR,
    label: 'Croatia',
    value: 'HR',
    warehouseId: 20645,
    coords: { lat: 45.1, lng: 15.2, zoom: 9 },
  },
  {
    flag: CL,
    label: 'Chile',
    value: 'CL',
    warehouseId: 18973,
    coords: { lat: -35.675147, lng: -71.542969, zoom: 5 },
  },
  {
    flag: PT,
    label: 'Portugal',
    value: 'PT',
    warehouseId: 21813,
    coords: { lat: 39.399872, lng: -8.224454, zoom: 6 },
  },
  {
    flag: SE,
    label: 'Sweden',
    value: 'SE',
    warehouseId: 20646,
    coords: { lat: 60.128161, lng: 18.643501, zoom: 4 },
  },
  {
    flag: AR,
    label: 'Argentina',
    value: 'AR',
    warehouseId: 18969,
    coords: { lat: -34.996496, lng: -64.967282, zoom: 4 },
  },
  {
    flag: AI,
    label: 'Anguilla',
    value: 'AI',
    warehouseId: 22019,
    coords: { lat: 18.209543, lng: -63.055193, zoom: 12 },
  },
  {
    flag: MS,
    label: 'Montserrat',
    value: 'MS',
    warehouseId: 24013,
    coords: { lat: 16.75, lng: -62.2, zoom: 11 },
  },
];

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  countries.push(...([] as any));
}

export default countries;
