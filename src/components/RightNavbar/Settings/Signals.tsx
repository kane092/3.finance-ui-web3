import { useEffect } from "react";
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import { updateSignalSelected } from "../../../store/actions/globalAction";

import Signal from "./Signal"

export default function Help() {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(updateSignalSelected(""));
  }, []);

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>
        Signals indicate to 3.Finance and others, how you wish to treat your emissions. Signals can be set globally here, or on an emission by emission basis.
      </p>
      <p>
        Signal options:
      </p>
      <div className='flex text-[8px] leading-[30px]'>
        <Signal fieldType="Curve" disabled={false} indicatorShow={false} />
        <Signal fieldType="Convex" disabled={false} indicatorShow={false} />
        <Signal fieldType="Bent" disabled={false} indicatorShow={false} />
        <Signal fieldType="CRV wallet" disabled={true} indicatorShow={false} />
      </div>
    </>
  )
}