import { Fragment, useState } from 'react'
import AddMeeting from './AddMetting'
import ChooseRoom from './ChooseRoom'

export default function Meeting() {
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  return (
    <Fragment>
      {step === 0 ?
        <AddMeeting setData={setData} setStep={setStep} data={data} /> :
        <ChooseRoom data={data} setStep={setStep} />
      }
    </Fragment>
  )
}