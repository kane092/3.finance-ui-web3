import { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import classNames from 'classnames';

import type { Page, FieldType } from '../../types/types';

import { RootState } from '../../store/store';
import { updateFieldSelected, updatePathName } from '../../store/actions/globalAction';
import {
  updateLeftNavbarShow,
  updateLeftNavbarPageSelected,
  updateRightNavbarShow
} from '../../store/actions/navbarAction';

import Details from './Details';

import NavbarLogo from '../../assets/images/navbar-logo.png';
import NavbarShow from '../../assets/images/navbar-show.png';
import NavbarHide from '../../assets/images/navbar-hide.png';
import NavbarClose from '../../assets/images/navbar-close.png';
import '../../assets/scss/LeftNavbar.scss';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { useLocation, useNavigate } from "react-router-dom";

import Timeline from '../MUITimeline'

const pages: any = [
  [{title:'Mission'}, {title:'Wealth'}, {title:'Work'}, {title:'Community'}],
  [{title:'Dashboard',disabled:true}, {title:'Deposits'}, {title:'Emissions'}, {title:'MoneyApps',disabled:true}],
];

const emptyField: FieldType = {
  "name": "",
  "type": ""
}

//re-structured left nav bar, this is flag to show previous version of navbar
const showNewMenu = false;

interface Props {
  leftNavbarGrid: any
}

export default function LeftNavbar(props:Props) {
  const navigate = useNavigate();
  const { search } = useLocation(); 
  const isMobile = useCheckMobileScreen()
  const dispatch: Dispatch<any> = useDispatch();
  const initLeftNavbar = () => {
    /**
     * Prevent default leftNavbar select when refresh on the other pages
     */
    switch(window.location.pathname) {
      case '/mission':
        dispatch(updateLeftNavbarPageSelected('Mission'));
        break;
      case '/wealth':
        dispatch(updateLeftNavbarPageSelected('Wealth'));
        break;
      case '/work':
        dispatch(updateLeftNavbarPageSelected('Work'));
        break;
      case '/community':
        dispatch(updateLeftNavbarPageSelected('Community'));
        break;
      case '/dashboard':
        dispatch(updateLeftNavbarPageSelected('Dashboard'));
        setPageArrayIndex(1);
        break;
      case '/deposits':
        dispatch(updateLeftNavbarPageSelected('Deposits'));
        setPageArrayIndex(1);
        break;
      case '/emissions':
        dispatch(updateLeftNavbarPageSelected('Emissions'));
        setPageArrayIndex(1);
        break;
      case '/moneyapps':
        dispatch(updateLeftNavbarPageSelected('MoneyApps'));
        setPageArrayIndex(1);
        break;
      default:
        dispatch(updateLeftNavbarPageSelected('LandingPage'));
        break;
    }
  }
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const leftNavbarPageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const fromLandingPage = useSelector((state: RootState) => state.global.fromLandingPage);
  const [pageArrayIndex, setPageArrayIndex] = useState(0);

  useEffect(() => {
    initLeftNavbar();
  });

  // useEffect(() => {
  //   //this code will run when any new page is selected from left navbar
  //   dispatch(updateRightNavbarShow("Minimized"));
  //   dispatch(updateFieldSelected(emptyField));
  // }, [dispatch, leftNavbarPageSelected]);

  const menu = (
    <>
      <div className={
          classNames(
            'Navbar-Main flex justify-start ml-[30px] relative',
            leftNavbarShow === 'Collapsed' ? 'mr-[10px] pr-[0px]' : 'mr-[0px] pr-[30px]'
          )}
          >
            {/* timeline container */}
            <div className='flex pt-[4px] pb-[2px] fixed left-[30px]'>
              <div
                className='w-[5px] min-w-[5px] opacity-50 bg-[#FFFFFF]/[0.31] backdrop-blur-[10px] br-[1px] br-solid br-[#D9D9D9]/[0.3]'
                style={{height: 'min(580px, 100vh - 220px)'}}
              />
              <div className='z-[10]'>
              {pages[pageArrayIndex].map((page:any, index:number) => {
                return (
                  <>
                  {/* <Link to={'/' + page.title.toLowerCase()} key={`0-${page.title}-${index}`}                  > */}
                    {/* dots in left navbar timeline */}
                    <div
                      key={`i-${index}`}
                      className={classNames(
                        leftNavbarPageSelected === page.title ?
                        'shadow-[0px_4px_rgba(0,0,0,0.25)] duration-1800 ml-[-10px] w-[15px] h-[15px] rounded-full bg-[white]' :
                        'shadow-[0px_4px_rgba(0,0,0,0.25)] duration-1800 ml-[-10px] w-[15px] h-[15px] rounded-full bg-[#00FFF0]',
                        page?.disabled === true ? 'cursor-not-allowed': 'cursor-pointer',
                        page?.disabled === true ? 'bg-[#4A4D58]': '',
                        )
                      }
                      // v.important style to align navbar links with dots
                      // style={
                      //   leftNavbarShow === 'Opened' && leftNavbarPageSelected === page.title ?
                      //   {
                      //     marginBottom: 'min(450px, 100vh - 350px)',  // value need to be updated for all screens
                      //     marginTop:'15px'
                      //   }
                      //   :leftNavbarShow === 'Collapsed' ?  {marginBottom: '15px', marginTop:'12px'}
                      //   :leftNavbarShow === 'Opened' ? { marginBottom: '25px', marginTop:'12px' }
                      //   :{ marginBottom: '15px', marginTop:'12px' }
                      // }
                      style={
                        leftNavbarPageSelected === page.title
                          ? { marginBottom: "min(480px, 100vh - 320px)" }
                          : { marginBottom: "30px" }
                      }
                      onClick={() => {
                        if(!page?.disabled){
                          navigate(`/${page.title.toLowerCase()}`);
                          dispatch(updatePathName('/' + page.title.toLocaleLowerCase()));
                          dispatch(updateLeftNavbarPageSelected(page.title));
                        }
                      }}
                      />
                  {/* </Link> */}
                  </>
                )
              })}
              </div>
            </div>
            <div
              className={leftNavbarShow === 'Minimized' ?
                'Navbar-Main-Right ml-[30px] pointer-events-none' :
                'Navbar-Main-Right ml-[30px]'
              }
            >
              {pages[pageArrayIndex].map((page:any, index:number) => {
                return (
                  <div key={`1-${page.title}-${index}`}
                  >
                    {/* <Link to={'/' + page.title.toLowerCase()}> */}
                      <p
                        className={
                          classNames(
                            // 'transition-all duration-300',
                            leftNavbarShow==='Collapsed' || leftNavbarShow==='Minimized'?'text-[18px]':'text-[18px]', 
                            page?.disabled === true ? 'cursor-not-allowed': 'cursor-pointer',
                            page.title === leftNavbarPageSelected ? 'text-white duration-300' : 'text-[#00FFF0]',
                            // leftNavbarShow === 'Minimized' ? 'opacity-0 duration-300' : 'opacity-100 duration-300',
                            page?.disabled === true ? 'text-[#4A4D58]': '',
                            leftNavbarShow==='Minimized'? 'invisible' : 'visible'
                          )
                        }
                        onClick={() => {
                          if(!page?.disabled){
                            navigate(`/${page.title.toLowerCase()}`);
                            if (isMobile) dispatch(updateLeftNavbarShow("Minimized"))
                            dispatch(updatePathName('/' + page.title.toLocaleLowerCase()));
                            dispatch(updateLeftNavbarPageSelected(page.title))
                          }}
                          } 
                        // important style to align navbar links with dots
                        // style={
                        //   page.title === leftNavbarPageSelected ?
                        //   { marginBottom: '0px',marginTop:'12px' } :
                        //   { marginBottom: '0',marginTop:'12px' }
                          
                        // }
                        style={
                          page.title === leftNavbarPageSelected
                            ? { marginBottom: "22px" }
                            : { marginBottom: "0" }
                        }
                      >
                        {page.title}
                      </p>
                    {/* </Link> */}
                    <Details selected={leftNavbarPageSelected === page.title} page={page.title} showNewMenu={showNewMenu}/>
                  </div>
                )
              })}
            </div>
          </div>
    </>
  )

  return (
    <div
      className={classNames(
        'Navbar h-full fixed backdrop-blur-[17px] md:backdrop-blur-[8px] w-0 z-[-1]',
        // new URLSearchParams(search).get('from') === "landing" ? 'delay-1000 transition duration-1000' : '',
        fromLandingPage === true ? 'w-0' : '',
        fromLandingPage === false && leftNavbarShow === 'Minimized' ? 'translate-x-[calc(-100%)] md:translate-x-0 md:Navbar-Hide w-[calc(100%-10px)] md:w-[70px]' : '',
        fromLandingPage === false && leftNavbarShow === 'Collapsed' ? 'w-[calc(100%-10px)] md:w-1/12 ' : '',
        // leftNavbarShow === 'Opened' ? 'w-[calc(100%-10px)] md:w-4/12' : ''
        //main-width-of opened sidebar can be updated here
        fromLandingPage === false && leftNavbarShow === 'Opened' ? props.leftNavbarGrid === 1 ? 'w-10/12 md:w-0' : `w-10/12 md:w-${props.leftNavbarGrid}/12` : '',
        fromLandingPage === false && leftNavbarShow !== 'Closed' ? 'z-[100!important] md:z-[12!important]' : '',
        fromLandingPage === false && leftNavbarShow !== 'Opened' ? 'border-r-[5px] border-r-[#D9D9D9]/[0.42]' : ''
      )}
      onMouseEnter={() => {
        setTimeout(()=>{
          leftNavbarShow==='Minimized' && dispatch(updateLeftNavbarShow("Collapsed"))
          dispatch(updateRightNavbarShow("Minimized"))
          dispatch(updateFieldSelected(emptyField));
       }, 300);
      }}
      onMouseLeave={() => {
          leftNavbarShow==='Collapsed' && dispatch(updateLeftNavbarShow("Minimized"))
      }}
    >
      <div className={
        classNames(
          'flex h-full w-full',
          // leftNavbarShow !== 'Opened' ? 'border-r-[2px] border-r-[#D9D9D9]/[0.42]':''
        )
      }>
        <div className='py-0 w-full '>
          <div className='hidden md:flex items-center min-h-[80px] h-[80px] ml-[22px] text-[24px] leading-[31px] font-[500] cursor-pointer'
            onClick={()=>{
              navigate("/");
              dispatch(updatePathName('/'))
              // dispatch(updateLeftNavbarShow('Minimized'))
            }}
          >
            <img src={NavbarLogo} alt='' />
            <p
              className={
                leftNavbarShow !== 'Minimized' ?
                'ml-[5px] opacity-100 duration-300' :
                'ml-[5px] opacity-0 duration-300'
              }
              style={{
                fontSize:leftNavbarShow==='Collapsed' || leftNavbarShow==='Minimized'?'15px':'25px', 
              }}
            >
              .Finance
            </p>
          </div>
          
          {/* Navigation Switch - Aerrow button */}
          <div className={
            classNames(
              'flex justify-end mt-[40px] mr-[30px] mb-[70px] ml-[0px]',
              leftNavbarShow === "Opened" ? 'justify-end' : ''
            )
          }>
            <img
              src={leftNavbarShow === "Minimized" || leftNavbarShow === "Collapsed" ? NavbarShow : NavbarHide}
              onClick={() => {
                if (leftNavbarShow === "Minimized" || leftNavbarShow === "Collapsed") {
                  /**
                   * Show LeftNavbar
                   * Minimize RightNavbar
                   */
                  dispatch(updateLeftNavbarShow("Opened"));
                  dispatch(updateRightNavbarShow('Minimized'));
                  dispatch(updateFieldSelected(emptyField));
                } else {
                  dispatch(updateLeftNavbarShow("Minimized"));
                }
              }}
              className='md:block cursor-pointer'
              alt=''
            />
          </div>

            {
              showNewMenu ? 
              <div 
                className='overflow-y-auto]'
                style={{
                  // border:'1px solid red',
                  position:'relative',
                  top:'-55px',
                  left:'7px'
                }}
              >
                <Timeline pages={pages[pageArrayIndex]} />
            </div> : menu
            }
        </div>

        <div
          className={
            leftNavbarShow === 'Opened' ?
            'min-w-[9px] w-[9px] bg-[#FFFFFF]/[0.1] border-r-[2px] border-r-[#D9D9D9]/[0.42]' :
              leftNavbarShow === 'Minimized' ?
              'min-w-[2px] w-[2px] bg-[#FFFFFF]/[0.1] border-r-[2px] border-r-[#D9D9D9]/[0.42]' :
              'min-w-[9px] w-[9px] bg-[#FFFFFF]/[0.1] border-r-[2px] border-r-[#D9D9D9]/[0.42]'
          }
        />
      </div>
    </div>
  )
}