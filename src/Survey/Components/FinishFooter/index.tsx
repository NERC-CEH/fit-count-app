import { useContext, useState } from 'react';
import { useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import Footer from '../Footer';
import ThankYouAlert from './ThankYouAlert';

type Props = { sample: Sample; setPastActivity?: any };

const FinishFooter = ({ sample, setPastActivity }: Props) => {
  const { navigate } = useContext(NavContext);
  const checkSampleStatus = useValidateCheck(sample);
  const toast = useToast();
  const checkUserStatus = useUserStatusCheck();

  const [showThanks, setShowThanks] = useState(false);

  const _processDraft = async () => {
    appModel.data['draftId:survey'] = '';
    await appModel.save();

    // eslint-disable-next-line no-param-reassign
    sample.metadata.saved = true;
    sample.save();
  };

  const onFinish = async () => {
    setPastActivity && setPastActivity();

    if (!sample.metadata.saved) {
      await _processDraft();
    }

    setShowThanks(true);
  };

  const goHome = () => navigate('/home/surveys', 'root');

  const uploadSurvey = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);

    goHome();
  };

  return (
    <>
      {showThanks && (
        <ThankYouAlert
          sample={sample}
          uploadSurvey={uploadSurvey}
          goHome={goHome}
        />
      )}

      <Footer title="Save my count" onClick={onFinish} />
    </>
  );
};

export default FinishFooter;
