import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../store/store';
import { updateRightNavbarShow, updateRightNavbarTabSelected, updateRightNavbarSubTabSelected } from '../store/actions/navbarAction';

import Token6 from '../assets/images/token6.png'
import ArrowRight from '../assets/images/arrow-right.png';
// import InformationIcon from '../assets/images/information-icon.png';
import '../assets/scss/MoneyApps.scss';
import classNames from 'classnames';
import LightToolTip from '../components/LightToolTip';

const moneyAppsContent = [
  "Services", "Strategies", "Utilities"
];

export default function MoneyApps() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const rightNavbarShow = useSelector((state: RootState) => state.navbar.rightNavbarShow);

  return (
    <div
      className={classNames(
        "MoneyApps bottom-animation",
        rightNavbarShow === "Opened" ? 'mx-[10px] md:mx-[30px]' : leftNavbarShow === "Opened" ? 'ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px]' : 'mx-[10px] md:mx-[70px]'
      )}
    >
      <div className='flex justify-between'>
        <h1>Money Apps</h1>
        {walletConnected === "Connected" &&
        <p
          className='flex items-center text-[#00FFF0] cursor-pointer'
          onClick={() => {
            dispatch(updateRightNavbarTabSelected("Settings"));
            dispatch(updateRightNavbarSubTabSelected("Help"));
            dispatch(updateRightNavbarShow("Opened"));
          }}
        >
          Settings
          <img src={ArrowRight} className='w-[14px] h-[12px] ml-[5px]' alt='' />
        </p>}
      </div>
      <Grid xs={12}><hr className='mb-[22px] mt-[6px]' /></Grid>
      {
      moneyAppsContent.map((content) => {
        return (
          <Grid container spacing={2} className='text-[#00FFF0]'>
            <Grid xs={12} className='text-white flex mb-[10px]'>
              {content}:<LightToolTip title=""></LightToolTip>
              {/* <img src={InformationIcon} className="w-[12px] h-[12px]" alt='' /> */}
              
            </Grid>
            <Grid
              container
              xs={12}
              spacing={2}
              className='flex items-center border-dashed border-[1px] border-[#63717A] rounded-[9px] p-0 mb-[20px]'
              sx={{margin: '0px 0px 30px 0px'}}
            >
              <Grid xs={6} md={3} className='text-[#63717A] flex items-center'>
                <img src={Token6} className='mr-[5px]' alt='' />
                Add services
              </Grid>
              <Grid xs={6} className='hidden md:block'>Applications coming soon. In the mean time, try our sneek speak:</Grid>
              <Grid xs={6} md={3}>
                <p className='flex items-center justify-end cursor-pointer'>
                  Prototype
                  <img src ={ArrowRight} className='ml-[5px] w-[14px] h-[12px]' alt='' />
                </p>
              </Grid>
            </Grid>
          </Grid>
        )
      })
      }
      
    </div>
  )
}