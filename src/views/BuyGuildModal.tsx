import {
  Fragment,
  useEffect,
  useState,
  useRef,
  Dispatch,
} from "react";
import Button from "@mui/material/Button/Button";
import classNames from "classnames";
import Grid from "@mui/material/Unstable_Grid2";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { AbiItem } from "web3-utils";

import NavbarClose from "../assets/images/navbar-close.png";
import "../assets/scss/Content.scss";
// import useLocalStorage from "../hooks/useLocalStorage";
import {
  daiTokenContract,
  selectedRPC,
  SMALLEST,
  dgtContract,
  factoryContract,
  // LARGEST,
} from "../constants";
import { commas, decimal } from "../utils/parse";
import { div, multiple, num, gt } from "../utils/math";
import { DAI_ABI } from "../ABI";
import InputBox from "../components/InputBox";
import { updateRightNavbarMaxValue } from "../store/actions/navbarAction";
import { useDispatch } from "react-redux";
// import { updateWalletConnectModalShow } from "../store/actions/globalAction";


export default function BuyGuildModal({
  closeBtn,
  setCloseBtn,
  config,
  termsAgreed,
  setTermsAgreed,
  tab,
  setTab,
  setIsContributed
}: {
  closeBtn?: boolean;
  setCloseBtn: (status: boolean) => void;
  config: { min: number; max: number };
  connected?: boolean;
  termsAgreed:any;
  setTermsAgreed:any;
  tab? : 'TERMS'|'PURCHASE',
  setTab: any,
  setIsContributed: any
}) {

  
  const dispatch: Dispatch<any> = useDispatch();
  // const [termsAgreed, setTermsAgreed] = useLocalStorage("terms", false);
  const [result, setResult] = useState(""); /* eslint-disable-line */
  const [allowance, setAllowance] = useState<number | string | undefined>("0"); /* eslint-disable-line */
  const [error, setError] = useState(""); /* eslint-disable-line */
  const inputRef: any = useRef<HTMLInputElement>();
  const [amount, setAmount] = useState<string | number>("");
  const [availBalance, setAvailBalance] = useState("0");
  const [usdcBal, setUsdcBal] = useState("0");
  const [guildBal, setGuildBal] = useState("0");
  const { account } = useWeb3React();
  const web3 = new Web3(selectedRPC);
  const isLoading = false;
  const balance = div(availBalance, SMALLEST);
  const usdcBalance = div(usdcBal, SMALLEST);
  const min = gt(div(guildBal, SMALLEST), "") ? 1 : config.min;

  const validations = [
    amount && Number(amount) < min,
    amount && Number(multiple(amount, "2000")) > Number(usdcBalance),
    amount && Number(amount) > Number(config?.max),
  ].some((item) => item);

  const invalid = amount ? validations : false;
  const disabled = Number(amount) <= 0 || invalid;

  // useEffect(() => {
  //   // terms && setTab(!terms);
  //   termsAgreed ? setTab('PURCHASE') : setTab('TERMS')
  // }, [termsAgreed]);

  useEffect(() => {
    //set max limit for input as per asset selected 
    dispatch(updateRightNavbarMaxValue(123))
    return ()=>{
      updateRightNavbarMaxValue(0)
    }
  }, []);

  const initial = (contract?: string) =>
    new web3.eth.Contract(DAI_ABI as AbiItem[], contract);
  // const factory = new web3.eth.Contract(FACTORY_ABI as AbiItem[], factoryContract);
  const usdc = initial(dgtContract);
  const contract = initial(daiTokenContract);

  async function getBalance() {
    return await contract.methods.balanceOf(account).call();
  }

  async function getUsdcBalance() {
    return await usdc.methods.balanceOf(account).call();
  }

  async function maxBalance() {
    const value = gt(div(usdcBalance, "2000"), config.max)
      ? config.max
      : Math.floor(num(div(usdcBalance, "2000"))).toString();
    setAmount(value);
  }

  async function getAllowance() {
    const daiCont = new web3.eth.Contract(
      DAI_ABI as AbiItem[],
      daiTokenContract
    );
    return await daiCont.methods.allowance(account, factoryContract).call();
  }

  useEffect(() => {
    if (account) {
      getBalance().then((data) => {
        setAvailBalance(data);
        setUsdcBal(data);
      });
      getUsdcBalance().then((data) => {
        setGuildBal(data);
      });
      getAllowance().then((data) => {
        // @ts-ignore
        setAllowance(div(data, SMALLEST));
      });
    }
  }, [isLoading, account]);

  // const rightLandingModalShow = useSelector((state: RootState) => state.navbar.rightLandingModalShow);

  return (
    <Grid container className={classNames(
      "buy-guild-modal w-10/12 md:w-4/12 2xl:w-3/12 z-[15]  backdrop-blur-[17px] md:backdrop-blur-[8px]",
      // rightLandingModalShow && "invisible"
      closeBtn ? "translate-x-full" : ""
    )}
    >
      <div className='buy-guild-modal-border' />
      <Grid xs={12} md={12} className={"innerContainer"}>
        <img
          src={NavbarClose}
          className="close-guild"
          onClick={() => setCloseBtn(true)}
          alt=""
        />
        <div className="main-section flex modal-data mb-[10px]">
          {/* <div className="modal-content">
            <p className="title">Round 1</p>
            {connected ? <p className="address">{truncate(account ?? "")}</p> :
                            <p onClick={() => dispatch(updateWalletConnectModalShow(true))}
                               className="connectWallet">Connect</p>}
          </div> */}
          {result.length <= 0 && (
            <Fragment>
              {/* <div className="description">
                  <p className={"caption"}>Use DAI to pre-purchase Guild NFTs</p>
                  <p className="discount">Discount: 80%</p>
                  <p className="cost">
                      Cost: 10,000 less 80% = <span>2,000 per Guild NFT</span>
                  </p>
              </div> */}
              <div className="tabs mr-[30px] mb-[48px] ml-[30px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]">
                {
                  tab === 'PURCHASE' &&
                  <p
                  onClick={() => setTab('PURCHASE')}
                  className={tab === 'PURCHASE' ? "active" : ""}
                >
                  Purchase
                </p>}
                {
                tab === 'TERMS' &&
                <p
                  onClick={() => setTab('TERMS')}
                  className={tab === 'TERMS' ? "active" : ""}
                >
                  Terms
                </p>
                }
              </div>
              {tab === 'TERMS' && (
                <div className="tab-data mr-[10px] md:mr-[30px] ml-[40px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]">
                  <div className="tab-data-content">
                    <p className="lighter text-[18px]">Reserve 'Guild NFTs'</p>
                    <p className="lighter text-[27px] mb-[10px] leading-normal">Terms Per: Guild NFT</p>
                    <div className="my-[22px] flex flex-col items-end">
                      <div>
                        <div className="flex justify-between gap-5">
                          <p className="lighter text-left whitespace-nowrap">Rise discount:</p>
                          <p className="colored whitespace-nowrap">80%</p>
                        </div>
                        <div className="flex justify-between gap-5">
                          <p className="lighter text-left whitespace-nowrap">Term length:</p>
                          <p className="colored whitespace-nowrap">12+24 months</p>
                        </div>
                        <div className="flex justify-between gap-5">
                          <p className="lighter text-left whitespace-nowrap">Expected ROI:</p>
                          <p className="colored whitespace-nowrap">min' 400%</p>
                        </div>
                      </div>
                    </div>
                    <p className="">
                      <p>Conditions :</p>
                      A Guild NFT is equal to one (1) Debt Bond - <br/>
                      Each Debt Bond will supply 10k 3GDT tokens - <br/>
                      Supply begins when ' The Guild ' is launched - <br/>
                      The Guild is expected <span className="lighter">12 months</span> post raise - <br/>
                      1st : supply is held for <span className="lighter">30 days</span> , (the ' cliff ') - <br/>
                      Then : supply is vested linearly over <span className="lighter">23 months</span> - <br/>
                      Each 10k 3GDT , if locked , may mint 1 Guild NFT - <br/><br/>
                      Only DAI will be used to purchase debt bonds - <br/>
                      Minimum purchase is 1 debt bond (2k DAI) - <br/>
                      Maximum purchase is 250 debt bonds (500k DAI) - <br/><br/>
                      Cost per debt bond : <br/>
                      10,000 DAI, less 80 % = 2,000 DAI.<br/><br/>
                      <p className="lighter">Example :</p>
                      100 debt bonds purchased for 200,000 DAI<br/> 
                      100 debt bonds = 1 million 3GDT at 10k 3GDT/bond<br/>
                      1 million 3GDT distributed linearly over 24 months<br/>
                      <span className="lighter">If 3GDT are stacked , balance is converted to FRAX</span><br/>
                      ( Conversion rate is 1 : 1 , " yielding an ROI of
                      400 % )<br/><br/>
                      <span className="lighter">Or each 10k 3GDT locked may mint 1 Guild NFT</span><br/>
                      (Guild NFTs receive voting rights and profit share )<br/><br/>
                      <span className="colored">*See pitch deck for more details</span>
                    </p>
                    <div>
                      <Button
                        disabled={termsAgreed}
                        onClick={() => {
                          setIsContributed(true)
                          // localStorage.setItem('userContributed',"true")
                          setTermsAgreed(true)
                        }}
                        variant="contained"
                        className="agreeBtn"
                        sx={{
                          color: "#4A4D58",
                          fontSize: "14px",
                          backgroundColor: "#00FFF0",
                          borderColor: "#00FFF0",
                          border: "2px #00FFF0 solid",
                        }}
                      >
                        {!termsAgreed
                          ? "I agree to terms, let’s buy NFTs"
                          : "You have already agreed to terms"}
                      </Button>
                      {termsAgreed && <Button
                        onClick={() => setTab('PURCHASE')}
                        variant="contained"
                        className="agreeBtn"
                        sx={{
                          color: "#00FFFF!important",
                          fontSize: "14px",
                          backgroundColor: "transparent!important",
                          boxShadow: "none",
                          marginTop: "0!important",
                          paddingTop: "0!important",
                          "&:hover": {
                            boxShadow: "none",
                          }
                        }}
                      >
                        Buy debt bonds to reserve Guild NFTs
                      </Button>}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'PURCHASE' && (
                <>
                <div className="tab-data-2">
                    <div>
                    <p className="text-[18px]">Buy debt bonds to reserve Guild NFTs</p><br></br>
                    <p className="text-[27px]">Raise discount: 80%</p><br></br>
                    <table className="w-[100%]">
                      <tr>
                        <td>Cost in DAI:(Each)</td>
                        <td className="text-[#00FFF0]">2,000</td>
                      </tr>
                      <tr>
                        <td>Debt bonds held:</td>
                        <td className="text-[#00FFF0]">0</td>
                      </tr>
                      <tr>
                        <td>Max purchase limit:</td>
                        <td className="text-[#00FFF0]">500</td>
                      </tr>
                    </table>
                    </div><br></br>
                  <div className="how-many">
                    <p>How many NFTs would you like to purchase?</p>
                    <p>
                      Minimum: {min} Debt bond, Maximum: {config?.max}
                    </p>
                  </div>
                  <div className="balance">
                    <p>Wallet balance:</p>
                    <p>{commas(decimal(balance, 6))} DAI</p>
                  </div>
                  <div className="how-many-3">
                    <div className={"maxBalance"}>
                      <label>Purchase limit based on DAI balance:</label>
                      <span>
                        
                          123
                        
                      </span>
                    </div>                     
                  </div>
                    <InputBox 
                      adornmentText={"Guild NFTs:"}
                      validationText={""} 
                    />
                  {termsAgreed && (
                    <Fragment>
                      <div className={"summary"}>
                        <h2>Purchase Summary</h2>
                        {disabled ? (
                          <p>
                            Please state how many Guild NFTs you wish to
                            <br /> purchase in order to proceed.
                          </p>
                        ) : (
                          <p>
                            You are about to purchase {amount} Guild NFTs
                            <br />
                            At a cost of 2,000 DAI each ={" "}
                            {commas(multiple(amount, "2000"))} DAI
                          </p>
                        )}
                        <p className={"success"}>{result}</p>
                      </div>
                        <p className={"error"}>{error}</p>
                        {/* <span className="text-[#00FFF0] cursor-pointer" onClick={()=>{setTab('TERMS')}}>
                          {
                            termsAgreed ? "Terms agreed" : "See terms"
                          }
                        </span> */}
                        <div style={{
                              // background:"rgba(255,0,0,.5)",
                              position:"absolute",
                              width:'80%',
                              bottom:'0px',
                              textAlign:'right',
                            }}>
                        </div>
                    </Fragment>
                  )}
                </div>
                </>
              )}
            </Fragment>
          ) }
        </div>
        
      </Grid>
      
      {tab === 'PURCHASE' && 
      <div 
        className="Action-button-container"
      >
      <Button
        disabled={false}
        onClick={() => {return}}
        variant="contained"
        className={classNames(
          "agreeBtn"
        )}
        sx={{
          color: "#4A4D58",
          fontSize: "14px",
          backgroundColor: "#00FFF0",
          borderColor: "#00FFF0",
          border: "2px #00FFF0 solid",
        }}
      >
        Buy Guild NFTs
      </Button>
      </div>}
    </Grid>
  );
}
