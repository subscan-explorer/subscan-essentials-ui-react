import { ZIndices } from '../types'
import { Breakpoints, MediaQueries, Radii } from '../types'

export const breakpointMap: { [key: string]: number } = {
  xs: 370,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

const radii: Radii = {
  small: '4px',
  default: '16px',
  card: '24px',
  circle: '50%',
}

const breakpoints: Breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`)

const mediaQueries: MediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
}

const zIndices: ZIndices = {
  dropdown: 10,
  modal: 100,
}

const bundle = {
  siteWidth: 1200,
  breakpoints,
  mediaQueries,
  zIndices,
  radii,
}

export default bundle
