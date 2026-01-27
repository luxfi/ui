/**
 * Shorthands for @luxfi/ui
 *
 * Convenient property aliases for faster development
 */

export const shorthands = {
  // Spacing
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingHorizontal',
  py: 'paddingVertical',

  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginHorizontal',
  my: 'marginVertical',

  // Sizing
  w: 'width',
  h: 'height',
  minW: 'minWidth',
  maxW: 'maxWidth',
  minH: 'minHeight',
  maxH: 'maxHeight',

  // Flexbox
  f: 'flex',
  fg: 'flexGrow',
  fs: 'flexShrink',
  fb: 'flexBasis',
  fw: 'flexWrap',
  fd: 'flexDirection',
  ai: 'alignItems',
  ac: 'alignContent',
  jc: 'justifyContent',
  as: 'alignSelf',

  // Border
  bc: 'borderColor',
  bw: 'borderWidth',
  br: 'borderRadius',
  btw: 'borderTopWidth',
  brw: 'borderRightWidth',
  bbw: 'borderBottomWidth',
  blw: 'borderLeftWidth',
  btc: 'borderTopColor',
  brc: 'borderRightColor',
  bbc: 'borderBottomColor',
  blc: 'borderLeftColor',
  btrr: 'borderTopRightRadius',
  btlr: 'borderTopLeftRadius',
  bbrr: 'borderBottomRightRadius',
  bblr: 'borderBottomLeftRadius',

  // Colors
  bg: 'backgroundColor',
  col: 'color',

  // Position
  pos: 'position',
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  zi: 'zIndex',

  // Text
  ta: 'textAlign',
  tt: 'textTransform',
  td: 'textDecorationLine',

  // Shadow
  shac: 'shadowColor',
  shar: 'shadowRadius',
  shof: 'shadowOffset',
  shao: 'shadowOpacity',

  // Other
  o: 'opacity',
  ov: 'overflow',
  pe: 'pointerEvents',
  cur: 'cursor',
  us: 'userSelect',
} as const

export type ShorthandKey = keyof typeof shorthands
