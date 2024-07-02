import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../../store/store';

import Tab from './Tab';

export default function Tabs() {
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);

  return (
    <div
      className={
        classNames(
          'RightNavbar-Tabs relative mr-[30px] mb-[48px] ml-[30px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]',
          tabSelected === 'Details' ? 'RightNavbar-Tabs-Details' : '',
          tabSelected === 'Settings' ? 'RightNavbar-Tabs-Settings' : ''
        )
      }
    >
      {(tabSelected == 'Actions' || tabSelected == 'Details') &&
      <>
        <Tab tab="Actions" />
        {/* <Tab tab='Details' /> Todo: temporary disabled */}
      </>}
      {tabSelected == 'Settings' &&
      <Tab tab='Settings' />}
    </div>
  )
}