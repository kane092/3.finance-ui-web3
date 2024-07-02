import React, { useEffect, useCallback, useState } from "react";
import useABI from "./useABI";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function useGetBalances() {
  const {
    getBentCDPBalance,
    getBentBalance,
    getBent3Balance,
    getBentCVXBalance,
    getBentCVX3Balance,
    getConvexCDPBalance,
    getBent3FiBalance,
    getDAIBalance,
  } = useABI();

  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);

  const isTransactionInitiated = useSelector((state: RootState) => state.global.isTransactionInitiated);//refetch data after any transaction

  const [bentCDPBalance, setBentCDPBalance] = useState<any>("0");
  const [convexCDPBalance, setConvexCDPBalance] = useState<any>("0");

  const [bentBalance, setBentBalance] = useState<any>(0);
  const [_Bent3Balance, set_Bent3Balance] = useState<any>("0");

  const [bentCVXBal, setBentCVXBal] = useState<any>("0");
  const [bentCVX3Bal, setBentCVX3Bal] = useState<any>("0");

  const [bent3FiBalance, setBent3FiBalance] = useState<any>("0");
  const [DAIBalance, setDAIBalance] = useState<any>("0");

  const GetDAIBalance = async () => {
    const DAIBalance = await getDAIBalance();
    return DAIBalance;
  };
  const getBENTcdpBalance = async () => {
    const bentCdpBalance = await getBentCDPBalance();
    // console.log("BENT-CDP BAlance-withdraw:", bentCdpBalance);
    return bentCdpBalance;
  };
  const GetConvexcdpBalance = async () => {
    const convexCdpBalance = await getConvexCDPBalance();
    // console.log("CONVEX-CDP BAlance-withdraw:", convexCdpBalance);
    return convexCdpBalance;
  };
  const getBENTBalance = async (): Promise<any> => {
    const bentBalance = await getBentBalance();
    // console.log("BENT Balance-deposit:", bentBalance);
    return bentBalance;
  };
  const GetBENT3Balance = async () => {
    const bent3Balance = await getBent3Balance();
    // console.log("3vlBENTBalance-withdraw:", bent3Balance);
    return bent3Balance;
  };
  const GetBENTCVXBalance = async () => {
    const bentCVXBalance = await getBentCVXBalance();
    // console.log("BENT-CVX-Balance-for-deposit:", bentCVXBalance);
    return bentCVXBalance;
  };
  const GetBentCVX3Balance = async () => {
    const bentCVX3Balance = await getBentCVX3Balance();
    // console.log("BENT-CVX3-Balance-for-Withdraw:", bentCVX3Balance);
    return bentCVX3Balance;
  };
  const GetBent3FiBalance = async () => {
    const bent3FiBalance = await getBent3FiBalance();
    // console.log("BENT-CVX3-Balance-for-Withdraw:", bent3FiBalance);
    return bent3FiBalance;
  };

  const init = () => {
    GetDAIBalance()
      .then((res) => {
        setDAIBalance(res);
      })
      .catch((e) => {
        console.error(e);
      });
    getBENTcdpBalance()
      .then((res) => {
        setBentCDPBalance(res);
      })
      .catch((e) => {
        console.error(e);
      });
      GetConvexcdpBalance()
      .then((res) => {
        setConvexCDPBalance(res);
      })
      .catch((e) => {
        console.error(e);
      });

    getBENTBalance()
      .then((res) => {
        setBentBalance(Number(res));
      })
      .catch((e) => {
        console.error(e);
      });

    GetBENT3Balance()
      .then((res) => {
        set_Bent3Balance(res);
      })
      .catch((e) => {
        console.error(e);
      });

    GetBENTCVXBalance()
      .then((res) => {
        setBentCVXBal(res);
      })
      .catch((e) => {
        console.error(e);
      });

    GetBentCVX3Balance()
      .then((res) => {
        setBentCVX3Bal(res);
      })
      .catch((e) => {
        console.error(e);
      });

    GetBent3FiBalance()
      .then((res) => {
        setBent3FiBalance(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    init()
  }, []);

  useEffect(() => {
    init()
  }, [isTransactionInitiated,walletConnected]);

  return {
    bentCDPBalance: bentCDPBalance,
    convexCDPBalance: convexCDPBalance,
    bentBalance: bentBalance,
    bent3Balance: _Bent3Balance, 
    bentCVXBalance: bentCVXBal,
    bentCVX3Balance: bentCVX3Bal,
    bent3FiBalance: bent3FiBalance,
    DAIBalance : DAIBalance,

    GetBENTCVXBalance:GetBENTCVXBalance,
  };
}

export default useGetBalances;
