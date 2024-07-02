// 👇️ ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignoreimport { useEffect, useRef, useState } from "react"

import BigNumber from "bignumber.js"
import numeral from "numeral"
import {SMALLEST, USDC_addr, UST, UUSD} from "../constants"
import {abs, div, minus, multiple, num, number, plus} from "./math";

BigNumber.config({ EXPONENTIAL_AT: [-18, 20] })

type Formatter = (
  amount?: string,
  symbol?: string,
  config?: FormatConfig
) => string

const rm = BigNumber.ROUND_DOWN



/*export const dp = (symbol?: string) =>
  !symbol || lookupSymbol(symbol) === "UST" ? 3 : 6*/

export const validateDp = (value: string, symbol?: string, decimals?: string) =>
  new BigNumber(value).times(new BigNumber(10).pow(decimals ?? dp(symbol))).isInteger()

export const decimal = (value = "0", dp = 18) => new BigNumber(value).decimalPlaces(dp, rm).toString()

export const decimalnPlaces = (value = "0", places = '000000') => numeral(value).format(`0,0.${places}`).toString()

export const lookup: Formatter = (amount = "0", symbol, config) => {
  const value = symbol
      ? new BigNumber(amount).div(SMALLEST).dp(6, rm)
    : new BigNumber(amount)

  return value
    .dp(
      config?.dp ??
        (config?.integer ? 0 : value.gte(SMALLEST) ? 2 : dp(symbol)),
      rm
    )
    .toString()
}

export const LpBalanceFormatter : Formatter =(amount="0", symbol, config) => {
  return amount + ' ' + symbol

}

export const divWith6: Formatter = (amount = "0", symbol, config) => {
  const value = symbol
    ? new BigNumber(amount).div(SMALLEST)
    : new BigNumber(amount)

  return value.toString()
}

const parseSymbols = {
  "uluna": "LUNA",
  "MIM":"wMIM",
  "LDO": "weLDO",
  "STLUNA": "stLUNA",
  "stluna": "stLUNA",
  "stLuna": "stLUNA",
  'usdc': "USDC",
  "JUT": "JUNO",
  'BJUNO':'bJUNO',
  'SEJUNO':'seJUNO',
  'atom':'ATOM'
}

const parsedTokens = Object.keys(parseSymbols)

export const lookupSymbol = (symbol?: string) =>
  [...parsedTokens].includes(symbol)
    ? parseSymbols[symbol]
    : ['pluna', 'cluna', 'yluna'].includes(symbol?.toLowerCase() ?? '') ? symbol?.charAt(0)+"LUNA"
    :symbol?.includes('juno') ? 'JUNO' 
    : symbol?.startsWith("u")
     ? symbol.slice(1, 3).toUpperCase() + "T"
    : (symbol?.startsWith("whW"))
      ? `w${symbol.slice(3)}` // remove wh from token symbol e.g (whWBTC) to wBTC
      : (symbol?.startsWith("wh"))
                      ? `w${symbol.slice(2)}` // remove wh from token symbol e.g (whBTC) to wBTC
    : symbol ?? ""

export const format: Formatter = (amount, symbol, config) => {
  const value = new BigNumber(lookup(amount, symbol, config))
  const formatted = value.gte(SMALLEST)
    ? numeral(value.div(1e4).integerValue(rm).times(1e4)).format("0,0.[00]a")
    : numeral(value).format(config?.integer ? "0,0" : "0,0.[000000]")


  return formatted.toUpperCase()
}

export const Uncapitalize = s => s && s[0].toLowerCase() + s.slice(1)

export const commas = (amount: string) => numeral(amount).format("0,0.[000000]")

export const numbers = (amount: string | number) => numeral(amount).format("0,0.[000000]a").toUpperCase()

export const numbers_sm = (amount: string) => numeral(amount).format("0,0.[000]a").toUpperCase()


export const formatAsset: Formatter = (amount, symbol, config) =>
  symbol ? `${format(amount, symbol, config)} ${lookupSymbol(symbol)}` : ""

export const formatAssetAmount: Formatter = (amount, symbol, config) =>
  symbol ? `${format(amount, symbol, config)} ` : ""

export const toAmount = (value: string) =>
  value ? new BigNumber(value).times(SMALLEST).integerValue().toString() : "0"

export const lookupAmount = (value: string, decimals: number = 6) =>
    value ? (
            new BigNumber(value).div(new BigNumber(10).pow(decimals.toString()).toString()).dp(6, rm).toString()
    ) : value

export const formatSelected = (token: string) => {
  return token ? token.substr(0, 6) : ""
}
export const trimToken = (token: string) => {
  return token ? token.substr(0, 6) : ""
}

export function onlyUnique(value:any, index:any, self: any) {
  return self.indexOf(value) === index;
}

export const adjustOper = (symbol?: string) => {
  return !!(symbol && symbol?.startsWith("wh"));
}


export function niceNumber(num: string) {
  try{
    var sOut = num.toString();
    if ( sOut.length >=17 || sOut.indexOf("e") > 0){
      return sOut.replace("e+","");
    }
    return sOut;
  }
  catch ( e) {
    return num;
  }
}
export function relDiff(a: string, b: string) {
  return  multiple(100, abs(  num(div(minus(a, b ), div(plus(a, b),2) ))))
}

export const fixedDecimal = (value = "0") => numeral(value).format("0,0.00") 
export const fixedDecimalPlaces = (value = "0",points=2) => new BigNumber(value).toFixed(points)
