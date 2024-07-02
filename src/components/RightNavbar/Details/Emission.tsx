import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { EmissionListData } from '../../../types/types';

import { RootState } from '../../../store/store';
import { updateRightNavbarEmissionSelected } from '../../../store/actions/navbarAction';

import NavbarEmissionPointer from '../../../assets/images/navbar-emission-pointer.png';

type props = {
  emission: EmissionListData
}

export default function Emission({
  emission
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const emissionSelected = useSelector((state: RootState) => state.navbar.rightNavbarEmissionSelected);
  const isSelected = (emission.emissionLogo === emissionSelected.emissionLogo ? true : false)

  return (
    <div
      className='crv-distribute'
      onClick={() => {
        dispatch(updateRightNavbarEmissionSelected(emission))
      }}
    >
      {isSelected ?
      <p className='mb-[5px] item-name'>{emission.emissionName}</p> :
      <p className='mb-[5px] item-name'>&nbsp;</p>}
      <img
        src={emission.emissionLogo}
        className={
          isSelected ?
          'border-[2px] border-[solid] border-[white] rounded-full' :
          'border-[2px] border-[solid] border-[#00FFF0] rounded-full'
        }
        alt=''
      />
      {isSelected ?
      <img className='my-[10px]' src={NavbarEmissionPointer} alt='' /> :
      <p className='h-[28px]'>&nbsp;</p>}
      <span className='text-[8px] font-[500] leading-[10px]'>{emission.emissionAmount}%</span>
    </div>
  )
}