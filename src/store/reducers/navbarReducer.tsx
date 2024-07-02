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

import { EmissionListData, ReduxAction } from '../../types/types';

import nftsJsonData from '../../assets/data/nfts.json';

const emptyField: EmissionListData = {
  "emissionName": "CRV",
  "emissionLogo": "./images/details1.png",
  "emissionAmount": 40,
  "emissionAverage": ""
}

const initialState = {
  leftNavbarShow: "Opened",
  leftNavbarPageSelected: "Deposits",
  leftNavbarPageSelectedHistory: [1],
  rightNavbarShow: "Minimized",
  rightNavbarTabSelected: "Actions",
  rightNavbarSubTabSelected: "Mint",
  rightNavbarMaxValue: 1,
  rightNavbarCurValue: 0,
  rightNavbarNFTSelected: {name:"",type:""},
  rightNavbarAssetSelected: "None",
  rightNavbarEmissionSelected: emptyField,
  rightNavbarDepositValue: [0, 0, 0, 0],
  rightNavbarIndicatorFlag: true,
  rightNavbarBorderPosition: null,
  rightLandingModalShow: false,
  harvestButtonClicked:false,
  depositData: {
    assets: [],
    reroute: false,
    acceptTerms: false,
    value: 0
  }
};

export default function foo(state = initialState, action: ReduxAction) {
  switch(action.type) {
    case LEFT_NAVBAR_SHOW:
      return {
        ...state,
        leftNavbarShow: action.payload
      }
    case LEFT_NAVBAR_PAGE_SELECTED:
      let tempNum = 0;
      if (action.payload === 'Dashboard') tempNum = 0;
      else if (action.payload === 'Deposits') tempNum = 1;
      else if (action.payload === 'Emissions') tempNum = 2;
      else if (action.payload === 'MoneyApps') tempNum = 3;
      else tempNum = 0;
      return {
        ...state,
        leftNavbarPageSelected: action.payload,
        leftNavbarPageSelectedHistory: [...state.leftNavbarPageSelectedHistory, tempNum]
      }
    case RIGHT_NAVBAR_SHOW:
      return {
        ...state,
        rightNavbarShow: action.payload
      }
    case RIGHT_NAVBAR_TAB_SELECTED:
      return {
        ...state,
        rightNavbarTabSelected: action.payload
      }
    case RIGHT_NAVBAR_SUB_TAB_SELECTED:
      return {
        ...state,
        rightNavbarSubTabSelected: action.payload
      }
    case RIGHT_NAVBAR_MAX_VALUE:
      return {
        ...state,
        rightNavbarMaxValue: action.payload
      }
    case RIGHT_NAVBAR_CUR_VALUE:
      return {
        ...state,
        rightNavbarCurValue: action.payload
      }
    case RIGHT_NAVBAR_NFT_SELECTED:
      return {
        ...state,
        rightNavbarNFTSelected: action.payload
      }
    case RIGHT_NAVBAR_ASSET_SELECTED:
      return {
        ...state,
        rightNavbarAssetSelected: action.payload
      }
    case RIGHT_NAVBAR_EMISSION_SELECTED:
      return {
        ...state,
        rightNavbarEmissionSelected: action.payload
      }
    case RIGHT_NAVBAR_DEPOSIT_VALUE:
      return {
        ...state,
        rightNavbarDepositValue: [...action.payload]
      }
    case RIGHT_NAVBAR_INDICATOR_FLAG:
      return {
        ...state,
        rightNavbarIndicatorFlag: action.payload
      }
    case DEPOSIT_DATA:
      return {
        ...state,
        depositData: action.payload
      }
    case RIGHT_NAVBAR_BORDER_POSITION:
      return {
        ...state,
        rightNavbarBorderPosition: action.payload
      }
    case RIGHT_LANDING_MODAL_SHOW:
      return {
        ...state,
        rightLandingModalShow: action.payload
      }
    case ACTION_BUTTON_HARVEST_CLICKED:
      return {
        ...state,
        harvestButtonClicked: action.payload
      }
    default: 
      return state;
  }
}