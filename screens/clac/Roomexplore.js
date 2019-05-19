import React, { Component } from 'react';
import { FlatList, Button, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSelectedRoomid } from '../../redux/actions';
class RoomExplore extends Component {
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
			roomData: this.props.roomData
		};
	}
	onSelctRoom = item => {
		this.props.updateSelectedRoomid(item.roomId);
		this.props.navigation.navigate('UpdateRoom');
	};
	/**
	 * @todo - list comming to center
	 */
	render() {
		return (
			<View style={style.container}>
				{/* style={{ justifyContent: 'center', alignItems: 'center' }} */}
				<View style={{ paddingTop: 20 }}>
					<FlatList
						data={Object.values(this.state.roomData)}
						keyExtractor={(item, index) => `Room${index}`}
						renderItem={this.renderRoom}
						numColumns={2}
					/>
				</View>
				<Button onPress={this.showResults} title={'Show Result'} color='#841584' />
			</View>
		);
	}
	showResults = () => {
		this.props.navigation.navigate('Result');
	};
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
		marginBottom: 50
		// alignItems: 'center',
		// justifyContent: 'center'
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

function mapStateToProps(state) {
	return {
		roomData: state.room.data
	};
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			updateSelectedRoomid
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomExplore);
