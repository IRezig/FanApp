import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { BottomButton } from '../Reusable'
import CommonPopup from './CommonPopup'

import { mainStyle } from '../../styles/main.style'

interface Props {
  message: string;
  visible: boolean;
  leave: () => void;
}
const ErrorPopup: React.SFC<Props> = (props) => (
  <CommonPopup
    touchOutside={props.leave}
    visible={props.visible}
    >
    <View style={styles.header}>
      <Text style={styles.title}>Ooops</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.contentText}>{props.message}</Text>
    </View>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.btn} onPress={props.leave}>
        <Text style={styles.btnText}>{"J'ai compris".toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  </CommonPopup>
)

const btnWidth = 140
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: mainStyle.redColor,
  },
  title: {
    ...mainStyle.montBold,
    fontSize: 16,
    color: '#fff',
  },
  content: {
    justifyContent: 'center',
  },
  contentText: {
    ...mainStyle.montBold,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  footer: {
    alignItems: 'center',
    height: 42,
  },
  btn: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    paddingHorizontal: 12,

    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    ...mainStyle.montText,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default ErrorPopup