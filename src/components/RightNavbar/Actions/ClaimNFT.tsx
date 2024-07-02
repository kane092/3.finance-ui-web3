import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected } from '../../../store/actions/globalAction';
import { updateRightNavbarAssetSelected } from '../../../store/actions/navbarAction';

import InputWithPercentage from '../../InputWithPercentage_';

import NavbarExchange from '../../../assets/images/navbar-exchange.png';
import QuestionIcon from '../../../assets/images/question-icon.png';
import { getCRVWalletStatus } from '../../../utils/utils';

export default function ClaimNFT() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const [assetSelected, setAssetSelected] = useState('');
  const [direction, setDirection] = useState([true, true]);

  useEffect(() => {
    setAssetSelected('CRV')
  }, []);

  useEffect(() => {
    dispatch(updateRightNavbarAssetSelected(assetSelected))
  }, [assetSelected]);

  const updateDirection = (index: number) => {
    let newDirection = [...direction]
    newDirection[index] = !direction[index]
    setDirection(newDirection)
  }

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>DAI accrued across all 3Fi-NFTs, owned by the connected wallet will be claimed and withdrawn to the same wallet.</p>
      <div className='w-full'>
        {walletConnected === "Disconnected" || !getCRVWalletStatus(fieldData) ?
        <div className='flex items-center text-left bg-[#D9D9D9]/[0.1] px-[15px] py-[12px] rounded-[20px]'>
          <img src={QuestionIcon} className="w-[13px] h-[13px] mr-[8px]" alt='' />
          <span className='text-left text-[8px] leading-[10px] uppercase tracking-widest'>
          Only available when 3Fi NFTs have been composed or purchased
          </span>
        </div> :
        <div className=''>
          <div className='flex justify-between my-[5px]'>
            <p>Unallocated: (CRV)</p>
            <p>0.00</p>
          </div>
          <hr />
          <div className='flex justify-between my-[5px]'>
            <p>Unallocated: (USD)</p>
            <p>0.00</p>
          </div>
          {fieldSelected.emissionsBalance > 0 ?
          <>
            <p className='my-[20px]'>
              When claiming unallocated CRV, you may choose to receive it in stables (FRAX). Use the rates below to make this decision.
            </p>
            <hr className='my-[11px]' />
            <div className='flex justify-between mb-[10px]'>
              <p>Exchange rate:</p>
              <p className='flex'>
                {
                  direction[0] === true ?
                  `1.00 CRV = 1.00 sdCRV` :
                  `1.00 sdCRV = 1.00 CRV`
                }
                <img src={NavbarExchange} className='exchange-icon' onClick={() => updateDirection(0)} />
              </p>
            </div>
            <div className='flex justify-end'>
              <p className='flex'>
                {
                  direction[1] === true ?
                  `1.00 sdCRV = 1.00 3sdCRV` :
                  `1.00 3sdCRV = 1.00 sdCRV`
                }
                <img src={NavbarExchange} className='exchange-icon' onClick={() => updateDirection(1)} />
              </p>
            </div>
            <hr className='my-[11px]' />
            <p>Enter amount to claim:</p>
            {/* <InputWithPercentage 
              adornmentText={"CRV"}
              validationText="You have exceeded your availability balance."
            /> */}
          </> :
          <>
            <p className='mt-[20px]'>
              You do not have any unallocated CRV. There are several ways to obtain CRV for allocation or to make claimable:
            </p>
            <ol className='claim-list list-inside my-[10px]'>
              <li className='my-[6px]'><span>Harvest your NFTs.</span></li>
              <li className='my-[6px]'><span>Harvest Emissions set to your collateral wallet.</span></li>
              <li className='my-[6px]'><span>Free up existing CRV allocations.</span></li>
            </ol>
            <p>Action one or more of the above to activate this feature.</p>
          </>
          }
        </div>
        }
      </div>
    </>
  )
}