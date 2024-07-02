import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { USDDistributeListData } from '../../../types/types';

import { RootState } from '../../../store/store';

import NavbarEmissionPointer from '../../../assets/images/navbar-emission-pointer.png';
import classNames from 'classnames';

type props = {
  index: number
  crvDistribute: USDDistributeListData
  isSelected: boolean
  updateSelection: Function
}

export default function DistributeList({
  index,
  crvDistribute,
  isSelected,
  updateSelection
}: props) {

  return (
    <div
      className='crv-distribute'
      onClick={() => {
        updateSelection(index)
      }}
    >
      {isSelected ?
      <p className='mb-[5px] item-name'>{crvDistribute.name}</p> :
      <p className='mb-[5px] item-name'>&nbsp;</p>}
      <img
        src={crvDistribute.logo}
        className={
          isSelected ?
          'border-[2px] border-[solid] border-[white] rounded-full' :
          'border-[2px] border-[solid] border-[#00FFF0] rounded-full'
        }
      />
      {isSelected ?
      <img className='my-[5px]' src={NavbarEmissionPointer} /> :
      <p className='h-[18px]'>&nbsp;</p>}
      <span className={
        classNames(
          'text-[8px] font-[500] leading-[10px]',
          crvDistribute.amount > 0 ? '' : 'text-[#00FFF0]'
        )
      }>
        {crvDistribute.amount > 0 ? crvDistribute.amount + '%' : 'Allocate'}
      </span>
    </div>
  )
}