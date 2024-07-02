import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '../components/Tooltip';

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
  updateRightNavbarAssetSelected,
  updateDepositData
} from '../store/actions/navbarAction';

import nftsJsonData from '../assets/data/nfts.json';
import ArrowRight from '../assets/images/arrow-right.png';
import FieldSelectedIcon from '../assets/images/field-selected-icon.png';
import bentIcon from '../assets/images/bent.png';
import '../assets/scss/Field.scss';
import { getCRVWalletStatus } from '../utils/utils';
import useClaimAndHarvestHook from '../hooks/useClaimAndHarvestHook';

let nftsData = nftsJsonData as NFTData[];

const emptyField: FieldType = {
  "name": "",
  "type": ""
}

type props = {
  field: FieldType
  fieldFlag: number
  firstField: boolean
  disabled?: boolean
  hideNFTView? : boolean
  setHideNFTView? : any
  data? : any
}

export default function Field({
  field,
  fieldFlag,
  firstField,
  disabled,
  hideNFTView,
  setHideNFTView,
  data,
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const [needDelay, setNeedDelay] = useState(false);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  // const rightNavbarSubTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  // const rightNavbarBorderPosition = useSelector((state: RootState) => state.navbar.rightNavbarBorderPosition);
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

  // const [CVXClaim,setCVXClaim] = useState<any>(0)
  // const [bentCVXClaim,setBentCVXClaim] = useState<any>(0)

  // const {
  //   pendingRewardBentCDP,
  //   pendingRewardConvexCDP
  // } = useClaimAndHarvestHook()

  // useEffect(()=>{
  //   if(walletConnected === 'Connected'){
  //     if(pageSelected === 'Emissions'){
  //       // if(fieldSelected.name === 'bentCVX'){
  //         pendingRewardBentCDP().then((reward:any)=>{
  //           setBentCVXClaim(reward)
  
  //         })
  //       // }
  
  //       // if(fieldSelected.name === 'CVX'){
  //         pendingRewardConvexCDP().then((reward:any)=>{
  //           setCVXClaim(reward)
  
  //         })
  //       // }
  //     }
  //     // if(pageSelected === 'Deposits'){
  //     //  window.alert("hello")
  //     // }
  //   }
  // },[walletConnected,pageSelected]) //Todo: controle multiple rendering

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
      else if (field.name === "bent.Convex" || field.name === "Bent") return 2;
    } else if (subTabSelected === "Burn") {
      if (isSelected) return 2;
      else if (field.name === "bent.Convex" || field.name === "Bent") return 1;
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

  // useEffect(() => {
  //   // assigning x-axis position of left border of right sidebar to following classes to align row indicating arrow when row is selected

  //   // .Deposits-Indicator-Left::after,
  //   // .Emissions-Indicator-Left::after,
  //   // .Deposits-Indicator-Right::after,
  //   // .Emissions-Indicator-Right::after,

  //   // console.log(rightNavbarBorderPosition)

  //   let dil = document.querySelectorAll('.Deposits-Indicator-Left') as NodeListOf<HTMLElement>
  //   dil.forEach((el)=>{
  //     // el.style.left = rightNavbarBorderPosition.left
  //     // el.style.display = 'none'
  //   })
    
  //   let dir = document.querySelectorAll('.Deposits-Indicator-Right') as NodeListOf<HTMLElement>
  //   dir.forEach((el)=>{
  //     // el.style.left = rightNavbarBorderPosition.left
  //     // el.style.display = 'none'
  //   })

  //   let eil = document.querySelectorAll('.Emissions-Indicator-Left') as NodeListOf<HTMLElement>
  //   eil.forEach((el)=>{
  //     // el.style.left = rightNavbarBorderPosition.left
  //     // el.style.display = 'none'
  //   })

  //   let eir = document.querySelectorAll('.Emissions-Indicator-Right') as NodeListOf<HTMLElement>
  //   eir.forEach((el)=>{
  //     // el.style.left = rightNavbarBorderPosition.left
  //     // el.style.display = 'none'
  //   })

  // }, [rightNavbarBorderPosition]);

  return (
    <Tooltip 
      title={
          disabled ? "coming soon" : ""
      } 
      placement="top"
    >

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
        (isNFT && hideNFTView) ? 'Field-Hidden' : '', 
        (isNFT && walletConnected === 'Disconnected') ? 'Field-Hidden' : '',
        walletConnected === 'Connected' ? 'Field-Connected' : '',
        disabled ? "disabled-row grayscale" : "enabled-row"
      )}
      onClick={() => {
        if(disabled){return}
        else{
        if (showRightNavbar === "Minimized") {
          // console.log(field.symbol + "-indicator")
          // let element = document.getElementById(field.symbol + "-indicator");
          // if (element) element.className += " delayed-indicator";
          dispatch(updateRightNavbarIndicatorFlag(true));
        } else {
          dispatch(updateRightNavbarIndicatorFlag(false));
        }

        if (pageSelected === "Deposits") {
          //............right navbar tab selection based on selected row..............
          if (!isSelected) {
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
            if (field.depositsFullName === '3Fi Collateral - Bent base') {
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
              //   "requirementB": 0,
              //    "type":"NFT"
              // };
              let tmpNFTData2: NFTData = {
                "name": "",
                "symbol": "",
                "fieldSymbol": "",
                "requirementA": 0,
                "requirementB": 0,
                "type": "NFT"
              };
              nftsData.forEach((nft) => {
                //SELECT NFT
                if (nft.name === field.name) {
                  // tmpNFTData1 = nft;
                  dispatch(updateRightNavbarNFTSelected(nft));
                }
                //  else if (nft.name !== field.name && tmpNFTData2.name === "") {
                //   tmpNFTData2 = nft;
                // }
              })
              // dispatch(updateRightNavbarNFTSelected(tmpNFTData2));
              // dispatch(updateDepositNFTSelected(tmpNFTData1));
            } else {
              // Select Other Item
              dispatch(updateRightNavbarSubTabSelected("Deposit"));
            }
          } else {
            dispatch(updateRightNavbarShow("Minimized"));
            dispatch(updateFieldSelected(emptyField));
            dispatch(updateRightNavbarAssetSelected('None'))
          }
        } else if (pageSelected === "Emissions") {
          //Todo:
          if (!isSelected === true) {
            dispatch(updateRightNavbarShow("Opened"));
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateFieldSelected(field));
            if(field.depositsFullName==='3Fi Collateral - DAI wallet'){
                dispatch(updateRightNavbarSubTabSelected("Distribute"));
            }
            if(field.name==='CVX'){
                dispatch(updateRightNavbarSubTabSelected("Claim"));
            }else{
              dispatch(updateRightNavbarSubTabSelected("Harvest"))
            }
          } else {
            dispatch(updateRightNavbarShow("Minimized"));
            dispatch(updateFieldSelected(emptyField));
            dispatch(updateRightNavbarAssetSelected('None'))
          }
        }
        }
      }
    }
    >
      <Grid xs={4} md={3} className='flex items-center justify-between py-[0px!important]'>
        <div className='flex items-center'>
          <img
            alt=''
            src={field.type === "NFT" ? field.symbol : fieldFlag === 1 ? field.depositsSymbol : field.emissionsSymbol }
            className='w-[40px] md:w-[46px] h-[40px] md:h-[46px] mr-[10px]'
            style={{
              borderRadius:isNFT?"50%":"0"
            }}
          />
          {
            field.emissionsSymbolBase && <img alt='' src={field.emissionsSymbolBase} className='w-[19px] h-[19px]'
            style={{position:'relative',top:'10px',right:'25px'}}
           />
          }
          {
            field.depositsSymbolBase && <img alt='' src={field.depositsSymbolBase} className='w-[19px] h-[19px]'
            style={{position:'relative',top:'10px',right:'25px'}}
           />
          }
          <span
          style={{
            position:"relative",
            left:(field.depositsSymbolBase||field.emissionsSymbolBase)?'-18px':'0'
          }}
          >
          {field.name}
          </span>
          {field.type === "NFT" &&
          //here is second image of token
            <img
              alt=''
              src={bentIcon}
              className='second-img h-[20px] w-[20px]'
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
        {isNFT && <p>&times;{field.depositsLP}</p>}
      </Grid>
      <Grid xs={4} md={4} className='Field-APR justify-start md:justify-between xl:justify-between'>
        <div className='Field-APR-Left hidden md:block'>
          <p className='text-transition'>
            {pageSelected === "Deposits" && <>APR %</>}
            {pageSelected === "Emissions" && field.name !== "CRV wallet" &&
              <>
                {walletConnected === "Disconnected" ? "T.C.E" :
                  field.emissionLastSignalSymbol ? <img src={field.emissionLastSignalSymbol} className='w-[17px] h-[17px]' alt='' /> : "Claimable"}
              </>}
            {pageSelected === "Emissions" && field.name === "CRV wallet" &&
              <>Balance</>}
          </p>
          <span className='Field-APR-Hover flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>
            {pageSelected === "Deposits" ? "Emissions:" : "DAI value:"}
          </span>
        </div>
        <div className='mr-[0px] md:mr-[10px] 2xl:mr-[40px] 3xl:mr-[50px] flex flex-col items-end'>
          {
          pageSelected === "Deposits" && 
          <span className='text-transition'>
            {
              //APR data
              //Note: hard coading APRs for now.dynamic values are commentid
              field.type === 'CompoundDepositField' ? 
                field.name === 'Bent' ? <NumberField value={30} digit={2} /> :
                field.name === 'bent.Convex' ? <NumberField value={30} digit={2} /> :
                // field.name === 'Bent' ? <NumberField value={data.APRs.bentCDPAPR} digit={2} /> :
                // field.name === 'bent.Convex' ? <NumberField value={data.APRs.bentConvexCDPAPR} digit={2} /> :
                "N/A"
              :
              
              field.type === '3FiCollateral' ? 
                field.name === '3Fi' ? <NumberField value={30} digit={2} />:
                // field.name === '3Fi' ? <NumberField value={data.APRs.bent3FiAPR} digit={2} />:
                "N/A"
              :
              "N/A"
            }
          </span>
          }
          {pageSelected === "Emissions" &&
            <span className='text-transition'>
              {/* <NumberField value={
                walletConnected === "Connected" ?
               field.symbol === "CRVWallet" ? field.emissionsBalance:
                // field.emissionsCollected
                //display data from web3 - Todo:
                field.name === 'CVX' ? data?.CVXClaim :
                field.name === 'bentCVX' ? data?.bentCVXClaim : 0  :
                field.emissionsTCE
                } digit={2} /> */}
                {
                  walletConnected === "Connected" ?
                  (
                    field.symbol === "CRVWallet" ? field.emissionsBalance:
                   // field.emissionsCollected
                   //display data from web3 - Todo:
                   field.name === 'CVX' ? data?.CVXClaim :
                   field.name === 'bentCVX' ? data?.bentCVXClaim :0
                   
                  )
                  :field.emissionsTCE
                }
              </span>}
          {pageSelected === "Deposits" ?
            <div className='Field-APR-Hover hidden md:flex text-transition'>
              {
                /**
                 * Show 8 dots for normal cards
                 * Show 4 dots for NFT cards
                 */
                // [...Array(!isNFT ? 8 : 4)].map((key, index) => {
                field.emissionOptions? field.emissionOptions.map((key:any, index:number) => {
                  return (
                    <img key={`card-${index}`} src={key} alt='' width={'15px'} height={'15px'} 
                      className={
                        classNames(
                          'ml-[2px]',
                          field.name === 'Bent' ? 'img-gray' : ''
                        )
                      }
                    />
                    )
                  }) : [...Array(!isNFT ? 8 : 4)].map((key, index)=> {
                    return(
                      <img key={`card-${index}`} src={FieldSelectedIcon} className='ml-[2px]' alt='' />
                  )
                })
              }
            </div> :
            <span className='Field-APR-Hover hidden md:flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>
              {/* <NumberField value={walletConnected === "Connected" ? field.symbol === "CRVWallet" ? field.emissionsBalance : field.emissionsCollected : field.emissionsTCE} digit={2} /> */}
              {
                // Todo: web3 - data
                walletConnected === "Connected" ? 
                  field.symbol === "CRVWallet" ? 
                    field.emissionsBalance :
                    field.name === 'CVX' ? data?.CVXClaim :
                    field.name === 'bentCVX' ? data?.bentCVXClaim :0
                  :field.emissionsTCE
              }
            </span>}
        </div>
      </Grid>
      <Grid xs={4} md={5} className={`${pageSelected === "Deposits" ? '' : 'multi-line'} Field-TVL justify-start md:justify-end xl:justify-between`}>
        <div id={field.symbol + "-indicator"} className=
          {classNames(
            "Field-APR-Left hidden md:block indicator",
            (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : '',
            (indicatorFlag === 1 && pageSelected === "Emissions") ? 'Emissions-Indicator-Left after:right-[calc(-56px+8.4vw)] 2xl:after:right-[-56px]' : '',
            // (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
            // (indicatorFlag === 1 && pageSelected === "Emissions") ? 'Emissions-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
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
                field.isNFT ? "V.P" : "L.B"
              ) : (
                field.isNFT ? "V.P" : field.type === "3FiCollateral" ? "O.T.B" : "T.V.L"
              )
            )}
            
            {pageSelected === "Emissions" && (
              field.name === "CRV wallet" ? "Allocated" : (
                walletConnected === "Disconnected" ? "Signal Opt" : "Set Signal"
              )
            )}
          </p>
          {
          // hiding roll-over secondary text
          // pageSelected === "Emissions" && 
          // <span className='Field-APR-Hover flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>
          //   {field.name === "CRV wallet" ? "Unallocated" : "Max NFT boost:"}
          // </span>
          }
        </div>
        <div className='Field-TVL-Right flex flex-col items-start md:items-end px-[0px] xl:px-[10px] 2xl:px-[40px] 3xl:px-[50px]'>
          {/* {pageSelected === "Emissions" && <span className='text-transition'><NumberField value={field.symbol === "CRVWallet" ? 0 : field.emissionsAPR} digit={2} />&nbsp;%</span>} */}
          {/* {pageSelected === "Emissions" && <span className='text-transition'>{walletConnected==='Connected'?'Unset':`${field.emissionsAPR} $`}&nbsp;</span>} */}
          
          {pageSelected === "Emissions" && 
            <div className='text-transition'>{walletConnected==='Connected'?<p className='text-transition'>Unset</p>:
            <>
              <p className='text-transition mr-[10px] 2xl:mr-[10px] 3xl:mr-[10px] flex flex-row items-end'>
              {
                field?.compoundOptions?.map((option,index)=>{
                  return (
                    <img
                      alt=''
                      src={option}
                      className='w-[15px] h-[15px] mx-[1px]'
                    />
                  )
                })
              }
              </p>
            </>}
          </div>}

          {
          pageSelected === "Deposits" &&
            <span className='text-transition'>{
              walletConnected === "Connected" ? 
              //L.B data
              field.type === 'CompoundDepositField'? 
                field.name === 'bent.Convex' ? <NumberField value={Number(data.LBs.bentCVXBalance)} digit={2} /> :
                field.name === 'Bent' ? <NumberField value={data.LBs.bentBalance} digit={2} /> :
                "N/A" 
                : 
              field.type === '3FiCollateral'? 
                field.name === '3Fi' ? <NumberField value={Number(data.bent3FiBalance)} digit={2} /> : //3FI - Balance
                "N/A"
              :
              <NumberField value={field.depositsLP} digit={2} /> 
              :
              
                field.type === 'CompoundDepositField'? 
                  //T.V.L data
                  field.name === 'Bent' ? <NumberField value={data.TVLs.bentCDPTVL} digit={2} /> :
                  field.name === 'bent.Convex' ? <NumberField value={data.TVLs.bentConvexCDPTVL} digit={2} /> :
                  "N/A" 
                :
                <NumberField value={field.depositsTVL} digit={2} />
              
            }
            </span>
          }
          {
          // hiding roll-over secondary text
          // pageSelected === "Emissions" &&
          // <span className='Field-APR-Hover hidden md:flex text-[#C3D6E2] text-[12px] leading-[15px] text-transition'>+ <NumberField value={field.symbol === "CRVWallet" ? 100 : 16.34} digit={2} /> %</span>
          }
        </div>

        <div className='flex min-w-[inherity] md:min-w-[70px] items-center justify-end'>
          <h6 className='hidden md:block text-[14px] text-[#00FFFF] leading-[21px] h-[20px]'>More</h6>
          <img className='w-[14px] h-[12px] ml-[6px]' src={ArrowRight} alt='' />
        </div>
      </Grid>
    </Grid>
    </Tooltip>

  )
}