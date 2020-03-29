import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { mainStyle } from '../../styles'

interface Props {
  count: number;
}
const NotifBubble: React.FC<Props> = (props) => {
  if (props.count == 0)
    return (null)
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{props.count}</Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    ...mainStyle.circle(18),
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: mainStyle.redColor,
    position: 'absolute',
    right: 8,
    top: 0,
  },
  count: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  }
});

export default NotifBubble