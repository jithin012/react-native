import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback, View, Button, FlatList } from 'react-native';

const Products = {
	Curtains: 0,
	Dimmer: 0,
	Fan: 0,
	Light: 0
};
export default class SwitchBoard extends Component {
	static navigationOptions = {
		title: 'Switch Board 1',
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
			switchBoardName: ''
		};
	}
	render() {
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
						onChangeText={switchBoardName => this.setState({ switchBoardName })}
						value={this.state.switchBoardName}
					/>
				</View>
				<View style={{ flexDirection: 'column' }}>{this.renderProducts()}</View>
				<Button
					onPress={() => {
						console.log('34567');
					}}
					title='Update & Continue'
					color='#841584'
				/>
			</View>
		);
	}
	renderProducts = () => {
		let arr = [];
		for (let key in Products) {
			arr.push(
				<View style={style.products} key={key}>
					<Text style={style.itemLabel}>{key}</Text>
					<TextInput
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
						onChangeText={updateValue => console.log(key, updateValue)}
						value={this.state.switchBoardName}
					/>
				</View>
			);
		}
		return arr;
	};
}

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
