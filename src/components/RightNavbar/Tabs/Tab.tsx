import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateRightNavbarTabSelected } from '../../../store/actions/navbarAction';

import { TabType } from '../../../types/types';

type props = {
  tab: TabType
}

export default function Tab({
  tab
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);

  return (
    <span
      className={tabSelected == tab ? 'RightNavbar-Tab RightNavbar-Tab-Selected' : 'RightNavbar-Tab'}
      onClick={() => dispatch(updateRightNavbarTabSelected(tab))}
    >
      {tab}
    </span>
  )
}