import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { getCRVWalletStatus } from '../../../utils/utils';
import { USDDistributeListData } from '../../../types/types';

import { updateRightNavbarAssetSelected } from '../../../store/actions/navbarAction';

import QuestionIcon from '../../../assets/images/question-icon.png';
import NavbarEmissionPointer from '../../../assets/images/navbar-emission-pointer.png';
import RightArrowWithColor from '../../../assets/images/contract-address.png';
import RightArrowWithNoColor from '../../../assets/images/navbar-show.png';
import classNames from 'classnames';
import DistributeList from './DistributeList';
import NumberField from '../../NumberField';

export default function Distribute() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const [elementSelected, setElementSelected] = useState(0);
  const [assetSelected, setAssetSelected] = useState('');

  useEffect(() => {
    dispatch(updateRightNavbarAssetSelected(assetSelected))
  }, [assetSelected, fieldSelected, showRightNavbar]);

  useEffect(() => {
    setAssetSelected('CRV')
  }, []);

  function updateSelection(index: number) {
    setElementSelected(index)
  }

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>
      This feature will be available after the release of v2.1. Details about this feature will be shared shortly before release.
      </p>
      <div className='w-full'>
        {walletConnected === "Disconnected" || !getCRVWalletStatus(fieldData) ?
        <div className='flex items-center text-left bg-[#D9D9D9]/[0.1] px-[15px] py-[12px] rounded-[20px]'>
          <img src={QuestionIcon} className="w-[13px] h-[13px] mr-[8px]" alt='' />
          <span className='text-left text-[8px] leading-[10px] uppercase tracking-widest'>
          Only available when 3Fi NFTs have been composed or purchased
          </span>
        </div> :
        <div className=''>
          <div className='flex justify-between'>
            <div className='flex'>
              <p className='mr-[10px]'>Allocation:</p>
              <div className='flex flex-col items-center mr-[10px] cursor-pointer'>
                <p 
                  className={assetSelected === 'CRV' ? '' : 'text-[#00FFF0]'}
                  onClick={() => {
                    setElementSelected(0)
                    setAssetSelected('CRV')
                  }}
                >
                  CRV
                </p>
                {assetSelected === 'CRV' &&
                <img src={NavbarEmissionPointer} alt='' className='mt-[5px]' />}
              </div>
              <div className='flex flex-col items-center mr-[10px] cursor-pointer'>
                <p 
                  className={assetSelected === 'USD' ? '' : 'text-[#00FFF0]'}
                  onClick={() => {
                    setElementSelected(0)
                    setAssetSelected('USD')
                  }}
                >
                  USD
                </p>
                {assetSelected === 'USD' &&
                <img src={NavbarEmissionPointer} alt='' className='mt-[5px]' />}
              </div>
            </div>
            <div className='flex items-center mb-[13px]'>
              <img 
                src={assetSelected === 'CRV' ? RightArrowWithNoColor : RightArrowWithColor} 
                className={classNames(
                  'rotate-180 w-[12px] h-[12px] mr-[10px]',
                  assetSelected === 'CRV' ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
                alt='' 
                onClick={() => {
                  if (assetSelected === 'CRV') {
                    return;
                  } else {
                    setElementSelected(0)
                    setAssetSelected('CRV')
                  }
                }}
              />
              {assetSelected === 'CRV' ? 1 : 2} / 2
              <img 
                src={assetSelected === 'CRV' ? RightArrowWithColor : RightArrowWithNoColor} 
                className={classNames(
                  'w-[12px] h-[12px] ml-[10px]',
                  assetSelected === 'CRV' ? 'cursor-pointer' : 'cursor-not-allowed'
                )}
                alt='' 
                onClick={() => {
                  if (assetSelected === 'USD') {
                    return;
                  } else {
                    setElementSelected(0)
                    setAssetSelected('USD')
                  }
                }}
              />
            </div>
          </div>
          <div className={classNames(
            'flex mt-[10px] mb-[16px]',
            assetSelected === 'CRV' ? 'justify-between' : ''
          )}>
          {assetSelected === 'CRV' ?
            fieldSelected.crvDistributeList && fieldSelected.crvDistributeList.map((crvDistribute: USDDistributeListData, index: number) => {
              return (
                <DistributeList 
                  key={`crvDistribute-${index}`}
                  index={index}
                  crvDistribute={crvDistribute}
                  isSelected={elementSelected === index ? true : false}
                  updateSelection={updateSelection}
                />
              )
            }) :
            fieldSelected.usdDistributeList && fieldSelected.usdDistributeList.map((usdDistribute: USDDistributeListData, index: number) => {
              return (
                <DistributeList 
                  key={`usdDistribute-${index}`}
                  index={index}
                  crvDistribute={usdDistribute}
                  isSelected={elementSelected === index ? true : false}
                  updateSelection={updateSelection}
                />
              )
            })
          }
          </div>
          <div className='flex justify-between mb-[5px]'>
            <p>Allocated: ({assetSelected})</p>
            <p><NumberField value={assetSelected === 'CRV' ? 0 : 0} digit={2} /></p>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <p>Unallocated: ({assetSelected})</p>
            <p><NumberField value={fieldSelected.emissionsBalance} digit={2} /></p>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[20px]'>
            <p>T. Budget: ({assetSelected})</p>
            <p><NumberField value={fieldSelected.emissionsBalance} digit={2} /></p>
          </div>
        </div>
        }
      </div>
    </>
  )
}