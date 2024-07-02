import { Grid } from "@mui/material"
import classNames from "classnames"
import EastIcon from '@mui/icons-material/East';

type props = {
  rightLandingModalShow? : any,
  termsAgreed : boolean,
  setCloseBtn : Function,
  setTab : Function,
}

export default function Fundraise({
  rightLandingModalShow,
  termsAgreed,
  setCloseBtn,
  setTab
}: props) {

  return (
    <div className={classNames(
      "absolute top-[75px] w-[100%]",
      // !rightLandingModalShow ? 'z-[15]' : ''
    )} >
      <div className="landing-right-content">
        {
          termsAgreed ?
            <div className="table-content">
              <div className="flex justify-between py-[7px]">
                <p className="title">DAI Condivibuted</p>
                <p className="t-value">500,000</p>
              </div>
              <div className="flex justify-between py-[7px]">
                <p className="title">Vesting Debt</p>
                <p className="t-value">250,000</p>
              </div>
              <div className="flex justify-between py-[7px]">
                <p className="title">Guild NFTs  </p>
                <p className="t-value">25</p>
              </div>
            </div>
            :
            <div className="table-content">
              <div className="flex justify-between py-[7px]">
                <p className="title">Min. Condivibution</p>
                <p className="t-value">2,000 DAI</p>
              </div>
              <div className="flex justify-between py-[7px]">
                <p className="title">Vesting Period</p>
                <p className="t-value">12+24 months</p>
              </div>
              <div className="flex justify-between py-[7px]">
                <p className="title">Expected ROI  </p>
                <p className="t-value">min' 400%</p>
              </div>
            </div>
        }
        <hr />
        <ul>
          <li><a href="https://www.figma.com/" rel="noreferrer" target="_blank">View pitch deck<span><EastIcon fontSize='small' /></span></a></li>

          <li><span onClick={() => {
            setCloseBtn(false)
            setTab('TERMS')
          }}>{termsAgreed ? "Terms agreed" : "See terms"}<span><EastIcon fontSize='small' /></span></span></li>

          <li onClick={() => {
            setCloseBtn(false)
            termsAgreed ? setTab('PURCHASE') : setTab('TERMS')
          }}><span>Reserve Guild NFTs<span><EastIcon fontSize='small' /></span></span></li>
        </ul>
        <hr />
        <p className="notes">*Vesting begins from launch of Guild.</p>
      </div>
    </div> 
  )
}