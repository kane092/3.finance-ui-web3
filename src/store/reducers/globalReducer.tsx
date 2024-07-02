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
  FROM_LANDING_PAGE,
} from "../actionTypes";

import { ReduxAction } from "../../types/types";

import fieldsJsonData from "../../assets/data/fields.json";

const initialState = {
  pathName: "/",
  walletConnected: "Disconnected",
  walletConnectModalShow: false,
  tdSaved: "Show",
  tdSelected: "",
  reflectSaved: "FRAX",
  reflectSelected: "",
  signalSaved: "Bent",
  signalSelected: "",
  fieldData: fieldsJsonData,
  fieldSelected: "",
  isTransactionInitiated: false, //used to refetch data in components after completeing any transaction
  fromLandingPage: false,
};

export default function foo(state = initialState, action: ReduxAction) {
  switch (action.type) {
    case GLOBAL_PATH_NAME:
      return {
        ...state,
        pathName: action.payload,
      };
    case GLOBAL_WALLET_CONNECTED:
      return {
        ...state,
        walletConnected: action.payload,
      };
    case GLOBAL_WALLET_CONNECT_MODAL_SHOW:
      return {
        ...state,
        walletConnectModalShow: action.payload,
      };
    case GLOBAL_SETTING_TD_SAVED:
      return {
        ...state,
        tdSaved: action.payload,
      };
    case GLOBAL_SETTING_TD_SELECTED:
      return {
        ...state,
        tdSelected: action.payload,
      };
    case GLOBAL_SETTING_REFLECT_SAVED:
      return {
        ...state,
        reflectSaved: action.payload,
      };
    case GLOBAL_SETTING_REFLECT_SELECTED:
      return {
        ...state,
        reflectSelected: action.payload,
      };
    case GLOBAL_SETTING_SIGNAL_SAVED:
      return {
        ...state,
        signalSaved: action.payload,
      };
    case GLOBAL_SETTING_SIGNAL_SELECTED:
      return {
        ...state,
        signalSelected: action.payload,
      };
    case GLOBAL_FIELD_DATA:
      return {
        ...state,
        fieldData: action.payload,
      };
    case GLOBAL_FIELD_SELECTED:
      return {
        ...state,
        fieldSelected: { ...action.payload },
      };
    case INIATED_TRANSACTION:
      return {
        ...state,
        isTransactionInitiated: { ...action.payload },
      };
    case FROM_LANDING_PAGE:
      return {
        ...state,
        fromLandingPage: action.payload,
      };
    default:
      return state;
  }
}
