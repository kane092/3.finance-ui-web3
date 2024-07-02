import React, { useEffect, useCallback, useState } from "react";
import useMetaMask from "./metaMask";
import useABI from "./useABI";
import { Bent3Fi, BentAddress, BentCDPContractAddr, ConvexCDPContractAddr, SMALLEST, bent3ContractAddress, bentCVXcdp, bentCVX3Address } from "../constants";
import { ethers } from "ethers";
// import BigNumber from "bignumber.js";

function useDepositAndWithdraw() {
  const {
    approveBent,
    depositBent,
    withdrawBent,
    allowanceBent,
    depositBentConvex,
    withdrawBentConvex,
    approveBentCVX,
    allowanceBentCVX,

    mintBent3Fi,
    allowanceBent3,
    allowanceBentCVX3,
    approveBentCVX3,
    approveBent3,
    burnBent3FiToken,
    // approveConvex,
    // allowanceConvex,
  } = useABI();

  const {
    sendTransaction,
    // signTransaction,
    // getWalletBalance,
  } = useMetaMask();

  const depositBENT = async (amount: string) => {
    const callData = await depositBent(amount);
    return callData;
  };
  const withdrawBENT = async (amount: bigint) => {
    const callData = await withdrawBent(amount);
    return callData;
  };

  const depositBentCVX = async (amount: string) => {
    const callData = await depositBentConvex(amount);
    return callData;
  };
  const withdrawBentCVX = async (amount: bigint) => {
    const callData = await withdrawBentConvex(amount);
    return callData;
  };
  const burnBent3Fi = async (amount: bigint) => {
    const callData = await burnBent3FiToken(amount);
    return callData;
  };
  const mintBent3FiToken = async (amount: string) => {
    const callData = await mintBent3Fi(amount);
    return callData;
  };
  //__________________________________________________________

  const handleDepositBENT = async (userInputAmt: number) => {
    // const userInputAmt = 3;
    // window.alert(`${userInputAmt} ${typeof userInputAmt}`)
    const convertedValue = ethers.parseEther(`${userInputAmt}`);

    const approvedAmount = BigInt(await allowanceBent(BentCDPContractAddr));
    if (convertedValue <= approvedAmount) {
      const depositCallData = await depositBENT(convertedValue.toString());
      const depositStatus: any = await sendTransaction(BentCDPContractAddr, depositCallData);
      if (!depositStatus.status) {
        console.error("DepositError:", depositStatus.error.message);
        return;
      } else {
        console.log("DepositRespanse:", depositStatus.response);
      }
    } else {
      const approveCallData = await approveBent(BentCDPContractAddr, convertedValue.toString());
      const approvalStatus: any = await sendTransaction(BentAddress, approveCallData);
      if (!approvalStatus.status) {
        console.error("approvalError:", approvalStatus.error.message);
        return;
      } else {
        console.log("approvalRespanse:", approvalStatus.response);
        const depositCallData = await depositBENT(convertedValue.toString());
        const depositStatus: any = await sendTransaction(BentCDPContractAddr, depositCallData);
        if (!depositStatus.status) {
          console.error("DepositError:", depositStatus.error.message);
          return;
        } else {
          console.log("DepositRespanse:", depositStatus.response);
        }
      }
    }
    // console.log('deposit:',depositStatus)
    // await signTransaction(approveCallData)
    // window.alert(await getWalletBalance())
  };

  const handleWithdrawBENT = async (userInputAmt: number) => {
    const withdrawCallData = await withdrawBENT(ethers.parseEther(`${userInputAmt}`));
    const withdrawStatus: any = await sendTransaction(BentCDPContractAddr, withdrawCallData);
    if (!withdrawStatus.status) {
      console.error("withdrawError:", withdrawStatus.error.message);
      return;
    } else {
      console.log("withdrawRespanse:", withdrawStatus.response);
    }
  };

  const handleDepositBentCVX = async (userInputAmt: number) => {
    // const userInputAmt = 3;
    const approvedAmount = BigInt(await allowanceBentCVX(ConvexCDPContractAddr));
    const convertedValue = ethers.parseEther(`${userInputAmt}`);
    if (convertedValue <= approvedAmount) {
      const depositCallData = await depositBentCVX(convertedValue.toString());
      const depositStatus: any = await sendTransaction(ConvexCDPContractAddr, depositCallData);
      if (!depositStatus.status) {
        console.error("DepositError:", depositStatus.error.message);
        return;
      } else {
        console.log("DepositRespanse:", depositStatus.response);
      }
    } else {
      const approveCallData = await approveBentCVX(ConvexCDPContractAddr, convertedValue.toString());
      // console.log("else:", approveCallData);
      const approvalStatus: any = await sendTransaction(bentCVXcdp, approveCallData);
      if (!approvalStatus.status) {
        console.error("approvalError:", approvalStatus.error.message);
        return;
      } else {
        console.log("approvalRespanse:", approvalStatus.response);
        const depositCallData = await depositBentCVX(convertedValue.toString());
        const depositStatus: any = await sendTransaction(ConvexCDPContractAddr, depositCallData);
        if (!depositStatus.status) {
          console.error("DepositError:", depositStatus.error.message);
          return;
        } else {
          console.log("DepositRespanse:", depositStatus.response);
        }
      }
    }
    // console.log('deposit:',depositStatus)
    // await signTransaction(approveCallData)
    // window.alert(await getWalletBalance())
  };

  const handleWithdrawBentCVX = async (userInputAmt: number) => {
    const withdrawCallData = await withdrawBentCVX(ethers.parseEther(`${userInputAmt}`));
    const withdrawStatus: any = await sendTransaction(ConvexCDPContractAddr, withdrawCallData);
    if (!withdrawStatus.status) {
      console.error("withdrawError:", withdrawStatus.error.message);
      return;
    } else {
      console.log("withdrawRespanse:", withdrawStatus.response);
    }
  };
  const handleBurnBent3FiToken = async (userInputAmt: number) => {
    const burnCallData = await burnBent3Fi(ethers.parseEther(`${userInputAmt}`));
    const burnStatus: any = await sendTransaction(Bent3Fi, burnCallData);
    if (!burnStatus.status) {
      console.error("withdrawError:", burnStatus.error.message);
      return;
    } else {
      console.log("withdrawRespanse:", burnStatus.response);
    }
  };

  const handleMintBent3FiToken = async (userInputAmt: number) => {
    // const userInputAmt = 3;
    // window.alert(`${userInputAmt} ${typeof userInputAmt}`)

    const approvedAmountBent3 = BigInt(await allowanceBent3(Bent3Fi));
    const approvedAmountBentCVX3 = BigInt(await allowanceBentCVX3(Bent3Fi));
    const convertedValue = ethers.parseEther(`${userInputAmt}`);


    if (convertedValue <= approvedAmountBent3 && convertedValue <= approvedAmountBentCVX3) {
      const depositCallData = await mintBent3FiToken(convertedValue.toString());
      const depositStatus: any = await sendTransaction(Bent3Fi, depositCallData);
      if (!depositStatus.status) {
        console.error("DepositError:", depositStatus.error.message);
        return;
      } else {
        console.log("DepositRespanse:", depositStatus.response);
      }
    } else {
      // Bent3 Approval Request
      if (convertedValue >= approvedAmountBent3) {
        const approveCallData = await approveBent3(Bent3Fi, convertedValue.toString());
        const approvalStatus: any = await sendTransaction(bent3ContractAddress, approveCallData);
        // console.log("approvalRespanse:", approvalStatus);
        if (approvalStatus.status === false) {
          console.error("TransactionError:", approvalStatus.error.message);
          return;
        }
      }
      // Bent CVX3 Approval Request
      if (convertedValue >= approvedAmountBentCVX3) {
        const approveCallData = await approveBentCVX3(Bent3Fi, convertedValue.toString());
        const approvalStatus: any = await sendTransaction(bentCVX3Address, approveCallData);
        // console.log("approvalRespanse:", approvalStatus);
        if (approvalStatus.status === false) {
          console.error("TransactionError:", approvalStatus.error.message);
          return;
        }
      }
      // Bent3Fi Minting Request
      const depositCallData = await mintBent3FiToken(convertedValue.toString());
      const depositStatus: any = await sendTransaction(Bent3Fi, depositCallData);
      if (!depositStatus.status) {
        console.error("DepositError:", depositStatus.error.message);
        return;
      } else {
        console.log("DepositRespanse:", depositStatus.response);
      }
    }
  };
  // console.log('deposit:',depositStatus)
  // await signTransaction(approveCallData)
  // window.alert(await getWalletBalance())

  return {
    depositBent: handleDepositBENT,
    depositBentCVX: handleDepositBentCVX,
    withdrawBent: handleWithdrawBENT,
    withdrawBentCVX: handleWithdrawBentCVX,
    handleMintBent3FiToken: handleMintBent3FiToken,
    handleBurnBent3FiToken: handleBurnBent3FiToken,
  };
}

export default useDepositAndWithdraw;
