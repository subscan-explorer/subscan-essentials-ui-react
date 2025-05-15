import BigNumber from "bignumber.js";

export const PAGE_SIZE = 10;
export const PVM_DECIMAL = 18;
export const API_HOST = 'https://assethub-westend-stg.subscan.io';

export const BIG_TEN = new BigNumber(10)
export const BIG_ZERO = new BigNumber(0)
export const BIGNUMBER_FMT = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
}