import React, {
  useState,
  useEffect,
  UIEvent,
  useRef,
  useCallback,
  useMemo,
  lazy,
} from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";
import classNames from "classnames";
// import { InjectedConnector } from "@web3-react/injected-connector";
// import Web3 from "web3";

import { RootState } from "./store/store";
import {
  updateFromLandingPage,
  updatePathName,
  updateWalletConnected,
} from "./store/actions/globalAction";
// import LandingPage from "./views/LandingPage";
import Dashboard from "./views/Dashboard";
import Deposits from "./views/Deposits";
import Emissions from "./views/Emissions";
import MoneyApps from "./views/MoneyApps";
import Header from "./components/Header/Header";
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import WalletConnectModal from "./views/WalletConnectModal";

import BackgroundLPsCrosshairsOnload from "./assets/images/background-lps-crosshairs-onload.png";
import BackgroundLPsInsidering from "./assets/images/background-lps-insidering.png";
import BackgroundLPsOutsidering from "./assets/images/background-lps-outsidering.png";
import BackgroundMissionWorld from "./assets/images/background-mission-world.png";
import BackgroundWealthWorld from "./assets/images/background-wealth-world.png";
import BackgroundWorkWorld from "./assets/images/background-work-world.png";
import BackgroundCommunityWorld from "./assets/images/background-community-world.png";
import "./assets/scss/App.scss";
import "./assets/scss/Content.scss";
import useMetaMask from "./hooks/metaMask";
import {
  updateDepositData,
  updateRightLandingModalShow,
} from "./store/actions/navbarAction";
import Footer from "./components/Footer/Footer";
import Fundraise from "./components/Fundraise";
import useSize from "./hooks/useSize";
// import useLocalStorage from "./hooks/useLocalStorage";

const LandingPage = lazy(() => import("./views/LandingPage"));

const Routes_ = () => {
  const { account } = useMetaMask();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch: Dispatch<any> = useDispatch();
  const pathName = useSelector((state: RootState) => state.global.pathName);
  const rightLandingModalShow = useSelector(
    (state: RootState) => state.navbar.rightLandingModalShow
  );
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const subTabSelected = useSelector(
    (state: RootState) => state.navbar.rightNavbarSubTabSelected
  );
  const fieldSelected = useSelector(
    (state: RootState) => state.global.fieldSelected
  );
  const [closeBtn, setCloseBtn] = useState(!rightLandingModalShow); // to open right modal on landing page
  // const  isContributed = [true,false][(Math.floor(Math.random() * [0,1].length))]; //rendom select true or false (it will be decided by contract)
  const [isContributed, setIsContributed] = useState<any>(false);
  const size = useSize();

  // useEffect(()=>{
  //   setIsContributed(localStorage.getItem('userContributed'))
  // },[])
  // const [terms, setTerms] = useLocalStorage("terms", isContributed?true:false);
  const [termsAgreed, setTermsAgreed] = useState(isContributed ? true : false);
  type tabsType = "TERMS" | "PURCHASE";
  const [tab, setTab] = useState<tabsType>("TERMS");

  // const walletConnectModalShow = useSelector((state: RootState) => state.global.walletConnectModalShow);
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );
  const fromLandingPage = useSelector(
    (state: RootState) => state.global.fromLandingPage
  );

  const [showHeaderSticky, setShowHeaderSticky] = useState(false);
  const [leftNavbarGrid, setLeftNavbarGrid] = useState(0);
  const [bodyContentGrid, setBodyContentGrid] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [bgMask, setBgMask] = useState(false);

  useEffect(() => {
    dispatch(updateRightLandingModalShow(!closeBtn));
  }, [dispatch, closeBtn]);

  // useEffect(() => {
  //   //Todo: auto connect wallet on hard reload
  //   dispatch(updateWalletConnected("Connected"))
  // }, [dispatch]);

  const initGrid = useCallback(async () => {
    if (
      pathName.length > 13 &&
      pathName.slice(pathName.length - 13, pathName.length) ===
        "?from=landing" &&
      fromLandingPage
    ) {
      setTimeout(() => {
        dispatch(updateFromLandingPage(false));
        setLeftNavbarGrid(4);
        setBodyContentGrid(8);
      }, 900);
      return;
    }
    switch (leftNavbarShow) {
      case "Closed":
        setLeftNavbarGrid(0);
        setBodyContentGrid(12);
        break;
      case "Opened":
        // setLeftNavbarGrid(1);
        // setBodyContentGrid(10);
        // setTimeout(() => {
        setLeftNavbarGrid(4);
        setBodyContentGrid(8);
        // }, 1500)
        break;
      case "Collapsed":
        setLeftNavbarGrid(1);
        setBodyContentGrid(10);
        break;
      case "Minimized":
        switch (rightNavbarShow) {
          case "Opened":
            setLeftNavbarGrid(1);
            setBodyContentGrid(8);
            break;
          case "Minimized":
            setLeftNavbarGrid(1);
            setBodyContentGrid(10);
            break;
        }
        break;
    }

    /**
     * For landing page
     * leftNavbarGrid: 0 BodyContentGrid: 12
     */
    if (pathName === "/") {
      setLeftNavbarGrid(0);
      setBodyContentGrid(12);
    }
  }, [leftNavbarShow, pathName, rightNavbarShow, fromLandingPage]);

  const initPathName = useCallback(() => {
    /**
     * Prevent default background image select when refresh on the other pages
     */
    dispatch(updatePathName(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    initGrid();
  }, [pathName, leftNavbarShow, rightNavbarShow, initGrid]);

  useEffect(() => {
    initPathName();
    const onPageLoad = () => {
      setIsPageLoaded(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [initPathName]);

  const handleUIEvent = (event: UIEvent<HTMLDivElement>) => {
    if (ref.current?.scrollTop && ref.current?.scrollTop > 120) {
      setShowHeaderSticky(true);
    } else {
      setShowHeaderSticky(false);
    }
  };

  const leftNavbarWidth = ((leftNavbarGrid / 12) * 100).toFixed(2) + "%";
  const bodyContentWidth = ((bodyContentGrid / 12) * 100).toFixed(2) + "%";

  return (
    <>
      <Router>
        <div
          className={classNames(
            "App",
            pathName === "/mission" ||
              pathName === "/wealth" ||
              pathName === "/work" ||
              pathName === "/community"
              ? "App-LPs"
              : ""
          )}
          onScroll={handleUIEvent}
          ref={ref}
        >
          {(pathName === "/mission" ||
            pathName === "/wealth" ||
            pathName === "/work" ||
            pathName === "/community") && (
            <>
              <div className="w-screen h-screen flex justify-center items-center fixed z-[12]">
                <img
                  alt=""
                  className="fixed transition-all duration-900"
                  src={BackgroundLPsOutsidering}
                  style={
                    pathName === "/mission"
                      ? { transform: "rotate(0deg)" }
                      : pathName === "/wealth"
                      ? { transform: "rotate(135deg)" }
                      : pathName === "/work"
                      ? { transform: "rotate(225deg)" }
                      : { transform: "rotate(90deg)" }
                  }
                />
                <img
                  alt=""
                  className="fixed transition-all duration-900 opacity-80"
                  src={BackgroundLPsInsidering}
                  style={
                    pathName === "/mission"
                      ? { transform: "rotate(0deg)" }
                      : pathName === "/wealth"
                      ? { transform: "rotate(-45deg)" }
                      : pathName === "/work"
                      ? { transform: "rotate(-135deg)" }
                      : { transform: "rotate(-270deg)" }
                  }
                />
                <img
                  alt=""
                  className="fixed"
                  src={
                    pathName === "/mission"
                      ? BackgroundMissionWorld
                      : pathName === "/wealth"
                      ? BackgroundWealthWorld
                      : pathName === "/work"
                      ? BackgroundWorkWorld
                      : BackgroundCommunityWorld
                  }
                />
                <img
                  src={BackgroundLPsCrosshairsOnload}
                  className="fixed mt-[38px] ml-[38px]"
                  alt=""
                />
                {/* <img src={BackgroundLPsGrid} className='fixed' alt='' /> */}
              </div>
            </>
          )}

          <>
            {
              // Do not show header with coming soon page
              // pathName !== "/" &&
              <Header
                leftNavbarGrid={leftNavbarGrid}
                bodyContentGrid={bodyContentGrid}
                showHeaderSticky={showHeaderSticky}
                walletID={account}
              />
            }

            {pathName === "/" && walletConnected === "Connected" && (
              <Fundraise
                rightLandingModalShow={rightLandingModalShow}
                termsAgreed={termsAgreed}
                setCloseBtn={setCloseBtn}
                setTab={setTab}
              />
            )}
          </>

          <LeftNavbar leftNavbarGrid={leftNavbarGrid} />

          <hr className="w-full fixed top-[80px] border-[#A7A8AB]/[0.22]" />

          <Grid
            container
            className={`min-h-screen duration-900 flex ${
              bgMask ? "bg-mask" : ""
            }`}
          >
            <div
              style={
                size === "xs" || size === "sm"
                  ? { width: 0 }
                  : { width: leftNavbarWidth }
              }
              className="min-h-screen, transition-all duration-900"
            />
            <div
              style={
                size === "xs" || size === "sm"
                  ? { width: "100%" }
                  : { width: bodyContentWidth }
              }
              className={
                !isPageLoaded
                  ? "App-Content mt-[90px!important] transition-all duration-900"
                  : "App-Content mt-[90px!important] transition-all duration-900"
              }
            >
              <Routes>
                {/* <Route path='/' element={<ComingSoon />} /> */}
                <Route
                  path="/"
                  element={
                    <React.Suspense
                      fallback={
                        <>
                          <span
                            style={{ position: "absolute", bottom: "15vh" }}
                          >
                            Loading App.....
                          </span>
                        </>
                      }
                    >
                      <LandingPage
                        closeBtn={closeBtn}
                        setCloseBtn={setCloseBtn}
                        termsAgreed={termsAgreed}
                        setTermsAgreed={setTermsAgreed}
                        tab={tab}
                        setTab={setTab}
                        setIsContributed={setIsContributed}
                        setBgMask={setBgMask}
                      />
                    </React.Suspense>
                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/deposits" element={<Deposits />} />
                <Route path="/emissions" element={<Emissions />} />
                <Route path="/moneyapps" element={<MoneyApps />} />
              </Routes>
            </div>
          </Grid>

          <RightNavbar />

          {/* <Footer /> */}

          <WalletConnectModal />
          {/* {walletConnectModalShow && <WalletConnectModal />} */}
        </div>
      </Router>
    </>
  );
};

export default Routes_;
