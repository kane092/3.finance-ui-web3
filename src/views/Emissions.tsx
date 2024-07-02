import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../store/store';
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected
} from '../store/actions/navbarAction';

import type { FieldType } from '../types/types';
import { getCRVWalletStatus } from '../utils/utils';

import Toggle3Button from '../components/ToggleButton/Toggle3Button';
import Field from '../components/Field';
import SpecialField from '../components/SpecialField';
import MorePools from '../components/MorePools';

import ArrowRight from '../assets/images/arrow-right.png';
import '../assets/scss/Deposits.scss';
import '../assets/scss/Emissions.scss';
import LightToolTip from '../components/LightToolTip';
import FilterIcon from '../assets/images/filter.png';
import SearchIcon from '../assets/images/search.png';
import useABI from '../hooks/useABI';
import useMetaMask from '../hooks/metaMask';
import { BentCDPContractAddr, ConvexCDPContractAddr, bentCVX3Address } from '../constants';
import useClaimAndHarvestHook from '../hooks/useClaimAndHarvestHook';

export default function Emissions() {
  const DISABLE_MORE_POOLS = true // ToDo: temporary disabled
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const rightNavbarShow = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const leftNavbarPageSelectedHistory = useSelector((state: RootState) => state.navbar.leftNavbarPageSelectedHistory);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const [showLiquidDeposits, setShowLiquidDeposits] = useState(false);
  const [marginBottomFlag, setMarginBottomFlag] = useState(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [morePools, setMorePools] = useState<any>([]);
  const [displaySearchBox, setDisplaySearchBox] = useState<boolean>(false);
  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);//refetch data after any transaction

  // const {claimConvexCDP, claimBentCDP} = useABI()
  // const {sendTransaction } = useMetaMask()

  const [CVXClaim,setCVXClaim] = useState<any>(0)
  const [bentCVXClaim,setBentCVXClaim] = useState<any>(0)

  const {
    pendingRewardBentCDP,
    pendingRewardConvexCDP
  } = useClaimAndHarvestHook()

  const fetchPageData = () => {
    if(walletConnected === 'Connected'){
      // if(fieldSelected.name === 'bentCVX'){
        pendingRewardBentCDP().then((reward:any)=>{
          setBentCVXClaim(reward)
        })
      // }
      // if(fieldSelected.name === 'CVX'){
        pendingRewardConvexCDP().then((reward:any)=>{
          setCVXClaim(reward)
        })
      // }
    }
  }

  useEffect(()=>{
    fetchPageData()
  },[])
  
  useEffect(()=>{
    fetchPageData()
  },[walletConnected,isTransactionInitiated])

  let animClass = '';
  const historyLen = leftNavbarPageSelectedHistory.length;
  leftNavbarPageSelectedHistory[historyLen - 1] > leftNavbarPageSelectedHistory[historyLen - 3] && (animClass = 'bottom-animation');
  leftNavbarPageSelectedHistory[historyLen - 1] < leftNavbarPageSelectedHistory[historyLen - 3] && (animClass = 'top-animation');

  useEffect(() => {
    fieldData.filter((field: FieldType) => {
      return field.type === '3FiCollateralWallets';
    }).map((field: FieldType) => {
      if (!field.emissionsBalance) {
        setMarginBottomFlag(true);
      }
    })

  }, [fieldData]);
  
  useEffect(()=>{
    if(filterQuery===''){
      let filterPools = fieldData.filter((field: FieldType) => {
        return field.type === 'OtherFields' && !field.depositsFlag;
      })
      setMorePools(filterPools)
    }
  },[filterQuery])

  const filterMorePools = (query:string) => {
    if(query){
      setMorePools(morePools.filter((item: any)=>item.name.toLowerCase().includes(query.toLowerCase())))
    }
  }

  // const handleClaimConvexCDP = async()=>{
  //  const callData = await claimConvexCDP()
  // await sendTransaction(ConvexCDPContractAddr,callData)
  // }
  // const handleClaimBentCDP = async()=>{
  //  const callData = await claimBentCDP()
  //  await sendTransaction(BentCDPContractAddr,callData)
  // }

  return (
    <div
      className={classNames(
        'Emissions p-[10px]',
        rightNavbarShow === "Opened" ? 'mx-[10px] md:mx-[30px]' : leftNavbarShow === "Opened" ? 'ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px] text-[10px]' : 'mx-[10px] md:mx-[70px] text-[10px]',
        animClass
      )}
    >
      {/* <button onClick={handleClaimBentCDP}>Claim Bent</button> <br/>
      <button onClick={handleClaimConvexCDP}>Claim Bent CVX</button>  */}

      <div className='flex justify-between'>
        <h1>Emissions</h1>
        {
          //hiding settings button from header

        //  walletConnected === "Connected" &&
        //  <p
        //    className='flex items-center text-[#00FFF0] text-[14px] cursor-pointer mb-[0px] md:mb-[10px] xl:mb-[10px] 2xl:mb-[10px] 3xl:mb-[10px]'
        //    onClick={() => {
        //      dispatch(updateRightNavbarTabSelected("Settings"));
        //      dispatch(updateRightNavbarSubTabSelected("Help"));
        //      dispatch(updateRightNavbarShow("Opened"));
        //    }}
        //  >
        //    Settings
        //    <img src={ArrowRight} className='w-[14px] h-[12px] ml-[5px]' alt='' />
        //  </p>
      }
      </div>
      <Grid container spacing={2}>
        <Grid xs={4} md={3}>
          <p className='text-[18px] hidden md:block'>Token iDs</p>
          <p className='text-[18px] text-[#C3D6E2] block md:hidden'>Token</p>
          <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Symbol and name</span>
        </Grid>
        <Grid xs={4} md={4}>
          <p className='text-[18px] hidden md:block'>Total claimable emissions</p>
          <p className='text-[18px] text-[#C3D6E2] block md:hidden'>T.C.E</p>
          <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Value accrued in DAI</span>
        </Grid>
        <Grid xs={4} md={5}>
          <p className='text-[18px] hidden md:block'>Signals</p>
          <p className='text-[18px] text-[#C3D6E2] block md:hidden'>Signals</p>
          <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Auto-compound options</span>
        </Grid>
        <Grid xs={12}><hr /></Grid>
        <Grid xs={12}>
          <Toggle3Button />
        </Grid>
        <div
          className={classNames(
            'w-full relative',
            marginBottomFlag ? 'mb-[0px]' : ''
          )}
        >
          <Grid xs={12} className='w-full text-[20px]'>
            <span className='leading-[28px]'>3Fi Collateral wallets:<LightToolTip title="This wallet works together with our community of Money Apps. Collateral in these wallets are distributed on harvest, based on your allocations to each Money App. To access and begin using Money Apps, mint 3Fi tokens by locking Compound deposits."></LightToolTip></span>
          </Grid>
          {
            fieldData.filter((field: FieldType) => {
              return field.type === '3FiCollateralWallets';
            }).map((field: FieldType, index: number) => {
              return (
                <Grid key={`3FiCollateral-${index}`}>
                {
                  walletConnected === "Connected" && getCRVWalletStatus(fieldData) ?
                  <Field
                    disabled = {true}
                    key={field.name}
                    field={field}
                    fieldFlag={2}
                    firstField={false}
                  /> 
                  : 
                  <SpecialField field={field} />
                }
                </Grid>
              );
            })
          }
        </div>
        <div className='w-full relative mt-[10px]'>
          <Grid xs={12} className='w-full text-[20px]'>
            <span className='leading-[28px]'>Compound Emissions:<LightToolTip title="Increase your share of protocol revenue by harvesting these emissions to grow your compound deposits."></LightToolTip></span>
          </Grid>
          {
            fieldData.filter((field: FieldType) => {
              return (
                field.type === 'compoundEmissionFields' 
                && (field.name !== 'Bent') //hidden field
                );
            }).map((field: FieldType, index: number) => {
              return (
                <Grid key={`compoundEmissionFields-${index}`} className="py-[0px!important]">
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={2}
                    firstField={false}
                    disabled={(field.name==="CRV"||field.name==="sdCRV")?true:false} //Todo: temporary Disabled
                    data = {
                      {
                        bentCVXClaim:bentCVXClaim,
                        CVXClaim:CVXClaim,
                      }
                    }
                  />
                </Grid>
              );
            })
          }
        </div>

        {/* temporarry hiding this table ---My liquid emissions:--- */}
        
          {/* <div className='w-full relative mt-[10px]'>
          <Grid xs={12} className='w-full text-[20px]'>
            <span className='leading-[28px]'>My liquid emissions:</span>
          </Grid>
          {
            fieldData.filter((field: FieldType) => {
              return field.type === 'OtherFields' && field.depositsFlag;
            }).map((field: FieldType, index: number) => {
              return (
                <Grid key={`MyOtherFields-${index}`} className="py-[0px!important]">
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={2}
                    firstField={false}
                  />
                </Grid>
              );
            })
          }
        </div> */}
        

        <div className='w-full relative mt-[10px]'>
          <Grid xs={12} className='w-full text-[20px] flex justify-between'>
            <span className='leading-[28px]'>Liquid Emissions:<LightToolTip title="Harvesting, swaps and adds liquid emissions to compound deposits, expediting the speed at which your positions grow. Claiming, will withdraw these emissions to the connected wallet."></LightToolTip></span>
            {
              showFilters && (
              <div className='flex items-center'>
                {
                  displaySearchBox && (
                    <input type='text' placeholder='Search' 
                    value={filterQuery}
                    onChange={(e)=>setFilterQuery(e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.key==='Enter'){
                        filterMorePools(filterQuery)
                      }
                    }}
                    style={{
                      marginRight:'3px',
                      color:'white',
                      background:'transparent',
                      padding:'2px',
                      paddingLeft:"5px",
                      borderBottom:'1px solid white'
                    }}
                    />
                  )
                }
              <img
                alt=''
                src={SearchIcon}
                className='cursor-pointer w-4 h-4'
                onClick={()=>setDisplaySearchBox(!displaySearchBox)}
              />
              <img
                alt=''
                src={FilterIcon}
                className='pl-[15px] cursor-pointer w-8 h-4'
              />
            </div>
              )
            }
          </Grid>
          <Grid xs={12} className="py-[0px!important]">
            <MorePools
              disabled = {DISABLE_MORE_POOLS?true:false}
              showLiquidDeposits={showLiquidDeposits}
              setShowLiquidDeposits={setShowLiquidDeposits}
              showFilters = {showFilters}
              setShowFilters={setShowFilters}
            />
          </Grid>
          {showLiquidDeposits &&
          morePools.map((field: FieldType, index: number) => {
            return (
              <Grid key={`OtherFields-${index}`} className="py-[0px!important]">
                <Field
                  key={field.name}
                  field={field}
                  fieldFlag={2}
                  firstField={false}
                />
              </Grid>
            );
          })
          }
        </div>
      </Grid>
    </div>
  )
}