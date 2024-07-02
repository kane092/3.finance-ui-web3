import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../../../store/store';
import { updateRightNavbarEmissionSelected } from '../../../store/actions/navbarAction';

import { EmissionListData } from '../../../types/types';

import Emission from './Emission';

import ContractAddress from '../../../assets/images/contract-address.png';

export default function Details() {
  const dispatch: Dispatch<any> = useDispatch();
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);

  useEffect(() => {
    if (fieldSelected.name !== '') dispatch(updateRightNavbarEmissionSelected(fieldSelected.emissionList[0]))
  }, [fieldSelected]);
  const emissionSelected = useSelector((state: RootState) => state.navbar.rightNavbarEmissionSelected);

  return (
    <div className='RightNavbar-Content RightNavbar-Content-Details mr-[30px] ml-[40px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]'>
      <div className='RightNavbar-Content-Left'>
        <p>&nbsp;{pageSelected === "Emissions" ? fieldSelected.fieldFullName || fieldSelected.emissionsFullName : fieldSelected.fieldFullName || fieldSelected.depositsFullName}</p>
        <p>Details</p>
        <p>What would you like to do?</p>
        <div className='RightNavbar-SubTabs RightNavbar-SubTabs-Overview relative'>
          <span
            className='cursor-pointer text-[18px] ml-[32px] xl:ml-[20px] 2xl:ml-[32px] text-white'
          >
            Overview
          </span>
        </div>
        <p className='RightNavbar-SubTab-Content'>Deep dive into the character of this pool.<br /><br />Scan through the Emissions and APR breakdown, then dig into the detail of tabled data to find growth opportunities that improve portfolio efficiencies.</p>
      </div>
      <div className='RightNavbar-Content-Right'>
        <p>Emissions received:</p>
        <p>Select an emission to populate the table below</p>
        <div className='RightNavbar-Content-Right-Emission'>
          {
            fieldSelected.emissionList && fieldSelected.emissionList.map((emission: EmissionListData) => {
              return (
                <Emission 
                  key={emission.emissionLogo}
                  emission={emission} 
                />
              )
            })
          }
        </div>
        <p className='mb-[10px]'>Use the table below to seek out opportunities that boost compound deposit growth with outperforming liquid emissions.</p>
        <Grid container className='text-right'>
          <Grid xs={4} className='text-left mb-[5px]'>M.A:</Grid>
          <Grid xs={2}>1D</Grid>
          <Grid xs={2}>30D</Grid>
          <Grid xs={2}>90D</Grid>
          <Grid xs={2}>180D</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
          <Grid xs={4} className='text-left mb-[5px]'>CRV</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.One : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.Month : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.QuarterYear : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.HalfYear : 0}</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
          <Grid xs={4} className='text-left mb-[5px]'>CVX</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.One : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.Month : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.QuarterYear : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.HalfYear : 0}</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
          <Grid xs={4} className='text-left mb-[5px]'>BENT</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.One : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.Month : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.QuarterYear : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.HalfYear : 0}</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
        </Grid>
        <div className='RightNavbar-Content-Right-Contract'>
          <p>Contract address:</p>
          <p className='RightNavbar-Content-Right-Contract-Address'>
            0x1234....5678
            <img src={ContractAddress} alt='' />
          </p>
        </div>
      </div>
    </div>
  )
}