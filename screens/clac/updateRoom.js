import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback, View, Alert, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const RoomObj = {
	connector: [
		{
			connectorTitle: 'SwitchBoard 1',
			connectorId: '1002',
			products: {
				Curtains: 0,
				Dimmer: 0,
				Fan: 0,
				Light: 0
			}
		},
		{
			connectorTitle: 'SwitchBoard 2',
			connectorId: '1003',
			products: {
				Curtains: 0,
				Dimmer: 0,
				Fan: 0,
				Light: 0
			}
		}
	],
	roomId: '1001',
	roomTitle: 'Room 1'
};
export default class UpdateRoom extends Component {
	static navigationOptions = {
		title: RoomObj.roomTitle,
		headerStyle: {
			backgroundColor: '#7b9dfe'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			roomData: RoomObj,
			roomName: RoomObj.roomTitle
		};
	}
	onSelectSwitchBoard = item => {
		console.log('item ', item);
		this.props.navigation.navigate('SwitchBoard');
	};
	onUpdateRoomName = () => {
		console.log(this.state.roomName);
	};
	render() {
		return (
			<View style={style.container}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ flexDirection: 'column' }}>
						<TextInput
							placeholderTextColor={'#fff'}
							style={{
								height: 40,
								color: '#fff',
								fontSize: 16,
								marginVertical: 20,
								backgroundColor: 'gray'
							}}
							placeholder='Enter Room name'
							onChangeText={roomName => this.setState({ roomName })}
							onSubmitEditing={this.onUpdateRoomName}
							value={this.state.roomName}
						/>
					</View>
					<FlatList
						data={this.state.roomData.connector}
						keyExtractor={(item, index) => `connector${index}`}
						renderItem={this.renderConnectors}
						numColumns={2}
					/>
				</View>
				{/* Action Button  */}
				<View style={{ flex: 1, backgroundColor: 'red' }}>
					{/* Rest of the app comes ABOVE the action button component !*/}
					<ActionButton buttonColor='rgba(231,76,60,1)'>
						<ActionButton.Item
							buttonColor='#9b59b6'
							title='New Task'
							onPress={() => console.log('notes tapped!')}
						>
							<Icon name='md-create' style={style.actionButtonIcon} />
						</ActionButton.Item>
						<ActionButton.Item buttonColor='#3498db' title='Notifications' onPress={() => {}}>
							<Icon name='md-notifications-off' style={style.actionButtonIcon} />
						</ActionButton.Item>
						<ActionButton.Item buttonColor='#1abc9c' title='All Tasks' onPress={() => {}}>
							<Icon name='md-done-all' style={style.actionButtonIcon} />
						</ActionButton.Item>
					</ActionButton>
				</View>
			</View>
		);
	}
	renderConnectors = ({ item }) => (
		<TouchableWithoutFeedback
			onPress={() => this.onSelectSwitchBoard(item)}
			onLongPress={() => Alert.alert(item.connectorId)}
		>
			<View style={style.box}>
				<View style={style.innerBox}>
					<Text style={{ fontWeight: 'bold', color: '#000' }}>{item.connectorTitle}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#7b9dfe',
		alignItems: 'center',
		justifyContent: 'center'
	},
	box: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		width: '45%',
		height: 125,
		margin: '2.5%',
		padding: 0
	},
	innerBox: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	}
});
