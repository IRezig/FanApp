import React from 'react';

import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native';

import { mainStyle } from '../../styles'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface Props {
  value: string;
  onSearch: (text: string) => void;
}
const SearchBar: React.SFC<Props> = (props) => {

  return (
    <View style={styles.container}>
      <FontAwesome name="search" color={textColor} size={15} />
      <TextInput
        returnKeyType='search'
        value={props.value}
        style={styles.input}
        placeholder="Recherchez un bon plan..."
        onChange={(event) => props.onSearch(event.nativeEvent.text)}
        />
    </View>
  )
}

const textColor = mainStyle.lightColor
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#eee',
    borderRadius: 7,
    marginHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: textColor,
    marginLeft: 10,
  },
});

export default SearchBar