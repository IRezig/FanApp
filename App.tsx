import React from 'react';
import { View, YellowBox } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './src/store'
import { Provider } from 'react-redux'

import Routing from './src/Routing'

import { Fire } from './src/services'

Fire.init()

YellowBox.ignoreWarnings([
  'Warning: `flexWrap: `wrap`` ',
  'Setting a timer'
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View style={{flex: 1, backgroundColor: 'green'}}></View>} persistor={persistor}>
        <Routing />
      </PersistGate>
    </Provider>
  );
}