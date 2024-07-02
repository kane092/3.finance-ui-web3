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
import useGetBalances from '../../../hooks/useGetBalances';

export default function Mint() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  // const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);//refetch data after any transaction

  const {getBent3FiBalance,getBent3Balance,getBentCVX3Balance} = useABI()
  // const {bent3FiBalance,bent3Balance,bentCVX3Balance} = useGetBalances()
  
  const [bent3Balance,setBent3Balance] = useState<any>(0)
  const [bentCVX3Balance,setBentCVX3Balance] = useState<any>(0)
  const [allBalances,setAllBalances] = useState<any>([])

  const getBalances = () => {
    if(walletConnected === "Connected"){
      getBent3Balance().then((balance)=>{
        setBent3Balance(Number(balance))
        setAllBalances((prev:any)=>{
          return [...prev,Number(balance)]
        })
      })
      getBentCVX3Balance().then((balance)=>{
        setBentCVX3Balance(Number(balance))
        setAllBalances((prev:any)=>{
          return [...prev,Number(balance)]
        })
      })
    }
  }

  useEffect(()=>{
    getBalances()
  },[]) //Todo: Deps

  useEffect(()=>{
    getBalances()
  },[isTransactionInitiated,walletConnected])

  useEffect(()=>{
    //update limit of max value for input
    const minBalance = Math.min(...allBalances)
    dispatch(updateRightNavbarMaxValue(minBalance))
  },[allBalances])

  return (
    <>
      <div className='RightNavbar-SubTab-Content'>
        <p className="mb-[10px]">Use Compound positions to mint 3Fi tokens.</p>
        <p>3Fi tokens maintain all emission accruals and gain governance and voting rights over 3.Finance. </p>
      </div>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && 
      <div className='w-full'>
        <div className='text-[14px] my-[10px]'>
        Review your options to mint 3Fi tokens:
          <div className='flex text-[#C3D6E2] my-[10px]'>
            <img src='./images/token1.png' alt='' />
            <div className='ml-[10px]'>
              <p className='mb-[5px]'>3Fi Token</p>
              {/* <p className={fiTVL ? 'text-left' : 'text-left text-red-600'}>{fiTVL ? <NumberField value={fiTVL} digit={2} /> : "No balance"}</p> */}
              <p className="">BENT Base</p>
            </div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Available Convex: (A)</div>
            <div className={bentCVX3Balance ? 'text-right' : 'text-right text-red-600'}>{bentCVX3Balance ? <NumberField value={bentCVX3Balance} digit={2} /> : "No balance"}</div>
          
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Available BENT: (B)</div>
            <div className={bent3Balance ? 'text-right' : 'text-right text-red-600'}>{bent3Balance ? <NumberField value={bent3Balance} digit={2} /> : "No balance"}</div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Mint requirement: (A:B)</div>
            <div>1:1</div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Mint limited based on availability:</div>
            <div className={maxValue ? ((curValue > maxValue) ? 'text-right text-red-600' : 'text-right') : 'text-right text-red-600'}><NumberField value={maxValue} digit={2}/></div>
          </div>
        </div>
      </div>}
      {walletConnected === "Connected" && 
        <InputBox adornmentText="3Fi to Mint." validationText=""/>
      }

    </>
  )
}