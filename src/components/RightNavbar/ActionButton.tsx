import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { updateSignalSaved, updateFieldData, updateFieldSelected } from '../../store/actions/globalAction';
import { updateDepositData, updateRightNavbarCurValue, updateRightNavbarDepositValue, updateRightNavbarSubTabSelected, updateRightNavbarTabSelected,updateHarvestButtonClicked } from '../../store/actions/navbarAction';

import { Asset, FieldType } from '../../types/types';

import actionButtonJsonData from '../../assets/data/actionButton.json';
import classNames from 'classnames';
import BigNumber from "bignumber.js";

// import { BentAddress, BentCDPContractAddr, ConvexAddress, ConvexCDPContractAddr, SMALLEST } from '../../constants';
// import useABI from '../../hooks/useABI';
// import useMetaMask from '../../hooks/metaMask';
// import { useCallback, useState } from 'react';
// import { BentAddress, BentCDPContractAddr, ConvexAddress, ConvexCDPContractAddr, SMALLEST } from '../../constants';
import useDepositAndWithdraw from '../../hooks/useDepositAndWithdraw';
import useClaimAndHarvestHook from '../../hooks/useClaimAndHarvestHook';


export default function ActionButton() {
  // const {approveBent, depositBent, withdrawBent, allowanceBent,
  //   depositBentConvex,withdrawBentConvex,approveConvex,allowanceConvex} = useABI()
  // const { 
  //   // signTransaction,
  //   // getWalletBalance,
  //   sendTransaction } = useMetaMask()

  const dispatch: Dispatch<any> = useDispatch();
  const signalSaved = useSelector((state: RootState) => state.global.signalSaved);
  const signalSelected = useSelector((state: RootState) => state.global.signalSelected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const depositValue = useSelector((state: RootState) => state.navbar.rightNavbarDepositValue);
  const rightNavbarNFTSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const depositAssets = useSelector((state: RootState) => state.navbar.depositData);
  const rightNavbarCurValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const rightNavbarAssetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const harvestButtonClicked = useSelector((state: RootState) => state.navbar.harvestButtonClicked);
  // web-3 implimentation-----start-----

  const {
    depositBent,
    depositBentCVX,
    withdrawBent,
    withdrawBentCVX,
    handleMintBent3FiToken,
    handleBurnBent3FiToken
   } = useDepositAndWithdraw()

   const {harvestBentCVX,
          handleClaimConvexCDP,
          handleClaimBentCDP
        } = useClaimAndHarvestHook()

// web-3 implimentation-----end-----

  const getActionsButtonEnabled = () => {
    // Todo:
    // if (subTabSelected !== 'Signals' && (curValue === 0 || curValue > maxValue))
    //   return false;
    // if (subTabSelected === 'Signals' && (signalSaved === signalSelected || signalSelected === ''))
    //   return false;
    return true;
  }
  const actionsButtonEnabled: boolean = getActionsButtonEnabled();

  const depositButtonClickHandle = () => {
    // Todo:
    fieldData.map((data: FieldType) => {
      if (data.depositsFullName === fieldSelected.depositsFullName && data.emissionsFullName === fieldSelected.emissionsFullName) {
        if (depositAssets.assets.length >= 2 && data.tokens && data.depositsDepositAsset) {
          //Deposit All Action
          depositAssets.assets.map((each: Asset) => {
            const index: number = data.tokens ? data.tokens.findIndex(eachToken => eachToken === each.symbol) : -1
            if (index !== -1 && data.depositsDepositAsset) {
              if (data.depositsLP === undefined) data.depositsLP = 0
              data.depositsLP += each.amount
              fieldSelected.depositsLP = data.depositsLP
              data.depositsDepositAsset[index] = 0
              each.amount = 0
            }
          })
          depositAssets.assets = []
        }
        else if (depositAssets.assets.length === 1) {
          //Todo: Deposit one Action
          if(depositAssets.value > 0){
            //web3 - deposits
            // console.log('depositAssets:',depositAssets)
            // window.alert(`${depositAssets.value} ${depositAssets.assets[0].symbol}`)
            
            if(depositAssets.assets[0].symbol === 'BENT'){
              depositBent(depositAssets.value)
            }
            if(depositAssets.assets[0].symbol === 'bentCVX'){
              depositBentCVX(depositAssets.value)
            }
          }

          // if (depositAssets.reroute) {
          //   if (data.depositsLP === undefined) data.depositsLP = 0
          //   data.depositsLP += depositAssets.value
          //   fieldSelected.depositsLP = data.depositsLP
          //   fieldSelected.depositsReRouteAsset -= depositAssets.value
          //   depositAssets.assets[0].amount -= depositAssets.value
          //   depositAssets.value = 0
          //   if (fieldSelected.depositsReRouteAsset === 0) {
          //     depositAssets.assets = []
          //     depositAssets.reroute = false
          //   }
          // } else {
          //   const index: number = data.tokens ?  data.tokens.findIndex(eachToken => eachToken === depositAssets.assets[0].symbol) : -1
          //   if (index !== -1 && data.depositsDepositAsset) {
          //     if (data.depositsLP === undefined) data.depositsLP = 0
          //     data.depositsLP += depositAssets.value
          //     fieldSelected.depositsLP = data.depositsLP
          //     data.depositsDepositAsset[index] -= depositAssets.value
          //     depositAssets.assets[0].amount -= depositAssets.value
          //     if (depositAssets.assets[0].amount === 0) {
          //       depositAssets.assets = []
          //       depositAssets.reroute = false
          //       depositAssets.acceptTerms = false
          //     }
          //     depositAssets.value = 0
          //   }
          // }
        }
      }
    })

    // console.log(depositAssets)
    //web3 - deposits

    // if(depositAssets.assets[0].symbol === 'bentCVX'){
    //   depositBentCVX(depositAssets.value)
    // }

    // if(depositAssets.assets[0].symbol === 'CVX'){
    //  return
    // }

    //RESET STATES
    dispatch(updateDepositData(depositAssets))
    dispatch(updateFieldData(fieldData));
    dispatch(updateFieldSelected(fieldSelected));
    // dispatch(updateRightNavbarCurValue(0));
    dispatch(updateRightNavbarDepositValue(depositValue));
  }

  const handleClick = async() => {
    // Todo:
    let tmpSignalSymbol = '';
    // fieldData.forEach((field: FieldType) => {})

    if (subTabSelected === "Mint") {
      // window.alert(curValue)
      if(curValue>maxValue){return}else{
        handleMintBent3FiToken(curValue)
      }
      // if (field.depositsFullName === "Convex C.D.P" || field.depositsFullName === "Bent C.D.P") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP -= curValue;
      //   }
      // } else if (field.depositsFullName === "3Fi Collateral - CRV Base") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP += curValue;
      //   }
      // }
    } else if (subTabSelected === "Burn") {
      if(curValue>maxValue){return}else{
        // window.alert(curValue)
        handleBurnBent3FiToken(curValue)
      }
      // if (field.depositsFullName === "Convex C.D.P" || field.depositsFullName === "Bent C.D.P") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP += curValue;
      //   }
      // } else if (field.depositsFullName === "3Fi Collateral - CRV Base") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP -= curValue;
      //   }
      // }
    } else if (subTabSelected === "NFTs") {
      // if (field.depositsFullName === "3Fi Collateral - CRV Base") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP -= curValue * rightNavbarNFTSelected.requirementA;
      //   }
      // } else if (field.depositsFullName === "Curve C.D.P") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP -= curValue * rightNavbarNFTSelected.requirementB;
      //   }
      // } else if (field.name === rightNavbarNFTSelected.name) {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP += curValue;
      //   }
      // }
    } else if (subTabSelected === "Zap" ) {
      // if (typeof field.depositsLP != "undefined") {
      //   field.depositsLP += curValue * 2000;
      //   fieldSelected.depositsLP = field.depositsLP;
      // }
    } 
    // else if (subTabSelected === "Withdraw" && field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName) {
    else if (subTabSelected === "Withdraw") {
      // _____________________________________________________________

      // console.log("clicked on withdraw:",rightNavbarCurValue)
      // Todo: web3: implimentation
      // window.alert(`withdraw ${rightNavbarCurValue}`)
      if(rightNavbarAssetSelected==='BENT'){
        withdrawBent(rightNavbarCurValue);
      }

      if(rightNavbarAssetSelected==='bentCVX'){
        withdrawBentCVX(rightNavbarCurValue);
      }
      if(rightNavbarAssetSelected==='CVX'){
        return;
      }
     

      // _____________________________________________________________

      // if (typeof field.depositsLP != "undefined") {
      //   field.depositsLP -= curValue;
      //   fieldSelected.depositsLP -= curValue;
      // }
    } else if (subTabSelected === 'BurnNFT') {
      // if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP -= curValue;
      //     fieldSelected.depositsLP -= curValue;
      //     // if (field.depositsLP <= 0) dispatch(updateFieldSelected(field));
      //   }
      // } else if (field.depositsFullName === "3Fi Collateral - CRV Base") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP += curValue * fieldSelected.requirementA;
      //   }
      // } else if (field.depositsFullName === "Curve C.D.P") {
      //   if (typeof field.depositsLP != "undefined") {
      //     field.depositsLP += curValue * fieldSelected.requirementB;
      //   }
      // }
    } else if (subTabSelected === 'Harvest') {
      //Todo: web3
      // window.alert(`harvest ${fieldSelected.symbol} with signal ${fieldSelected.signalSelected} CDP`)
      if(fieldSelected.symbol === 'bentCVX'){
        if(fieldSelected.signalSelected === 'Convex'){
          harvestBentCVX()
        }
      }
      else{
        return
      }

      // _________________________________________________________________________________
      // if (field.name === fieldSelected.signalSelected) {
      //   if (fieldSelected.signalSelected === "CRV wallet") {
      //     field.emissionsBalance += curValue;
      //     tmpSignalSymbol = field.emissionsSymbol ? field.emissionsSymbol : '';
      //   } else {
      //     field.depositsLP += curValue;
      //     tmpSignalSymbol = field.depositsSymbol ? field.depositsSymbol : '';
      //   }
      // }
      // if (field.emissionsFullName === fieldSelected.emissionsFullName) {
      //   if (typeof field.emissionsCollected != 'undefined') {
      //     field.emissionsCollected -= curValue;
      //     fieldSelected.emissionsCollected -= curValue;
      //     field.emissionLastSignalSymbol = tmpSignalSymbol;
      //   }
      // }
    }
// ___________________________________________________________________________________________________________________
if (subTabSelected === 'Signals') {
  dispatch(updateSignalSaved(signalSelected));
}

// ___________________________________________________________________________________________________________________
    if (subTabSelected === 'Claim') {
      if(fieldSelected.symbol === 'bentCVX'){
        // if(fieldSelected.signalSelected === 'Convex'){
          handleClaimBentCDP()
          // window.alert('ok')
        // }
      }
      if(fieldSelected.symbol === 'CVX'){
        // if(fieldSelected.signalSelected === 'Convex'){
          handleClaimConvexCDP()
          // window.alert('ok')
        // }
      }
    }

    dispatch(updateFieldData(fieldData));
    if (subTabSelected === 'BurnNFT' && fieldSelected.depositsLP <= 0) {
      fieldData.filter((field: FieldType) => {
        if (field.symbol === "3FiToken") {
          dispatch(updateFieldSelected(field));
          dispatch(updateRightNavbarTabSelected("Actions"));
          dispatch(updateRightNavbarSubTabSelected("Mint"));
        }
      });
    } else {
      dispatch(updateFieldSelected(fieldSelected));
    }

    // dispatch(updateRightNavbarCurValue(0));

    // if (walletConnected === 'Connected') {
    //   dispatch(updateRightNavbarTabSelected("Details"));
    // }
    // if (fieldSelected.depositsLP > 0){
    //   dispatch(updateRightNavbarTabSelected("Actions"));
    // }
  }

  return (
    <div className='bg-[#6A6C75] h-[140px] w-full 2xl:h-[145px] fixed bottom-[0px]' style={{ width: '-webkit-fill-available', opacity: 0.8 }}>
      {subTabSelected === 'Merge' &&
        <p className='text-[18px] py-[10px] rounded-[28px] mt-[30px] mr-[50px] text-right'>
          Power up with or without artwork?
        </p>
      }
      {subTabSelected === 'Deposit' && depositAssets.assets.length === 0 &&
        <p className='text-[18px] py-[10px] rounded-[28px] mt-[30px] mr-[50px] text-right'>
          Deposit Actions
        </p>
      }
      {subTabSelected === 'Manage' &&
        <p className='text-[18px] py-[10px] rounded-[28px] mt-[30px] mr-[50px] text-right'>
          New Allocations
        </p>
      }
      <div className='text-right inline-block flex pl-[50px]'>
        {subTabSelected === 'Deposit' && depositAssets.assets.length === 0 &&
          <div className='flex mr-[35px]'>
            {fieldSelected.depositsDepositAsset && fieldSelected.depositsDepositAsset.filter(Boolean).length > 0 &&
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[12px] mr-[15px] text-center cursor-not-allowed text-black'>
                Deposit
              </p>}
            {/* {fieldSelected.depositsReRouteAsset > 0 && */}
            {fieldSelected.depositsDepositAsset && fieldSelected.depositsDepositAsset.filter(Boolean).length > 0 &&
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[12px] mr-[15px] text-center cursor-not-allowed text-black'>
                ReRoute
              </p>}
          </div>}

        {subTabSelected === 'Deposit' && depositAssets.assets.length >= 2 &&
        // Todo:
          <div className='flex mr-[35px]'>
            <p
              className='Action-Button text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[30px] mr-[15px] text-center cursor-pointer text-black'
              onClick={() => depositButtonClickHandle()}
            >
              Deposit All
            </p>
          </div>}

        {subTabSelected === 'Deposit' && depositAssets.assets.length === 1 && !depositAssets.reroute &&
          <div className='flex mr-[35px]'>
            <p
              className={`Action-Button text-[14px] px-[20px] py-[10px] rounded-[28px] ${curValue <= maxValue ? 'bg-[#00FFF0] cursor-pointer' : 'bg-[#C3D6E2] cursor-not-allowed'} mt-[30px] mr-[15px] text-center text-black`}
              onClick={() => {
                // Todo:
                curValue <= maxValue && depositButtonClickHandle()
              }}
            >
              Deposit
            </p>
          </div>
        }

        {subTabSelected === 'Deposit' && depositAssets.assets.length === 1 && depositAssets.reroute &&
          <div className='flex mr-[35px]'>
            <p
              className={`text-[14px] px-[20px] py-[10px] rounded-[28px] ${depositAssets.value > 0 && depositAssets.value <= depositAssets.assets[0].amount ? 'bg-[#00FFF0] cursor-pointer' : 'bg-[#C3D6E2] cursor-not-allowed'} mt-[30px] mr-[15px] text-center text-black`}
              onClick={() => {
                if (depositAssets.value > 0 && depositAssets.value <= depositAssets.assets[0].amount) depositButtonClickHandle()
                else return
              }}
            >
              ReRoute
            </p>
          </div>}

        {subTabSelected === 'Merge' &&
          <>
            {!actionsButtonEnabled ?
              <>
                <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[12px] mr-[15px] text-center cursor-not-allowed text-black'>
                  Without Artwork
                </p> 
                <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[12px] mr-[50px] text-center cursor-not-allowed text-black'>
                  With Art
                </p>
              </>:
              <>
                <p
                  className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[12px] mr-[15px] text-center cursor-pointer text-black'
                  onClick={() => {
                    fieldData.forEach((field: FieldType) => {
                      if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue * (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA);
                        }
                      } else if (field.name === rightNavbarNFTSelected.name) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue;
                        }
                      }
                    })

                    dispatch(updateFieldData(fieldData));
                    dispatch(updateFieldSelected(fieldSelected));
                    // dispatch(updateRightNavbarCurValue(0));
                  }}
                >
                  Without Artwork
                </p>
                <p
                  className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[12px] mr-[50px] text-center cursor-pointer text-black'
                  onClick={() => {
                    fieldData.forEach((field: FieldType) => {
                      if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue * (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA);
                        }
                      } else if (field.name === rightNavbarNFTSelected.name) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue;
                        }
                      }
                    })

                    dispatch(updateFieldData(fieldData));
                    dispatch(updateFieldSelected(fieldSelected));
                    // dispatch(updateRightNavbarCurValue(0));
                  }}
                >
                  With Art
                </p>
              </>}
          </>}

        {subTabSelected === 'Manage' &&
        <>
          {!actionsButtonEnabled ?
            <>
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[12px] mr-[15px] text-center cursor-not-allowed text-black'>
                Revert to saved
              </p> 
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[12px] mr-[50px] text-center cursor-not-allowed text-black'>
                Save Changes
              </p>
            </>:
            <>
              <p
                className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[12px] mr-[15px] text-center cursor-pointer text-black'
                onClick={() => {
                  // fieldData.map((field: FieldType) => {
                  //   if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
                  //     if (typeof field.depositsLP != "undefined") {
                  //       field.depositsLP -= curValue * (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA);
                  //     }
                  //   } else if (field.name === rightNavbarNFTSelected.name) {
                  //     if (typeof field.depositsLP != "undefined") {
                  //       field.depositsLP += curValue;
                  //     }
                  //   }
                  // })

                  // dispatch(updateFieldData(fieldData));
                  // dispatch(updateFieldSelected(fieldSelected));
                  // dispatch(updateRightNavbarCurValue(0));
                }}
              >
                Revert to saved
              </p>
              <p
                className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[12px] mr-[50px] text-center cursor-pointer text-black'
                onClick={() => {
                  // fieldData.map((field: FieldType) => {
                  //   if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
                  //     if (typeof field.depositsLP != "undefined") {
                  //       field.depositsLP -= curValue * (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA);
                  //     }
                  //   } else if (field.name === rightNavbarNFTSelected.name) {
                  //     if (typeof field.depositsLP != "undefined") {
                  //       field.depositsLP += curValue;
                  //     }
                  //   }
                  // })

                  // dispatch(updateFieldData(fieldData));
                  // dispatch(updateFieldSelected(fieldSelected));
                  // dispatch(updateRightNavbarCurValue(0));
                }}
              >
                Save Changes
              </p>
            </>}
        </>}

        {subTabSelected === 'Distribute' &&
          <>
            <p className=
              {classNames(
                'text-[14px] px-[20px] py-[10px] rounded-[28px] mt-[30px] mr-[50px] text-center text-black',
                maxValue > 0 ? 'cursor-pointer bg-[#00FFF0]' : 'cursor-not-allowed bg-[#C3D6E2]'
              )}
            >
              {assetSelected === 'CRV' ? 'Distribute' : 'Compound CRV'}
            </p> 
          </>}

        {subTabSelected !== 'Deposit' && subTabSelected !== 'Merge' && subTabSelected !== 'Distribute' && subTabSelected !== 'Manage' &&
          <>
            {
            !actionsButtonEnabled ?
              <p className='Action-Button text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[30px] mr-[50px] text-center cursor-not-allowed text-black'>
                {/* Todo:ActionButton */}
                {actionButtonJsonData[subTabSelected as keyof typeof actionButtonJsonData]}
              </p> :
              <p
                className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[30px] mr-[50px] text-center cursor-pointer text-black'
                onClick={async()=>{
                  await handleClick()
                }}
              >
                {actionButtonJsonData[subTabSelected as keyof typeof actionButtonJsonData]}
              </p>
              }
          </>}
      </div>
    </div>
  )
}