import React, { useCallback, useEffect, useState } from "react";
import useABI from "./useABI";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { SMALLEST } from "../constants";
import useGetBalances from "./useGetBalances";

function useDepositPageStatsData() {

  const {bentBalance,bentCVXBalance} = useGetBalances()
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const isTransactionInitiated = useSelector(
    (state: RootState) => state.global.isTransactionInitiated
  ); //refetch data after any transaction
  const [USDsInBent, setUSDsInBent] = useState<any>(null);
  const [USDsInCVX, setUSDsInCVX] = useState<any>(null);
  const [TVL, setTVL] = useState<any>({});
  const [APR, setAPR] = useState<any>({});

  const [bentCDPTotalSupplyValue, setBentCDPTotalSupply] = useState<any>(null);
  const [bent3FiTotalSupplyValue, setBent3FiTotalSupply] = useState<any>(null);
  const [bentCDPRewardPoolValue, setBentCDPRewardPool] = useState<any>(null);
  const [bent3FiRewardPoolValue, setBent3FiRewardPool] = useState<any>(null);
  const [bentCvxCDPTotalSupplyValue, setBentCvxCDPTotalSupply] =
    useState<any>(null);
  const [bentCvxCDPRewardPoolValue, setBentCvxCDPRewardPool] =
    useState<any>(null);
  const [bentCDPWindowLenValue, setBentCDPwindowLen] = useState<any>(null);
  const [bentCvxCDPWindowLenValue, setBentCvxCDPwindowLen] =
    useState<any>(null);

  const {
    bentCDPTotalSupply,
    bentCDPrewardPools,
    benConvexCCDPTotalSupply,
    bentConvexCDPrewardPools,
    bentConvexCDPwindowLen,
    bentCDPwindowLen,
    bent3FiTotalSupply,
    bent3FirewardPools,
  } = useABI();

  async function getExchangeRateInUSD(id: any) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
      {}
    );
    const json = await response.json();
    return json;
  }

  const fetchPageData = () => {
    // if (walletConnected === "Disconnected") {
    bentCDPTotalSupply().then((res) => {
      // console.log("bentCDPTotalSupply:", res);
      setBentCDPTotalSupply(res);
    });
    bent3FiTotalSupply().then((res) => {
      // console.log("bent3FiTotalSupply:", res);
      setBent3FiTotalSupply(res);
    });
    bent3FirewardPools().then((res) => {
      // console.log("bent3FirewardPools:", res);
      setBent3FiRewardPool(res);
    });
    bentCDPrewardPools().then((res) => {
      // console.log("bentCDPrewardPools:", res);
      setBentCDPRewardPool(res);
    });
    benConvexCCDPTotalSupply().then((res) => {
      // console.log("benCVXCCDPTotalSupply:", res);
      setBentCvxCDPTotalSupply(res);
    });
    bentConvexCDPrewardPools().then((res) => {
      // console.log("bentCVXCDPrewardPools:", res);
      setBentCvxCDPRewardPool(res);
    });
    bentConvexCDPwindowLen().then((res) => {
      // console.log("bentConvexCDPwindowLen:", res);
      setBentCvxCDPwindowLen(res);
    });
    bentCDPwindowLen().then((res) => {
      // console.log("bentCDPwindowLen:", res);
      setBentCDPwindowLen(res);
    });

    getExchangeRateInUSD("bent-finance").then((res) => {
      //   console.log("usd:", res);
      setUSDsInBent(res["bent-finance"].usd);
    });
    getExchangeRateInUSD("convex-finance").then((res) => {
      //   console.log("usd:", res);
      setUSDsInCVX(res["convex-finance"].usd);
    });
    // }
  };

  const getTVL = useCallback(() => {
    const bentCDPTVL = (bentCDPTotalSupplyValue / SMALLEST) * USDsInBent;

    const bentConvexCDPTVL =
    (bentCvxCDPTotalSupplyValue / SMALLEST) * USDsInCVX;

    const bent3FiTVL = ((bent3FiTotalSupplyValue/SMALLEST) * USDsInBent) + ((bent3FiTotalSupplyValue/SMALLEST) * USDsInCVX);
    // console.log("bent3FiTotalSupplyValue:",bent3FiTotalSupplyValue);
    // console.log("bent3FiTVL:",bent3FiTVL);
      setTVL({
        bentCDPTVL: bentCDPTVL,
        bentConvexCDPTVL: bentConvexCDPTVL,
        bent3FiTVL:bent3FiTVL,
      })
    // return {
    //   bentCDPTVL: bentCDPTVL,
    //   bentConvexCDPTVL: bentConvexCDPTVL,
    // };
  }, [
    USDsInBent,
    USDsInCVX,
    bentCDPTotalSupplyValue,
    bentCvxCDPTotalSupplyValue,
    bent3FiTotalSupplyValue,
  ]);

  const getCDPRewardsAPR = useCallback(() => {
    let bentCDPAPR = 0;
    let bentConvexCDPAPR = 0;
    let bent3FiAPR = 0;
    const getBentCDPAPR = () => {
      const rewardRate = Number(bentCDPRewardPoolValue?.rewardRate);
      const rewardPerDay = (rewardRate / 1e36 / SMALLEST) * 7200;
      const rewardPerDayinUST = rewardPerDay * USDsInBent;
      const APRPercent = (rewardPerDayinUST / TVL.bentCDPTVL) * 365;
      return APRPercent;
    };
    const getBentConvexCDPAPR = () => {
      const rewardRate = Number(bentCvxCDPRewardPoolValue?.rewardRate);
      const rewardPerDay = (rewardRate / 1e36 / SMALLEST) * 7200;
      const rewardPerDayinUST = rewardPerDay * USDsInCVX;
      const APRPercent = (rewardPerDayinUST / TVL.bentConvexCDPTVL) * 365;
      return APRPercent;
    };
    const getBent3FiAPR = () => {
    // Todo: need to be reviewed
    let rewardRateBent = Number(bent3FiRewardPoolValue?.rewardPoolsBentCVX?.rewardRate);
    let rewardRateCVX = Number(bent3FiRewardPoolValue?.rewardPoolsCVX?.rewardRate);
    
    rewardRateBent  = (rewardRateBent / 1e36 / SMALLEST) * 7200
    rewardRateCVX = (rewardRateCVX/ 1e36 / SMALLEST) * 7200
    const totalRewardPerDay = (rewardRateBent * USDsInBent) + (rewardRateCVX * USDsInCVX)

    const APRPercent = (totalRewardPerDay / TVL.bent3FiTVL) * 365

    return APRPercent;
    };

    bentCDPAPR = getBentCDPAPR();
    bentConvexCDPAPR = getBentConvexCDPAPR();
    bent3FiAPR = getBent3FiAPR();

    setAPR({
      bentCDPAPR: bentCDPAPR,
      bentConvexCDPAPR: bentConvexCDPAPR,
      bent3FiAPR: bent3FiAPR,
    })
    // return {
    //   bentCDPAPR: bentCDPAPR,
    //   bentConvexCDPAPR: bentConvexCDPAPR,
    // };
  }, [
    USDsInBent,
    USDsInCVX,
    bentCDPRewardPoolValue?.rewardRate,
    bentCvxCDPRewardPoolValue?.rewardRate,
    // getTVL,
    TVL.bentCDPTVL,
    TVL.bentConvexCDPTVL,
    TVL.bent3FiTVL,
    bent3FiRewardPoolValue?.rewardPoolsBentCVX?.rewardRate,
    bent3FiRewardPoolValue?.rewardPoolsCVX?.rewardRate,
  ]);

  useEffect(() => {
    fetchPageData();
    getTVL()
    
  }, []);

  useEffect(() => {
    fetchPageData();
    getTVL()
    getCDPRewardsAPR()
  }, [walletConnected, isTransactionInitiated,getCDPRewardsAPR,getTVL]);

  //hook's return value
  return {
    // getTVL: getTVL,
    // getCDPRewardsAPR: getCDPRewardsAPR,
    TVL:TVL,
    APR:APR,
    LB:{
      bentBalance,
      bentCVXBalance,
    }
  };
}
export default useDepositPageStatsData;
