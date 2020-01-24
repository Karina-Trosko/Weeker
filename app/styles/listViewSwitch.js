
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

const styles = EStyleSheet.create({
    switch: {
        flexDirection: 'row',
    },
    separator: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: 'black',
        height: '90%',
    },
});

export default styles;
