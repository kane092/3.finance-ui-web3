import {useCallback, useEffect, useState} from "react";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from '../components/Tooltip';
import Web3 from "web3";
import {AbiItem} from 'web3-utils';

import LogoLP from '../assets/images/logo-lp.png';
// import LogoLP2 from '../assets/images/logo-lp-2.png';
import '../assets/scss/Content.scss';
import {
    updateFromLandingPage,
    updatePathName,
    // updateWalletConnectModalShow
} from "../store/actions/globalAction";
import {
    updateLeftNavbarShow,
    // updateRightLandingModalShow
  } from '../store/actions/navbarAction';
import useMetaMask from "../hooks/metaMask";
import BuyGuildModal from "./BuyGuildModal";
import { div } from "../utils/math";
// import { decimal } from "../utils/parse";
import { useNavigate } from "react-router-dom";
import {
    selectedRPC,
    factoryContract,
    // daiTokenContract,
    // SMALLEST,
    // dgtContract,
    // TestContract
  } from "../constants";
import {
    FACTORY_ABI,
    // DAI_ABI,
    // TEST_ABI,
} from "../ABI";
import { RootState } from "../store/store";
import classNames from "classnames";

interface Props {
    closeBtn? : any
    setCloseBtn? : any
    termsAgreed:any
    setTermsAgreed:any
    tab?: 'TERMS'|'PURCHASE'
    setTab?: any
    setIsContributed?:any
    setBgMask?:any
}


function LandingPage(props:Props) {
  const rightLandingModalShow = useSelector((state: RootState) => state.navbar.rightLandingModalShow);

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    // const [closeBtn, setCloseBtn] = useState(!rightLandingModalShow)
    const {closeBtn, setCloseBtn, termsAgreed, setTermsAgreed,tab,setTab} = props
    // const [availableBal, setAvailableBal] = useState('')
    const [config, setConfig] = useState<{ min: any; max: any }>({
        min: 0,
        max: 0,
      });
    const [animReverse, setAnimReverse] = useState(false);
    const {
        account,
        isActive,
        isLoading,
        // connect,
        // disconnect,
        // signTransaction,
        // getWalletBalance
    } = useMetaMask()
    const web3 = new Web3(selectedRPC);
    const factory = new web3.eth.Contract(FACTORY_ABI as AbiItem[], factoryContract);

    const configQuery = useCallback(async()=> {
        
        // signTransaction("test")

        // console.log("getBalance:",Number(await web3.eth.getBalance(`${account}`))/SMALLEST)

        // const test_Contract = new web3.eth.Contract(TEST_ABI as any, TestContract);
        // const balance = await test_Contract.methods.transfer(`${account}`,10).call();
        // console.log("Contract Response:",balance/SMALLEST)

        const min = await factory.methods.minLimit().call();
        const max = await factory.methods.maxLimit().call();
        setConfig({ min: div(min,'2000'), max: div(max,'2000') });
      },[factory.methods])

      useEffect(() => {
        if (account) {
          configQuery();
        }
      }, [isLoading, account,configQuery]);

    // useEffect(() => {
    //     connect()
    // }, [isLoading])

    useEffect(() => {
        //it will hide header and side bar on root route
        dispatch(updatePathName('/'))
        dispatch(updateLeftNavbarShow("Closed"));
        props.setBgMask(false)
    }, [dispatch])

    const handleEnterApp = () => {
        setAnimReverse(true);
        props.setBgMask(true);
        setTimeout(() => {
            dispatch(updatePathName('/deposits?from=landing'))
            dispatch(updateLeftNavbarShow("Opened"));
            dispatch(updateFromLandingPage(true));
            navigate("/deposits");
        }, 300);
    }

    return (
        <div className={`landing-content ${animReverse ? "anim-reverse" : ""}`}>
            <img src={LogoLP} className='w-[84px] md:w-[169px] mb-[20px]' alt='landingLogo'/>
            <p className='text-center text-[75px] leading-[75px] tracking-[2%] text-shadow-landing-page'>Move stars</p>
            <p className='w-full text-center text-[21px] leading-[27px] tracking-[0%] landing-description relative top-[15px]'>Making DeFi cash flow accessible.</p>
            <div className={classNames(
                'landing-btns',
            )}>
                <Tooltip 
                    title={<span>For crypto natives who want full control and optionality.</span>} placement="bottom"
                >
                    <button 
                        style={{
                            color: '#4A4D58',
                            fontSize: "14px",
                            backgroundColor: '#00FFF0',
                            borderColor: '#00FFF0',
                            border: "2px #00FFF0 solid",
                            height : '38px'
                        }}
                        onClick={handleEnterApp}
                        className={classNames(
                            rightLandingModalShow && 'hidden'
                        )}
                    >
                        Enter App
                    </button>
                </Tooltip>
                <span className="contain-available-soon flex flex-col justify-between h-[110px]">
                    <Tooltip title="For crypto culturalist’s who adore simplicity." placement="bottom">
                        {/* show-available-soon : this class will be removed in future */}
                        <button
                            className={classNames(
                                "show-available-soon",
                                rightLandingModalShow && 'hidden'
                            )}
                            // onClick={() => isActive && !isLoading ? setCloseBtn(false) : dispatch(updateWalletConnectModalShow(true))}
                            style={{color: '#00FFF0', backgroundColor: '#00FFF000', border: "2px #00FFF0 solid",height : '38px'}}>Preview Assets
                        </button>
                    </Tooltip>
                    <span 
                        style={{
                            backgroundColor: '#FFFFFF00',
                            color: '#FFFFFF',
                            fontSize: 18,
                            textShadow: '0px 0px 9px #FFFFFF'
                        }}
                        className="txt-available-soon"
                    >
                        Available soon
                    </span>
                </span>
                <BuyGuildModal config={config} connected={isActive && !isLoading} closeBtn={closeBtn} setCloseBtn={setCloseBtn} termsAgreed={termsAgreed} setTermsAgreed={setTermsAgreed} tab={tab} setTab={setTab} setIsContributed={props.setIsContributed}/>
            </div>
            {/* </span> */}
        </div>
    )
}

export default LandingPage;