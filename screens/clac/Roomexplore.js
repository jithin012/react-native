import React, { Component } from 'react';
import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Alert } from 'react-native';
import fetchData from './RoomHandler';

const DEFAULT_ROOM_ = 4;

export default class RoomExplore extends Component {
	static navigationOptions = {
		title: 'Room Explore',
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
			room: DEFAULT_ROOM_,
			roomData: [],
			selectedRoom: null
		};
	}
	onSelctRoom = item => {
		this.setState({ selectedRoom: item });
		this.props.navigation.navigate('UpdateRoom');
	};
	componentWillMount() {
		this.setState({ roomData: fetchData(this.state.room) });
	}
	/**
	 * @todo - list comming to center
	 */
	render() {
		console.log('Room data ', this.state.roomData);
		return (
			<View style={style.container}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<FlatList
						data={this.state.roomData}
						keyExtractor={(item, index) => `Room${index}`}
						renderItem={this.renderRoom}
						numColumns={2}
					/>
				</View>
			</View>
		);
	}
	renderRoom = ({ item }) => (
		<TouchableWithoutFeedback onPress={() => this.onSelctRoom(item)} onLongPress={() => Alert.alert(item.roomId)}>
			<View style={style.box}>
				<View style={style.innerBox}>
					<Text style={{ fontWeight: 'bold', color: '#000' }}>{item.roomTitle}</Text>
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
		// paddingTop: 20
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
	}
});
