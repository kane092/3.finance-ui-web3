import React, { useEffect } from "react";
import useGetBalances from "./useGetBalances";
import useDepositAndWithdraw from "./useDepositAndWithdraw";
import useABI from "./useABI";
import { BentCDPContractAddr, ConvexCDPContractAddr, LARGEST, SMALLEST, selectedRPC } from "../constants";
import useMetaMask from "./metaMask";
import {AbiItem} from 'web3-utils';
import { BentCDP_ABI} from "../ABI/main-abis/BentCDP";
import { convexCDP_ABI } from '../ABI/main-abis/convexCDP';
import Web3 from "web3";


function useClaimAndHarvestHook() {
  const { GetBENTCVXBalance } = useGetBalances();
  const { claimConvexCDP, claimBentCDP ,account} = useABI();
  const { depositBentCVX } = useDepositAndWithdraw();
  const { 
    sendTransaction ,
    // account
  } = useMetaMask();
  

  const web3 = new Web3(selectedRPC);

  const pendingRewardBentCDP = async () => {
    //call on bentCVX - row in claim tab
    const BentCDPABI_Contract = new web3.eth.Contract(BentCDP_ABI as AbiItem[], BentCDPContractAddr);
    const rewardToClaim = await BentCDPABI_Contract.methods.pendingReward(account).call();
    // console.log(rewardToClaim[0])
    return (rewardToClaim[0]/SMALLEST).toFixed(6)
  };

  const pendingRewardConvexCDP = async () => {
    //call on CVX - row in claim tab
    const BentCDPABI_Contract = new web3.eth.Contract(convexCDP_ABI as AbiItem[], ConvexCDPContractAddr);
    const rewardToClaim = await BentCDPABI_Contract.methods.pendingReward(account).call();
    // console.log(rewardToClaim[0])
    return (rewardToClaim[0]/SMALLEST).toFixed(6)
  };

  const handleClaimConvexCDP = async () => {
    const claimable = pendingRewardConvexCDP()
    claimable.then(async (value:any)=>{
      if(Number(value)>0){
        const callData = await claimConvexCDP();
        await sendTransaction(ConvexCDPContractAddr, callData);
        return true
      }else{
        window.alert("no claimable reward value") //Todo: display message in dilogueBox
        return false
      }
      
    })
  };

  const handleClaimBentCDP = async ():Promise<any> => {
    const claimable = pendingRewardBentCDP()
    claimable.then(async(value:any)=>{
      if(Number(value)>0){
  
        const callData = await claimBentCDP();
        await sendTransaction(BentCDPContractAddr, callData);
        return true
      }else{
        // window.alert("No claimable reward value") //Todo: display message in dilogueBox
        console.error("No claimable reward value")
        return false
      }
      
    })
  };
  
  

  const harvestBentCVX = async () => {
    // Check For bentCVX Balance
    // Claim Function call from bentCDP
    // Check For Balance bentCVX
    // Calculate Change in Balance
    // Deposi the Change in Balance into ConvexCDP Contract

    const initialBalance = await GetBENTCVXBalance();
    const isClaimed = await handleClaimBentCDP();
    // if(!isClaimed){return}
      const finalBalance = await GetBENTCVXBalance();
      const changeInBalance = finalBalance - initialBalance;
      // window.alert(Number(changeInBalance*LARGEST))
      if(changeInBalance>0){
        depositBentCVX(Number(changeInBalance));
      }else{
        // window.alert("Value can't be harvested") //Todo: show in dilogueBox
        console.error("Value can't be harvested")
        return
      }
  };

  return {
    handleClaimConvexCDP: handleClaimConvexCDP,
    handleClaimBentCDP: handleClaimBentCDP,

    harvestBentCVX: harvestBentCVX,
    
    pendingRewardBentCDP:pendingRewardBentCDP,
    pendingRewardConvexCDP:pendingRewardConvexCDP,
  };
}

export default useClaimAndHarvestHook;
