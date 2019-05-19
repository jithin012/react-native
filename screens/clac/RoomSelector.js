import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { createRooms } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RoomSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			room: 0,
			error: ''
		};
	}
	static navigationOptions = {
		header: null
	};
	onSubmit = () => {
		const { room } = this.state;
		this.setState({ error: '' });
		if (room < 0 || room > 100) this.setState({ error: 'Please enter a valid Room number' });
		else {
			this.props.createRooms(room);
			this.props.navigation.navigate('RoomExplore');
		}
	};
	render() {
		return (
			<View style={style.container}>
				<Text style={style.header}>How many rooms want to setup?</Text>
				<TextInput
					autoFocus
					keyboardType={'numeric'}
					placeholderTextColor={'#fff'}
					style={{ height: 40, color: '#fff', fontSize: 16 }}
					placeholder='Enter here'
					onChangeText={room => this.setState({ room: parseInt(room), error: '' })}
					onSubmitEditing={this.onSubmit}
				/>
				{this.renderError()}
			</View>
		);
	}
	renderError = () => (this.state.error ? <Text style={style.error}>{this.state.error}</Text> : null);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#7b9dfe',
		alignItems: 'center',
		justifyContent: 'center'
	},
	header: {
		fontSize: 24,
		color: '#fff',
		marginBottom: 20
	},
	error: {
		color: 'red',
		marginTop: 16
	}
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			createRooms
		},
		dispatch
	);
};
export default connect(
	null,
	mapDispatchToProps
)(RoomSelector);
