import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator,
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
// New Screens
import Home from '../screens/clac/Home';
import RoomSelector from '../screens/clac/RoomSelector';
import RoomExplore from '../screens/clac/Roomexplore';
import UpdateRoom from '../screens/clac/updateRoom';
import SwitchBoard from '../screens/clac/SwitchBoard';
const HomeStack = createStackNavigator({
	Home: Home
});

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
			}
		/>
	)
};

const RoomSelectorStack = createStackNavigator({
	RoomSelector: RoomSelector
});

const RoomExploreStack = createStackNavigator({
	RoomExplore: RoomExplore
});

const UpdateRoomStack = createStackNavigator({
	UpdateRoom: UpdateRoom
});
const SwitchBoardStack = createStackNavigator({
	SwitchBoard: SwitchBoard
});

export default createAppContainer(
	createSwitchNavigator(
		{
			Home: HomeStack,
			RoomSelector: RoomSelectorStack,
			RoomExplore: RoomExploreStack,
			UpdateRoom: UpdateRoomStack,
			SwitchBoard: SwitchBoardStack
		},
		{
			initialRouteName: 'Home'
		}
	)
);
