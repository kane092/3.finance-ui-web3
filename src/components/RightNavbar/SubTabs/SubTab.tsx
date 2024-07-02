import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateRightNavbarSubTabSelected } from '../../../store/actions/navbarAction';

import { SubTabType } from "../../../types/types";
import classNames from 'classnames';

type props = {
  subTabType: SubTabType
  subTabLabel: string
  id: string
  disabled?: boolean
  hidden?: boolean
}

export default function SubTab({
  subTabType,
  subTabLabel,
  id,
  disabled,
  hidden
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);

  return (
    <span
      id={id}
      className={classNames(
        'cursor-pointer sm:text-[12px] md:text-[12px] lg:text-[14px] xl:text-[18px] ml-[20px]',
        subTabSelected === subTabType ? 'text-white' : 'text-[#00FFF0]',
        disabled ? "grayscale" : "",
        hidden ? 'hidden' : ''
      )}
      style={{
        borderBottom : subTabSelected === subTabType ? '1px solid white' : 'none'
      }}
      onClick={() => {
        !disabled && dispatch(updateRightNavbarSubTabSelected(subTabType))
      }}
    >
      {subTabLabel}
    </span>
  )
}