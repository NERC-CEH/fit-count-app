import { observer } from 'mobx-react';
import { Main, RadioInput } from '@flumens';
import countries from 'common/countries';

const getCountriesOptions = () => {
  const alphabetically = (country1: any, country2: any) =>
    country1.label.localeCompare(country2.label);

  const getCountry = ({ value, label }: any) => (
    <RadioInput.Option key={value} label={label} value={value} />
  );

  return countries.sort(alphabetically).map(getCountry);
};

type Props = {
  appModel: any;
  onSelect: (val: string) => void;
};

function SelectCountryContainer({ appModel, onSelect }: Props) {
  const currentValue = appModel.data.country;

  return (
    <Main>
      <RadioInput onChange={onSelect} value={currentValue} className="my-10">
        {getCountriesOptions()}
      </RadioInput>
    </Main>
  );
}

export default observer(SelectCountryContainer);
