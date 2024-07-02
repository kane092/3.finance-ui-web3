import { useEffect, useState, PropsWithChildren } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import classNames from 'classnames';

import type { NFTData, RowDataType } from '../../types/types';
// import NumberField from '../NumberField';

import { RootState } from '../../store/store';
import { updateFieldSelected } from '../../store/actions/globalAction';
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected,
  updateRightNavbarNFTSelected,
  updateRightNavbarIndicatorFlag,
  updateRightNavbarAssetSelected
} from '../../store/actions/navbarAction';

// import nftsJsonData from '../../assets/data/nfts.json';
import FieldSelectedIcon from '../../assets/images/field-selected-icon.png';
import '../../assets/scss/TableRow.scss';
import { getCRVWalletStatus } from '../../utils/utils';

// let nftsData = nftsJsonData as NFTData[];

const emptyField: RowDataType = {
  "id":-1,
  "name": "",
  "type": ""
}

interface props extends PropsWithChildren {
  rowData?: RowDataType | any
  firstField?: boolean
  key?: any
  rowIndex:number
  onRowClicked?: any
}

export default function CustomTableRow({
  children,
  rowData,
  firstField,
  rowIndex,
  onRowClicked
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const [needDelay, setNeedDelay] = useState(false);
  const navbarIndicatorFlag = useSelector((state: RootState) => state.navbar.rightNavbarIndicatorFlag);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const isSelected = (rowData.name === fieldSelected.name && rowData.type === fieldSelected.type);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  // const isNFT = (rowData.depositsFullName && rowData.depositsFullName.includes("3Fi NFTs"));
  const isNFT = rowData.isNFT;

  const getIndicatorFlag = (isSelected: boolean) => {
    // show if RightNavbar opens
    // 0 for no indicator, 1 for left indicator, 2 for right indicator
    const NONE = 0
    const LEFT = 1
    const RIGHT = 2
    // if (showRightNavbar !== "Opened") return NONE;

    // if ((walletConnected !== "Connected" || tabSelected === "Details")) {
    //   if (isSelected) return LEFT;
    //   else return NONE;
    // }
    // if (subTabSelected === "Mint") {
    //   if (isSelected) return 1;
    //   else if (rowData.symbol === "bent.Convex" || rowData.symbol === "BENT") return 2;
    // } else if (subTabSelected === "Burn") {
    //   if (isSelected) return 2;
    //   else if (rowData.symbol === "bent.Convex" || rowData.symbol === "BENT") return 1;
    // } else if (subTabSelected === "NFTs") {
    //   if (isSelected || rowData.symbol === "CRV") return 2;
    // } else if (subTabSelected === "BurnNFT") {
    //   if (isSelected) return 2;
    //   else if (rowData.symbol === "3FiToken" || rowData.symbol === "CRV") return 1;
    // } else if (subTabSelected === "Withdraw") {
    //   if (isSelected) {
    //     if (fieldSelected.depositsLP > 0) return 2;
    //     else return 1;
    //   } else {
    //     return 0;
    //   }
    // } else if (subTabSelected === "Merge") {
    //   if (isSelected) {
    //     if (maxValue > 0) return 2;
    //     else return 1;
    //   }
    // } else if (subTabSelected === "Harvest") {
    //   if (isSelected) {
    //     if (maxValue > 0) return 2;
    //     else return 1;
    //   } else {
    //     if (rowData.symbol === "CRVWallet" && fieldSelected.signalSelected === "CRV wallet") return 1;
    //     else return 0;
    //   }
    // } else if (subTabSelected === "Distribute") {
    //   if (isSelected) {
    //     if (maxValue > 0) return 2;
    //     else return 1;
    //   } else {
    //     if (rowData.symbol === "CRV" && assetSelected === "CRV" && getCRVWalletStatus(fieldData) && maxValue > 0) return 1;
    //     else return 0;
    //   }
    // } else if (subTabSelected === "Manage" || subTabSelected === "ClaimNFT") {
    //   if (isSelected) {
    //     if (maxValue > 0) return 2;
    //     else return 1;
    //   }
    // } else {
    //   if (isSelected) return 1;
    // }



    // /**
    //  * Show the indicator for NFT field that has value and selected in the RightNavbar
    //  */
    // if (isNFT && rowData.name === nftSelected.name) {
    //   if (subTabSelected === "NFTs" && maxValue) return 1;
    //   else if (subTabSelected === 'Merge') return 1;
    // }

    return LEFT;
  }
  
  const indicatorFlag = getIndicatorFlag(isSelected);

  const handleRowClick=(data:any) => {
    // if (showRightNavbar === "Minimized") {
    //   dispatch(updateRightNavbarIndicatorFlag(true));
    // } else {
    //   dispatch(updateRightNavbarIndicatorFlag(false));
    // }

    
    dispatch(updateFieldSelected(data));
    dispatch(updateRightNavbarShow("Opened"));
    onRowClicked(data)
  }


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
      id={rowData.symbol}
      className={classNames(
        'Field',
        isSelected ? 'Field-Selected' : '',
        indicatorFlag ? 'Field-Indicator' : '',
        isNFT ? 'Field-NFT' : '',
        firstField ? 'Field-First' : '',
        // (isNFT) ? 'Field-Hidden' : '',
        // walletConnected === 'Connected' ? 'Field-Connected' : '',
        (indicatorFlag === 1 && pageSelected === "Deposits") ? 'Deposits-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
        (indicatorFlag === 1 && pageSelected === "Emissions") ? 'Emissions-Indicator-Left after:right-[calc(-56px+8.4vw)] ' : '',
        (indicatorFlag === 2 && pageSelected === "Deposits" && tabSelected === "Actions") ? 'Deposits-Indicator-Right after:right-[calc(-64px+8.4vw)] ' : '',
        (indicatorFlag === 2 && pageSelected === "Emissions" && tabSelected === "Actions") ? 'Emissions-Indicator-Right after:right-[calc(-64px+8.4vw)] ' : '',
        navbarIndicatorFlag ? 'Indicator-Animation' : '',
        // needDelay ? 'delayed-indicator' : ''
      )}
      onClick={()=>{
        handleRowClick(rowData)
      }}
    >
        {children}
        
    </Grid>
  )
}