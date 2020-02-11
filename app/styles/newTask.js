import EStyleSheet from 'react-native-extended-stylesheet';
import { indents } from './variables';

const styles = EStyleSheet.create({
    input: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '$primaryDark',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        fontSize: 20,
        color: '$primaryColor',
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
        marginVertical: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: '300',
        marginLeft: 10,
        color: '$primaryColor',
    },
    picker: {
        width: 100,
        color: '$primaryColor',
    },
    container: {
        marginBottom: indents.marginBottomList,
        backgroundColor: '$primaryWhite',
    },
});

export default styles;
