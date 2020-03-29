import React from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';

import { mainStyle } from '../../styles'

interface Props {
  title: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  maxLines?: number;
  multiline?: boolean;
  autocorrect?: boolean;
  keyboardType?: any;
  secure?: boolean;
  editable?: boolean;

  onChange: (event: any) => void;
}

const TitledInput: React.SFC<Props> = (props) => {
  const onChange = (event: any) => {
    const text = event.nativeEvent.text
    const lines = text.split("\n").length
    const max = props.maxLines
    if (!max || lines <= max)
      props.onChange(event)
  }
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title, props.multiline ? {marginBottom: 8} : {}]}>{props.title}</Text>
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={'#999'}
        onChange={onChange}
        multiline={props.multiline}
        style={[styles.input, props.multiline ? {minHeight: 60} : {height: 50}]}
        maxLength={props.maxLength || 500}
        keyboardType={props.keyboardType}
        underlineColorAndroid='transparent'
        secureTextEntry={props.secure}
        autoCorrect={props.autocorrect}
        editable={props.editable}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 0,
  },
  title: {
    ...mainStyle.montLight,
    fontSize: 14,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  input: {
    color: '#444',
    ...mainStyle.montLight,
    fontSize: 14,

    marginHorizontal: 16,
    paddingLeft: 16,

    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
  },
});

export default TitledInput