import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import classNames from 'classnames';

import SubTabs from '../SubTabs/SubTabs';
import Help from './Help';
import Currency from './Currency';
import Signals from './Signals';
import ActionSummary from '../ActionSummary';
import ActionButton from '../ActionButton';

export default function Settings() {
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);

  return (
    <>
      <div
        className={classNames(
          'RightNavbar-Content mr-[10px] md:mr-[30px] ml-[40px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]',
          'h-[calc(100%-160px)] 2xl:h-[calc(100%-188px)]',
        )}
      >
        <div className='RightNavbar-Content-Left'>
          <p>Global Settings</p>
          <p>Actions</p>
          <p>What would you like to do?</p>
          <SubTabs />
          {subTabSelected === "Help" && <Help />}
          {subTabSelected === "Currency" && <Currency />}
          {subTabSelected === "Signals" && <Signals /> }
          {subTabSelected === "Signals" && <ActionSummary subTab='Signals' actionsButtonShow={false} />}
        </div>
      </div>
      <ActionButton />
    </>
  )
}