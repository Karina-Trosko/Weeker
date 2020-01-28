import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import EditList from '../screens/EditList';

const HomeStack = StackNavigator({
    Home: {
        screen: Home,
    },
    EditList: {
        screen: EditList,
    },
});

export default HomeStack;
