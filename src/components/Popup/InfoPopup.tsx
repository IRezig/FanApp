import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import CommonPopup from './CommonPopup'
const { DialogButton } = require('react-native-popup-dialog');

import { BottomButton, VeilView } from '../Reusable'

import { mainStyle } from '../../styles/main.style'

interface Props {
  title: string;
  message:string;
  continueTitle?: string;
  visible: boolean;
  leave?: () => void;
  continue?: () => void;
}
const InfoPopup: React.SFC<Props> = (props) => {

  const addDots = (str: string, max: number) => {
    if (!str)
      return ''
    if (str.length <= max)
      return str
    if (str.length > max)
      return str.substr(0, max) + '...'
    return str
  }
  return (
    <CommonPopup
      touchOutside={props.leave}
      visible={props.visible}
      >
      <VeilView
          start={mainStyle.themeGradient.start}
          end={mainStyle.themeGradient.end}
          startPos={{x: 0, y: 1}}
          endPos={{x: 1, y: -2}}
          wrapperStyle={styles.header}
          >
        <Text style={styles.title}>{props.title}</Text>
      </VeilView>
      <View style={styles.wrapper}>
        <Text style={styles.contentText}>{addDots(props.message, 150)}</Text>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={props.leave}>
            <Text style={styles.btnText}>{"Annuler".toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={props.continue}>
            <Text style={styles.btnText}>{(props.continueTitle || "OK").toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </CommonPopup>
  )
}
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: mainStyle.redColor,
  },
  btns: {
    ...mainStyle.row,
    paddingHorizontal: 8,
  },
  btn: {
    flex: 1,
    height: 42,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    ...mainStyle.montText,
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
  },
  title: {
    ...mainStyle.montBold,
    fontSize: 16,
    color: '#fff',
  },
  wrapper: {
    flexDirection: 'column',
    paddingHorizontal: 4,
  },
  contentText: {
    ...mainStyle.montBold,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
});

export default InfoPopup