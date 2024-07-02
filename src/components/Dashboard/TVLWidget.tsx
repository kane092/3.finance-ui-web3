import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../store/store';

import Grid from '@mui/material/Unstable_Grid2';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import DashboardTVLImg from '../../assets/images/dashboard-tvl.png';

import '../../assets/scss/Content.scss';

import type { FieldType } from '../../types/types';

export default function TVLWidget() {
    const dispatch: Dispatch<any> = useDispatch();
    const [depositedPoolCount, setDepositedPoolCount] = useState(0);
    const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
    const fieldData = useSelector((state: RootState) => state.global.fieldData);

    useEffect(() => {
        let depositedCount = 0;
        fieldData.filter((field: FieldType) => {
            if ((field.type === "compoundEmissionFields" || field.type === "OtherFields") && field.depositsLP  && field.depositsLP > 0) {
                depositedCount ++;
            }
        });
        setDepositedPoolCount(depositedCount)
    }, [[...fieldData]]);
    return (
        <Grid className='tvl-widget mb-[30px] mr-[0px] md:mb-[0px] md:mr-[30px] w-[calc(100vw-40px)] md:w-[calc(33.33vw-78px)]'>
            <div className='tvl-widget-bg'>
                <div className='flex items-center px-[30px] pt-[30px]'>
                    <img src={DashboardTVLImg} className='w-[22px] h-[25px] mr-[15px]' alt='' />
                    <p className='widget-title'>
                        {walletConnected === "Disconnected" ? 'TVL' : 'My portfolio:'}
                    </p>
                </div>
                <hr className='my-[15px] border-[#C3D6E2]/[0.6]' />
                {walletConnected === "Connected" && 
                    <DragIndicatorIcon className='widget-drag-indicator' />
                }
                <div className={
                    classNames(
                        'overlay-area',
                        walletConnected === "Disconnected" ? 'visitor' : depositedPoolCount > 0 ? 'existing' : 'new-user'
                    )}>
                    <div className='overlay-behind'>
                        <p className='text-[14px] text-[#C3D6E2] leading-[23px]'>
                            {walletConnected === "Disconnected" ? 'Total deposit value' : 'My deposits'}
                        </p>
                        <p className='mb-[5px] font-lg'>
                            {walletConnected === "Disconnected" ? '$1,234,567,890' : depositedPoolCount > 0 ? '$1,234,567,890' : '0'}
                        </p>
                        <p className='text-[14px] text-[#C3D6E2] leading-[23px]'>{walletConnected === "Disconnected" ? '' : 'My '}Claimable emissions</p>
                        <p className='mb-[5px] font-lg mb-[17px]'>
                            {walletConnected === "Disconnected" ? '$4,567,890' : depositedPoolCount > 0 ? '$4,567,890' : '0'}
                        </p>
                        {/* <div className='flex justify-between mr-[40px]'>
                            <div className="tvl-circle">
                                <p className='text-with-bg'>
                                    {walletConnected === "Disconnected" ? '10,000,000' : depositedPoolCount > 0 ? '10,000,000' : '0'}
                                </p>
                                <p className='text-[14px] text-[#C3D6E2] leading-[18px]'>Pools</p>
                            </div>
                            <div className="tvl-circle">
                                <p className='text-with-bg'>
                                    {walletConnected === "Disconnected" ? '6,000' : depositedPoolCount > 0 ? '6,000' : '0'}
                                </p>
                                <p className='text-[14px] text-[#C3D6E2] leading-[18px]'>Apps</p>
                            </div>
                        </div> */}
                        <Grid xs={12} container className='flex'>
                            <Grid xs={6} md={6} className='tvl-circle'>
                                <p className='text-with-bg'>
                                    {walletConnected === "Disconnected" ? '10,000,000' : depositedPoolCount > 0 ? '10,000,000' : '0'}
                                </p>
                                <p className='text-[14px] text-[#C3D6E2] leading-[18px]'>Pools</p>
                            </Grid>
                            <Grid xs={6} md={6} className='tvl-circle'>
                                <p className='text-with-bg'>
                                    {walletConnected === "Disconnected" ? '6,000' : depositedPoolCount > 0 ? '6,000' : '0'}
                                </p>
                                <p className='text-[14px] text-[#C3D6E2] leading-[18px]'>Apps</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='overlay-content'>
                        <p className='text-[14px] text-[#C3D6E2] leading-[18px]'>To activate this widget, make a</p>
                        <p className='font-lg'>Deposit</p>
                    </div>
                </div>
            </div>
        </Grid>
    )
}