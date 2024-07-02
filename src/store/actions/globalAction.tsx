import {
  GLOBAL_PATH_NAME,
  GLOBAL_WALLET_CONNECTED,
  GLOBAL_WALLET_CONNECT_MODAL_SHOW,
  GLOBAL_SETTING_TD_SAVED,
  GLOBAL_SETTING_TD_SELECTED,
  GLOBAL_SETTING_REFLECT_SAVED,
  GLOBAL_SETTING_REFLECT_SELECTED,
  GLOBAL_SETTING_SIGNAL_SAVED,
  GLOBAL_SETTING_SIGNAL_SELECTED,
  GLOBAL_FIELD_DATA,
  GLOBAL_FIELD_SELECTED,
  INIATED_TRANSACTION,
  FROM_LANDING_PAGE
} from '../actionTypes';
import {
  Wallet,
  TDType,
  ReflectType,
  SignalType,
  FieldType,
  ReduxDispatchType
} from '../../types/types';

export const updateFromLandingPage = (state: boolean) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: FROM_LANDING_PAGE,
    payload: state
  })
}

export const updatePathName = (path: string) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_PATH_NAME,
    payload: path
  })
}

export const updateWalletConnected = (connected: Wallet) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_WALLET_CONNECTED,
    payload: connected
  })
}

export const updateWalletConnectModalShow = (show: boolean) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_WALLET_CONNECT_MODAL_SHOW,
    payload: show
  })
}

export const updateTDSaved = (saved: TDType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_SETTING_TD_SAVED,
    payload: saved
  })
}

export const updateTDSelected = (selected: TDType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_SETTING_TD_SELECTED,
    payload: selected
  })
}

export const updateReflectSaved = (saved: ReflectType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_SETTING_REFLECT_SAVED,
    payload: saved
  })
}

export const updateReflectSelected = (selected: ReflectType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_SETTING_REFLECT_SELECTED,
    payload: selected
  })
}

export const updateSignalSaved = (saved: SignalType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_SETTING_SIGNAL_SAVED,
    payload: saved
  })
}

export const updateSignalSelected = (selected: SignalType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_SETTING_SIGNAL_SELECTED,
    payload: selected
  })
}

export const updateFieldData = (data: FieldType[]) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_FIELD_DATA,
    payload: [...data]
  })
}

export const updateFieldSelected = (selected: FieldType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: GLOBAL_FIELD_SELECTED,
    payload: selected
  })
}

export const updateTransactionInitiated = (data: boolean) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: INIATED_TRANSACTION,
    payload: data
  })
}