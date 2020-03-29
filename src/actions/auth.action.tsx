import { createActionThunk } from 'redux-thunk-actions';
import { handleActions } from 'redux-actions';

import Fire from '../services/Fire.service'

import { clearEvents } from './events.action'
import { clearWishes } from './wishes.action'
import { clearAssos } from './assos.action'

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export const autologin = createActionThunk('AUTOLOGIN', (user: any) => user)
export const saveName = createActionThunk('SAVE_REGISTER_NAME', (name: any) => name)
export const finishLogin = createActionThunk('FINISH_REGISTER', async ({ getState }) => {
  const reducer = getState().authReducer
  const userId = reducer.fireUser.uid
  const res = await Fire.store().collection('users').doc(userId).get()
  if (!res.exists) {
    const email = reducer.fireUser.email || ''
    const saved = reducer.savedName || {}
    const user = {
      id: userId,
      email: saved.email || email,
      first_name: saved.first_name || '',
      last_name: saved.last_name || '',
      createdAt: new Date(),
    }
    await Fire.store().collection('users').doc(userId).set(user)
    if (reducer.savedName && !saved.thirdPartyProvider)
      Fire.resendMail()
    return user
  }
  return {
    id: res.id,
    ...res.data()
  }
})

const clearAll = async (dispatch) => {

}

export const logout = createActionThunk('LOGOUT', async ({ getState, dispatch }) => {
  const reducer = getState().authReducer
  const userId = reducer.fireUser.uid
  
  Fire.auth().signOut()
  await clearAll(dispatch)
  return null
})

export const deleteAccount = createActionThunk('DELETE_ACCOUNT', async ({ getState, dispatch }) => {
  await Fire.auth().currentUser.delete()
  await clearAll(dispatch)
  return null
})

export const updateUser = createActionThunk('UPDATE_USER', async (info: any, { getState }) => {
  const user = getState().authReducer.user
  await Fire.store().collection('users').doc(user.id).update(info)
  return {
    ...user,
    ...info
  }
})

const initialState = {
  fireUser: null,
  savedName: null,

  user: null,
  updating: false,

  userLocation: null,
  userNotifEnabled: false,
};

// Reducer
export const authReducer = handleActions(
  {
    'UPDATE_USER_STARTED': (state: any, action: any) => ({
      ...state,
      updating: true
    }),
    'UPDATE_USER_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      user: action.payload,
      updating: false
    }),
    'UPDATE_USER_FAILED': (state: any, action: any) => ({
      ...state,
      updating: false
    }),

    'FINISH_REGISTER_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      user: action.payload,
      savedName: null,
    }),

    'AUTOLOGIN_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      fireUser: action.payload,
      user: null,
    }),
    'LOAD_USER_LOCATION_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      userLocation: action.payload,
    }),
    'LOAD_USER_NOTIF_ENABLED_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      userNotifEnabled: action.payload,
    }),

    'SAVE_REGISTER_NAME_SUCCEEDED': (state: any, action: any) => ({
      ...state,
      savedName: action.payload,
    }),
  },
  initialState
);
