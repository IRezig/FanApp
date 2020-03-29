import React from 'react';

import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from 'react-native-router-flux'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import EvilIcon from '@expo/vector-icons/EvilIcons'
import AntDesign from '@expo/vector-icons/AntDesign'

import Constants from 'expo-constants';

import NotifBubble from './NotifBubble'
import VeilView from './VeilView'

import { mainStyle } from '../../styles'

interface Props {
  title?: string;
  titleView?: any;
  rightView?: any;
  barView?: any;
  back?: boolean;
  close?: boolean;
  backAction?: () => void;
  onPressTitle?: () => void;
}

const HeaderBar: React.SFC<Props> = (props) => {
  const { title, back, close, backAction } = props
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <VeilView
        abs
        start={mainStyle.themeGradient.start}
        end={mainStyle.themeGradient.end}
        startPos={{x: 0, y: 1}}
        endPos={{x: 1, y: -2}}
        />
      { props.barView ? (props.barView) : (
        <View style={styles.content}>
          {/* Center */}
          <View style={styles.center}>
            <TouchableWithoutFeedback onPress={props.onPressTitle}>
              <React.Fragment>
                { props.title ? (
                  <Text style={styles.title}>{(title || '').toUpperCase()}</Text>
                ) : props.titleView}
              </React.Fragment>
            </TouchableWithoutFeedback>
          </View>

          {/* Left */}
          <View>
            { props.back ? (
              <TouchableOpacity style={styles.leftBtn} onPress={backAction || Actions.pop}>
                <AntDesign name="left" size={16} color='#fff' />
              </TouchableOpacity>
            ) : props.close ? (
              <TouchableOpacity style={styles.leftBtn} onPress={backAction || Actions.pop}>
                <EvilIcon name="close" size={24} color='#fff' />
              </TouchableOpacity>
            ) : (null)}
          </View>

          {/* Right */}
          <View style={styles.right}>
            { props.rightView ? props.rightView : (null)}
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX({
      height: 100,
      paddingTop: 40,
    }, {
      height: 50 + Constants.statusBarHeight,
      paddingTop: Constants.statusBarHeight,
    }),
    shadowOffset: {width: 0, height: 4},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  center: {
    ...mainStyle.abs,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...mainStyle.montBold,
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
  },
  leftBtn: {
    padding: 12,
    paddingRight: 25,
    paddingLeft: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    paddingRight: 16,
  }
});

export default HeaderBar