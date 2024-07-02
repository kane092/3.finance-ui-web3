import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../store/store';
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected,
  updateRightNavbarNFTSelected,
  updateDepositData
} from '../store/actions/navbarAction';

import type { NFTData,
  FieldType,
  // RowDataType
 } from '../types/types';

import { getFieldLP } from '../utils/utils';

import Field from '../components/Field';
import PossibleLiquidityField from '../components/PossibleLiquidityField';
import SpecialField from '../components/SpecialField';
import MorePools from '../components/MorePools';

import ArrowRight from '../assets/images/arrow-right.png';
import FilterIcon from '../assets/images/filter.png';
import SearchIcon from '../assets/images/search.png';
import '../assets/scss/Deposits.scss';
import LightToolTip from '../components/LightToolTip';
import nftsJsonData from '../assets/data/nfts.json';
import { updateFieldSelected } from '../store/actions/globalAction';


// import CustomTable from '../components/DataTable/CustomTable';
// import {testData,testColDefs} from '../components/DataTable/TableData';

import useABI from '../hooks/useABI';
import useMetaMask from '../hooks/metaMask';
import useDepositAndWithdraw from '../hooks/useDepositAndWithdraw';
import useDepositPageStatsData from '../hooks/useDepositPageStats';
import useGetBalances from '../hooks/useGetBalances';
// import { BentAddress, BentCDPContractAddr,ConvexCDPContractAddr, SMALLEST,ConvexAddress, bentCVX } from '../constants';

let nftsData = nftsJsonData as NFTData[] | any[];
const emptyField: FieldType = {
  "name": "",
  "type": ""
}

export default function Deposits() {
  // Todo:
  const DISABLE_MY_LEQ_DEPOSITS = true
  const DISABLE_MORE_POOLS = true
  const DISABLE_NFTs = true
  // const {approveBent, depositBent, withdrawBent, allowanceBent,depositBentConvex,withdrawBentConvex,approveConvex,allowanceConvex,approveBentCVX,allowanceBentCVX} = useABI()
  
  const dispatch: Dispatch<any> = useDispatch();
  const [showLiquidDeposits, setShowLiquidDeposits] = useState(false);
  const [myLiquidDepositsCount, setMyLiquidDepositsCount] = useState(0);
  const [possibleLiquidDepositsCount, setPossibleLiquidDepositsCount] = useState(0);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const rightNavbarShow = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const leftNavbarPageSelectedHistory = useSelector((state: RootState) => state.navbar.leftNavbarPageSelectedHistory);
  let tmp = 0;
  let specialFieldFlag = false;
  let animClass = '';
  const historyLen = leftNavbarPageSelectedHistory.length;
  leftNavbarPageSelectedHistory[historyLen - 1] > leftNavbarPageSelectedHistory[historyLen - 3] && (animClass = 'bottom-animation');
  leftNavbarPageSelectedHistory[historyLen - 1] < leftNavbarPageSelectedHistory[historyLen - 3] && (animClass = 'top-animation');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [morePools, setMorePools] = useState<any>([]);
  const [displaySearchBox, setDisplaySearchBox] = useState<boolean>(false);
  const [hideNFTView,setHideNFTView] = useState(true)
  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);//refetch data after any transaction
  
  // const {depositBent,depositBentCVX,withdrawBent,withdrawBentCVX} = useDepositAndWithdraw()

  // Todo:
  const {TVL,APR,LB} = useDepositPageStatsData()
  const {bent3FiBalance} = useGetBalances()
 
  const showSpecialField = (field: FieldType) => {
    if (rightNavbarShow !== 'Opened') return false;
    if (walletConnected !== 'Connected') return false;
    if (field.type !== '3FiCollateral') return false;

    if ((subTabSelected === "NFTs" && fiTVL && curveTVL) || (subTabSelected === "Merge" && maxValue > 0)) {
      /**
       * Do not show special field if the NFT has value
       */
      let flag = false;
      if (field.depositsFullName === "3Fi NFTs - " + nftSelected.name && !field.depositsLP) {
        flag = true;
        specialFieldFlag = true;
      }
      return flag;
    }
    return false;
  }

  useEffect(() => {
    let tmp = fieldData.filter((field: FieldType) => {
      return field.type === 'OtherDepositFields' && field.depositsFlag && field.depositsLP;
    });
    setMyLiquidDepositsCount(tmp.length);

    tmp = fieldData.filter((field: FieldType) => {
      return field.type === 'OtherDepositFields' && field.depositsFlag && !field.depositsLP;
    });
    setPossibleLiquidDepositsCount(tmp.length);
  }, [fieldData]);

  useEffect(()=>{
    if(showLiquidDeposits && filterQuery===''){
      let filterPools = fieldData.filter((field: FieldType) => {
        if (walletConnected === "Connected") return field.type === 'OtherDepositFields' && !field.depositsFlag;
        else return field.type === 'OtherDepositFields';
      })
      setMorePools(filterPools)
    }
  },[showLiquidDeposits,filterQuery,fieldData,walletConnected])

  useEffect(()=>{
    dispatch(updateRightNavbarNFTSelected(nftsData[0]))
  },[dispatch])

  useEffect(()=>{
    rightNavbarShow === 'Minimized' && setHideNFTView(true)
  },[rightNavbarShow])

  const handleSearchBar = (value:string) => {
    setFilterQuery(value)
  }

  const filterMorePools = (query:string) => {
    if(query){
      setMorePools(morePools.filter((item: any)=>item.name.toLowerCase().includes(query.toLowerCase())))
    }
  }

  //open right sidebar by default on first time when page loads
  
  // useEffect(()=>{
  //   // dispatch(updateRightNavbarTabSelected("Actions"));
  //   // dispatch(updateRightNavbarSubTabSelected("NFTs"));
  //   dispatch(updateRightNavbarShow("Opened"));
  // },[])

  return (
    <div
      className={classNames(
        'Deposits p-[10px]',
        rightNavbarShow === "Opened" ? 'mx-[10px] md:mx-[30px]' : leftNavbarShow === "Opened" ? 'ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px] text-[10px]' : leftNavbarShow === "Collapsed" ? 'mx-[10px] md:ml-[100px] md:mr-[70px] text-[10px]' : 'mx-[10px] md:ml-[100px] md:mr-[70px] text-[10px]',
        animClass
      )}
    >
      <div className='flex justify-between'>
        <h1>Deposits</h1>

        {/* <button onClick={()=>{depositBent(5)}}>Deposit BENT</button>
        <button onClick={()=>{withdrawBent(1)}}>Withdraw BENT</button>
        <button onClick={()=>{depositBentCVX(2)}}>Deposit Bent CVX</button>
        <button onClick={()=>{withdrawBentCVX(2)}}>Withdraw Bent CVX</button> */}
        
        {
          //Todo: hiding settings button from header temporary

          // walletConnected === "Connected" &&
          // <p
          //   className='flex items-center text-[#00FFF0] text-[14px] cursor-pointer mb-[0px] md:mb-[10px] xl:mb-[10px] 2xl:mb-[10px] 3xl:mb-[10px]'
          //   onClick={() => {
          //     dispatch(updateRightNavbarTabSelected("Settings"));
          //     dispatch(updateRightNavbarSubTabSelected("Help"));
          //     dispatch(updateRightNavbarShow("Opened"));
          //   }}
          // >
          //   Settings
          //   <img src={ArrowRight} className='w-[14px] h-[12px] ml-[5px]' alt='' />
          // </p>
        }
      </div>
      <Grid container spacing={2}>
        <Grid xs={4} md={3}>
          <p className='text-[18px] hidden md:block'>Pool iD</p>
          <p className='text-[18px] text-[#C3D6E2] block md:hidden'>Pool</p>
          <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Symbol and name</span>
        </Grid>
        <Grid xs={4} md={4}>
          <p className='text-[18px] hidden md:block'>Rates and emissions</p>
          <p className='text-[18px] text-[#C3D6E2] block md:hidden'>APR</p>
          <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>Annualised percentages</span>
        </Grid>
        <Grid xs={4} md={5}>
          <p className='text-[18px] hidden md:block'>Deposit values</p>
          <p className='text-[18px] text-[#C3D6E2] block md:hidden'>Deposits</p>
          <span className='text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block'>
            {walletConnected === 'Connected' ? 'Total values' : 'Total value locked (TVL)'}
          </span>
        </Grid>
        <Grid xs={12}><hr /></Grid>
        <div className='w-full relative mt-[10px]'>

          <div className='flex'>
          <Grid xs={6} className='w-full text-[20px]'>
            <span className='leading-[28px]'>3Fi Collateral:<LightToolTip title={<>
              3.Finance has 2 types of collateral:<br/>
                1- 3Fi tokens. Mint these to gain governance rights.<br/>
                2- 3Fi NFTs. Mint these to gain access to advanced features and protocol revenue share.
            </>}></LightToolTip></span>
          </Grid>

            {(walletConnected === "Connected") && <Grid xs={6} className={classNames(
              'w-full text-[20px]',
              DISABLE_NFTs ? 'grayscale' : ""
            )}>
              <p className='flex items-center justify-end cursor-pointer text-[#00FFF0] text-[12px] pr-[14px] mb-[0px] md:mb-[10px] xl:mb-[10px] 2xl:mb-[10px] 3xl:mb-[10px]'>
              <span 
                className={classNames(
                  rightNavbarShow === 'Opened'?"hidden":""
                )}
                onClick={() => {
                  if(!DISABLE_NFTs){
                    dispatch(updateRightNavbarTabSelected("Actions"));
                    dispatch(updateRightNavbarSubTabSelected("NFTs"));
                    dispatch(updateRightNavbarShow("Opened"));
                    setHideNFTView(false)
  
                    dispatch(updateFieldSelected(nftsData[0]));
                  }
                }}
              >
              Mint NFTs
              </span>
              <img src={ArrowRight} className='w-[14px] h-[12px] ml-[5px]' alt='' />
              </p>
            </Grid>}
          </div>

          {
            // fieldData.filter((field: FieldType) => {
            //   return field.type === '3FiCollateral';
            // }).map((field: FieldType, index: number) => (
            //   showSpecialField(field) && 
            //   <Grid key={`3FiCollateral-${index}`} className="py-[3px!important]">
            //     <SpecialField field={emptyField} />
            //   </Grid>
            // ))
          }
          <Grid className={classNames(
            "py-[3px!important]",
            DISABLE_NFTs ? "hidden" : ""
          )}>
                <SpecialField field={emptyField} hideNFTView={hideNFTView} setHideNFTView={setHideNFTView} />
          </Grid>

          {
            // NFT Data

            // walletConnected === 'Connected' && (
            // (rightNavbarShow === 'Opened' && subTabSelected === "NFTs") ?
            // nftsData.map((field: any, index: number) => {
            //   return (
            //     <Grid key={`3FiCollateralNFT-${index}`}>
            //     {
            //       <>
            //         <Field
            //         key={field.name}
            //         field={field}
            //         fieldFlag={2}
            //         firstField={false}
            //       />
            //       </>
            //     }
            //     </Grid>
            //   );
            // })
            // :<SpecialField field={emptyField} />
            // )
          }

          {
            fieldData.filter((field: FieldType) => {
              return field.type === '3FiCollateral';
            }).map((field: FieldType, index: number) => {
              // const isNFT = (field.isNFT);
              // if (isNFT && !field.depositsLP) tmp = tmp - 1;
              tmp = tmp + 1;

              return (
                <Grid key={`3FiCollateral-${index}`} className={'py-[0px!important]'}>
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={1}
                    firstField={specialFieldFlag && tmp === 1}
                    hideNFTView={hideNFTView}
                    setHideNFTView={setHideNFTView}
                    data={{
                      TVLs:TVL,
                      APRs:APR,
                      LBs:LB,
                      bent3FiBalance,
                    }}
                  />
                </Grid>
              );
            })
          }
        </div>
        <div className='w-full relative mt-[17px]'>
          <Grid xs={12} className='w-full text-[20px]'>
            <span className='leading-[28px]'>Compound deposits:<LightToolTip title="These are 3.Finance’s first C.D.Ps.
Compound Deposit Pools are auto-compounding: fed by the emission signals you set. You may also use your C.D.P receipts to mint collateral."></LightToolTip></span>
          </Grid>
          {
            fieldData.filter((field: FieldType) => {
              return field.type === 'CompoundDepositField';
            }).map((field: FieldType, index: number) => {
              return (
                <Grid key={`CompoundDepositField-${index}`} className="py-[0px!important]">
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={1}
                    firstField={false}
                    disabled={field.name==="sd.Curve"?true:false} //Todo: temporary Disabled
                    data={{
                      TVLs:TVL,
                      APRs:APR,
                      LBs:LB,
                    }}
                  />
                </Grid>
              );
            })
          }
        </div>
        {
        // Todo: Temporary disabled My Liquid Deposits

        (!DISABLE_MY_LEQ_DEPOSITS && myLiquidDepositsCount !== 0) &&
          <div className='w-full relative mt-[17px]'>
            <Grid xs={12} className='w-full text-[20px]'>
              <span className='leading-[28px]'>My liquid deposits:</span>
            </Grid>
            {
              fieldData.filter((field: FieldType) => {
                return field.type === 'OtherDepositFields' && field.depositsFlag && field.depositsLP;
              }).map((field: FieldType, index: number) => {
                return (
                  <Grid key={`MyOtherFields-${index}`} className="py-[0px!important]">
                    <Field
                      key={field.name}
                      field={field}
                      fieldFlag={1}
                      firstField={false}
                    />
                  </Grid>
                );
              })
            }
          </div>
          }
        {walletConnected === "Connected" && possibleLiquidDepositsCount !== 0 &&
          <div className='w-full relative mt-[17px]'>
            <Grid xs={12} className='w-full text-[20px]'>
              <span className='leading-[28px]'>Liquidity I can deposit:</span>
            </Grid>
            {
              fieldData.filter((field: FieldType) => {
                return field.type === 'OtherDepositFields' && field.depositsFlag && !field.depositsLP;
              }).map((field: FieldType, index: number) => {
                return (
                  <Grid key={`CanOtherFields-${index}`} className="py-[0px!important]">
                    <PossibleLiquidityField
                      // key={`${field.name}-${index}`}
                      field={field}
                      fieldFlag={1}
                      firstField={false}
                    />
                  </Grid>
                );
              })
            }
          </div>}
        
        <div className='w-full relative mt-[17px]'>
          <Grid xs={12} className='w-full filter-bar text-[20px]'>
            <span className='leading-[28px]'>Liquid deposits:
            <LightToolTip title="Liquid Deposit Pools do not auto-compound. Instead, emissions from these pools are used to boost your C.D.P positions. See ‘Emissions’ to learn more."></LightToolTip>
            </span>
            {
              showFilters && (
              <div className='flex items-center'>
                {
                  displaySearchBox && (
                    <input type='text' placeholder='Search' 
                    value={filterQuery}
                    onChange={(e)=>handleSearchBar(e.target.value)}
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
              filterQuery={filterQuery}
              setFilterQuery={setFilterQuery}
            />
          </Grid>
          {
          //Todo: temporary Disabled
          (showLiquidDeposits) &&
            morePools.map((field: FieldType, index: number) => {
              return (
                <Grid key={`OtherDepositFields-${index}`} className="py-[0px!important]">
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={1}
                    firstField={false}
                  />
                </Grid>
              );
            })
          }
        </div>
        {/* {
          depositData.map((deposit: DepositData) => {
            let tmp = 0;
            return (
              <div key={deposit.type} className='w-full relative mt-[10px]'>
                <Grid xs={12} className='w-full text-[20px]'>
                  <span className='leading-[28px]'>{deposit.type}</span>
                </Grid>
                {showSpecialField(deposit) &&
                <SpecialField field={emptyField} />}
                {deposit.type == "Other liquid opportunities:" &&
                <MorePools
                  showLiquidDeposits={showLiquidDeposits}
                  setShowLiquidDeposits={setShowLiquidDeposits}
                />}
                {(deposit.type != "Other liquid opportunities:" || (deposit.type == "Other liquid opportunities:" && showLiquidDeposits)) &&
                  deposit.fields.map((field) => {
                    const isNFT = (field.fieldFullName.includes("3Fi NFTs"));
                    if (isNFT && !field.fieldLP) tmp = tmp - 1;
                    tmp = tmp + 1;
                    return (
                      <Field
                        key={field.fieldFullName}
                        field={field}
                        firstField={showSpecialField(deposit) && tmp == 1}
                      />
                    )
                  })
                }
              </div>
            )
          })
        } */}
      </Grid>


      
      <Grid xs={12} className='w-full text-[20px]'>
        <Grid key={`3FiCollateral-${0}`} className={'py-[0px!important]'}>
            {/* <CustomTable 
              rowData={testData} 
              colDefs={testColDefs} 
              title="Test Table" 
              onRowClicked={(data:any)=>{
                window.alert(data.name)
            }}/> */}
        </Grid>
      </Grid>
    </div>
  )
}