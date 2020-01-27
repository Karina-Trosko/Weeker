import EStyleSheet from 'react-native-extended-stylesheet';

export const switchButtonStyle = EStyleSheet.create({
    button: {
        padding: 10,
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
    },
});

export const buttonStyle = EStyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 24,
        fontWeight: '600',
        marginHorizontal: 10,
    },
});
