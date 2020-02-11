import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import EditList from '../screens/EditList';
import ListOfFavourite from '../screens/ListOfFavourite';

const HomeStack = createStackNavigator({
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
    ListOfFavourite: {
        screen: ListOfFavourite,
        navigationOptions: {
            header: () => null,
        },
    },
});

export default HomeStack;
