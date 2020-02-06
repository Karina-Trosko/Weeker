import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { customModalStyle } from '../styles';

const CustomModal = ({
    title,
    text,
    children,
    isVisible,
}) => (
  <View>
    <Modal isVisible={isVisible}>
      <View style={customModalStyle.container}>
        <Text style={customModalStyle.title}>{title}</Text>
        <Text style={customModalStyle.text}>{text}</Text>
        <View style={customModalStyle.buttons}>
          {children}
        </View>
      </View>
    </Modal>
  </View>
);

CustomModal.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.any,
    isVisible: PropTypes.bool,
};

export default CustomModal;
