import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import EditList from '../screens/EditList';
import ListOfElect from '../screens/ListOfElect';

const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null,
        },
    },
    EditList: {
        screen: EditList,
        navigationOptions: {
            header: () => null,
        },
    },
    ListOfElect: {
        screen: ListOfElect,
        navigationOptions: {
            header: () => null,
        },
    },
});

export default HomeStack;
