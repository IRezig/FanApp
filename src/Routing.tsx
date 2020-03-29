import React, { Component } from 'react';

// Libs
import { Router, Stack, Scene, Modal } from 'react-native-router-flux'
import { View, Dimensions, Image } from 'react-native';

import FlashMessage from 'react-native-flash-message'
import PopupWrapper from './components/Popup/PopupWrapper'
import LoaderWrapper from './components/Loader/LoaderWrapper'

import LandingScreen from './components/Landing/LandingScreen'
import LoginScreen from './components/Login/LoginScreen'

import TabsScreen from './components/Tabs/TabsScreen'

import EventScreen from './components/Event/EventScreen'

import { Asset } from 'expo-asset'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

function cacheImages(images: any[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

interface Props {}
type State = {
  loaded: boolean;
}
export default class Routing extends React.Component<Props, State> {

  state = {
    loaded: false
  }

  async loadAssets() {
    const imageAssets = cacheImages([
      require('./images/logo.png'),
      require('./images/event1.jpg'),
      require('./images/event2.jpg'),
      require('./images/tag.png'),
      require('./images/waiting.png'),
      require('./images/insta_logo.png'),
      require('./images/fb_logo.png'),
    ])

    const fontAssets = cacheFonts([
      { 'montserrat-light': require('../assets/fonts/Montserrat-Light.ttf') },
      { 'montserrat': require('../assets/fonts/Montserrat-Regular.ttf') },
      { 'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf') }
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.loaded) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({loaded: true})}
          onError={() => alert('Veuillez vous connecter à internet')}
          />
      )
    }

    return (
      <View style={{flex: 1}}>
        { /** Routes **/ }
        <Router>
          <Modal>
            <Stack key="root" hideNavBar>
              <Scene key="tabs" component={TabsScreen} />
              <Scene key="event" component={EventScreen} />
            </Stack>
          </Modal>
        </Router>

        { /** Global Flash Messages **/ }
        <FlashMessage
          position="top"
          floating={true}
          hideStatusBar
          />
        { /** Global Popups **/ }
        <PopupWrapper />
        { /** Global Loader **/ }
        <LoaderWrapper />
      </View>
    )
  }
}