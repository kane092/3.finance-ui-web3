import { useCallback, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NumberField from '../../NumberField';

import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import { updateRightNavbarAssetSelected, updateRightNavbarCurValue, updateRightNavbarMaxValue } from '../../../store/actions/navbarAction';
import { RootState } from '../../../store/store';

import { getFieldLP } from '../../../utils/utils';

import NavbarFlag from '../../../assets/images/navbar-flag.png';
import useABI from '../../../hooks/useABI';
import { number } from '../../../utils/math';
import classNames from 'classnames';
import useGetBalances from '../../../hooks/useGetBalances';
import InputBox from '../../InputBox';

interface Props {
  setInputWithPercentageShow : any
}

export default function Withdraw(props:Props) {
  const {setInputWithPercentageShow} = props
  const {getBentCDPBalance,getBent3Balance,
        getBentCVXBalance,getBentCVX3Balance} = useABI()
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  // bentBalance: is based on depositsLP: in fields.json
  // const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const [radioSelected, setRadioSelected] = useState('');
  // console.log(getFieldLP(fieldData, 1))
  // console.log(fieldSelected)
  // console.log(fieldData)

  const {
    bentCDPBalance,
    convexCDPBalance,
    bentCVX3Balance,
    bent3Balance,
  } = useGetBalances()

  useEffect(()=>{
    //update limit of max value for input
    if(radioSelected==="BENT"){
      const max = Number(Number(bent3Balance).toFixed(2))
      // window.alert(`${radioSelected} ${max}`)
      dispatch(updateRightNavbarMaxValue(bent3Balance))
    }
    else if(radioSelected==="bentCVX"){
      const max = Number(Number(convexCDPBalance).toFixed(2))
      // window.alert(`${radioSelected} ${max}`)
      dispatch(updateRightNavbarMaxValue(max))
    }else{
      dispatch(updateRightNavbarMaxValue(0))
    }
  },[radioSelected])

// window.alert(`${bentCDPBalance} ${convexCDPBalance} ${bent3Balance} ${bentCVX3Balance}`)

  useEffect(() => {

   if (bentCDPBalance > 0) setRadioSelected(fieldSelected.tokens[0])
  }, []);

  useEffect(() => {
    if(Number(bent3Balance)){
      setInputWithPercentageShow(true)
    }else{
      setInputWithPercentageShow(false)
    }
  }, [bent3Balance]);
  
  
  // useEffect(() => {
  //   dispatch(updateRightNavbarAssetSelected(radioSelected))
  // }, [radioSelected]);
  
  const handleSelectRadio = useCallback((value:any)=>{
    setRadioSelected(value)
    dispatch(updateRightNavbarAssetSelected(value))
    dispatch(updateRightNavbarCurValue(0))
  },[dispatch])

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>‘Withdraw’ moves assets to the connected wallet.<br />The withdraw function also provides format options for those tokens specific to this pool. </p>
      {walletConnected == "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected == "Connected" &&
      <>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={radioSelected}
          onChange={
            (event) =>  {
              handleSelectRadio(event.target.value)
            }
          }
        >
          <Grid container className={bentCDPBalance ? 'text-[14px] text-white' : 'text-[14px] text-[#63717A]'}>
            {/* <Grid xs={8} className='text-white'><p className='mb-[14px]'>Deposit balance: ({fieldSelected.type === "compoundEmissionFields" ? 3 : ''}{fieldSelected.tokens && fieldSelected.tokens[fieldSelected.tokens.length-1]})</p></Grid> */}
            <Grid xs={8} className='deposit-balance text-white'><p className='mb-[14px]'>Deposit balance: ({
              fieldSelected.tokens && 
                fieldSelected.symbol==='BENT'?'BENT3':
                fieldSelected.symbol==='bentCVX'?'bentCVX3':
                fieldSelected.symbol
            })</p></Grid>
            <Grid xs={4} className={bentCDPBalance ? 'text-right' : 'text-right text-red-600'}>  
            {
              fieldSelected.symbol === 'BENT' ? <NumberField value={Number(bentCDPBalance)} digit={2} /> :
              (fieldSelected.symbol === 'bentCVX'||fieldSelected.symbol === 'bentCVX3') ? <NumberField value={Number(convexCDPBalance)} digit={2} /> :
              // (fieldSelected.symbol === 'CVX') ? <NumberField value={Number(".")} digit={2} /> :
              'No balance'
            }
            </Grid>
            <Grid xs={12} className='text-white'>Withdraw balance as:</Grid>
            {
              fieldSelected.tokens && fieldSelected.withdrawlTokens.map((token: string, index: number) => {
                return (
                  <div style={{display: 'contents'}} key={`token-${index}`}>
                    <Grid xs={8} className={index === 1 ? 'flex' : ''}>
                      <FormControlLabel
                        value={token}
                        control={
                          <Radio
                            sx={
                            // bentCDPBalance ?
                            {
                              color: '#00FFF0',
                              '&.Mui-checked': {
                                color: '#00FFF0',
                              },
                            } 
                            // :
                            // {
                            //   color: '#63717A',
                            //   '&.Mui-checked': {
                            //     color: '#63717A',
                            //   },
                            //   '&.Mui-disabled': {
                            //     color: '#63717A',
                            //   },
                            // }
                          }
                            disabled={
                              token === 'CVX' ? true : false
                            } //disable when balance is not available in wallet
                            // onClick={() => {
                            //   // console.log(token)
                            //   dispatch(updateRightNavbarAssetSelected(token))
                            //   dispatch(updateRightNavbarCurValue(0))
                            // }}
                          />
                        }
                        label={token}  //Todo: modify label
                        sx={token !== 'CVX' ?
                          {
                            '& .MuiTypography-root': {
                              color: '#00FFF0 !important',
                              fontSize: '14px',
                            },
                          } :
                          {
                            '& .MuiTypography-root': {
                              color: '#63717A !important',
                              fontSize: '14px',
                            },
                          }
                        }
                      />
                      {index === 1 ?
                        <div className='flex w-full items-center ml-[20px]'>
                          Best Price
                          <img src={NavbarFlag} className='w-[22px] h-[20px]' />
                        </div> :
                        <></>
                      }
                    </Grid>
                    <Grid xs={4} className='withdraw-token-balances text-right flex items-center justify-end'>
                      {
                        (token === 'BENT' || token === '3vlBENT') ? bent3Balance > 0 ? <NumberField value={Number(bent3Balance)} digit={2} /> : 'No balance' :
                        (token === 'bentCVX' || token === 'bentCVX3') ? convexCDPBalance > 0 ? <NumberField value={Number(convexCDPBalance)} digit={2} /> : 'No balance' :
                        // (token === 'CVX') ? _cvxBalance > 0 ? <NumberField value={Number(_cvxBalance)} digit={2} /> : 'No balance' : 
                        'No balance'
                      }
                    </Grid>
                  </div>
                )
              })
            }

            {
            //No balance message
            (!Number(bent3Balance)) &&
            <Grid xs={12} className='text-white text-left mt-[19px]'>
              <p className={classNames(
                'text-[14px]',
                assetSelected !== 'None' ? 'hidden' : "" //need to b removed after disabling checkbox based on wallet balance
              )}
              >It looks like you don’t have any of these tokens in your wallet. Have a look at the action summary below for tips on how to obtain these assets
            </p></Grid>
            }

            {assetSelected !== 'None' &&
            // when radio button not selected
            <>
              <Grid xs={8} className='text-left mb-[10px]'>Selected Format:</Grid>
              <Grid xs={4} className='text-right'>{radioSelected}</Grid>
              <Grid xs={12} className='text-left'>Enter amount to withdraw:</Grid>
              {/*old input box is being rendered into parent component "Actions.tsx" as : <InputWithPercentage/> */}
              <InputBox 
              adornmentText={radioSelected}
              validationText={""} 
            />
            </>}
          </Grid>
          </RadioGroup>
            
          </>
        }
    </>
  )
}