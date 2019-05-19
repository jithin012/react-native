import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback, View, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateConnector } from '../../redux/actions';

class SwitchBoard extends Component {
	static navigationOptions = {
		title: 'Connector',
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
			connectors: this.props.connector,
			selectedConnectorIndex: 0,
			selectedConnector: this.props.connector[0]
		};
	}
	handleUpdateAndContinue = () => {
		let { connectors } = this.state;
		let index = this.state.selectedConnectorIndex;
		connectors.splice(index, 1, this.state.selectedConnector);
		this.props.updateConnector(this.props.selectedRoomId, connectors);
		if (index === connectors.length - 1) {
			this.props.navigation.navigate('RoomExplore');
		} else {
			index++;
			this.setState({
				selectedConnectorIndex: index,
				selectedConnector: connectors[index]
			});
		}
	};
	render() {
		const btnTitle =
			this.state.selectedConnectorIndex === this.state.connectors.length - 1
				? 'Update & Go Back'
				: 'Update & Continue';
		return (
			<View style={style.container}>
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
						placeholder='Enter Switch board name'
						onChangeText={name => {
							let { selectedConnector } = this.state;
							selectedConnector.connectorTitle = name;
							this.setState({ selectedConnector });
						}}
						value={this.state.selectedConnector.connectorTitle}
					/>
				</View>
				<View style={{ flexDirection: 'column' }}>{this.renderProducts()}</View>
				<Button onPress={this.handleUpdateAndContinue} title={btnTitle} color='#841584' />
			</View>
		);
	}
	renderProducts = () => {
		const switchBoard = this.state.selectedConnector;
		let arr = [];
		for (let key in switchBoard.products) {
			arr.push(
				<View style={style.products} key={key}>
					<Text style={style.itemLabel}>{key}</Text>
					<TextInput
						keyboardType={'numeric'}
						placeholderTextColor={'#fff'}
						style={{
							height: 40,
							color: '#fff',
							fontSize: 16,
							marginVertical: 20,
							backgroundColor: 'gray',
							width: 200
						}}
						placeholder={`Enter number of ${key}.`}
						onChangeText={updatedValue => {
							let { selectedConnector } = this.state;
							selectedConnector.products[key] = updatedValue;
							this.setState({ selectedConnector });
						}}
						value={switchBoard.products[key]}
					/>
				</View>
			);
		}
		return arr;
	};
}

function mapStateToProps(state) {
	return {
		selectedRoomId: state.room.selectedRoomId,
		connector: state.room.data[state.room.selectedRoomId].connector
	};
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			updateConnector
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchBoard);

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
		width: 80
	}
});
