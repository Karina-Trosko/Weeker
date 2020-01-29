import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    listItemStyle: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '$primaryDark',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: '$primaryWhite',
    },
    task: {
        fontSize: 24,
        fontWeight: '600',
        color: '$primaryColor',
        flexWrap: 'wrap',
        marginHorizontal: 5,
        flex: 1,
    },
    // list: {
    //     marginBottom: 70,
    //     backgroundColor: '$primaryColor',
    // },

});

export default styles;
