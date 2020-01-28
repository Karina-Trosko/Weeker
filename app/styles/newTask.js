import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    input: {
        borderRadius: 4,
        borderWidth: 2,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    option: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    optionContainer: {
        marginHorizontal: 40,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 24,
        fontWeight: '300',
        marginLeft: 10,
    },
    picker: {
        width: 100,
    },
    container: {
        marginBottom: 50,
    },
});

export default styles;
