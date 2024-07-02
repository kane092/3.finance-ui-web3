import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';

import { getFieldLP } from '../../../utils/utils';
import NumberField from '../../NumberField';
import { useEffect, useState } from 'react';
import useABI from '../../../hooks/useABI';
import InputBox from '../../InputBox';
import { updateRightNavbarMaxValue } from '../../../store/actions/navbarAction';

export default function Burn() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);//refetch data after any transaction

  const {getBent3FiBalance} = useABI()
  const [bent3FiBalance,setBent3FiBalance] = useState<any>(0)

  const getBalance = () => {
    if(walletConnected === "Connected"){
      getBent3FiBalance().then((balance)=>{
        setBent3FiBalance(Number(balance))
    
        //update limit of max value for input
        dispatch(updateRightNavbarMaxValue(Number(balance))) 
      })
    }
  }

  useEffect(()=>{
    getBalance()
  },[])//Todo:dependency

  useEffect(()=>{
    getBalance()
  },[isTransactionInitiated,walletConnected])

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>Burn 3Fi tokens to retrieve Compound positions. Note: Governance and voting rights will be lost.</p>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && 
      <>
        <div className='text-[14px] my-[10px] w-full'>
        Select the type of 3Fi token you wish to burn:
          <div className={bent3FiBalance ? 'flex my-[10px]' : 'flex text-[#C3D6E2] my-[10px]'}>
            <img src='./images/token1.png' alt='' />
            <div className='ml-[10px]'>
              <p className='mb-[5px]'>3Fi (Bent Base)</p>
              <p className={maxValue ? 'text-left' : 'text-left text-red-600'}>{maxValue ? <NumberField value={maxValue} digit={2} /> : "No balance"}</p>
            </div>
          </div>
          <hr className='mb-[10px]' />
          {!bent3FiBalance ?
          <p>You Don’t have any 3Fi tokens yet.</p> :
          <>
            <div className='flex justify-between mb-[5px]'>
              <div>Burn output per 3Fi token of type:</div>
              <div>3FiC</div>
            </div>
            <div className='flex justify-between mb-[5px]'>
              <div>Receivables: (Convex : Bent)</div>
              <div>1:1</div>
            </div>
            <div className='flex justify-between mb-[5px]'>
              <div>Burn Limit based on 3Fi availability:</div>
              <div className={bent3FiBalance && curValue > maxValue ? 'text-right text-red-600' : 'text-right'}><NumberField value={maxValue} digit={2} /></div>
            </div>
          </>}
        </div>
      <InputBox adornmentText="3Fi to Burn." validationText=""/>
      </>}
    </>
  )
}