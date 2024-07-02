import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import type { FieldType, SubTabType } from '../../types/types';
import NumberField from '../NumberField';

import { getFieldLP } from '../../utils/utils';

import { RootState } from '../../store/store';
import { updateFieldSelected } from '../../store/actions/globalAction';
import { getCRVWalletStatus } from '../../utils/utils';

import fieldsJsonData from '../../assets/data/fields.json';
import ArrowRight from '../../assets/images/arrow-right.png';
import { updateRightNavbarSubTabSelected, updateRightNavbarTabSelected } from '../../store/actions/navbarAction';
import { CuRVE_FI_SWAP, CuRVE_FI_SWAP2_76, Uni_SWAP } from '../../constants';

let fieldsData = fieldsJsonData;

type props = {
  subTab: SubTabType
  actionsButtonShow: Boolean
}

export default function ActionSummary({
  subTab,
  actionsButtonShow=true
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const signalSelected = useSelector((state: RootState) => state.global.signalSelected);
  const signalSaved = useSelector((state: RootState) => state.global.signalSaved);
  const signal = (signalSelected === '') ? signalSaved : signalSelected;
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);
  const convexTVL = getFieldLP(fieldData, 2);
  const bentTVL = getFieldLP(fieldData, 3);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const rightNavbarNFTSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const depositValue = useSelector((state: RootState) => state.navbar.rightNavbarDepositValue);

  return (
    <div className={actionsButtonShow ? 'text-[14px] pb-[160px] 2xl:pb-[188px]' : 'text-[14px]'}>
      <p className='text-right text-[27px] mb-[10px] leading-[34px]'>
        {fieldSelected.type !== "3FiCollateralWallets" ? 'Action Summary' : getCRVWalletStatus(fieldData) ? "Action Summary" : ""}
        {/* Action Summary */}
      </p>
      {/* ______________________________________________________________________Mint___________________________________________________________________________ */}
      
      {subTab === "Mint" &&
      <>
        {(!convexTVL && !bentTVL) &&
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To mint 3Fi tokens, you require deposits in both the Convex and Bent Compound Deposit Pools (C.D.Ps).<br /><br />Use the links below to learn how to deposit into each of these C.D.Ps.</p>}
        {(convexTVL && !bentTVL) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To mint 3Fi tokens, you require deposits in the Bent Compound Deposit Pool (C.D.P).<br /><br />Use the link below to learn how to deposit into the Bent C.D.P.</p> :
        <></>}
        {(!convexTVL && bentTVL) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To mint 3Fi tokens, you require deposits in the Convex Compound Deposit Pool (C.D.P).<br /><br />Use the link below to learn how to deposit into the Convex C.D.P.</p> :
        <></>}
        {(convexTVL && bentTVL && curValue === 0) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for an amount to be entered to produce summary.</p> :
        <></>}
        {convexTVL && bentTVL && curValue > 0 && curValue <= maxValue ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Lock <NumberField value={curValue} digit={2} />&nbsp;Convex C.D.P L.P tokens<br /><br />Lock <NumberField value={curValue} digit={2} /> &nbsp;Bent C.D.P L.P tokens<br /><br />Mint <NumberField value={curValue} digit={2} />&nbsp;3Fi tokens</p> :
        <></>}
        {convexTVL && bentTVL && curValue > maxValue ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Lock Convex C.D.P L.P tokens<br /><br />Lock Bent C.D.P L.P tokens<br /><br />Mint 3Fi tokens<br /></p>
          <p className='text-right text-red-600 mb-[10px]'>Please resolve the error before continuing.</p>
        </> :
        <></>}
        {(!convexTVL) &&
        <div 
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
          onClick={() => {
            // fieldData.filter((field: FieldType) => {
            //   return field.name === 'Convex';
            // }).map((field: FieldType, index: number) => (
            //   dispatch(updateFieldSelected(field))
            // ))
            let link = document.getElementById('CVX')
            link?.click()
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateRightNavbarSubTabSelected("Deposit"));
          }}>
          <p>Go to Convex C.D.P</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>}
        {(!bentTVL) &&
        <div 
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
          onClick={() => {
            let link = document.getElementById('BENT')
            link?.click()
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateRightNavbarSubTabSelected("Deposit"));
          }}>
          <p>Go to Bent C.D.P</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>}
      </>}
      {/* ________________________________________________________________________Burn_________________________________________________________________________ */}

      {subTab === "Burn" &&
      <>
        {!fiTVL ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>You need a 3Fi token balance before you are able to burn any. Use the link below to learn how 3Fi tokens are acquired.</p> :
        <></>}
        {fiTVL && curValue === 0 ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for an amount to be entered to produce summary.</p> :
        <></>}
        {fiTVL && curValue > 0 && curValue <= maxValue ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Burn <NumberField value={curValue} digit={2} />&nbsp;3Fi tokens<br /><br />Unlock <NumberField value={curValue} digit={2} />&nbsp;Convex C.D.P L.P tokens<br /><br />Unlock <NumberField value={curValue} digit={2} />&nbsp;Bent C.D.P L.P tokens</p> :
        <></>}
        {fiTVL && curValue > maxValue ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Burn 3Fi tokens<br /><br />Unlock Convex C.D.P L.P tokens<br /><br />Unlock Bent C.D.P L.P tokens<br /></p>
          <p className='text-right text-red-600 mb-[10px]'>Please resolve the error before continuing.</p>
        </> :
        <></>}
        {!fiTVL &&
        <div 
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
          onClick={() => {
            dispatch(updateRightNavbarSubTabSelected("Mint"));
          }}>
          <p>Acquire 3Fi tokens</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>}
      </>}
      {/* __________________________________________________________________NFTs_______________________________________________________________________________ */}

      {subTab === "NFTs" &&
      <>
        {(!fiTVL && !curveTVL) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To mint 3Fi NFTs, you require a Curve based 3Fi token balance and a balance in the Curve Compound Deposit Pool (C.D.P).<br /><br />Use the links below to learn how to acquire deposits in each.</p> :
        <></>}
        {(fiTVL && !curveTVL) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To mint 3Fi NFTs, you require deposits in the Curve Compound Deposit Pool (C.D.P).<br /><br />Use the link below to learn how to deposit into the Curve C.D.P.</p> :
        <></>}
        {(!fiTVL && curveTVL) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To mint 3Fi NFTs, you require 3Fi token deposits in the 3Fi Collateral group.<br /><br />Use the link below to learn how to acquire 3Fi tokens.</p> :
        <></>}
        {(fiTVL && curveTVL) && curValue === 0 ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for an amount to be entered to produce summary.</p> :
        <></>}
        {(fiTVL && curveTVL) && curValue > 0 && curValue <= maxValue && maxValue > 0 ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Lock <NumberField value={curValue * rightNavbarNFTSelected.requirementA} digit={2} />&nbsp;3Fi tokens<br /><br />Lock <NumberField value={curValue * rightNavbarNFTSelected.requirementB} digit={2} />&nbsp;Curve C.D.P L.P tokens<br /><br />Mint {rightNavbarNFTSelected.name} NFT (3Fi NFT)</p> :
        <></>}
        {(fiTVL && curveTVL) && curValue > maxValue && maxValue > 0 ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Lock 3Fi tokens<br /><br />Lock Curve C.D.P L.P tokens<br /><br />Mint {rightNavbarNFTSelected.name} NFT (3Fi NFT)<br /></p>
          <p className='text-right text-red-600 mb-[10px]'>Please resolve the error before continuing.</p>
        </> :
        <></>}
        {(fiTVL && curveTVL) && maxValue === 0 ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Lock 3Fi tokens<br /><br />Lock Curve C.D.P L.P tokens<br /><br />Mint {rightNavbarNFTSelected.name} NFT (3Fi NFT)<br /></p>
          <p className='text-right text-red-600 mb-[10px]'>Select a different NFT to continue.</p>
        </> :
        <></>}
        {!fiTVL &&
        <div 
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
          onClick={() => {
            dispatch(updateRightNavbarSubTabSelected("Mint"));
          }}>
          <p>Acquire 3Fi tokens</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>}
        {!curveTVL &&
        <div 
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
          onClick={() => {
            // fieldData.filter((field: FieldType) => {
            //   return field.name === 'Convex';
            // }).map((field: FieldType, index: number) => (
            //   dispatch(updateFieldSelected(field))
            // ))
            let link = document.getElementById('CRV')
            link?.click()
            dispatch(updateRightNavbarTabSelected("Actions"));
            dispatch(updateRightNavbarSubTabSelected("Deposit"));
          }}>
          <p>Go to Curve C.D.P</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>}
      </>}
      {/* _______________________________________________________________Zap__________________________________________________________________________________ */}

      {subTab === "Zap" &&
      <>
        {!maxValue ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>No recognized assets were found in the connected wallet. The easiest way to proceed is to add some ETH to your wallet. </p> :
        <></>}
        {(maxValue && assetSelected === "None") ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for asset selection to produce summary</p> :
        <></>}
        {(maxValue && assetSelected !== "None" && curValue === 0) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Convert {assetSelected} to {fieldSelected.type === "compoundEmissionFields" ? 3 : ''}{
            (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
              fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
              fieldSelected.symbol ==='BENT' ? 'BENT3' :
              fieldSelected.symbol
          } receipts.<br /><br />Waiting for amount to complete summary.</p> :
        <></>}
        {(maxValue && assetSelected !== "None" && curValue > maxValue) ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Convert {assetSelected} to {fieldSelected.type === "compoundEmissionFields" ? 3 : ''}{
            (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
            fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
            fieldSelected.symbol ==='BENT' ? 'BENT3' :
            fieldSelected.symbol
          } receipts.<br /></p>
          <p className='text-right text-red-600 mb-[10px]'>Please resolve the error before continuing.</p>
        </> :
        <></>}
        {(maxValue && assetSelected !== "None" && curValue <= maxValue && curValue > 0) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Convert <NumberField value={curValue} digit={2} /> {assetSelected}<br /><br />to Est. <NumberField value={curValue * 2000} digit={2} /> {fieldSelected.type === "compoundEmissionFields" ? 3 : ''}{
          (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
              fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
              fieldSelected.symbol ==='BENT' ? 'BENT3' :
              fieldSelected.symbol
        } receipts.</p> :
        <></>}
        {!maxValue &&
        <a href='/' className='flex justify-end items-center mb-[10px] text-[#00FFFF]'>
          <p>Purchase ETH</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </a>}
      </>}
      {/* _____________________________________________________________Deposit____________________________________________________________________________________ */}

      {subTab === "Deposit" &&
      <>
        {(maxValue && depositValue.filter(Boolean).length === 0) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>To continue, the above terms must be accepted.</p> :
        <></>}
        {(maxValue && depositValue.filter(Boolean).length !== 0) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Wrap and stake CRV in StakeDAO,<br /><br />Deposit sdCRV gauge tokens in Curve C.D.P.<br /><br />Waiting for amount to complete summary</p> :
        <></>}
      </>}
      {/* ______________________________________________________________Withdraw___________________________________________________________________________________ */}

      {subTab === "Withdraw" &&
      <>
        {!maxValue ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>You have nothing to withdraw.<br /><br />The links below will help if you are interested in progressing with this pool.</p> :
        <></>}
        {/* {window.alert(assetSelected)} */}
        {(maxValue && !curValue) ?
        // <p className='text-right text-[#C3D6E2] mb-[10px]'>Withdraw {assetSelected} to connected wallet.<br /><br />Waiting for amount to complete summary</p> 
        
        // assetSelected === 'sdCRV3' ? <p className='text-right text-[#C3D6E2] mb-[10px]'>You are about to burn your sdCRV3 receipts to obtain an estimated: [entered amount] {assetSelected}. Confirm by selecting ‘Withdraw’ below and completing the prompted transaction.</p> :
        // assetSelected === 'CRV' ? <p className='text-right text-[#C3D6E2] mb-[10px]'>You are about to burn your sdCRV3 receipts to obtain an estimated: [calculated amount] [wrapped token]. We will then seek the best price to unwrap these tokens to obtain an estimated: [entered amount] [selected token]. Confirm by selecting ‘Withdraw’ below and completing the prompted transaction.</p> :
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Withdraw {assetSelected} to connected wallet.<br /><br />Waiting for amount to complete summary</p> 
        :
        <></>}
        {(maxValue && curValue > maxValue) ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Withdraw {assetSelected} to connected wallet.<br /><br /></p>
          <p className='text-right text-red-600 mb-[10px]'>Please resolve the error before continuing.</p>
        </> 
        :
        <></>
        }
        
        {
        
        (maxValue && curValue <= maxValue && curValue) ?
        assetSelected==='bentCVX'?<>
        <p className='text-right text-[#C3D6E2] mb-[10px]'>
        You are about to burn your bentCVX3 receipts to obtain an estimated: [entered amount] [selected token]. Confirm by selecting ‘Withdraw’ below and completing the prompted transaction.
          </p> :
        </>:
        assetSelected==='CVX'?<>
        <p className='text-right text-[#C3D6E2] mb-[10px]'>
        You are about to burn your bentCVX3 receipts to obtain an estimated: [calculated amount] [wrapped token]. We will then seek the best price to unwrap these tokens to obtain an estimated: [entered amount] [selected token]. Confirm by selecting ‘Withdraw’ below and completing the prompted transaction.
          </p> :
        </>:
        assetSelected==='sdCRV3'?<>
        <p className='text-right text-[#C3D6E2] mb-[10px]'>
        You are about to burn your sdCRV3 receipts to obtain an estimated: [entered amount] {assetSelected}. Confirm by selecting ‘Withdraw’ below and completing the prompted transaction.
          </p> :
        </>:
        assetSelected==='CRV'?<>
        <p className='text-right text-[#C3D6E2] mb-[10px]'>
        You are about to burn your sdCRV3 receipts to obtain an estimated: [calculated amount] [wrapped token]. We will then seek the best price to unwrap these tokens to obtain an estimated: [entered amount] [selected token]. Confirm by selecting ‘Withdraw’ below and completing the prompted transaction.
          </p> :
        </>:
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Withdraw {assetSelected!=='None' && <NumberField value={curValue} digit={2} />} {assetSelected==='None'?'token(s)':assetSelected} to connected wallet.</p> :
        <></>
        }

        {/* {!maxValue &&
        <a onClick={()=>{dispatch(updateRightNavbarTabSelected("Details"))}} className='cursor-pointer flex justify-end items-center mb-[10px] text-[#00FFFF]'>
          <p>Learn about the {fieldSelected.depositsFullName}</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </a>}
        {!maxValue &&
        <a href={CuRVE_FI_SWAP} target='_blank' className='cursor-pointer flex justify-end items-center mb-[10px] text-[#00FFFF]'>
          <p>Buy {fieldSelected.symbol === 'sdCRV3'?'sdCRV':fieldSelected.symbol}</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </a>} */}
        
        {
          //LINKS
          <>
            <div className='links p-b[10px] text-[#00fff0] text-right'>
              <div className='learn-ablut-link cursor-pointer flex justify-end' onClick={()=>{dispatch(updateRightNavbarTabSelected("Details"))}}>
                  <span>Learn about the {fieldSelected.symbol} CDP</span>
                  <img className="w-[14px] h-[12px] ml-[3px] relative top-[3px]" src={ArrowRight} alt=""></img>
              </div>
              {
                fieldSelected.symbol === 'BENT' ?
                <div className='buy-token-link cursor-pointer flex justify-end'>
                  <a href={Uni_SWAP} target='_blank'>Buy {fieldSelected.symbol}</a>
                  <img className="w-[14px] h-[12px] ml-[3px] relative top-[3px]" src={ArrowRight} alt=""></img>
                </div>:

                (fieldSelected.symbol === 'sdCRV3' || fieldSelected.symbol === 'sdCRV') ?
                <div className='buy-token-link cursor-pointer flex justify-end'>
                  <a href={CuRVE_FI_SWAP} target='_blank'>Buy {fieldSelected.symbol === 'sdCRV3'?'sdCRV':fieldSelected.symbol}</a>
                  <img className="w-[14px] h-[12px] ml-[3px] relative top-[3px]" src={ArrowRight} alt=""></img>
                </div>:

                (fieldSelected.symbol === 'bentCVX') ?
                <div className='buy-token-link cursor-pointer flex justify-end'>
                  <a href={CuRVE_FI_SWAP2_76} target='_blank'>Buy {fieldSelected.symbol}</a>
                  <img className="w-[14px] h-[12px] ml-[3px] relative top-[3px]" src={ArrowRight} alt=""></img>
                </div>:

                <div className='buy-token-link-commom cursor-pointer flex justify-end'>
                  <a href="#">Buy {fieldSelected.symbol}</a>
                  <img className="w-[14px] h-[12px] ml-[3px] relative top-[3px]" src={ArrowRight} alt=""></img>
                </div>


              }
              
            </div>
          </>
        }
        <br></br>
      </>}
      {/* _____________________________________________________Merge____________________________________________________________________________________________ */}

      {subTab === "Merge" &&
      <>
        {(maxValue && !curValue) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for a desired amount of {rightNavbarNFTSelected.name} to be entered to produce summary.</p> :
        <></>}
        {(maxValue && curValue > maxValue) ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Merge {fieldSelected.name} NFTs to mint {rightNavbarNFTSelected.name} NFTs.<br /><br /></p>
          <p className='text-right text-red-600 mb-[10px]'>An error has occurred, please resolve before continuing.</p>
        </> :
        <></>}
        {(maxValue && curValue <= maxValue) ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Merge { curValue * rightNavbarNFTSelected.requirementA / fieldSelected.requirementA} {fieldSelected.name} NFTs,</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>to mint {curValue} {rightNavbarNFTSelected.name} NFTs.</p>
        </> :
        <></>}
        {/* {(maxValue && curValue <= maxValue && curValue) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Merge {curValue * rightNavbarNFTSelected.requirementA / depositNFTSelected.requirementA} {fieldSelected.name} NFTs,<br /><br />to mint {curValue} {nftSelected.name} NFTs.</p> :
        <></>} */}
        {!maxValue &&
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Unfortunately, you do not have enough ParAi at this time to power up to TomAi. Perhaps seek a lower power level to merge into? If this is not an option, use the links below to mint or buy more ParAi NFTs.</p>
          <a href='/' className='flex justify-end items-center mb-[10px] text-[#00FFFF]'>
            <p>Mint ParAi</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </a>
          <a href='/' className='flex justify-end items-center mb-[10px] text-[#00FFFF]'>
            <p>Buy ParAi</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </a>
        </>}
      </>}
      {/* _____________________________________________________________BurnNFT____________________________________________________________________________________ */}

      {subTab === "BurnNFT" &&
      <>
        {(maxValue && !curValue) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for a desired amount of {rightNavbarNFTSelected.name} to be entered to produce summary.</p> :
        <></>}
        {(maxValue && curValue > maxValue) ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Burn {rightNavbarNFTSelected.name} NFTs to release 3Fi and 3sdCRV.<br /><br /></p>
          <p className='text-right text-red-600 mb-[10px]'>An error has occurred, please resolve before continuing.</p>
        </> :
        <></>}
        {(maxValue && curValue <= maxValue && curValue) ?
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Burn {curValue} {rightNavbarNFTSelected.name} NFTs,<br /><br />release: {curValue * rightNavbarNFTSelected.requirementA} 3Fi tokens,<br /><br />and {curValue * rightNavbarNFTSelected.requirementB} 3sdCRV tokens.</p> :
        <></>}
      </>}
      {/* ________________________________________________________Signals_________________________________________________________________________________________ */}

      {subTab === "Signals" &&
      <>
        {(signalSelected === '' || signalSelected === signalSaved) &&
        <p className='text-right text-[#C3D6E2]'>
          You have not yet made any changes.<br /><br />
          <span className='text-white'>Current and default settings:<br /></span>
          {/* On harvest, all Liquid emissions collected will be converted to {fieldsData[signal as keyof typeof fieldsData].tokens[1]} and added to the <span className='uppercase'>{signalSaved}</span> C.D.P (compound deposit pool) for 1 term. (1 term = 8 wks) */}
        </p>}
        {signalSelected !== '' && signalSelected !== signalSaved &&
        <p className='text-right text-[#C3D6E2]'>
          Set converter to {signal} from Bent.<br />Focus: Build the {signal} C.D.P.<br /><br />
          <span className='text-white'>New settings once saved:<br /></span>
          {/* On harvest, all collected Liquid emissions will be converted vote locked {fieldsData[signal as keyof typeof fieldsData].tokens[0]} ({fieldsData[signal as keyof typeof fieldsData].tokens[1]}), and added to the {signal} C.D.P on 3.Finance. */}
        </p>}
      </>}
      {/* _______________________________________________________Harvest__________________________________________________________________________________________ */}

      {subTab === "Harvest" &&
      <>
        {curValue === 0 &&
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Currently, you are not receiving this emission.<br /><br />Use the link below to learn which deposits are required to earn this emission.</p>}
        {curValue !== 0 && (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') &&
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Harvest accrued {fieldSelected.tokens[0]} emissions.<br /><br />
        Deposit into {fieldSelected.signalSelected} C.D.P.</p>}
        {curValue !== 0 && (fieldSelected.name === 'SDT') &&
        <p className='text-right text-[#C3D6E2] mb-[10px]'>
          At this time, all SDT emissions will only be converted to BENT and added to the Bent C.D.P.<br /><br />Harvest accrued SDT emissions.<br /><br />Swap for BENT,<br /><br />Deposit into Bent C.D.P.
        </p>}
        {curValue !== 0 && (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && fieldSelected.name !== 'SDT') &&
        <p className='text-right text-[#C3D6E2] mb-[10px]'>
          Harvest accrued {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} emissions.<br /><br />Swap for <span className='uppercase'>{fieldSelected.signalSelected}</span>,<br /><br />Deposit into {fieldSelected.signalSelected} C.D.P.
        </p>}
        {curValue === 0 &&
        <div
          onClick={() => {
            // dispatch(updateRightNavbarTabSelected("Details")); //Todo:
          }}
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'>
          <p>View Emission Details</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>}
      </>}
      {/* _______________________________________________________Claim__________________________________________________________________________________________ */}

      {subTab === "Claim" &&
      <>
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Currently, you are not receiving this emission.<br /><br />
        Use the link below to learn which deposits are required to earn this emission.</p>
        <div
          onClick={() => {
            // dispatch(updateRightNavbarTabSelected("Details")); //Todo:
          }}
          className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'>
          <p>View Emission Details</p>
          <img alt='' src={ArrowRight} className="ml-[5px]" />
        </div>
      </>}
      {/* ____________________________________________________Distribute_____________________________________________________________________________________________ */}

      {subTab === "Distribute" && getCRVWalletStatus(fieldData) && 
      (
        assetSelected === "CRV" ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>${maxValue === 0 ? '0 (0%)' : '1,234,567,890 (40%) to Alchemix'}</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>${maxValue === 0 ? '0 (0%)' : '1,234,567,890 (34%) to MoneyApp2'}</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>${maxValue === 0 ? '0 (0%)' : '1,234,567,890 (16%) to MoneyApp3'}</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>${maxValue === 0 ? '0 (0%)' : '1,234,567,890 (10%) to Curve C.D.P'}</p>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              // let link = document.getElementById('CVX')
              // link?.click()
              // dispatch(updateRightNavbarTabSelected("Actions"));
              // dispatch(updateRightNavbarSubTabSelected("Deposit"));
            }}>
            <p>Convert and Claim</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              dispatch(updateRightNavbarSubTabSelected("Manage"));
            }}>
            <p>Edit CRV allocations</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
        </> :
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>None of your collateral has been allocated.</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Use the links to edit or claim the collateral balance,</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Or add the balance to your Curve C.D.P.</p>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              dispatch(updateRightNavbarSubTabSelected("Manage"));
            }}>
            <p>Edit CRV allocations</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              // let link = document.getElementById('CVX')
              // link?.click()
              // dispatch(updateRightNavbarTabSelected("Actions"));
              // dispatch(updateRightNavbarSubTabSelected("Deposit"));
            }}>
            <p>Convert and Claim</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
        </>
      )
      }
      {/* _________________________________________________Manage________________________________________________________________________________________________ */}

      {subTab === "Manage" && getCRVWalletStatus(fieldData) &&
      (curValue <= 0 ? 
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for allocation to be entered to produce summary.</p> :
        curValue > maxValue ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Add CRV to [Money App]</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>An error has occured, please resolve it before continuing.</p>
        </> :
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Add <NumberField value={curValue} digit={2} /> CRV (40%) to [Money App]</p>
      )}
      {/* ___________________________________________________ClaimNFT______________________________________________________________________________________________ */}

      {subTab === "ClaimNFT" && getCRVWalletStatus(fieldData) &&
      (
        curValue <= 0 ? 
        <p className='text-right text-[#C3D6E2] mb-[10px]'>Waiting for amount to claim to produce summary.</p> :
        curValue > maxValue ?
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Convert CRV to FRAX,</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Transfer FRAX to connected wallet.</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>An error has occured, please resolve it before continuing.</p>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              dispatch(updateRightNavbarSubTabSelected("Distribute"));
            }}>
            <p>Distribute CRV</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              dispatch(updateRightNavbarSubTabSelected("Manage"));
            }}>
            <p>Edit CRV allocations</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
        </> :
        <>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Convert <NumberField value={curValue} digit={2} /> CRV,</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>to Est. <NumberField value={curValue} digit={2} /> FRAX,</p>
          <p className='text-right text-[#C3D6E2] mb-[10px]'>Transfer FRAX to connected wallet.</p>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              dispatch(updateRightNavbarSubTabSelected("Distribute"));
            }}>
            <p>Distribute CRV</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
          <div 
            className='flex justify-end items-center mb-[10px] text-[#00FFFF] cursor-pointer'
            onClick={() => {
              dispatch(updateRightNavbarSubTabSelected("Manage"));
            }}>
            <p>Edit CRV allocations</p>
            <img alt='' src={ArrowRight} className="ml-[5px]" />
          </div>
        </>
      )}
      {/* _________________________________________________________________________________________________________________________________________________ */}

    </div>
  )
}