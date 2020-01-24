import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    listItemStyle: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    task: {
        fontSize: 24,
        fontWeight: '600',
        flexWrap: 'wrap',
        marginHorizontal: 5,
    },
});

export default styles;
