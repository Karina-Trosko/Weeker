import EStyleSheet from 'react-native-extended-stylesheet';

export const switchButtonStyle = EStyleSheet.create({
    button: {
        padding: 10,
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        color: '$primaryColor',
    },
});

export const buttonStyle = EStyleSheet.create({
    button: {
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '$primaryColor',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        marginHorizontal: 10,
        color: '$primaryWhite',
    },
});

export const buttonWithIconStyle = EStyleSheet.create({
    button: {
        padding: 3,
        marginHorizontal: 5,
        backgroundColor: '$primaryWhite',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '300',
        marginHorizontal: 5,
        color: '$primaryColor',
    },
});