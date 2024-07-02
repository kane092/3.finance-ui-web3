import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { updateSignalSaved, updateFieldData, updateFieldSelected } from '../../store/actions/globalAction';
import { updateRightNavbarCurValue, updateRightNavbarDepositValue, updateRightNavbarTabSelected } from '../../store/actions/navbarAction';

import { FieldType } from '../../types/types';

import actionButtonJsonData from '../../assets/data/actionButton.json';

export default function DepositActionButton() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const signalSaved = useSelector((state: RootState) => state.global.signalSaved);
  const signalSelected = useSelector((state: RootState) => state.global.signalSelected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const depositValue = useSelector((state: RootState) => state.navbar.rightNavbarDepositValue);
  const rightNavbarNFTSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);

  const getActionsButtonEnabled = () => {
    if (subTabSelected !== 'Signals' && (curValue === 0 || curValue > maxValue))
      return false;
    if (subTabSelected === 'Signals' && (signalSaved === signalSelected || signalSelected === ''))
      return false;
    return true;
  }
  const actionsButtonEnabled: boolean = getActionsButtonEnabled();

  const depositButtonClickHandle = () => {
    // window.alert("deposit")
    // let depositLength = depositValue.filter(Boolean).length;
    // fieldData.map((data: FieldType) => {
    //   if (data.depositsFullName === fieldSelected.depositsFullName && data.emissionsFullName === fieldSelected.emissionsFullName) {
    //     if (data.depositsDepositAsset) {
    //       data.depositsDepositAsset.map((val: number, index: number) => {
    //         if (typeof data.depositsDepositAsset != 'undefined' && depositValue[index]) {
    //           if (depositLength >= 2) {
    //             // Deposit All
    //             data.depositsDepositAsset[index] -= depositValue[index];
    //             data.depositsLP += depositValue[index];
    //             fieldSelected.depositsLP += depositValue[index];
    //             depositValue[index] = 0;
    //           } else {
    //             // Deposit
    //             data.depositsDepositAsset[index] -= curValue;
    //             data.depositsLP += curValue;
    //             fieldSelected.depositsLP += curValue;
    //             depositValue[index] -= curValue;
    //           }
    //         }
    //       });
    //     }
    //     if (typeof data.depositsReRouteAsset != "undefined" && depositValue[3]) {
    //       data.depositsReRouteAsset -= curValue;
    //       data.depositsLP += curValue;
    //       fieldSelected.depositsLP += curValue;
    //       fieldSelected.depositsReRouteAsset -= curValue;
    //       depositValue[3] -= curValue;
    //     }
    //   }
    // })

    // dispatch(updateFieldData(fieldData));
    // dispatch(updateFieldSelected(fieldSelected));
    // // dispatch(updateRightNavbarCurValue(0));
    // dispatch(updateRightNavbarDepositValue(depositValue));
  }

  return (
    <div className='bg-[#6A6C75] h-[100px] 2xl:h-[145px] fixed bottom-[0px]' style={{ width: '-webkit-fill-available', opacity: 0.8 }}>
      <div className='text-right inline-block flex justify-end'>
        {subTabSelected === 'Deposit' && depositValue.filter(Boolean).length <= 1 && curValue === 0 &&
          <div className='flex mr-[35px]'>
            {fieldSelected.depositsDepositAsset && fieldSelected.depositsDepositAsset.filter(Boolean).length > 0 &&
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[30px] mr-[15px] w-[150px] text-center cursor-not-allowed text-black'>
                Deposit
              </p>}
            {fieldSelected.depositsReRouteAsset > 0 &&
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[30px] mr-[15px] w-[150px] text-center cursor-not-allowed text-black'>
                ReRoute
              </p>}
          </div>}

        {subTabSelected === 'Deposit' && depositValue.filter(Boolean).length >= 2 &&
          <div className='flex mr-[35px]'>
            <p
              className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[30px] mr-[15px] w-[150px] text-center cursor-pointer text-black'
              onClick={() => depositButtonClickHandle()}
            >
              Deposit All
            </p>
          </div>}

        {subTabSelected === 'Deposit' && depositValue.filter(Boolean).length === 1 && curValue > 0 && depositValue[3] === 0 &&
          <div className='flex mr-[35px]'>
            <p
              className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[30px] mr-[15px] w-[150px] text-center cursor-pointer text-black'
              onClick={() => depositButtonClickHandle()}
            >
              Deposit
            </p>
          </div>}

        {subTabSelected === 'Deposit' && depositValue.filter(Boolean).length === 1 && curValue > 0 && depositValue[3] > 0 &&
          <div className='flex mr-[35px]'>
            <p
              className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[30px] mr-[15px] w-[150px] text-center cursor-pointer text-black'
              onClick={() => depositButtonClickHandle()}
            >
              ReRoute
            </p>
          </div>}

        {subTabSelected !== 'Deposit' &&
          <>
            {!actionsButtonEnabled ?
              <p className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#C3D6E2] mt-[30px] mr-[50px] w-[150px] text-center cursor-not-allowed text-black'>
                {actionButtonJsonData[subTabSelected as keyof typeof actionButtonJsonData]}
              </p> :
              <p
                className='text-[14px] px-[20px] py-[10px] rounded-[28px] bg-[#00FFF0] mt-[30px] mr-[50px] w-[150px] text-center cursor-pointer text-black'
                onClick={() => {
                  let tmpSignalSymbol = '';
                  fieldData.map((field: FieldType) => {
                    if (subTabSelected === "Mint") {
                      if (field.depositsFullName === "Convex C.D.P" || field.depositsFullName === "Bent C.D.P") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue;
                        }
                      } else if (field.depositsFullName === "3Fi Collateral - CRV Base") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue;
                        }
                      }
                    } else if (subTabSelected === "Burn") {
                      if (field.depositsFullName === "Convex C.D.P" || field.depositsFullName === "Bent C.D.P") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue;
                        }
                      } else if (field.depositsFullName === "3Fi Collateral - CRV Base") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue;
                        }
                      }
                    } else if (subTabSelected === "NFTs") {
                      if (field.depositsFullName === "3Fi Collateral - CRV Base") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue * rightNavbarNFTSelected.requirementA;
                        }
                      } else if (field.depositsFullName === "Curve C.D.P") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue * rightNavbarNFTSelected.requirementB;
                        }
                      } else if (field.name === rightNavbarNFTSelected.name) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue;
                        }
                      }
                    } else if (subTabSelected === "Zap" && field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName) {
                      if (typeof field.depositsLP != "undefined") {
                        field.depositsLP += curValue * 2000;
                      }
                    } else if (subTabSelected === "Withdraw" && field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName) {
                      if (typeof field.depositsLP != "undefined") {
                        field.depositsLP -= curValue;
                        fieldSelected.depositsLP -= curValue;
                      }
                    } else if (subTabSelected === 'Merge') {
                      if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue * (rightNavbarNFTSelected.requirementA / fieldSelected.requirementA);
                        }
                      } else if (field.name === rightNavbarNFTSelected.name) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue;
                        }
                      }
                    } else if (subTabSelected === 'BurnNFT') {
                      if (field.depositsFullName === fieldSelected.depositsFullName && field.emissionsFullName === fieldSelected.emissionsFullName && field.depositsLP) {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP -= curValue;
                        }
                      } else if (field.depositsFullName === "3Fi Collateral - CRV Base") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue * fieldSelected.requirementA;
                        }
                      } else if (field.depositsFullName === "Curve C.D.P") {
                        if (typeof field.depositsLP != "undefined") {
                          field.depositsLP += curValue * fieldSelected.requirementB;
                        }
                      }
                    } else if (subTabSelected === 'Harvest') {
                      if (field.name === fieldSelected.signalSelected) {
                        field.depositsLP += curValue;
                        tmpSignalSymbol = field.depositsSymbol ? field.depositsSymbol : '';
                      }
                      if (field.emissionsFullName === fieldSelected.emissionsFullName) {
                        if (typeof field.emissionsCollected != 'undefined') {
                          field.emissionsCollected -= curValue;
                          fieldSelected.emissionsCollected -= curValue;
                          field.emissionLastSignalSymbol = tmpSignalSymbol;
                        }
                      }
                    }
                  })

                  if (subTabSelected === 'Signals') {
                    dispatch(updateSignalSaved(signalSelected));
                  }

                  dispatch(updateFieldData(fieldData));
                  dispatch(updateFieldSelected(fieldSelected));
                  // dispatch(updateRightNavbarCurValue(0));
                  
                  // console.log('fffffffff', walletConnected)
                  // if (walletConnected === 'Connected') {
                  //   dispatch(updateRightNavbarTabSelected("Details"));
                  // }
                  // if (fieldSelected.depositsLP > 0){
                  //   dispatch(updateRightNavbarTabSelected("Actions"));
                  // }
                }}
              >
                {actionButtonJsonData[subTabSelected as keyof typeof actionButtonJsonData]}
              </p>}
          </>}
      </div>
    </div>
  )
}