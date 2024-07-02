import { useEffect,useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import useClaimAndHarvestHook from '../../../hooks/useClaimAndHarvestHook';

export default function Claim() {
  const [value,setValue] = useState<any>(0)
  const dispatch: Dispatch<any> = useDispatch();
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);//refetch data after any transaction

  const {
    pendingRewardBentCDP,
    pendingRewardConvexCDP
  } = useClaimAndHarvestHook()

  const fetchData = () => {
    if(pageSelected === 'Emissions'){
      if(fieldSelected.name === 'bentCVX'){
        pendingRewardBentCDP().then((reward:any)=>{
          setValue(reward)
  
        })
      }
  
      if(fieldSelected.name === 'CVX'){
        pendingRewardConvexCDP().then((reward:any)=>{
          setValue(reward)
  
        })
      }
    }

  } 
  useEffect(()=>{
    fetchData()
  },[fieldSelected,walletConnected,isTransactionInitiated])

  // useEffect(()=>{
  //   fetchData()
  // },[])
  return (
    <>
      {
        walletConnected === "Connected" ?
          <>
            {
              (
                fieldSelected.type === 'compoundEmissionFields'
                // fieldSelected.name === 'CRV' ||
                // fieldSelected.name === 'sdCRV' ||
                // fieldSelected.name === 'CVX' ||
                // fieldSelected.name === 'bentCVX' ||
                // fieldSelected.name === 'Bent'
              ) ?
              <p className='RightNavbar-SubTab-Content'>
                Compound emissions are not claimable. If you wish to retrieve compound assets, they must be withdrawn via the Deposits screens.
              </p>
              :
              <p className='RightNavbar-SubTab-Content'>
                {/* Compound emissions are not claimable. If you wish to retrieve compound assets, they must be withdrawn via the Deposits screens. */}
                .
              </p>
            }
          </>
          :
          <p className='RightNavbar-SubTab-Content'>
            {/* On claim, liquid emissions will be transferred to the connected wallet. This action will reduce the speed at which your porfolio can compound. */}
            Compound emissions are not claimable. 
            If you wish to retrieve compound assets, they must be withdrawn via the Deposits screens.
          </p>
      }

      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}

      {walletConnected === "Connected" && 
      <div className='w-full'>
        {fieldSelected.receivedDepositPools ?
        <>
          <div className='flex justify-between my-[10px]'>
            <p>Emission status:</p>
            <p>Received by 6 deposit pools</p>
          </div>
          <hr className='my-[10px]' />
          <div className='flex justify-between mb-[10px]'>
            <p>Tokens accured: (CRV)</p>
            <p>1,234,567,890.00</p>
          </div>
          <div className='flex justify-between'>
            <p>Value accured: (USD)</p>
            <p>1,234,567,890.00</p>
          </div>
        </> :
        //Todo
        // <div className='flex justify-between my-[10px]'>
        //   <p>Emission Status:</p>
        //   <p className='text-red-600'>Not currently being received</p>
        // </div>
        <div className='flex justify-between my-[10px]'>
          <p>Emission value:</p>
          <p className='text-red-600'>{value}</p>
        </div>
        }
      </div>}
    </>
  )
}