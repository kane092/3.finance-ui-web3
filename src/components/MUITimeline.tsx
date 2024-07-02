// import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import FastfoodIcon from "@mui/icons-material/Fastfood";
// import LaptopMacIcon from "@mui/icons-material/LaptopMac";
// import HotelIcon from "@mui/icons-material/Hotel";
// import RepeatIcon from "@mui/icons-material/Repeat";
// import Typography from "@mui/material/Typography";
// import TimelineOppositeContent, {
//     timelineOppositeContentClasses,
//   } from '@mui/lab/TimelineOppositeContent';

import '../assets/scss/Timeline.scss';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import classNames from "classnames";
import {
  updateLeftNavbarPageSelected,
} from '../store/actions/navbarAction';
import Details from './LeftNavbar/Details';

interface props {
      pages: Array<any>;
  }

export default function MUITimeline({
    pages
  }:props) {

  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const leftNavbarPageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  
  return (
    <>
    <span className='timeline-connecting-line'
      style={{
        display:leftNavbarShow === 'Opened' ? 'none':'block'
      }}
    />
    <Timeline className="Timeline" sx={{
      padding:0,
      paddingLeft:'25px',
    }}>
      {
        pages.map((page:any,index:number)=>{
          function updatePathName(arg0: string): any {
            throw new Error("Function not implemented.");
          }

          function updateLeftNavbarPageSelected(title: any): any {
            throw new Error("Function not implemented.");
          }
          return (
          <TimelineItem key={index} className="timelineItem">
            <TimelineSeparator>
              <span 
                className="nav-dot shadow-[0px_4px_rgba(0,0,0,0.25)]"
                style={{
                  background:page?.disabled === true ? '#4A4D58': page.title === leftNavbarPageSelected ? 'white' : '#00FFF0',
                  top: leftNavbarShow === 'Opened' ? '14px' : '10px'
                }}
                onClick={()=>{
                  if(!page?.disabled){
                    navigate(`/${page.title.toLowerCase()}`);
                    dispatch(updatePathName('/' + page.title.toLocaleLowerCase()));
                    dispatch(updateLeftNavbarPageSelected(page.title));
                  }
                }}
              />
              {/* above we have a custom a connecting dot having className="nav-dot" using span tag */}
              <TimelineConnector sx={{display: leftNavbarShow !== 'Opened' ? 'none':'block'}} />
              {/* <TimelineDot><FastfoodIcon /></TimelineDot> */}
              <TimelineConnector sx={{display: leftNavbarShow !== 'Opened' ? 'none':'block'}}/>
            </TimelineSeparator>
            <TimelineContent className="timeline-content" sx={{ py: "12px", px: 2 }}>
              {
                // leftNavbarShow !== 'Minimized' && 
                <p
                  className={classNames(
                    !page.disabled ? 'cursor-pointer' : 'cursor-not-allowed',
                    leftNavbarShow !== 'Opened' ? 'text-[12px]': 'text-[18px]',
                    page.title === leftNavbarPageSelected ? 'text-white' : 'text-[#00FFF0]',
                    page?.disabled === true ? 'text-[#4A4D58]': '',
                    leftNavbarShow === 'Minimized' ? 'opacity-0' : 'opacity-100',
                    leftNavbarShow==='Minimized'? 'invisible' : 'visible',
                    'pl-[10px]'

                  )}
                  onClick={()=>{
                    if(!page?.disabled){
                      navigate(`/${page.title.toLowerCase()}`);
                      dispatch(updatePathName('/' + page.title.toLocaleLowerCase()));
                      dispatch(updateLeftNavbarPageSelected(page.title));
                    }
                  }}
                >
                  {`${page.title}`}
                </p>
              }
              {
                leftNavbarShow === 'Opened' && page.title === leftNavbarPageSelected && 
                  <div
                    className={classNames(
                      `timeline-detail`
                    )}
                    style={{
                      // border:'1px solid',
                      maxHeight:'400px',
                      overflowY:'auto',
                      fontSize:'14px',
                      fontWeight:'normal',
                      paddingLeft:'10px'
                    }}
                  >
                    {/* <p >Because you need strength</p>
                    <p >Because you need strength</p>
                    <p >Because you need strength</p>
                    <p >Because you need strength</p>
                    <p >Because you need strength</p>
                    <p >Because you need strength</p> */}
                    <Details selected={leftNavbarPageSelected === page.title} page={page.title} />
                  </div>
              }
            </TimelineContent>
          </TimelineItem>
          )
        })
      }

    </Timeline>
      </>
  );
}
