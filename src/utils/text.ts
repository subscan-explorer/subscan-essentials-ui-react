import BigNumber from "bignumber.js"
import dayjs from "dayjs"
import { BIG_TEN, BIGNUMBER_FMT } from "./const"

export const getUTCTime = (timestamp: number, format = 'YYYY-MM-DD HH:mm:ss') => {
    const time = dayjs.unix(timestamp).format(format)
    return `${time} (UTC)`
}

export type themeType = "danger" | "primary" | undefined
export function getThemeColor(isSubstrate?: boolean): themeType {
  return isSubstrate ? 'danger': 'primary'
}
export function checkIsExtrinsicIndex(extrinsicKey: string): boolean {
  const reg = /^[0-9]+-[0-9]+$/
  return reg.test(extrinsicKey)
}

export function formatHash(hash?: string, units = 12) {
  if (hash && hash.length > units) {
    const arr = hash.split('')
    return `${arr.slice(0, Math.floor(units / 2)).join('')}....${arr.slice(-Math.floor(units / 2)).join('')}`
  } else {
    return hash
  }
}

export function formatNumber(number: string | number | BigNumber) {
  return new BigNumber(number).toFormat(BIGNUMBER_FMT)
}

export function getBalanceAmount(amount: BigNumber, decimals?: number): BigNumber {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals || 0))
}

export function timeAgo(time: number | string, now = Date.now()) {
    const second = +time * 1000
    const d = new Date(second)
    const after = now - d.valueOf() < 0 ? 'after ' : ''
    const diff = Math.abs(now - d.valueOf()) / 1000
    if (diff < 1) {
      return '0 sec ago'
    } else if (diff < 60) {
      return `${after}${parseInt(diff.toString())} ${diff === 1 ? 'sec' : 'secs'} ago`
    } else if (diff < 3600) {
      // less 1 hour
      const min = Math.floor(diff / 60)
      return `${after}${min} ${min === 1 ? 'min' : 'mins'} ago`
    } else if (diff < 86400) {
      // less 1 day
      const hr = Math.floor(diff / 3600)
      const min = Math.floor((diff / 60) % 60)
      return `${after}${hr} ${hr === 1 ? 'hr' : 'hrs'}${min === 0 ? '' : min === 1 ? ' 1 min' : ` ${min} mins`} ago`
    } else if (diff < 90000) {
      // less 1 day 60 min
      const day = Math.floor(diff / 86400)
      const min = Math.floor((diff / 60) % 60)
      return `${after}${day} ${day === 1 ? 'day' : 'days'}${min === 0 ? '' : min === 1 ? ' 1 min' : ` ${min} mins`} ago`
    } else {
      const day = Math.floor(diff / 86400)
      const hr = Math.floor((diff / 60 / 60) % 24)
      return `${after}${day} ${day === 1 ? 'day' : 'days'}${hr === 0 ? '' : hr === 1 ? ' 1 hr' : ` ${hr} hrs`} ago`
    }
  }
