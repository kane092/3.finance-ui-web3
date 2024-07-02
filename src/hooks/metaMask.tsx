import React, { useState, useEffect, useMemo, useCallback } from 'react'
// import { injected } from '../components/wallet/connectors'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
// import { ethers } from 'ethers';
import Web3 from 'web3';
import { SMALLEST, selectedRPC } from '../constants';
import { Dispatch } from 'redux';
import { updateTransactionInitiated } from '../store/actions/globalAction';


export const MetaMaskContext = React.createContext({
    isActive: false,
    account: undefined,
    isLoading: false,
    connect: () => {},
    disconnect: () => {},
    shouldDisable: true,
    signTransaction: (message:any) => {},
    sendTransaction: (to:any,data:any) => {},
    getWalletBalance: () : any => {},
})

export const MetaMaskProvider = ({ children }: { children: any}) => {

  const dispatch: Dispatch<any> = useDispatch();
    const { activate, account,active, deactivate, library } = useWeb3React()
    const accountNo = account
    // const accountNo = '0x87e600e6Ca37aB9C812DDd3636934E38C1196fFD'

    // let [accountNo,setAccountNo] = useState(account)
    // useEffect(()=>{
    //     setAccountNo(account)
    // },[account])

    
    const [isActive, setIsActive] = useState(false)
    const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
    const [isLoading, setIsLoading] = useState(true)
    // const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
    // const [signer, setSigner] = useState<any>(null)

    const walletConnected = useSelector((state: RootState) => state.global.walletConnected);

    window?.ethereum?.on('chainChanged', (chainId)=>{
        // console.log("chainChanged:",window?.ethereum)
        window.location.reload();
    });

    window?.ethereum?.on('accountsChanged', (accounts)=>{
        console.log("accountsChanged",accounts)
    });
    
    // window?.ethereum?.on('disconnect', (error)=>{
    //     window.alert(window?.ethereum?.isConnected())
    // });

    // Check when App is Connected or Disconnected to MetaMask
    const handleIsActive = useCallback(() => {
        setIsActive(active)
    }, [active])
    
    useEffect(() => {
        handleIsActive()
    }, [handleIsActive])

    

    // Connect to MetaMask wallet
    const connect = useCallback(async () => {
        setShouldDisable(true)
        try {
            //getting chain id from wallet
            const chainID = await window?.ethereum?.request({ method: 'eth_chainId' })
            const injected = new InjectedConnector({ supportedChainIds: [Number(chainID)] })
            await activate(injected)

            // let _provider = new ethers.BrowserProvider(window.ethereum)
            // setProvider(_provider)
            // let _signer = await provider?.getSigner();
            // setSigner(_signer)
        } catch(error) {
            console.log('Error on connecting: ', error)
        }
    },[activate])

    // Disconnect from Metamask wallet
    const disconnect = useCallback(async () => {
        try {
            await deactivate()
            
            // setSigner(null)
            // setProvider(null)
        } catch(error) {
            console.log('Error on disconnnect: ', error)
        }
    },[deactivate])

    // Init Loading
    useEffect(() => {
        connect().then(val => {
            setIsLoading(false)
        })
    }, [connect])

    const updateWalletConnectionState = useCallback(async() => {
        if(walletConnected==='Disconnected'){
            await disconnect()
            console.log('disconnected:')
        }
        if(walletConnected==='Connected'){
            await connect()
            console.log('connected:')
        }
    }, [walletConnected, connect, disconnect])

    useEffect(() => {
        updateWalletConnectionState()
    }, [updateWalletConnectionState])

    const signTransaction = useCallback(async (message:any) => {
        // https://docs.metamask.io/wallet/how-to/sign-data/
        try{
            if(!window.ethereum){
                throw new Error("No crypto wallet found.please install it")
            }
            // await signer?.signMessage("test") 
            const signRes = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, accountNo],
            });
            console.log(signRes)
        }catch(err){
            console.error(err)
        }
    },[accountNo])

    const sendTransaction = useCallback(async (to:any,data:any) => {
        dispatch(updateTransactionInitiated(true))
        // https://docs.metamask.io/wallet/how-to/sign-data/
        try{
            if(!window.ethereum){
                throw new Error("No crypto wallet found.please install it")
            }
            // await signer?.signMessage("test") 
            const response = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: accountNo,
                    to : to,
                    data: data
                }],
            })
            return {
                status: true,
                response: response
            }
            // .then((txHash) => console.log(txHash))
            // .catch((error) => console.error(error));
        }catch(err){
            console.error(err)
            return {
                status: false,
                error: err
            }
        }
        finally{
            dispatch(updateTransactionInitiated(false))
        }
    },[accountNo])

    const getWalletBalance = useCallback(async () => {
        try{
            if(!window.ethereum){
                throw new Error("No crypto wallet found.please install it")
            }
            // await provider?.getBalance(accountNo)

            const web3 = new Web3(selectedRPC);
            let balance = await web3.eth.getBalance(`${accountNo}`);
            return Number(balance)/SMALLEST

        }catch(err){
            console.error(err)
        }
    },[accountNo])

    const values = useMemo(
        () => ({
            isActive,
            account:accountNo,
            isLoading,
            connect,
            disconnect,
            shouldDisable,
            signTransaction,
            getWalletBalance,
            sendTransaction
        }),
        [isActive, isLoading, shouldDisable, accountNo,connect,disconnect,signTransaction,getWalletBalance]
    )

    // @ts-ignore
    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

//MAIN
export default function useMetaMask() {
    const context = React.useContext(MetaMaskContext)

    if (context === undefined) {
        throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
    }

    return context
}