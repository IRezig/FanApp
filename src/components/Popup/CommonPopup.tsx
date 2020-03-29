import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
const { Dialog, DialogContent, SlideAnimation } = require('react-native-popup-dialog');

import Icon from '@expo/vector-icons/AntDesign'

interface Props {
  visible: boolean;

  touchOutside: () => void;
  animation?: any;
  children: any;
  actions?: any[];
}

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const defaultProps = {
  animation: slideAnimation,
}

const CommonPopup: React.SFC<Props> = (props) => (
  <Dialog
    overlayOpacity={0.62}
    visible={props.visible}
    dialogAnimation={props.animation}
    onTouchOutside={props.touchOutside}
    actions={props.actions} 
  >
    <DialogContent style={styles.content}>
      <View>
        {props.children}
        <TouchableOpacity onPress={props.touchOutside} style={styles.close}>
          <Icon name="close" size={20} color='#fff' />
        </TouchableOpacity>
      </View>
    </DialogContent>
  </Dialog>
)

const margin = 28
const styles = StyleSheet.create({
  content: {
    width: Dimensions.get('window').width - margin * 2,
    paddingLeft: 0,
    paddingRight: 0,
  },
  close: {
    position: 'absolute',
    top: 4,
    right: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


CommonPopup.defaultProps = defaultProps
export default CommonPopup