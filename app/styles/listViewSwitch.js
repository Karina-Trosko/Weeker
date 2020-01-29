
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

const styles = EStyleSheet.create({
    switch: {
        flexDirection: 'row',
        backgroundColor: '$primaryWhite',
    },
    separator: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '$primaryDark',
        height: '90%',
    },
});

export default styles;
