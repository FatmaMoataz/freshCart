import { useState } from 'react'
import EmailVerification from './components/EmailVerification/EmailVerification'
import ResetPassword from './components/ResetPassword/ResetPassword'
import VerificationCode from './components/VerificationCode/VerificationCode'
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  
    const [step, setStep] = useState(1);

    return (
      <>
      <Helmet>
      <title>Forget Password</title>
    </Helmet> 
    <div className="flex flex-col items-center justify-center p-4">
      {step === 1 && <EmailVerification onNext={() => setStep(2)} />}
      {step === 2 && <VerificationCode onNext={() => setStep(3)} />}
      {step === 3 && <ResetPassword />}
    </div>
    </>
  )
}
