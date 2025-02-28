import BN from "bignumber.js"
import { isNil } from "ramda"

export const plus = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).plus(b || 0).toString()

export const minus = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).minus(b || 0).toString()


export const minusNumber = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).minus(b || 0).integerValue(BN.ROUND_CEIL).toFixed(3).toString()

export const times = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).times(b || 0).toString()

export const div = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).div(b || 1).toString()

export const divNumber = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).div(b || 1).integerValue(BN.ROUND_CEIL).toFixed(3).toString()

export const multiple = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).multipliedBy(b || 1).toString()

export const multipleNumber = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).multipliedBy(b || 1).integerValue(BN.ROUND_CEIL).toFixed(3).toString()

export const pow = (a: BN.Value, b: BN.Value): string =>
  new BN(a).pow(b).toString()

export const sum = (array: BN.Value[]): string =>
  array.length ? BN.sum.apply(null, array.filter(isFinite)).toString() : "0"

export const min = (array: BN.Value[]): string =>
  BN.min.apply(null, array.filter(isFinite)).toString()

export const max = (array: BN.Value[]): string =>
  BN.max.apply(null, array.filter(isFinite)).toString()

export const ceil = (n: BN.Value): string =>
  new BN(n).integerValue(BN.ROUND_CEIL).toString()

export const floor = (n: BN.Value): string =>
  new BN(n).integerValue(BN.ROUND_FLOOR).toString()

export const abs = (n: BN.Value): string => new BN(n).abs().toString()

/* format */
export const number = (n: BN.Value): number => new BN(n).integerValue(BN.ROUND_CEIL).toNumber()

export const num = (n: BN.Value): number => new BN(n).toNumber()

export const modulus = (a?: BN.Value, b?: BN.Value): string =>
  new BN(a || 0).mod(b || 0).toString()

/* boolean */
export const gt = (a: BN.Value, b: BN.Value): boolean => new BN(a).gt(b)
export const lt = (a: BN.Value, b: BN.Value): boolean => new BN(a).lt(b)
export const gte = (a: BN.Value, b: BN.Value): boolean => new BN(a).gte(b)
export const lte = (a: BN.Value, b: BN.Value): boolean => new BN(a).lte(b)

export const isFinite = (n?: BN.Value): boolean =>
  !isNil(n) && new BN(n).isFinite()

export const isInteger = (n?: BN.Value): boolean =>
  !isNil(n) && new BN(n).isInteger()
