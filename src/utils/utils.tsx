import type { FieldType } from '../types/types';

export const getFieldLP = (fieldsData: FieldType[], flag: number) => {
  // 1 for Curve, 2 for Convex, 3 for Bent
  let res = 0;
  fieldsData.forEach((field: FieldType) => {
    if (flag === 0 && field.depositsFullName === "3Fi Collateral - CRV Base") {
      res = field.depositsLP ? field.depositsLP : 0;
    } else if (flag === 1 && field.depositsFullName === "Curve C.D.P") {
      res = field.depositsLP ? field.depositsLP : 0;
    } else if (flag === 2 && field.depositsFullName === "Convex C.D.P") {
      res = field.depositsLP ? field.depositsLP : 0;
    } else if (flag === 3 && field.depositsFullName === "Bent C.D.P") {
      res = field.depositsLP ? field.depositsLP : 0;
    }
  })
  return res;
}

export const commafy = (num: number, digit: number = 2) => {
  var str = num.toFixed(digit).toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  // if (str[1] === '' && str[0].length >= 4){
  //   return parseFloat(str.join('.')).toFixed(digit);
  // } else {
    return str.join('.');
  // }
}

export const getCRVWalletStatus = (fieldData: FieldType[]) => {
  let token3Count = 0;
  let nftCount = 0;
  fieldData.forEach((field: FieldType) => {
      if ((field.symbol === "3FiToken") && field.depositsLP  && field.depositsLP > 0) {
          token3Count ++;
      }
  });
  fieldData.forEach((field: FieldType) => {
      if (field.isNFT) {
          nftCount ++;
      }
  });
  if (token3Count > 0 || nftCount > 0) return true;
  else return false;
}

export const truncate = (text: string = "", [h, t]: number[] = [6, 6]) => {
  const head = text.slice(0, h)
  const tail = text.slice(-1 * t, text.length)
  return text.length > h + t ? [head, tail].join("...") : text
}