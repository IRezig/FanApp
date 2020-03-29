import { store } from '../store'

import { showPopup, hidePopup } from '../actions/popup.action'

type PopupData = {
  title: string;
  message: string;
  continueTitle?: string;
  onContinue?: () => void;
  onCancel?: () => void
}

// Service
export default class Popup {
  
  static error(data: PopupData) {
    store.dispatch(showPopup({
      ...data,
      type: 'error',
    }))
  }

  static info(data: PopupData) { 
    store.dispatch(showPopup({
      ...data,
      type: 'info',
    }))
  }

  static hide() { store.dispatch(hidePopup()) }
}
