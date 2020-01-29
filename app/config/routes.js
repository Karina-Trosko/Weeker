import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import EditList from '../screens/EditList';

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
});

export default HomeStack;
