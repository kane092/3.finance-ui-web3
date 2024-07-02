import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../store/store';
import { updateFieldSelected } from '../store/actions/globalAction';
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected
} from '../store/actions/navbarAction';

import { FieldType } from '../types/types';

import ArrowRight from '../assets/images/arrow-right.png';
import QuestionIcon from '../assets/images/question-icon.png';
import '../assets/scss/Field.scss';

type props = {
  field: FieldType,
  hideNFTView? : boolean,
  setHideNFTView? : any
}

const emptyField: FieldType = {
  "name": "",
  "type": ""
}

export default function NFTCard({
  field,
  setHideNFTView
}: props) {
  const getIndicatorFlag = (isSelected: boolean) => {
    // show if RightNavbar opens
    // 0 for no indicator, 1 for left indicator, 2 for right indicator
    if (showRightNavbar !== "Opened") return 0;
    
    if (isSelected) return 1;

    return 0;
  }

  const dispatch: Dispatch<any> = useDispatch();
  const [needDelay, setNeedDelay] = useState(false);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  // const isSelected = (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName);
  const isSelected = (field.name === fieldSelected.name && field.type === fieldSelected.type);
  const indicatorFlag = getIndicatorFlag(isSelected);
  const navbarIndicatorFlag = useSelector((state: RootState) => state.navbar.rightNavbarIndicatorFlag);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);

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
        'Field Field-Special bg-[#2A2E3B]/[0.2] border-[#63717A] border-[1px] border-dashed rounded-[9px]',
        isSelected ? 'Field-Special-Selected' : '',
        (walletConnected === 'Disconnected' && pageSelected === "Deposits") ? 'Field-Hidden' : '',
      )}
      onClick={() => {
        // if (showRightNavbar === "Minimized") {
        //   setNeedDelay(true)
        // } else {
        //   setNeedDelay(false)
        // }

        if (pageSelected === "Emissions") {
          if (isSelected !== true) {
            dispatch(updateRightNavbarShow("Opened"));
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateFieldSelected(field));
  
            switch(field.emissionsFullName) {
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
        
        if (pageSelected === "Deposits") {
          if (isSelected === true) {
            dispatch(updateRightNavbarShow("Opened"));
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateRightNavbarSubTabSelected("Merge"));
            dispatch(updateFieldSelected(field));
            setHideNFTView(false)
          } else {
            dispatch(updateRightNavbarShow("Minimized"));
            dispatch(updateFieldSelected(emptyField));
          }
        }
      }}
    >
      <Grid xs={8} md={3} className='Field-Image-Label' sx={{padding: '0px 8px'}}>
        <div className='flex items-center text-[#63717A]'>
          {pageSelected === 'Deposits' &&
          <>
            <img alt='' src={nftSelected.fieldSymbol} className='mr-[10px] w-[50px] h-[50px]' style={{borderRadius:"50%"}} />
            {nftSelected.name}
          </>}
          {pageSelected === 'Emissions' &&
          <>
            <div className='mr-[10px] w-[40px] h-[40px] rounded-full p-[3px]'>
            <img alt='' src={field.emissionsSymbol} />
            <img alt='' src={field.emissionsSymbolBase} className='w-[19px] h-[19px]'
              style={{position:'relative',bottom:'10px',left:'20px'}}
             />
            </div>
            {field.name}
          </>}
        </div>
      </Grid>
      <Grid
        xs={4}
        md={9}
        className={'Field-TVL flex justify-end'}
        sx={{padding: '0px 8px'}}
      >
        {/* <span
          className={
            classNames('Field-TVL-Right Field-TVL-Right-NFT-Card w-full flex',
            pageSelected === "Deposits" ?
            'Deposits-Indicator-Left NFT-Indicator-Left justify-end after:right-[calc(-55px+8.33vw)] ' :
            (indicatorFlag === 1 ?
              'Deposits-Indicator-Left Wallet-Indicator-Left justify-start after:right-[calc(-55px+8.33vw)] ' :
              'justify-start'
            ),
            navbarIndicatorFlag ? 'Indicator-Animation' : '',
            needDelay && isSelected ? 'delayed-indicator' : ''
            )
          }
        >
          {!isSelected &&
          <div
            className={pageSelected === "Deposits" ?
              'mr-[50px] hidden md:flex justify-end items-center text-left bg-[#D9D9D9]/[0.1] px-[15px] py-[12px] rounded-[20px] w-max' :
              'ml-[50px] hidden md:flex items-center text-left bg-[#D9D9D9]/[0.1] px-[15px] py-[12px] rounded-[20px] w-max'
            }
          >
            <img src={QuestionIcon} className="w-[13px] h-[13px] mr-[8px]" alt='' />
            {pageSelected === "Deposits" &&
            <span className='text-left text-[10px] leading-[10px] uppercase'>NFT card will load once<br />mint process is complete.</span>}
            {pageSelected === "Emissions" &&
            <span className='text-left text-[8px] leading-[10px] uppercase tracking-widest'>Only available when 3Fi NFTs have <br/> been composed or purchased</span>}
          </div>}
        </span> */}
        
        <div className='Field-TVL-More min-w-[85px] justify-end'>
          {/* More */}
          <h6 className='hidden md:block text-[14px] text-[#00FFFF] leading-[21px] h-[20px]'>More</h6>
          <img src={ArrowRight} alt='' />
        </div>
      </Grid>
    </Grid>
  )
}