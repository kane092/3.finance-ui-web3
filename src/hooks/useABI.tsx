import { BentCDP_ABI} from "../ABI/main-abis/BentCDP";
import Web3 from "web3";
import {AbiItem} from 'web3-utils';
import { BentAddress, BentCDPContractAddr, selectedRPC
         ,ConvexAddress, ConvexCDPContractAddr,SMALLEST,
         bent3ContractAddress, bentCVXcdp, bentCVX3Address, Bent3Fi, DAIContractAddress} from '../constants';

import { IERC20_ABI } from '../ABI/main-abis/IERC20';
import { BentABI } from '../ABI/main-abis/Bent';
import { convexCDP_ABI } from '../ABI/main-abis/convexCDP';

// eslint-disable-next-line
import useMetaMask from './metaMask'
import { bent3ABI } from "../ABI/main-abis/bent3";
import { BentCVX3_ABI } from "../ABI/main-abis/bentCVX3";
import { Bent3Fi_ABI } from "../ABI/main-abis/BentFi3";
import { DAI_ABI } from "../ABI";


function useABI() {
    const {account} = useMetaMask()
    const web3 = new Web3(selectedRPC);
    const BentConvexCDPABI_Contract = new web3.eth.Contract(convexCDP_ABI as AbiItem[], ConvexCDPContractAddr);
    const BentCDPABI_Contract = new web3.eth.Contract(BentCDP_ABI as AbiItem[], BentCDPContractAddr);
    const BentCVXABI_Contract = new web3.eth.Contract(IERC20_ABI as AbiItem[], bentCVXcdp);
    const Bent3_Contract = new web3.eth.Contract(bent3ABI as AbiItem[], bent3ContractAddress);
    const BentCVX3_Contract = new web3.eth.Contract(BentCVX3_ABI as AbiItem[], bentCVX3Address);
    const Bent3Fi_Contract = new web3.eth.Contract(Bent3Fi_ABI as AbiItem[], Bent3Fi);

    const Convex_Contract = new web3.eth.Contract(IERC20_ABI as AbiItem[], ConvexAddress);

    const BentABI_Contract = new web3.eth.Contract(BentABI as AbiItem[], BentAddress);
    const bent3Contract = new web3.eth.Contract(bent3ABI as AbiItem[], bent3ContractAddress);
    const DAIContract = new web3.eth.Contract(DAI_ABI as AbiItem[], DAIContractAddress);
    
    
    //Convex CDP Functionality
    
    const depositBentConvex = async (ammount:string) =>{
        const callData = await BentConvexCDPABI_Contract.methods.depositbentCVX(`${ammount}`).encodeABI();
        return callData
    }
    const withdrawBentConvex = async (ammount:bigint) =>{
        const callData = await BentConvexCDPABI_Contract.methods.withdrawCVX(`${ammount}`).encodeABI();
        return callData
    }
    const claimConvexCDP = async () =>{
        const callData = await BentConvexCDPABI_Contract.methods.claim(0).encodeABI();
        return callData
    }
    
    //Bent CDP functionality
    const depositBent = async (ammount:string) =>{
        const callData = await BentCDPABI_Contract.methods.depositBent(`${ammount}`).encodeABI();
        return callData
    }
    const withdrawBent = async (ammount:bigint) =>{
        const callData = await BentCDPABI_Contract.methods.withdrawBent(`${ammount}`).encodeABI();
        return callData
    }
    const claimBentCDP = async () =>{
        const callData = await BentCDPABI_Contract.methods.claim(0).encodeABI();
        return callData
    }
    const bentCDPTotalSupply = async () =>{
        const totalSupply = await BentCDPABI_Contract.methods.totalSupply().call();
        return totalSupply
    }
    const bentCDPrewardPools = async () =>{
        const rewardPools = await BentCDPABI_Contract.methods.rewardPools(0).call();
        return rewardPools
    }
    const bentCDPwindowLen = async () =>{
        const winLen = await BentCDPABI_Contract.methods.windowLength().call();
        return winLen
    }
    
    //Bent3F1 functionality
    const mintBent3Fi = async (ammount:string) =>{
        const callData = await Bent3Fi_Contract.methods.mint3FiToken(`${ammount}`).encodeABI();
        return callData
    }
    const burnBent3FiToken = async (ammount:bigint) =>{
        const callData = await Bent3Fi_Contract.methods.withdraw3Fi(`${ammount}`).encodeABI();
        return callData
    }
    const bent3FiTotalSupply = async () =>{
        const totalSupply = await Bent3Fi_Contract.methods.totalSupply().call();
        return totalSupply
    }
    const bent3FirewardPools = async () =>{
        const rewardPoolsBentCVX = await Bent3Fi_Contract.methods.rewardPools(0).call();
        const rewardPoolsCVX = await Bent3Fi_Contract.methods.rewardPools(1).call();
        return {
            rewardPoolsBentCVX,
            rewardPoolsCVX,
        }
    }

    //Balances
    const getBentBalance = async ():Promise<any> =>{
        const bentBalance = await BentABI_Contract.methods.balanceOf(account).call();
        // console.log('BENT Balance-deposit:',web3.utils.fromWei(bentBalance,'ether'))
        return web3.utils.fromWei(bentBalance,'ether')
    }
    const getBent3Balance = async ():Promise<any> =>{
        const bentBalance = await bent3Contract.methods.balanceOf(account).call();
        // console.log('BENT3 Balance-withdraw:',web3.utils.fromWei(bentBalance,'ether'))
        return web3.utils.fromWei(bentBalance,'ether')
    }

    const getBentCVXBalance = async ():Promise<any> =>{
        const bentCVXBalance = await BentCVXABI_Contract.methods.balanceOf(account).call();
        // console.log('BENT-CVX Balance-deposit:',web3.utils.fromWei(bentCVXBalance,'ether'))
        return web3.utils.fromWei(bentCVXBalance,'ether')
    }

    const benConvexCCDPTotalSupply = async () =>{
        const totalSupply = await BentConvexCDPABI_Contract.methods.totalSupply().call();
        return totalSupply
    }
    const bentConvexCDPrewardPools = async () =>{
        const rewardPools = await BentConvexCDPABI_Contract.methods.rewardPools(0).call();
        return rewardPools
    }
    const bentConvexCDPwindowLen = async () =>{
        const winLen = await BentConvexCDPABI_Contract.methods.windowLength().call();
        return winLen
    }

    const getBentCVX3Balance = async ():Promise<any> =>{
        const bentCVX3Balance = await BentCVX3_Contract.methods.balanceOf(account).call();
        // console.log('BENT-CVX-3 Balance-withdraw:',web3.utils.fromWei(bentCVX3Balance,'ether'))
        return web3.utils.fromWei(bentCVX3Balance,'ether')
    }

    const getBentCDPBalance = async ():Promise<any> =>{
        const bentCDPBalance = web3.utils.fromWei(await BentCDPABI_Contract.methods.balanceOf(`${account}`).call(), "ether");        
        return bentCDPBalance
    }
    const getConvexCDPBalance = async ():Promise<any> =>{
        const convexCDPBalance = web3.utils.fromWei(await BentConvexCDPABI_Contract.methods.balanceOf(`${account}`).call(), "ether");        
        return convexCDPBalance
    }
    
    const getBent3FiBalance = async ():Promise<any> =>{
        const bent3FiBalance = web3.utils.fromWei(await Bent3Fi_Contract.methods.balanceOf(`${account}`).call(), "ether");        
        return bent3FiBalance
    }
    const getDAIBalance = async ():Promise<any> =>{
        const DAIBalance = web3.utils.fromWei(await DAIContract.methods.balanceOf(`${account}`).call(), "ether");        
        return DAIBalance
    }

    // ____________________________________________________________________________________________________________
    
    // const BentConvexCDPABI_Contract = new web3.eth.Contract(convexCDP_ABI as AbiItem[], ConvexCDPContractAddr);
    
    const approveBent = async (spenderAddress:any,ammount:string) =>{
        const approveCallData = await BentABI_Contract.methods.approve(`${spenderAddress}`,`${ammount}`).encodeABI();
        return approveCallData
    }

    const approveConvex = async (spenderAddress:any,ammount:string) =>{
        const approveCallData = await Convex_Contract.methods.approve(`${spenderAddress}`,`${ammount}`).encodeABI();
        return approveCallData
    }
    const approveBentCVX = async (spenderAddress:any,ammount:string) =>{
        const approveCallData = await BentCVXABI_Contract.methods.approve(`${spenderAddress}`,`${ammount}`).encodeABI();
        return approveCallData
    }
    const approveBentCVX3 = async (spenderAddress:any,ammount:string) =>{
        const approveCallData = await BentCVX3_Contract.methods.approve(`${spenderAddress}`,`${ammount}`).encodeABI();
        return approveCallData
    }
    const approveBent3 = async (spenderAddress:any,ammount:string) =>{
        const approveCallData = await Bent3_Contract.methods.approve(`${spenderAddress}`,`${ammount}`).encodeABI();
        return approveCallData
    }

   
    const allowanceBent = async (spenderAddress:any) =>{
        console.log('account:',account,'spender:',spenderAddress)
        const approvedAmount = await BentABI_Contract.methods.allowance(`${account}`,`${spenderAddress}`).call();
        console.log('approvedAmount:',approvedAmount)
        return approvedAmount
    }

    const allowanceBentCVX = async (spenderAddress:any) =>{
        console.log('account:',account,'spender:',spenderAddress)
        const approvedAmount = await BentCVXABI_Contract.methods.allowance(`${account}`,`${spenderAddress}`).call();
        console.log('approvedAmount:',approvedAmount)
        return approvedAmount
    }
    const allowanceConvex = async (spenderAddress:any) =>{
        console.log('account:',account,'spender:',spenderAddress)
        const approvedAmount = await Convex_Contract.methods.allowance(`${account}`,`${spenderAddress}`).call();
        console.log('approvedAmount:',approvedAmount)
        return approvedAmount
    }
    
    const allowanceBent3 = async (spenderAddress:any) =>{
        console.log('account:',account,'spender:',spenderAddress)
        const approvedAmount = await Bent3_Contract.methods.allowance(`${account}`,`${spenderAddress}`).call();
        console.log('approvedAmount:',approvedAmount)
        return approvedAmount
    }
    const allowanceBentCVX3 = async (spenderAddress:any) =>{
        console.log('account:',account,'spender:',spenderAddress)
        const approvedAmount = await BentCVX3_Contract.methods.allowance(`${account}`,`${spenderAddress}`).call();
        console.log('approvedAmount:',approvedAmount)
        return approvedAmount
    }
    
    // const call = async () => {
    //     await getBent3Balance()
    // }
    // useEffect(()=>{
    //     call()
    // },[])

  return {
    approveBent: approveBent,
    depositBent: depositBent,
    withdrawBent: withdrawBent,
    allowanceBent: allowanceBent,
    allowanceConvex: allowanceConvex,
    allowanceBentCVX:allowanceBentCVX,
    getBentBalance: getBentBalance,
    getBentCDPBalance: getBentCDPBalance,
    approveConvex: approveConvex,
    getBent3Balance: getBent3Balance,
    getBentCVXBalance:getBentCVXBalance,
    getBentCVX3Balance:getBentCVX3Balance,
    getConvexCDPBalance: getConvexCDPBalance,
    getBent3FiBalance: getBent3FiBalance,
    getDAIBalance:getDAIBalance,
    mintBent3Fi: mintBent3Fi,
    allowanceBent3:allowanceBent3,
    allowanceBentCVX3:allowanceBentCVX3,
    approveBentCVX3:approveBentCVX3,
    approveBent3:approveBent3,
    burnBent3FiToken:burnBent3FiToken,

    bentCDPTotalSupply:bentCDPTotalSupply,
    bentCDPrewardPools:bentCDPrewardPools,
    benConvexCCDPTotalSupply:benConvexCCDPTotalSupply,
    bentConvexCDPrewardPools:bentConvexCDPrewardPools,
    bentConvexCDPwindowLen: bentConvexCDPwindowLen,
    bentCDPwindowLen:bentCDPwindowLen,

    bent3FiTotalSupply:bent3FiTotalSupply,
    bent3FirewardPools:bent3FirewardPools,
    
    withdrawBentConvex: withdrawBentConvex,
    depositBentConvex: depositBentConvex,
    claimConvexCDP: claimConvexCDP,
    claimBentCDP: claimBentCDP,
    approveBentCVX:approveBentCVX,

    account: account

  }
}

export default useABI
