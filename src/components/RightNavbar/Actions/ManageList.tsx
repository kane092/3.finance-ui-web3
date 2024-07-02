import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { USDDistributeListData } from '../../../types/types';

import { RootState } from '../../../store/store';

import NavbarEmissionPointer from '../../../assets/images/navbar-emission-pointer.png';
import classNames from 'classnames';
import NumberField from '../../NumberField';

type props = {
  index: number
  crvManage: USDDistributeListData
  isSelected: boolean
  updateSelection: Function
  curValue: number
  maxValue: number
}

export default function ManageList({
  index,
  crvManage,
  isSelected,
  updateSelection,
  curValue,
  maxValue
}: props) {

  return (
    <div
      className='crv-distribute'
      onClick={() => {
        updateSelection(index)
      }}
    >
      {isSelected ?
      <p className='mb-[5px] item-name'>{crvManage.name}</p> :
      <p className='mb-[5px] item-name'>&nbsp;</p>}
      <img
        src={crvManage.logo}
        className={
          isSelected ?
          'manage-logo border-[2px] border-[solid] border-[white] rounded-full' :
          'manage-logo border-[2px] border-[solid] border-[#00FFF0] rounded-full'
        }
      />
      {isSelected ?
      <img className='my-[5px]' src={NavbarEmissionPointer} /> :
      <p className='h-[18px]'>&nbsp;</p>}
      <span className={
        classNames(
          'text-[8px] font-[500] leading-[10px]',
          isSelected ? curValue > maxValue ? 'text-red-600' : curValue + crvManage.amount > 0 ? '' : 'text-[#00FFF0]' : crvManage.amount > 0 ? '' : 'text-[#00FFF0]'
        )
      }>
        {isSelected ? curValue > maxValue ? 'ERROR' : curValue + crvManage.amount > 0 ? <NumberField value={curValue + crvManage.amount} digit={2} /> : 'Allocate' : crvManage.amount > 0 ? <NumberField value={crvManage.amount} digit={2} /> : 'Allocate'}
      </span>
    </div>
  )
}