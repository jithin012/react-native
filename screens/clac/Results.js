import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback, View, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateConnector } from '../../redux/actions';
import { CalculateResult } from './RoomHandler';

class Result extends Component {
	static navigationOptions = {
		title: 'Results',
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
		this.state = {};
	}
	iterateRoom = (roomData, callback) => {
		for (let key in roomData) callback(roomData[key]);
	};
	iterateConnector = (connectorArr, callback) => {
		connectorArr.map(data => {
			callback(data);
		});
	};
	iterateProducts = (products, callback) => {
		for (let key in products) callback(key, products[key]);
	};
	getResultData = () => {
		const { roomData } = this.props;
		let resultSet = {
			'System Access Point (SAP)': '1'
		};
		let tempResultSet;
		this.iterateRoom(roomData, roomInfo => {
			this.iterateConnector(roomInfo.connector, connectorInfo => {
				tempResultSet = CalculateResult(connectorInfo.products);
				this.iterateProducts(tempResultSet, (item, value) => {
					if (!resultSet[item]) resultSet[item] = 0;
					resultSet[item] = resultSet[item] + parseInt(value);
				});
			});
		});
		console.log('roomData to get result', resultSet);
		return resultSet;
	};
	render() {
		const resultSet = this.getResultData();
		return (
			<View style={style.container}>
				<View style={{ flexDirection: 'column' }}>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#000',
							textDecorationLine: 'underline',
							paddingVertical: 10
						}}
					>
						Results
					</Text>
					<View style={{ flexDirection: 'column' }}>{this.renderResult(resultSet)}</View>
					<Button onPress={() => this.props.navigation.navigate('Home')} title={'Go Home'} color='#841584' />
				</View>
			</View>
		);
	}
	renderResult = resultSet => {
		let arr = [];
		for (let key in resultSet) {
			arr.push(
				<View style={style.products} key={key}>
					<Text style={style.itemLabel}>{key}</Text>
					<Text style={style.itemLabel}>{resultSet[key]}</Text>
				</View>
			);
		}
		return arr;
	};
}

function mapStateToProps(state) {
	return {
		roomData: state.room.data
	};
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			// updateConnector
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Result);

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#7b9dfe',
		padding: 50
	},
	products: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 0,
		margin: 0
	},
	itemLabel: {
		width: 150,
		paddingVertical: 20
	}
});
