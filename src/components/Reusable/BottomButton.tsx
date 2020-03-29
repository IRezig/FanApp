import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import VeilView from './VeilView'

import Icon from '@expo/vector-icons/FontAwesome';
import { mainStyle } from '../../styles'

interface Props {
  title: string;
  titleColor?: string;
  backgroundColor?: string;
  style?: any;
  disabled?: boolean;

  onPress: () => void;
}
const BottomButton: React.FC<Props> = (props) => {
  const veil = props.disabled ? '0' : '255'
  console.log(props.disabled)
  return (
    <TouchableOpacity
      style={[styles.wrapper, {opacity: props.disabled ? 0.46 : 1}]}
      onPress={props.onPress}
      disabled={props.disabled}
      >
      <VeilView
        start={mainStyle.themeGradient.start}
        end={mainStyle.themeGradient.end}
        startPos={{x: 0, y: 1}}
        endPos={{x: 1, y: -3}}
        wrapperStyle={[styles.container, { backgroundColor: props.backgroundColor }, props.style || {}]}>
        <VeilView
          abs
          start={'rgba(' + veil + ', ' + veil + ', ' + veil + ', 0.3)'}
          end={'rgba(' + veil + ', ' + veil + ', ' + veil + ', 0.0)'}
          startPos={{x: 0.2, y: 0}}
          endPos={{x: 1, y: 1}}
          />
        <Text style={[styles.title, props.titleColor ? {color: props.titleColor} : {}]}>{props.title}</Text>
      </VeilView>
    </TouchableOpacity>
  );
} 

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
    borderRadius: 4,
    height: 54,

    paddingLeft: 20,
    paddingRight: 20,

    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  title: {
    ...mainStyle.montBold,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default BottomButton