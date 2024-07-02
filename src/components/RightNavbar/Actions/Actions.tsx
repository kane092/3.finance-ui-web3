import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../../store/store';
import {
  updateDepositData,
  updateRightNavbarAssetSelected,
  updateRightNavbarCurValue,
  updateRightNavbarMaxValue
} from '../../../store/actions/navbarAction';

import { getFieldLP, getCRVWalletStatus } from '../../../utils/utils';

import Mint from './Mint';
import Burn from './Burn';
import NFTs from './NFTs';
import Zap from './Zap';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Merge from './Merge';
import BurnNFT from './BurnNFT';
import Harvest from './Harvest';
import Claim from './Claim';
import Distribute from './Distribute';
import Manage from './Manage';
import ClaimNFT from './ClaimNFT';
import SubTabs from '../SubTabs/SubTabs';
import ActionSummary from '../ActionSummary';
import InputWithPercentage from '../../InputWithPercentage_';
import ActionsButton from '../ActionButton';
import InputBox from '../../InputBox';
// import DepositActionButton from '../DepositActionButton';
// import DepositActionSummary from '../DepositActionSummary';

//Todo: create useGetBalance hook, re-define function to getMax and MaxPercentageValue

export default function Actions() {

  const [isEmptyWallet, setIsEmptyWallet] = useState<boolean>(false)
  // const [validationText, setValidationText] = useState<string>("")
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);
  const convexTVL = getFieldLP(fieldData, 2);
  const bentTVL = getFieldLP(fieldData, 3);
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const rightNavbarNFTSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const depositValue = useSelector((state: RootState) => state.navbar.rightNavbarDepositValue);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const depositData = useSelector((state: RootState) => state.navbar.depositData);
  const [loading,setLoading] = useState<boolean>(false)
  const summaryRef = useRef<any>(null)

  useEffect(()=>{
    // Todo:scroll sub tabs to bottom
    if(subTabSelected === 'Deposit' && depositData.assets.length > 0){
      summaryRef.current?.scrollIntoView({ behavior: "smooth" })

    }
    if(subTabSelected === 'Withdraw' && assetSelected !== 'None'){
      summaryRef.current?.scrollIntoView({ behavior: "smooth" })

    }
  },[depositData,assetSelected])

  useEffect(()=>{
    // Todo:scroll sub tabs to bottom
    if(subTabSelected !== 'Deposit' && subTabSelected !== 'Withdraw'){
      summaryRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  },[subTabSelected])

  const getMaxValue = (): number => {
    // Todo: need to remove dependency of this function from every where
    // max value should be updated withing each componant saprately
    //it is maximum limit of input box

    // if (subTabSelected === "Mint") {
    //   // dispatch(updateRightNavbarMaxValue(Math.min(convexTVL, bentTVL)))
    //   // return Math.min(convexTVL, bentTVL);
    // } else if (subTabSelected === "Burn") {
    //   // dispatch(updateRightNavbarMaxValue(fiTVL))
    //   return fiTVL;
    // }
    //  if (subTabSelected === "NFTs") {
    //   dispatch(updateRightNavbarMaxValue(Math.floor(Math.min(fiTVL / rightNavbarNFTSelected.requirementA, curveTVL / rightNavbarNFTSelected.requirementB))))
    //   return Math.floor(Math.min(fiTVL / rightNavbarNFTSelected.requirementA, curveTVL / rightNavbarNFTSelected.requirementB));
    // } 
    // else if (subTabSelected === "Zap") {
    //   dispatch(updateRightNavbarMaxValue(101.12))
    //   return 101.12;
    // } 
    // // else if (subTabSelected === 'Withdraw') {
    // //   dispatch(updateRightNavbarMaxValue(fieldSelected.depositsLP))
    // //   dispatch(updateRightNavbarMaxValue(99999999999999999))
    // //   return fieldSelected.depositsLP;
    // // } 
    // else if (subTabSelected === 'Distribute') {
    //   dispatch(updateRightNavbarMaxValue(fieldSelected.emissionsBalance))
    //   return fieldSelected.emissionsBalance;
    // } else if (subTabSelected === 'Manage') {
    //   dispatch(updateRightNavbarMaxValue(fieldSelected.emissionsBalance))
    //   return fieldSelected.emissionsBalance;
    // } else if (subTabSelected === 'ClaimNFT') {
    //   dispatch(updateRightNavbarMaxValue(fieldSelected.emissionsBalance))
    //   return fieldSelected.emissionsBalance;
    // } else if (subTabSelected === 'Deposit') {
    //   /**
    //    * Get maxValue from rightNavbarDepositValue first
    //    * If result equals 0, get maxValue again from depositsDepositAsset and depositsReRouteAsset of fieldSelected
    //    */
    //   let res = Math.min.apply(null, depositValue.filter(Boolean));
    //   if (res === 0 && fieldSelected.depositsDepositAsset) {
    //     res = Math.max.apply(null, [...fieldSelected.depositsDepositAsset, fieldSelected.depositsReRouteAsset]);
    //   }
    //   // dispatch(updateRightNavbarMaxValue(res))
    //   dispatch(updateRightNavbarMaxValue(res))
    //   return res;
    // } 
    // else if (subTabSelected === 'Merge') {
    //   dispatch(updateRightNavbarMaxValue(Math.floor(fieldSelected.depositsLP / (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA))));
    //   return Math.floor(fieldSelected.depositsLP / (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA));
    // }
    //  else if (subTabSelected === 'BurnNFT') {
    //   dispatch(updateRightNavbarMaxValue(fieldSelected.depositsLP));
    //   return fieldSelected.depositsLP;
    // }
    return 0;
  }
  // const maxValue: number = getMaxValue();
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);

  const getInputWithPercentageShow = () => {
    //Todo:
    if (walletConnected === 'Connected') {
      if (subTabSelected === 'Distribute') return false;
      if (subTabSelected === 'Manage' || subTabSelected === 'ClaimNFT') {
        if (getCRVWalletStatus(fieldData)) return true;
        else return false;
      }
      if (subTabSelected !== 'Deposit' && maxValue > 0)
        return true;
      if (subTabSelected === 'Deposit' && maxValue > 0 && depositValue.filter(Boolean).length < 2)
        return true;
      if (subTabSelected === "NFTs" && fiTVL && curveTVL)
        return true;
      if ((subTabSelected === "Merge" || subTabSelected === "BurnNFT") && fieldSelected.fieldLP)
        return true;
    }
    return false;
  }
  const [inputWithPercentageShow, setInputWithPercentageShow] = useState(false);

  const getValidationText = () => {
    if (subTabSelected === "NFTs") {
      if (maxValue > 0) return "You have exceeded your mint limit."
      else return "You do not have enough assets."
    }
    else if (subTabSelected === "Burn" || subTabSelected === "BurnNFT") return "You have exceeded your burn limit."
    // else if (subTabSelected === "BurnNFT") return "You have exceeded your burn limit."
    else if (subTabSelected === "Zap") return "You have exceeded your balance."
    else if (subTabSelected === "Withdraw") return "You have exceeded your availability limit."
    else if (subTabSelected === "Manage") return "You have over allocated to this Money App."
    else if (subTabSelected === "ClaimNFT") return "You have exceeded your availability balance."
    else return "You have exceeded your mint limit."
  }

  useEffect(() => {
    setInputWithPercentageShow(getInputWithPercentageShow());
  }, [maxValue, [...depositValue]])

  const getActionsButtonShow = () => {
    // Todo:
    if (walletConnected === 'Connected') {
      if (tabSelected === "Actions" && (subTabSelected === 'Distribute' || subTabSelected === 'Manage' || subTabSelected === 'ClaimNFT')) {
        if (getCRVWalletStatus(fieldData)) return true;
        else return false;
      }
      if (tabSelected === "Actions" && subTabSelected === 'Deposit' && isEmptyWallet) return false
      if (tabSelected === "Actions" && (maxValue || (subTabSelected === "NFTs" && fiTVL && curveTVL)))
        return true;
      if (tabSelected === "Actions" && (subTabSelected === "Merge" || subTabSelected === "BurnNFT"))
        return true;
      if (subTabSelected === 'Harvest' || subTabSelected === 'Claim' || subTabSelected === 'Burn')
        return true;
    }
    return false;
  }
  const actionsButtonShow: boolean = getActionsButtonShow();

  useEffect(() => {
    //Todo:
    // if (subTabSelected !== 'Harvest') {
    //   dispatch(updateRightNavbarCurValue(1));
    //   dispatch(updateRightNavbarMaxValue(1));
    // }
    if (subTabSelected !== "Distribute") dispatch(updateRightNavbarAssetSelected("None"));
  }, [subTabSelected, fieldSelected]);

  const inputPlaceHolder = subTabSelected === 'NFTs' ? 'Mint' : subTabSelected;
  const selectedAssetName = subTabSelected === 'NFTs' ? nftSelected.name : fieldSelected.name;

  return (
    <>
      <div
        className={classNames(
          'RightNavbar-Content mr-[10px] md:mr-[30px] ml-[40px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]',
          // actionsButtonShow ? 'h-[calc(100%-143px)] 2xl:h-[calc(100%-188px)]' : 'h-[calc(100%-43px)]',
          actionsButtonShow ? 'h-[100%] scroll-pb' : 'h-[calc(100%-43px)]',
        )}
      >
        <div className='RightNavbar-Content-Left'>
          {/* <p>&nbsp;{pageSelected === "Emissions" ? fieldSelected.fieldFullName || fieldSelected.emissionsFullName : fieldSelected.fieldFullName || fieldSelected.depositsFullName}</p> */}
          <p>&nbsp;{pageSelected === "Emissions" ? fieldSelected.fieldFullName || fieldSelected.emissionsFullName : fieldSelected.fieldFullName || fieldSelected.depositsFullName}</p>
          <p>Actions</p>
          <p>What would you like to do?</p>

          <SubTabs />

          {subTabSelected === "Mint" && <Mint />}
          {subTabSelected === "Burn" && <Burn />}
          {subTabSelected === "NFTs" && <NFTs />}
          {subTabSelected === "Zap" && <Zap />}
          {subTabSelected === "Deposit" && <Deposit setIsEmptyWallet={setIsEmptyWallet} />}
          {subTabSelected === "Withdraw" && <Withdraw setInputWithPercentageShow={setInputWithPercentageShow} />}
          {subTabSelected === "Merge" && <Merge />}
          {subTabSelected === "BurnNFT" && <BurnNFT />}
          {subTabSelected === "Harvest" && <Harvest />}
          {subTabSelected === "Claim" && <Claim />}
          {subTabSelected === "Distribute" && <Distribute />}
          {subTabSelected === "Manage" && <Manage />}
          {subTabSelected === "ClaimNFT" && <ClaimNFT />}

          {
          inputWithPercentageShow && subTabSelected !== "Deposit" &&
            // <InputWithPercentage
            //   validationText={getValidationText()} 
            //   adornmentText={
            //     assetSelected === "None" && fieldSelected.type !== '3FiCollateral' ? "No asset selected" :
            //     fieldSelected.type === '3FiCollateral' ? selectedAssetName + ' to ' + inputPlaceHolder :
            //     assetSelected
            //   }
            // />

            // <InputBox 
            //   adornmentText={
            //     assetSelected === "None" && fieldSelected.type !== '3FiCollateral' ? "No asset selected" :
            //     fieldSelected.type === '3FiCollateral' ? selectedAssetName + ' to ' + inputPlaceHolder :
            //     assetSelected
            //   }
            //   validationText={getValidationText()} 
            // />
            <></>
          }
          
          <span ref={summaryRef}>
          {
          (walletConnected === "Connected" || subTabSelected === "Merge" || subTabSelected === 'BurnNFT') && subTabSelected !== "Deposit" && fieldSelected.name !== "" &&
              <ActionSummary 
                subTab={subTabSelected} 
                actionsButtonShow={actionsButtonShow} 
              />
            }

          {
            (walletConnected === "Connected" && subTabSelected === 'NFTs') && 
            <ActionSummary 
            subTab={subTabSelected} 
            actionsButtonShow={actionsButtonShow} 
            />
          }
          </span>
        </div>
        {/* {walletConnected === "Disconnected" &&
          <div className='RightNavbar-Content-Right'>
            <div className='RightNavbar-Line h-full 2xl:h-[580px]'></div>
            <div className='RightNavbar-Circle'></div>
          </div>} */}
      </div>
      {actionsButtonShow && <ActionsButton />}
    </>
  )
}