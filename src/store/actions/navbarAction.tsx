import {
  LEFT_NAVBAR_SHOW,
  LEFT_NAVBAR_PAGE_SELECTED,
  RIGHT_NAVBAR_SHOW,
  RIGHT_NAVBAR_TAB_SELECTED,
  RIGHT_NAVBAR_SUB_TAB_SELECTED,
  RIGHT_NAVBAR_MAX_VALUE,
  RIGHT_NAVBAR_CUR_VALUE,
  RIGHT_NAVBAR_NFT_SELECTED,
  RIGHT_NAVBAR_ASSET_SELECTED,
  RIGHT_NAVBAR_EMISSION_SELECTED,
  RIGHT_NAVBAR_DEPOSIT_VALUE,
  RIGHT_NAVBAR_INDICATOR_FLAG,
  DEPOSIT_DATA,
  RIGHT_NAVBAR_BORDER_POSITION,
  RIGHT_LANDING_MODAL_SHOW,

  ACTION_BUTTON_HARVEST_CLICKED
} from '../actionTypes';

import {
  ReduxDispatchType,
  Navbar,
  TabType,
  SubTabType,
  NFTData,
  Page,
  EmissionListData,
  SignalType,
  DepositData
} from '../../types/types';

export const updateLeftNavbarShow = (show: Navbar) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: LEFT_NAVBAR_SHOW,
    payload: show
  })
}

export const updateLeftNavbarPageSelected = (selected: Page) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: LEFT_NAVBAR_PAGE_SELECTED,
    payload: selected
  })
}

export const updateRightNavbarShow = (show: Navbar) => (dispatch: ReduxDispatchType) => {
  // Hide LeftNavbar when RightNavbar opens
  if (show === "Opened") {
    dispatch({
      type: LEFT_NAVBAR_SHOW,
      payload: "Minimized"
    });
  }

  dispatch({
    type: RIGHT_NAVBAR_SHOW,
    payload: show
  })
}

export const updateRightNavbarTabSelected = (selected: TabType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_TAB_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarSubTabSelected = (selected: SubTabType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_SUB_TAB_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarMaxValue = (value: number) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_MAX_VALUE,
    payload: value,
  })
}

export const updateRightNavbarCurValue = (value: number) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_CUR_VALUE,
    payload: value,
  })
}

export const updateRightNavbarNFTSelected = (selected: NFTData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_NFT_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarAssetSelected = (selected: string) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_ASSET_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarEmissionSelected = (selected: EmissionListData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_EMISSION_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarDepositValue = (value: number[]) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_DEPOSIT_VALUE,
    payload: value,
  })
}

export const updateRightNavbarIndicatorFlag = (flag: boolean) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_INDICATOR_FLAG,
    payload: flag,
  })
}

export const updateDepositData = (data: DepositData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: DEPOSIT_DATA,
    payload: data,
  })
}

export const updateRightNavbarBorderPosition = (data: any) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_BORDER_POSITION,
    payload: data,
  })
}

export const updateRightLandingModalShow = (data: any) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_LANDING_MODAL_SHOW,
    payload: data,
  })
}
export const updateHarvestButtonClicked = (data: boolean) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: ACTION_BUTTON_HARVEST_CLICKED,
    payload: data,
  })
}