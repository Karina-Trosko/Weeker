import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    container: {
        borderRadius: 4,
        backgroundColor: '$primaryWhite',
        padding: 20,
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
        marginTop: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: '200',
        color: '$primaryColor',
        marginVertical: 5,
        textAlign: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        color: '$primaryColor',
        marginVertical: 5,
        textAlign: 'center',
    },
    additionalChildren: {
        alignSelf: 'center',
    },
});

export default styles;
