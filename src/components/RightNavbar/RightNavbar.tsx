import { useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../store/store';
import { updateFieldSelected } from '../../store/actions/globalAction';
import { updateRightNavbarShow, updateRightNavbarBorderPosition } from '../../store/actions/navbarAction';

import type { FieldType } from '../../types/types';

import Tabs from './Tabs/Tabs';
import Actions from './Actions/Actions';
import Details from './Details/Details';
import Settings from './Settings/Settings';

import NavbarClose from '../../assets/images/navbar-close.png';
import '../../assets/scss/RightNavbar.scss';

const emptyField: FieldType = {
  "name": "",
  "type": ""
}

export default function RightNavbar() {
  const dispatch: Dispatch<any> = useDispatch();
  const showRightNavbar = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const tabSelected = useSelector((state: RootState) => state.navbar.rightNavbarTabSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const refRightBorder = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(refRightBorder.current){
      // console.log(refRightBorder.current.getBoundingClientRect())
      // dispatch(updateRightNavbarBorderPosition(null))
      dispatch(updateRightNavbarBorderPosition(refRightBorder.current.getBoundingClientRect()))
    }
  },[showRightNavbar,dispatch,fieldSelected])

  return (
    <div
      className={classNames(
        // 'RightNavbar backdrop-blur-[17px] md:backdrop-blur-[8px] h-full fixed w-[calc(100%-10px)] lg:w-1/3 xl:w-1/3 2xl:w-1/4 z-[14]',
        //main-width of opened sidebar can be updated here
        // 'RightNavbar backdrop-blur-[17px] md:backdrop-blur-[8px] h-full fixed w-4/12 md:w-4/12 z-[14]',
        'RightNavbar backdrop-blur-[17px] md:backdrop-blur-[8px] h-full fixed w-10/12 md:w-4/12 2xl:w-3/12 z-[14]',
        showRightNavbar !== "Opened" ? 'translate-x-full' : '',
      )}
    >
      <div ref={refRightBorder} className='RightNavbar-Border min-w-[9px]' />
      <div className='RightNavbar-Container mt-[30px] w-[calc(100%-10px)]'>
        <img
          alt=''
          src={NavbarClose}
          className='ml-[30px] cursor-pointer'
          onClick={() => {
            dispatch(updateRightNavbarShow("Minimized"))
            if (pageSelected === "Deposits") {
              dispatch(updateFieldSelected(emptyField));
            } else if (pageSelected === "Emissions") {
              dispatch(updateFieldSelected(emptyField));
            }
          }}
        />
        <div className='RightNavbar-Main pt-[50px]'>
          <Tabs />
          {tabSelected === 'Actions' && <Actions />}
          {tabSelected === 'Details' && <Details />}
          {tabSelected === 'Settings' && <Settings />}
        </div>
      </div>
    </div>
  )
}