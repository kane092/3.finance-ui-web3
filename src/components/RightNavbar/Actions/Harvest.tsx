import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateFieldSelected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import { updateRightNavbarMaxValue, updateRightNavbarCurValue } from '../../../store/actions/navbarAction';
import { getCRVWalletStatus } from '../../../utils/utils';

import Signal from '../Settings/Signal';

import NotificationIcon from '../../../assets/images/notification-icon.png';
import classNames from 'classnames';
import HarvestContent from '../HarvestContent';

export default function Harvest() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const globalSignalSaved = useSelector((state: RootState) => state.global.signalSaved);

  // useEffect(() => {
  //   dispatch(updateRightNavbarMaxValue(fieldSelected.emissionsCollected));
  //   dispatch(updateRightNavbarCurValue(fieldSelected.emissionsCollected));

  //   if (!fieldSelected.signalSelected) {
  //     let res = '';
  //     if (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') {
  //       res = fieldSelected.name;
  //     } else if (fieldSelected.name === 'SDT') {
  //       res = 'Bent';
  //     } else {
  //       res = globalSignalSaved;
  //     }
  //     dispatch(updateFieldSelected({...fieldSelected, "signalSelected": res}));
  //   }
  // }, [{...fieldSelected}]);


  return (
    <>
    {/* Header Detail */}
      {
      (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') ?
      <p className='RightNavbar-SubTab-Content'>
        On harvest, compound emissions are deposited into their respective C.D.Ps, each visible on the Deposits screens.
      </p> :
      <p className='RightNavbar-SubTab-Content'>
        On harvest, liquid emissions are swapped for compound emissions as per the set signal, before being deposited into their respective C.D.Ps, each visible on the Deposits screens.
      </p>}
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && fieldSelected.emissionsCollected === 0 &&
      <div className='w-full'>
        <div className='flex justify-between my-[10px]'>
          <p>Emission status:</p>
          <p className='text-red-600'>Not currently being received</p>
        </div>
      </div>
      }
      {walletConnected === "Connected" && fieldSelected.emissionsCollected !== 0 &&
      <div className='w-full'>
        <div className='flex justify-between my-[10px]'>
          <p>Emission status:</p>
          <p>Received by 6 deposit pools</p>
        </div>
        {
        (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') ?
        <p className='mb-[10px]'>Emission directed towards:</p> :
        <p className='mb-[10px]'>Signal how you wish to direct emissions on harvest:</p>}
        


        {/* SIGNALS Start */}
        <div className=
          {classNames(
            'flex items-start text-center mb-[30px]',
            // fieldSelected.name === 'Curve' ? 'justify-start' : 'justify-between'
          )}
        >
          {
          (fieldSelected.symbol === 'CRV' || fieldSelected.symbol === 'sdCRV') &&
          <Signal
            fieldType="Curve"
            disabled={false}
            indicatorShow={true}
          />}

          {
          (fieldSelected.symbol === 'CVX' || fieldSelected.symbol === 'bentCVX') &&
          <Signal
            fieldType="Convex"
            disabled={false}
            indicatorShow={true}
          />
          }

          {
          (fieldSelected.symbol === 'BENT') &&
          <Signal 
          fieldType="Bent" 
          disabled={false} 
          indicatorShow={true} 
          />}

          {
          <Signal 
          fieldType="3Fi" 
          disabled={true} 
          indicatorShow={true} 
          />
          }
          
          {/* {
          <Signal 
          fieldType="CRV wallet" 
          disabled={false} 
          indicatorShow={true} 
          />
          } 
          SIGNALS END
          
          */}


          {
          fieldSelected.name === 'Curve' && !getCRVWalletStatus(fieldData) &&
          <div className='flex items-center bg-[#CCCCCC]/[0.1] px-[15px] py-[10px] rounded-[21px] text-[8px] leading-[10px] tracking-widest uppercase text-left'>
            <img src={NotificationIcon} className='w-[14px] h-[14px] mr-[10px]' alt='' />
            3Fi Wallet is only active when you hold 3Fi tokens or NFTs.
          </div>}
        </div>

        {/*Todo: <HarvestContent/> */}
      </div>
      }
    </>
  )
}