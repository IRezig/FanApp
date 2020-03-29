import React from 'react';
import { connect } from 'react-redux';

import InfoPopup from './InfoPopup'
import ErrorPopup from './ErrorPopup'
import { Popup } from '../../services'

interface Props {
  popupType: string;
  popupTitle: string;
  popupMessage: string;
  popupContinueTitle: string;
  popupShown: boolean;
  popupCancel?: () => void;
  popupContinue?: () => void;
}
const PopupWrapper: React.SFC<Props> = (props) => (
  props.popupType == 'error' ? (
    <ErrorPopup
      message={props.popupMessage}
      visible={props.popupShown}
      leave={() => {
        Popup.hide()
        if (props.popupCancel)
          props.popupCancel()
      }}
      />
  ) : props.popupType == 'info' ? (
    <InfoPopup
      title={props.popupTitle}
      message={props.popupMessage}
      visible={props.popupShown}
      leave={() => {
        Popup.hide()
        if (props.popupCancel)
          props.popupCancel()
      }}
      continueTitle={props.popupContinueTitle}
      continue={() => {
        Popup.hide()
        if (props.popupContinue)
          props.popupContinue()
      }}
      />
  ) : null
)

const mapStateToProps = (state: any) => ({
  popupType: state.popupReducer.type,
  popupTitle: state.popupReducer.title,
  popupMessage: state.popupReducer.message,
  popupContinueTitle: state.popupReducer.continueTitle,
  popupShown: state.popupReducer.shown,
  popupCancel: state.popupReducer.onCancel,
  popupContinue: state.popupReducer.onContinue,
})

export default connect(mapStateToProps)(PopupWrapper)