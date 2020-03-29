import { ifIphoneX } from 'react-native-iphone-x-helper'

const barHeightX = 72
const barHeight = 52

export const mainStyle: any = {
  // Colors
  //#AA8312 0%, #BA9835
  themeGradient: { start: '#e25d83', end: '#0c056d' },
  themeColor: '#e25d83', // lighter: #02EBE2
  themeColorAlpha: (alpha: string) => {
    return 'rgba(226, 93 , 131, ' + alpha + ')'
  } ,
  /*
  themeGradient: { start: '#02EBE2', end: '#00A5EB' },
  themeColor: 'rgb(1, 200, 230)', // lighter: #02EBE2
  themeColorAlpha: (alpha: string) => {
    return 'rgba(1, 200, 230, ' + alpha + ')'
  }, */

  lightColor: '#888',
  darkColor: '#263238',
  redColor: '#FF536B',
  greenColor: '#3bb934',
  montText: {
    fontSize: 15,
    fontFamily: 'montserrat',
  },
  montLight: {
    fontSize: 15,
    fontFamily: 'montserrat-light',
  },
  montBold: {
    fontSize: 13,
    fontFamily: 'montserrat-bold',
  },

  // Styles 
  abs: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
  },
  col: {
    flexDirection: 'column', alignItems: 'center',
  },
  circle: (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden',
  }),

  /**
   * Layout
   */
  mainTabContent: ifIphoneX({
    paddingBottom: barHeightX,
  }, {
    paddingBottom: barHeight,
  }),
  mainTabContentAbs: ifIphoneX({
    bottom: barHeightX,
  }, {
    bottom: barHeight,
  }),
}