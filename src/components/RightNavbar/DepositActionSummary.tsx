import { useSelector } from 'react-redux';

import type { SubTabType } from '../../types/types';

import { getFieldLP } from '../../utils/utils';

import { RootState } from '../../store/store';

import fieldsJsonData from '../../assets/data/fields.json';
import ArrowRight from '../../assets/images/arrow-right.png';
import Flag from '../../assets/images/flag.png';
import { Grid } from '@mui/material';

let fieldsData = fieldsJsonData;

type props = {
  subTab: SubTabType
  token: string
  depositsFullName: string
  isEmpty: boolean
}

export default function ActionSummary({
  subTab,
  token,
  depositsFullName,
  isEmpty
}: props) {

  const depositData = useSelector((state: RootState) => state.navbar.depositData)
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected)
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);

  function renderData() {
    switch(subTab) {
      case "Deposit":
        if(isEmpty) {
          return (
            <>
              <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Two symple ways of gaining a position in the ${depositsFullName}: 1. Use our Zap-in feature or 2. Buy ${token} from the Defi market.</p>
              <a href="#" className="flex items-center justify-end mt-[40px]">
                <p className="text-[14px] leading-[21px] text-[#00FFFF]">Zap-in</p>
                <img className="ml-[6px]" src={ArrowRight} />
              </a>
              <Grid container className="mt-[9px] mb-[20px]">
                <Grid xs={6}>
                  <div className="flex items-center justify-end">
                    <p className="text-[14px] leading-[21px]">Best Price</p>
                    <img src={Flag} />
                  </div>
                </Grid>
                <Grid xs={6}>
                  <a href="#" className="flex items-center justify-end">
                    <p className="text-[14px] leading-[21px] text-[#00FFFF]">Buy {token}</p>
                    <img className="ml-[6px]" src={ArrowRight} />
                  </a>
                </Grid>
              </Grid>
            </>
          )
        }

        //no asset selected
        if (depositData.assets.length === 0) {
          return (
            <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Waiting for asset selection to produce summary.</p>
            )
          }

          //one asset is selected
        if (depositData.assets.length === 1) {
          return (
            <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>
              <>
              {depositData.assets[0].symbol === 'BENT' && `Deposit and lock BENT tokens in Bent CDP.`}
              <br></br>
              {
              // amount of asset to withdraw
              curValue === 0 ? `Waiting for amount to complete summary.`:
              // fieldSelected.symbol==='BENT' ? "Deposit & convert to BENT3 receipts the following tokens and their balances:":
              `you are about to withdraw ${depositData.assets[0].symbol}`
              }
              </>
            </p>
            )
          }

        //multiple assets are selected
        if (depositData.assets.length > 1) {
          return(
            <>
              <p className='text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>
                {
                  fieldSelected.symbol==='sdCRV3' ? "Deposit & convert to sdCRV3 receipts the following tokens and their balances:" :
                  fieldSelected.symbol==='BENT' ? "Deposit & convert to BENT3 receipts the following tokens and their balances:" :
                  fieldSelected.symbol==='bentCVX' ? "Deposit & convert to bentCVX3 receipts the following tokens and their balances:" :
                  `Deposit & convert to ${fieldSelected.symbol} receipts the following tokens and their balances:`
                  
                }
                <br></br>
                {
                  depositData.assets.map((item:any)=>{
                    // calculated amount sdCRV3 receipts
                    return <p className='text-left'>{`${item.ammount?item.ammount:0} ${item.symbol==='sdCRV3'?'sdCRV':item.symbol}`}</p>
                  })
                }
                <br></br>
                <p>
                  {
                    fieldSelected.symbol === 'BENT' ? 'This deposit will be locked by Bent Finance for 8 weeks. We estimate these balances will receive [calculated amount] BENT3 receipts.':
                    fieldSelected.symbol === 'bentCVX' ? 'The CVX in this deposit will be permanently locked by Bent Finance. You will need to rely upon secondary markets to withdrawal as CVX. We estimate these balances will receive [calculated amount] bentCVX3 receipts.”':
                    fieldSelected.symbol === 'sdCRV3' ? 'The CRV in this deposit will be permanently locked by Stake DAO. You will need to rely upon secondary markets to withdrawal as CRV. We estimate these balances will receive [calculated amount] sdCRV3 receipts.”':
                    ""
                  }
                </p>
              </p>
            </>
          )
          
        } else {

          // _______________________________________________________________________
          //re-route-ui
          if (depositData.reroute) {
            return (
              <>
                <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Withdraw {depositData.assets[0].symbol} from StakeDAO.</p>
                <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit {depositData.assets[0].symbol} in {fieldSelected.depositsFullName} on 3.Finance.</p>
                <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for amount to complete summary.'}</p>
              </>
            )
          } else if (depositData.acceptTerms) {
            if (fieldSelected.name === "sd.Curve") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Wrap and stake CRV from StakeDAO.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit sdCRV gauge tokens in Curve C.D.P.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for asset selection to produce summary.'}</p>
                </>
              )
            }
            if (fieldSelected.name === "bent.Convex") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Convert CVX in BentFinance.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit vlBCVX in Convex C.D.P.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for asset selection to produce summary.'}</p>
                </>
              )
            }
            if (fieldSelected.name === "Bent") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Wrap BENT via BentFinance.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit and lock vlBENT tokens in Bent C.D.P.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for asset selection to produce summary.'}</p>
                </>
              )
            }
          } else if (!depositData.acceptTerms) {
            if (fieldSelected.name === "") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Waiting for asset selection to produce summary.</p>
                </>
              )
            }
            if (fieldSelected.name === "sd.Curve") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit sdCRV gauge tokens in Curve C.D.P.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for asset selection to produce summary.'}</p>
                </>
              )
            }
            if (fieldSelected.name === "bent.Convex") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit vlBCVX in Convex C.D.P.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for asset selection to produce summary.'}</p>
                </>
              )
            }
            if (fieldSelected.name === "Bent") {
              return (
                <>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>Deposit and lock vlBENT tokens in Bent C.D.P.</p>
                  <p className='text-right text-[#717B86] mb-[10px] text-[14px] leading-[18px]'>{curValue > 0 ? '' : 'Waiting for asset selection to produce summary.'}</p>
                </>
              )
            }
          }
        }
    }
  }

  return (
    <div className='text-[14px] pb-[160px] 2xl:pb-[188px]'>
      <p className='text-right text-[27px] mb-[10px] leading-[34px]'>Action Summary</p>
      {renderData()}      
    </div>
  )
}