import Fire from './Fire.service'

import moment from 'moment'
import 'moment/locale/fr'

export default class Time {

  static async freeze(duration: number = 1500) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  }

  static moment(val: any) {
    return moment(val)
  }

  static eventDate(event: any) {
    const date = Fire.getDateFor(event.dateStart)
    return moment(date).format('dddd[,] DD MMMM')
  }
  
}