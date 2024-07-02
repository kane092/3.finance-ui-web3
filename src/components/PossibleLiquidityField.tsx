import { useEffect, useState } from 'react';
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
  updateRightNavbarIndicatorFlag
} from '../store/actions/navbarAction';

import nftsJsonData from '../assets/data/nfts.json';
import ArrowRight from '../assets/images/arrow-right.png';
import FieldSelectedIcon from '../assets/images/field-selected-icon.png';
import '../assets/scss/Field.scss';
import QuestionIcon from "../assets/images/Question.png"
import { getCRVWalletStatus } from '../utils/utils';

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

export default function PossibleLiqudityField({
  field,
  fieldFlag,
  firstField,
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const [needDelay, setNeedDelay] = useState(false);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const navbarIndicatorFlag = useSelector((state: RootState) => state.navbar.rightNavbarIndicatorFlag);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  // const isSelected = (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName);
  const isSelected = (field.name === fieldSelected.name && field.type === fieldSelected.type);

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
      else if (field.symbol === "bent.Convex" || field.symbol === "BENT") return 2;
    } else if (subTabSelected === "Burn") {
      if (isSelected) return 2;
      else if (field.symbol === "bent.Convex" || field.symbol === "BENT") return 1;
    } else if (subTabSelected === "NFTs") {
      if (isSelected || field.symbol === "CRV") return 2;
    } else if (subTabSelected === "BurnNFT") {
      if (isSelected) return 2;
      else if (field.symbol === "3FiToken" || field.symbol === "CRV") return 1;
    } else if (subTabSelected === "Withdraw") {
      if (isSelected) {
        if (fieldSelected.depositsLP > 0) return 2;
        else return 1;
      } else {
        return 0;
      }
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
        if (field.symbol === "CRV" && assetSelected === "CRV" && getCRVWalletStatus(fieldData) && maxValue > 0) return 1;
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

  return (
    <Grid
      container
      spacing={2}
      xs={12}
      className={classNames(
        'Field',
        firstField ? 'Field-First' : '',
        isSelected ? 'Field-Selected' : '',
        indicatorFlag ? 'Field-Indicator' : '',
        walletConnected === 'Connected' ? 'Field-Connected' : '',
      )}
      onClick={() => {
        if (showRightNavbar === "Minimized") {
          // setNeedDelay(true)
          dispatch(updateRightNavbarIndicatorFlag(true));
        } else {
          // setNeedDelay(false)
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
              dispatch(updateRightNavbarTabSelected("Actions"));
            }
            dispatch(updateFieldSelected(field));
            if (field.depositsFullName === '3Fi Collateral - CRV Base') {
              // Select 3Fi Collateral Item
              dispatch(updateRightNavbarSubTabSelected("Mint"));
            } else if (field.isNFT) {
              // Select NFT Item
              dispatch(updateRightNavbarSubTabSelected("Merge"));
              // let tmpNFTData1: NFTData = {
              //   "name": "",
              //   "symbol": "",
              //   "fieldSymbol": "",
              //   "requirementA": 0,
              //   "requirementB": 0
              // };
              let tmpNFTData2: NFTData = {
                "name": "",
                "symbol": "",
                "fieldSymbol": "",
                "requirementA": 0,
                "requirementB": 0
              };
              nftsData.forEach((nft) => {
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
          }
        } else if (pageSelected === "Emissions") {
          if (!isSelected === true) {
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
            className='second-img w-[20px] h-[20px]'
          />
          }
        </div>
        {field.type === "OtherFields" &&
        <div className='hidden xl:block mr-[10px] 2xl:mr-[10px] 3xl:mr-[10px] flex flex-col items-end'>
          {/* <img
            alt=''
            src={field.wrapperSymbol}
            className='img-gray w-[15px] h-[15px]'
          /> */}
        </div>
        }
      </Grid>
      <Grid xs={4} md={4} className='Field-APR justify-start md:justify-between xl:justify-between'>
        <div className='Field-APR-Left hidden md:block'>
          <p className='duration-300'>
            {pageSelected === "Deposits" && <>APR %</>}
            {pageSelected === "Emissions" && field.name !== "CRV wallet" &&
              <>
                {walletConnected === "Disconnected" ? "T.C.E" :
                  field.emissionLastSignalSymbol ? <img src={field.emissionLastSignalSymbol} className='w-[17px] h-[17px]' alt='' /> : "Collected"}
              </>}
            {pageSelected === "Emissions" && field.name === "CRV wallet" &&
              <>Balance</>}
          </p>
          <span className='Field-APR-Hover flex text-[#C3D6E2] text-[12px] leading-[15px]'>
            {pageSelected === "Deposits" ? "Emissions:" : "USD value:"}
          </span>
        </div>
        <div className='mr-[0px] md:mr-[10px] 2xl:mr-[40px] 3xl:mr-[50px] flex flex-col items-end'>
          {pageSelected === "Deposits" && <span className='duration-300'>{field.depositsAPR}</span>}
          {pageSelected === "Emissions" &&
            <span className='duration-300'><NumberField value={walletConnected === "Connected" ? field.symbol === "CRVWallet" ? field.emissionsBalance : field.emissionsCollected : field.emissionsTCE} digit={2} /></span>}
          {pageSelected === "Deposits" ?
            <div className='Field-APR-Hover hidden md:flex'>
              {
                /**
                 * Show 8 dots for normal cards
                 * Show 4 dots for NFT cards
                 */
                [...Array(8)].map((key: number, index: number) => {
                  return (
                    <img src={FieldSelectedIcon} className='ml-[2px]' key={`field-${index}`} alt='' />
                  )
                })
              }
            </div> :
            <span className='Field-APR-Hover hidden md:flex text-[#C3D6E2] text-[12px] leading-[15px]'><NumberField value={walletConnected === "Connected" ? field.symbol === "CRVWallet" ? field.emissionsBalance : field.emissionsCollected : field.emissionsTCE} digit={2} /></span>}
        </div>
      </Grid>
      <Grid xs={4} md={5} className='Field-TVL flex justify-between'>
        {pageSelected === "Deposits" && walletConnected === "Connected" &&
          <div className=
            {classNames(
              'min-w-[10px] md:min-w-[40px] Field-APR-Left',
              indicatorFlag === 1 ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : '',
              // indicatorFlag === 1 ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
              indicatorFlag === 2 ? 'Deposits-Indicator-Right after:right-[calc(-64px+8.4vw)] 2xl:after:right-[-64px]' : '',
              // indicatorFlag === 2 ? 'Deposits-Indicator-Right after:right-[calc(-64px+8.4vw)] ' : '',
              navbarIndicatorFlag ? 'Indicator-Animation' : '',
              needDelay && isSelected ? 'delayed-indicator' : ''
            )}
          >
            <div className="hidden md:block">
              <div className='duration-300 flex flex-row items-center bg-[#d9d9d91a] py-[6px] pl-[10px] pr-[12px] rounded-[21px]'>
                <img className='w-[16px] h-[16px] mr-[8px]' src={QuestionIcon} alt='' />
                <span className='text-[10px] font-normal leading-[12px]'>
                  DEPOSIT BALANCE TO GAIN 3.FINANCE BENEFITS AND PROTOCOL UTILITY.
                </span>
              </div>
            </div>
          </div>
        }
        {walletConnected === "Disconnected" &&
          <>
            <div className='Field-APR-Left Field-Deposits hidden md:block'>
              <>T.V.L</>
            </div>
            <div
              className={
                classNames(
                  'Field-TVL-Right flex flex-col items-start md:items-end',
                  indicatorFlag === 0 ? 'px-[0px] xl:px-[10px] 2xl:px-[40px] 3xl:px-[50px]' : 'px-[0px] 2xl:px-[40px] 3xl:px-[50px]',
                  // (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : '',
                  (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
                  (indicatorFlag === 1 && pageSelected === "Emissions") ? 'Emissions-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
                  (indicatorFlag === 2 && pageSelected === "Deposits") ? 'Deposits-Indicator-Right after:right-[calc(-56px+8.4vw)] ' : '',
                  (indicatorFlag === 2 && pageSelected === "Emissions") ? 'Emissions-Indicator-Right after:right-[calc(-56px+8.4vw)] ' : '',
                  navbarIndicatorFlag ? 'Indicator-Animation' : ''
                )
              }
            >
              <NumberField value={field.depositsTVL} digit={2} />
            </div>
          </>
        }
        {pageSelected === "Emissions" && walletConnected === "Connected" &&
        <>
          <div className='min-w-[10px] md:min-w-[90px] Field-Emissions'>
            <div className='hidden md:block'>
              {field.name !== "CRV wallet" ?
              <p className='duration-300'>{walletConnected === "Disconnected" ? "APR" : "Deposit"}</p> :
              <p className='duration-300'>Allocated</p>
              }
            </div>
          </div>
          <span className='Field-APR-Hover hidden md:flex text-[#C3D6E2] text-[12px] leading-[15px]'>Max NFT boost:</span>
          <div
            className={
              classNames(
                'Field-TVL-Right flex flex-col items-start md:items-end',
                indicatorFlag === 0 ? 'px-[0px] xl:px-[10px] 2xl:px-[40px] 3xl:px-[50px]' : 'px-[0px] 2xl:px-[40px] 3xl:px-[50px]',
                indicatorFlag === 1 ? 'Emissions-Indicator-Left after:right-[calc(-48px+8.4vw)] xl:after:right-[-48px]' : '',
                indicatorFlag === 2 ? 'Emissions-Indicator-Right after:right-[calc(-56px+8.4vw)] xl:after:right-[-56px]' : '',
                navbarIndicatorFlag ? 'Indicator-Animation' : ''
              )
            }
          >
            <NumberField value={field.depositsTVL} digit={2} />
          </div>
        </>
        }
        <div className='Field-TVL-More min-w-[inherit] md:min-w-[70px] justify-end items-center'>
          <h6 className='hidden md:block text-[14px]'>More</h6>
          <img src={ArrowRight} alt='' />
        </div>
      </Grid>
    </Grid>
  )
}