import { createActionThunk } from 'redux-thunk-actions';
import { handleActions } from 'redux-actions';

// Actions
export const showPopup = createActionThunk('SHOW_POPUP', (data: any) => data)
export const hidePopup = createActionThunk('HIDE_POPUP', () => void 0)

// Initial state
const initialState = {
  shown: false,
  type: '',
  title: '',
  message: '',
  continueTitle: '',
  onCancel: () => void 0,
  onContinue: () => void 0,
};

// Reducer
export const popupReducer = handleActions(
  {
    // Auto sign-in
    'SHOW_POPUP_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      shown: true,
      title: action.payload.title,
      message: action.payload.message,
      continueTitle: action.payload.continueTitle,
      type: action.payload.type,
      onCancel: action.payload.onCancel,
      onContinue: action.payload.onContinue,
    }),

    'HIDE_POPUP_SUCCEEDED': (state: any, action: any) => (
      initialState
    ),
  },
  initialState
);