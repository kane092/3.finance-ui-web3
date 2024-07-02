import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { updateWalletConnected, updateWalletConnectModalShow } from '../store/actions/globalAction';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../store/store';

import WalletMetaMask from '../assets/images/wallet-metamask.png';
import WalletTrustWallet from '../assets/images/wallet-trustwallet.png';
import NavbarClose from '../assets/images/navbar-close.png';

import '../assets/scss/Content.scss';
import classNames from 'classnames';
import {useEffect} from "react";
import useMetaMask from '../hooks/metaMask';
import Button from "@mui/material/Button/Button";

type props = {
  flag: string
}

const Wallet = ({
  flag
}: props) => {
  const dispatch: Dispatch<any> = useDispatch();
  // @ts-ignore
  const { connect, disconnect, isActive } = useMetaMask()
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);


  // const updateWalletConnectedState = () => {
  //   dispatch(updateWalletConnected("Connected"));
  //   dispatch(updateWalletConnectModalShow(false));
  // }
  
  // useEffect(()=>{
    //   isActive && updateWalletConnectedState()
    //   // walletConnected === "Connected" && updateWalletConnectedState()
    // },[isActive])
    
    const clickHandler = () => {
      (flag === 'metamask' && walletConnected === "Connected") ? dispatch(updateWalletConnected("Disconnected")):dispatch(updateWalletConnected("Connected"))
      dispatch(updateWalletConnectModalShow(false));
    }
  return (
    <div 
      className='wallet-button'
      // onClick={() => flag === 'metamask' ? isActive ? disconnect() : connect() : updateWalletConnectedState()}
      onClick={() => clickHandler()}
      >
      {flag === 'metamask' ?
      <img 
      src={WalletMetaMask} 
      className='mr-[15px]' 
      alt=''
      /> :
      <img 
      src={WalletTrustWallet} 
      className='mr-[15px]' 
      alt='' 
      />}
      {flag === 'metamask' ? walletConnected === "Connected" ? 'Disconnect MetaMask' : 'MetaMask' : 'Trust Wallet'}
    </div>
  )
}

export default function WalletConnectModal() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnectModalShow = useSelector((state: RootState) => state.global.walletConnectModalShow);

  return (
    <Grid container className={
      classNames(
        "wallet-connect-modal",
        walletConnectModalShow ? '' : 'translate-x-full'
      )}
    >
      <Grid xs={1} md={3}></Grid>
      <Grid xs={10} md={7}>
        <div className='flex justify-between mb-[100px]'>
          <div className='modal-content'>
            <p className="title">Connect your wallet.</p>
            <p className='description'>By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.</p>
            <div className='wallet-buttons'>
              <Wallet flag="metamask" />
              {/*<Wallet flag="trustwallet" />*/}
            </div>
            <p className='text-[16px] leading-[21px]'>New to Ethereum?<br />Learn more about wallets</p>
          </div>
          <img
            src={NavbarClose}
            className='w-[36px] h-[36px] cursor-pointer'
            onClick={() => dispatch(updateWalletConnectModalShow(false))}
            alt=''
          />
        </div>
      </Grid>
      <Grid xs={1} md={2}></Grid>
    </Grid>
  )
}

function dispatch(arg0: (dispatch: import("../types/types").ReduxDispatchType) => void) {
  throw new Error('Function not implemented.');
}
