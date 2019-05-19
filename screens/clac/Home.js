import React, { Component } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProductColor } from '../../redux/actions';

// TODO: Use 'TouchableNativeFeedback' instead of 'TouchableOpacity'
class Home extends Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
		header: null
	};
	gotoRoomSelector = () => {
		this.props.updateProductColor('green');
		this.props.navigation.navigate('RoomSelector');
	};
	render() {
		return (
			<View style={style.container}>
				<View style={style.column}>
					<Text style={style.header}>Select Color</Text>
				</View>
				<View style={style.row}>
					<View style={{ width: '50%' }}>
						<TouchableOpacity onPress={this.gotoRoomSelector}>
							<View style={style.block}>
								<Text>color 1</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={{ width: '50%' }}>
						<TouchableOpacity onPress={this.gotoRoomSelector}>
							<View style={style.block}>
								<Text>Color 2</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={style.row}>
					<View style={{ width: '50%' }}>
						<TouchableOpacity onPress={this.gotoRoomSelector}>
							<View style={style.block}>
								<Text>Color 3</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ width: '50%' }}>
						<TouchableOpacity onPress={this.gotoRoomSelector}>
							<View style={style.block}>
								<Text>Color 4</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#7b9dfe',
		alignItems: 'center',
		justifyContent: 'center'
	},
	column: {
		justifyContent: 'center',
		marginBottom: 16
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
		// alig
	},
	block: {
		width: '90%',
		height: 150,
		backgroundColor: '#fff',
		margin: '5%'
	},
	header: {
		fontSize: 24,
		color: '#fff'
	}
});

function mapStateToProps(state) {
	return {};
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			updateProductColor
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
