import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback, View, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateRoomName } from '../../redux/actions';

class Count extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Text>{this.props.roomName}</Text>;
	}
}

let RoomTitle = connect(
	state => ({ roomName: state.room.data[state.room.selectedRoomId]['roomTitle'] }),
	null
)(Count);

class UpdateRoom extends Component {
	static navigationOptions = {
		headerTitle: <RoomTitle />,
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
			roomData: this.props.roomData[this.props.selectedRoomId],
			roomName: this.props.roomData[this.props.selectedRoomId]['roomTitle']
		};
	}
	onSelectSwitchBoard = item => {
		this.props.navigation.navigate('SwitchBoard');
	};
	onUpdateRoomName = roomName => {
		this.setState({ roomName });
		this.props.updateRoomName(this.props.selectedRoomId, roomName);
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
							onChangeText={this.onUpdateRoomName}
							// onSubmitEditing={this.onUpdateRoomName}
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

function mapStateToProps(state) {
	return {
		selectedRoomId: state.room.selectedRoomId,
		roomData: state.room.data
	};
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			updateRoomName
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateRoom);
