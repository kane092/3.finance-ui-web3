import { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../store/actions/globalAction';
import { updateLeftNavbarShow } from '../../store/actions/navbarAction';
import useMetaMask from "../../hooks/metaMask";

import HeaderMenu from '../../assets/images/header-menu.png';
import HeaderLogo from '../../assets/images/navbar-logo.png';
import WalletMain from '../../assets/images/DAI-orange.svg';
import WalletMain3GDT from '../../assets/images/ICON-3GDT.svg';
import WalletMetaMask from '../../assets/images/wallet-metamask.png';
import '../../assets/scss/Header.scss';
import { commafy } from '../../utils/utils';
import useGetBalances from '../../hooks/useGetBalances';

type props = {
  leftNavbarGrid: number
  bodyContentGrid: number
  showHeaderSticky: boolean
  walletID?: string
}

export default function Header({
  leftNavbarGrid,
  bodyContentGrid,
  showHeaderSticky,
  walletID,
}: props) {
  const {DAIBalance} = useGetBalances()
  const dispatch: Dispatch<any> = useDispatch();
  const pathName = useSelector((state: RootState) => state.global.pathName);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const rightNavbarShow = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);

  //show wallet balance
  const {getWalletBalance} = useMetaMask()
  const [balance, setBalance] = useState(0)
  const [walletHover, setwalletHover] = useState(false)
  const getBalance = async () =>{
    let bal = await getWalletBalance()
    setBalance(bal)
  }
  useEffect(()=>{
    getBalance()
  },[])

  useEffect(()=>{
    getBalance()
  },[isTransactionInitiated,pageSelected,walletConnected])
  
  return (
    // <Grid container className='Header h-[80px] flex md:flex-col justify-between md:justify-end items-center'>
    <Grid
      container
      className={classNames(
        'Header h-[80px] items-center md:h-[80px] duration-900',
        pathName === '/' ? 'z-[0]' :  'z-[11]',
        (pathName === '/mission' || pathName === '/wealth' || pathName === '/work' || pathName === '/community') ? 'Header-LPs' : 'Header-inherit',
        pathName === '/' ? "Header-LP Header-transparent" : '',
        )}>
      <Grid md={leftNavbarGrid} className='duration-900' />
      <Grid md={bodyContentGrid} className='hidden md:block duration-900'>
        <div
          id="myHeader"
          className={classNames(
            'mt-[7px] mx-[10px] p-[10px] transition-opacity duration-300',
            rightNavbarShow === "Opened" ? 'md:mx-[30px]' : leftNavbarShow === "Opened" ? 'md:ml-[30px] md:mr-[70px]' : 'md:mx-[70px]',
            showHeaderSticky ? 'opacity-100' : 'opacity-0',
            pageSelected === "Deposits" ? 'pl-[35px]' : ''
          )}
        >
          {pathName === '/deposits' &&
          <Grid container spacing={2}>
            <Grid xs={4} md={3}>
              <p className='text-[18px] hidden md:block'>Pool iD</p>
              <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Symbol and name</span>
            </Grid>
            <Grid xs={4} md={4}>
              <p className='text-[18px] hidden md:block'>Rates and emissions</p>
              <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Annualised percentages</span>
            </Grid>
            <Grid xs={4} md={5}>
              <p className='text-[18px] hidden md:block'>Deposit values</p>
              <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>
                {walletConnected === 'Connected' ? 'Total values' : 'Total value locked (TVL)'}
              </span>
            </Grid>
          </Grid>}

          {pathName === '/emissions' &&
          <Grid container spacing={2}>
            <Grid xs={4} md={3}>
              <p className='text-[18px] hidden md:block'>Token iDs</p>
              <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Symbol and name</span>
            </Grid>
            <Grid xs={4} md={4}>
              <p className='text-[18px] hidden md:block'>Total claimable emissions</p>
              <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Value accrued in DAI</span>
            </Grid>
            <Grid xs={4} md={5}>
              <p className='text-[18px] hidden md:block'>Signals</p>
              <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Auto-compound options</span>
            </Grid>
          </Grid>}
        </div>
      </Grid>
      <img
        alt=''
        src={HeaderMenu}
        className='block md:hidden w-[20px] h-[14px] ml-[10px] mr-[calc(50vw-39px)] cursor-pointer'
        onClick={() => dispatch(updateLeftNavbarShow('Opened'))}
      />
      <img src={HeaderLogo} alt='' className='w-[24px] h-[33px] block md:hidden' />
      <span className='ml-[5px] md:hidden'>
      .Finance
      </span>
      <div className='Header-Connect-Wallet absolute top-[27px] md:top-[20px] right-[10px] md:right-[70px]'>
        {(walletConnected === "Disconnected" && pathName === '/') &&
        <>
          <span
            className={classNames(
             'hidden md:block'
            )}
            onClick={() => {
              dispatch(updateWalletConnectModalShow(true));
            }}
          >
            Round one raise is open
          </span>
          <span
            className='block md:hidden'
            onClick={() => {
              // Only occur with landing pages
              if (pathName === '/mission' || pathName === '/wealth' || pathName === '/work' || pathName === '/community') {
                dispatch(updateWalletConnectModalShow(true));
              }
              // Do not occur with landing pages
              if (pathName !== '/mission' && pathName !== '/wealth' && pathName !== '/work' && pathName !== '/community') {
                dispatch(updateWalletConnectModalShow(true));
              }
            }}
          >
            Round 1 Raise
          </span>
        </>}
        {(walletConnected === "Disconnected" && pathName !== '/') &&
        <>
          <span
            className={classNames(
              pathName === '/mission' || pathName === '/wealth' || pathName === '/work' || pathName === '/community' ? 'hidden' : 'hidden md:block'
            )}
            onClick={() => {
              // Only occur with landing pages
              if (pathName === '/mission' || pathName === '/wealth' || pathName === '/work' || pathName === '/community') {
                dispatch(updateWalletConnectModalShow(true));
              }
              // Do not occur with landing pages
              if (pathName !== '/mission' && pathName !== '/wealth' && pathName !== '/work' && pathName !== '/community') {
                dispatch(updateWalletConnectModalShow(true));
              }
            }}
          >
            Connect Wallet
          </span>
          <span
            className='block md:hidden'
            onClick={() => {
              // Only occur with landing pages
              if (pathName === '/mission' || pathName === '/wealth' || pathName === '/work' || pathName === '/community') {
                dispatch(updateWalletConnectModalShow(true));
              }
              // Do not occur with landing pages
              if (pathName !== '/mission' && pathName !== '/wealth' && pathName !== '/work' && pathName !== '/community') {
                dispatch(updateWalletConnectModalShow(true));
              }
            }}
          >
            Connect
          </span>
        </>}

        {
        (walletConnected === "Connected" && pathName === '/') &&
        <div 
        onClick={() => dispatch(updateWalletConnected("Disconnected"))}
        onMouseEnter={() => setwalletHover(true)}
        onMouseLeave={() => setwalletHover(false)}
        >
          <span className='Header-Connect-Wallet-Main'>
            <img src={WalletMain3GDT} alt='' className='w-[24px] h-[24px]' />
            {
              Number(DAIBalance) !== undefined &&
              <div className={'Connect-Button-Value'}
              >
                {
                  walletHover ?
                    // balance>=0?commafy(balance,2):"0"
                    // DAIBalance>=0?commafy(DAIBalance,2):"0"
                    <b>25/250</b>
                  :
                    ""
                }
              </div>
            }
          </span>
          <span className='Header-Connect-Wallet-Metamask'>
            <img src={WalletMetaMask} className='w-[24px] h-[24px]' alt='' />
            <p
              className={classNames(
                showHeaderSticky ? 'hidden' : 'hidden md:block'
              )}
            >
              {
                  !walletHover ?
                    `${walletID?.slice(0, 5)}...${walletID?.slice(walletID.length-4, walletID.length)}`
                  :
                    "Disconnect"
                }
              {/* 0x1234...5678 */}
            </p>
          </span>
        </div>
        }

        {(walletConnected === "Connected" && pathName !== '/') &&
        <div 
        onClick={() => dispatch(updateWalletConnected("Disconnected"))}
        onMouseEnter={() => setwalletHover(true)}
        onMouseLeave={() => setwalletHover(false)}
        >
          <span className='Header-Connect-Wallet-Main'>
            <img src={WalletMain} alt='' className='w-[24px] h-[24px]' />
            {
              Number(DAIBalance) !== undefined &&
              <div className={'Connect-Button-Value'}
              >
                <b>
                {
                  walletHover ?
                  // DAIBalance>=0?DAIBalance.toFixed(4):""
                  Number(DAIBalance)>=0?commafy(Number(DAIBalance),2):"0"
                  :
                  ""
                }
                </b>
              </div>
            }
          </span>
          <span className='Header-Connect-Wallet-Metamask'>
            <img src={WalletMetaMask} className='w-[24px] h-[24px]' alt='' />
            <p
              className={classNames(
                showHeaderSticky ? 'hidden' : 'hidden md:block'
              )}
            >
              {
                  !walletHover ?
                    `${walletID?.slice(0, 5)}...${walletID?.slice(walletID.length-4, walletID.length)}`
                  :
                    "Disconnect"
                }
              {/* 0x1234...5678 */}
            </p>
          </span>
        </div>}
      </div>
    </Grid>
  )
}