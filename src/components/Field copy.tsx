import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import classNames from 'classnames';

import type { NFTData, FieldType } from '../types/types';
import NumberField from './NumberField';

import { RootState } from '../store/store';
import { updateFieldSelected } from '../store/actions/globalAction';
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected,
  updateRightNavbarNFTSelected,
  updateRightNavbarIndicatorFlag,
  updateRightNavbarAssetSelected
} from '../store/actions/navbarAction';

import nftsJsonData from '../assets/data/nfts.json';
import ArrowRight from '../assets/images/arrow-right.png';
import FieldSelectedIcon from '../assets/images/field-selected-icon.png';
import '../assets/scss/Field.scss';

let nftsData = nftsJsonData as NFTData[];

const emptyField: FieldType = {
  "name": "",
  "type": ""
}

type props = {
  field: FieldType
  fieldFlag: number
  firstField: boolean
}

export default function Field({
  field,
  fieldFlag,
  firstField
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const [needDelay, setNeedDelay] = useState(false);
  const [needBackwordAnimation, setNeedBackwordAnimation] = useState(0);
  const previousValue = useRef(0);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const navbarIndicatorFlag = useSelector((state: RootState) => state.navbar.rightNavbarIndicatorFlag);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  // const isSelected = (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName);
  const isSelected = (field.name === fieldSelected.name && field.type === fieldSelected.type);
  // const isNFT = (field.depositsFullName && field.depositsFullName.includes("3Fi NFTs"));
  const isNFT = field.isNFT;

  const getIndicatorFlag = (isSelected: boolean) => {
    // show if RightNavbar opens
    // 0 for no indicator, 1 for left indicator, 2 for right indicator
    if (showRightNavbar !== "Opened") return 0;

    if ((walletConnected !== "Connected" || tabSelected === "Details")) {
      if (isSelected) return 1;
      else return 0;
    }
    if (subTabSelected === "Mint") {
      if (isSelected) return 1;
      else if (field.symbol === "CVX" || field.symbol === "BENT") return 2;
    } else if (subTabSelected === "Burn") {
      if (isSelected) return 2;
      else if (field.symbol === "CVX" || field.symbol === "BENT") return 1;
    } else if (subTabSelected === "NFTs") {
      if (isSelected || field.symbol === "CRV") return 2;
    } else if (subTabSelected === "BurnNFT") {
      if (isSelected) return 2;
      else if (field.symbol === "3FiToken" || field.symbol === "CRV") return 1;
    } else if (subTabSelected === "Withdraw") {
      if (isSelected) return 2;
    } else if (subTabSelected === "Merge") {
      if (isSelected) {
        if (maxValue > 0) return 2;
        else return 1;
      }
    } else if (subTabSelected === "Harvest") {
      if (isSelected) {
        if (maxValue > 0) return 2;
        else return 1;
      } else {
        if (field.symbol === "CRVWallet" && fieldSelected.signalSelected === "CRV wallet") return 1;
        else return 0;
      }
    } else if (subTabSelected === "Distribute") {
      if (isSelected) {
        if (maxValue > 0) return 2;
        else return 1;
      } else {
        if (field.symbol === "CRV" && assetSelected === "CRV") return 1;
        else return 0;
      }
    } else if (subTabSelected === "Manage" || subTabSelected === "ClaimNFT") {
      if (isSelected) {
        if (maxValue > 0) return 2;
        else return 1;
      }
    } else {
      if (isSelected) return 1;
    }

    /**
     * Show the indicator for NFT field that has value and selected in the RightNavbar
     */
    if (isNFT && field.name === nftSelected.name) {
      if (subTabSelected === "NFTs" && maxValue) return 1;
      else if (subTabSelected === 'Merge') return 1;
    }

    return 0;
  }
  const indicatorFlag = getIndicatorFlag(isSelected);

  useEffect(() => {
    if (showRightNavbar === "Minimized") {
      setNeedDelay(false)
    } else {
      setNeedDelay(true)
      setTimeout(() => {
        setNeedDelay(false)
      }, 1500)
    }
  }, [showRightNavbar]);

  useEffect(() => {
    if (showRightNavbar === "Minimized") {
      setNeedBackwordAnimation(0);
      console.log('first')
    } else {
      if (previousValue.current === 0 || previousValue.current === indicatorFlag) {
        setNeedBackwordAnimation(0);
        console.log('second')
      } else {
        setNeedBackwordAnimation(previousValue.current);
        console.log('third')
      }
    }
    previousValue.current = indicatorFlag;
  }, [indicatorFlag]);

  return (
    <Grid
      container
      spacing={2}
      xs={12}
      id={field.symbol}
      className={classNames(
        'Field',
        isNFT ? 'Field-NFT' : '',
        firstField ? 'Field-First' : '',
        isSelected ? 'Field-Selected' : '',
        indicatorFlag ? 'Field-Indicator' : '',
        // (isNFT) ? 'Field-Hidden' : '',
        walletConnected === 'Connected' ? 'Field-Connected' : '',
      )}
      onClick={() => {
        if (showRightNavbar === "Minimized") {
          dispatch(updateRightNavbarIndicatorFlag(true));
        } else {
          dispatch(updateRightNavbarIndicatorFlag(false));
        }

        if (pageSelected === "Deposits") {
          if (!isSelected === true) {
            dispatch(updateRightNavbarShow("Opened"));
            if (walletConnected !== 'Connected') {
              dispatch(updateRightNavbarTabSelected("Actions"));
            }
            else if (field.depositsLP !== undefined && field.depositsLP >= 0) {
              dispatch(updateRightNavbarTabSelected("Actions"));
            } else {
              // dispatch(updateRightNavbarTabSelected("Details"));
              dispatch(updateRightNavbarTabSelected("Actions"));
            }
            dispatch(updateFieldSelected(field));
            if (field.depositsFullName === '3Fi Collateral - CRV Base') {
              // Select 3Fi Collateral Item
              dispatch(updateRightNavbarSubTabSelected("Mint"));
            } else if (field.isNFT) {
              // Select NFT Item
              dispatch(updateRightNavbarSubTabSelected("Merge"));
              let tmpNFTData1: NFTData = {
                "name": "",
                "symbol": "",
                "fieldSymbol": "",
                "requirementA": 0,
                "requirementB": 0
              };
              let tmpNFTData2: NFTData = {
                "name": "",
                "symbol": "",
                "fieldSymbol": "",
                "requirementA": 0,
                "requirementB": 0
              };
              nftsData.map((nft) => {
                //SELECT NFT
                if (nft.name === field.name) {
                  // tmpNFTData1 = nft;
                  dispatch(updateRightNavbarNFTSelected(nft));
                } 
                // else if (nft.name !== field.name && tmpNFTData2.name === "") {
                //   tmpNFTData2 = nft;
                // }
              })
              // dispatch(updateRightNavbarNFTSelected(tmpNFTData2));
              // dispatch(updateDepositNFTSelected(tmpNFTData1));
            } else {
              // Select Other Item
              dispatch(updateRightNavbarSubTabSelected("Zap"));
            }
          } else {
            dispatch(updateRightNavbarShow("Minimized"));
            dispatch(updateFieldSelected(emptyField));
            dispatch(updateRightNavbarAssetSelected('None'))
          }
        } else if (pageSelected === "Emissions") {
          if (!isSelected) {
            dispatch(updateRightNavbarShow("Opened"));
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateFieldSelected(field));

            switch (field.emissionsFullName) {
              case '3Fi Collateral - DAI wallet':
                dispatch(updateRightNavbarSubTabSelected("Distribute"));
                break;
              default:
                dispatch(updateRightNavbarSubTabSelected("Harvest"));
                break;
            }
          } else {
            dispatch(updateRightNavbarShow("Minimized"));
            dispatch(updateFieldSelected(emptyField));
            dispatch(updateRightNavbarAssetSelected('None'))
          }
        }
      }}
    >
      <Grid xs={4} md={3} className='flex items-center justify-between py-[0px!important]'>
        <div className='flex items-center'>
          <img
            alt=''
            src={fieldFlag === 1 ? field.depositsSymbol : field.emissionsSymbol}
            className='w-[40px] md:w-[46px] h-[40px] md:h-[46px] mr-[10px]'
          />
          {field.name}
          {field.type === "OtherFields" &&
          <img
            alt=''
            src={field.wrapperSymbol}
            className='second-img'
          />
          }
        </div>
        {field.type === "OtherFields" &&
        <div className='hidden xl:block mr-[10px] 2xl:mr-[10px] 3xl:mr-[10px] flex flex-col items-end'>
          <img
            alt=''
            src={field.wrapperSymbol}
            className='img-gray'
          />
        </div>
        }
        {isNFT && <p>&times;{field.depositsLP}</p>}
      </Grid>
      <Grid xs={4} md={4} className='Field-APR justify-start md:justify-between xl:justify-between'>
        <div className='Field-APR-Left hidden md:block'>
          <p className='text-transition'>
            {pageSelected === "Deposits" && <>APR %</>}
            {pageSelected === "Emissions" && field.name !== "CRV wallet" &&
              <>
                {walletConnected === "Disconnected" ? "T.C.E" :
                  field.emissionLastSignalSymbol ? <img src={field.emissionLastSignalSymbol} className='w-[17px] h-[17px]' alt='' /> : "Collected"}
              </>}
            {pageSelected === "Emissions" && field.name === "CRV wallet" &&
              <>Balance</>}
          </p>
          <span className='Field-APR-Hover flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>
            {pageSelected === "Deposits" ? "Emissions:" : "USD value:"}
          </span>
        </div>
        <div className='mr-[0px] md:mr-[10px] 2xl:mr-[40px] 3xl:mr-[50px] flex flex-col items-end'>
          {pageSelected === "Deposits" && <span className='text-transition'><NumberField value={field.depositsAPR} digit={2} /></span>}
          {pageSelected === "Emissions" &&
            <span className='text-transition'><NumberField value={walletConnected === "Connected" ? field.symbol === "CRVWallet" ? field.emissionsBalance : field.emissionsCollected : field.emissionsTCE} digit={2} /></span>}
          {pageSelected === "Deposits" ?
            <div className='Field-APR-Hover hidden md:flex text-transition'>
              {
                /**
                 * Show 8 dots for normal cards
                 * Show 4 dots for NFT cards
                 */
                [...Array(!isNFT ? 8 : 4)].map((key, index) => {
                  return (
                    <img key={`card-${index}`} src={FieldSelectedIcon} className='ml-[2px]' alt='' />
                  )
                })
              }
            </div> :
            <span className='Field-APR-Hover hidden md:flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>1,234,567,890.00</span>}
        </div>
      </Grid>
      <Grid xs={4} md={5} className={`${pageSelected === "Deposits" ? '' : 'multi-line'} Field-TVL justify-start md:justify-end xl:justify-between`}>
        <div id={field.symbol + "-indicator"} className=
          {classNames(
            "Field-APR-Left hidden md:block indicator",
            // (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : '',
            // (indicatorFlag === 1 && pageSelected === "Emissions") ? 'Emissions-Indicator-Left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : '',
            (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
            (indicatorFlag === 1 && pageSelected === "Emissions") ? 'Emissions-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
            // (indicatorFlag === 2 && pageSelected === "Deposits" && tabSelected === "Actions") ? 'Deposits-Indicator-Right after:right-[calc(-64px+8.4vw)] 2xl:after:right-[-64px]' : '',
            // (indicatorFlag === 2 && pageSelected === "Emissions" && tabSelected === "Actions") ? 'Emissions-Indicator-Right after:right-[calc(-64px+8.4vw)] 2xl:after:right-[-64px]' : '',
            (indicatorFlag === 2 && pageSelected === "Deposits" && tabSelected === "Actions") ? 'Deposits-Indicator-Right after:right-[calc(-64px+8.4vw)] ' : '',
            (indicatorFlag === 2 && pageSelected === "Emissions" && tabSelected === "Actions") ? 'Emissions-Indicator-Right after:right-[calc(-64px+8.4vw)] ' : '',
            navbarIndicatorFlag ? 'Indicator-Animation' : '',
            needDelay ? 'delayed-indicator' : ''
          )}>
          <p className='text-transition'>
            {pageSelected === "Deposits" && (
              walletConnected === "Connected" ? (
                isNFT ? "3Fi votes:" : "L.B"
              ) : (
                isNFT ? "3Fi votes:" : "T.V.L"
              )
            )}
            {pageSelected === "Emissions" && (
              field.name === "CRV wallet" ? "Allocated" : (
                walletConnected === "Disconnected" ? "APR" : "Deposit"
              )
            )}
          </p>
          {pageSelected === "Emissions" && 
          <span className='Field-APR-Hover flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>
            {field.name === "CRV wallet" ? "Unallocated" : "Max NFT boost:"}
          </span>}
        </div>
        <div className=
        {classNames(
          'Field-TVL-Right flex flex-col items-start md:items-end px-[0px] xl:px-[10px] 2xl:px-[40px] 3xl:px-[50px]',
          // needBackwordAnimation === 0 ? '' : needBackwordAnimation === 1 ? 'backword-animation-left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : 'backword-animation-right after:right-[calc(-64px+8.4vw)] 2xl:after:right-[-64px]'
          needBackwordAnimation === 0 ? '' : needBackwordAnimation === 1 ? 'backword-animation-left after:right-[calc(-56px+8.4vw)] ' : 'backword-animation-right after:right-[calc(-64px+8.4vw)] 2xl:after:right-[-64px]'
        )}>
          {pageSelected === "Emissions" && <span className='text-transition'><NumberField value={field.symbol === "CRVWallet" ? 0 : field.emissionsAPR} digit={2} />&nbsp;%</span>}
          {pageSelected === "Deposits" &&
            <span className='text-transition'>{walletConnected === "Connected" ? <NumberField value={field.depositsLP} digit={2} /> : <NumberField value={field.depositsTVL} digit={2} />}</span>}
          {pageSelected === "Emissions" &&
          <span className='Field-APR-Hover hidden md:flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>+ <NumberField value={field.symbol === "CRVWallet" ? 100 : 16.34} digit={2} /> %</span>}
        </div>
        <div className='flex min-w-[inherity] md:min-w-[70px] items-center justify-end'>
          <h6 className='hidden md:block text-[14px] text-[#00FFFF] leading-[21px] h-[20px]'>More</h6>
          <img className='w-[14px] h-[12px] ml-[6px]' src={ArrowRight} alt='' />
        </div>
      </Grid>
    </Grid>
  )
}