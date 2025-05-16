import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Main, Header, RadioInput } from '@flumens';
import { NavContext } from '@ionic/react';
import languages from 'common/languages';
import appModel from 'common/models/app';

function SelectLanguage() {
  const navigate = useContext(NavContext);

  const currentValue = appModel.data.language;

  function onSelect(newValue: string) {
    appModel.data.language = newValue; // eslint-disable-line no-param-reassign
    appModel.save();

    navigate.goBack();
  }

  const alphabetically: any = ([, l1]: any, [, l2]: any) =>
    typeof l1 === 'string' && l1.localeCompare(l2);

  const languageEntries = ([value, language]: any) => {
    if (typeof language === 'object') return null;

    return <RadioInput.Option key={value} value={value} label={language} />;
  };

  const languagesOptions = Object.entries(languages)
    .sort(alphabetically)
    .map(languageEntries);

  return (
    <Page id="language-options">
      <Header title="Language" />

      <Main>
        <RadioInput onChange={onSelect} value={currentValue} className="mt-10">
          {languagesOptions}
        </RadioInput>
      </Main>
    </Page>
  );
}

export default observer(SelectLanguage);
