import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import AssetImage from './AssetImage'

import Icon from '@expo/vector-icons/FontAwesome';
import { mainStyle } from '../../styles'

interface Props {
  title: string;
}
const LoadingView: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={{width: 160, height: 160}}>
        <AssetImage resizeMode="contain" src={require('../../images/waiting.png')} />
      </View>
      <Text style={styles.title}>Soyez patient</Text>
      <Text style={styles.subtitle}>Vous êtes sur la bonne voie !</Text>
      <Text style={styles.loading}>{props.title}</Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    ...mainStyle.montBold,
    fontSize: 15,
    color: mainStyle.darkColor,
    textAlign: 'center',

    marginTop: 20,
  },
  subtitle: {
    ...mainStyle.montText,
    fontSize: 15,
    color: mainStyle.lightColor,
    textAlign: 'center',

    marginTop: 8,
  },
  loading: {
    ...mainStyle.montLight,
    fontSize: 13,
    color: mainStyle.darkColor,
    textAlign: 'center',

    marginTop: 80,
  }
});

export default LoadingView