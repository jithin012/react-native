const DEFAULT_SWITCH_BOARD_IN_A_ROOM = 2;

const Products = {
	Light: 'Light',
	Fan: 'Fan',
	Curtains: 'Curtains',
	Dimmer: 'Dimmer'
};
const Connectors = {
	SwitchBoard: 'Switch Board'
};

export default function fetchData(totalRooms = 0) {
	let data = [];
	let connectorType = Connectors.SwitchBoard;
	let totalConnector = DEFAULT_SWITCH_BOARD_IN_A_ROOM;
	for (let i = 0; i < totalRooms; i++) {
		let roomTitle = getTitle(i);
		data.push(getRoomData(connectorType, totalConnector, roomTitle));
	}
	return data;
}

const getRoomData = (connectorType, totalConnector, roomTitle) => {
	let data = { roomTitle, connector: [], roomId: KeyGenerator.getId() };
	if (connectorType === Connectors.SwitchBoard) {
		for (let i = 0; i < totalConnector; i++) {
			let connectorTitle = `SwitchBoard ${i + 1}`;
			data.connector.push(getProducts(connectorTitle));
		}
	}
	return data;
};

const getProducts = connectorTitle => {
	let product = {
		connectorId: KeyGenerator.getId(),
		connectorTitle,
		products: {}
	};
	for (let key in Products) {
		product.products[key] = 0;
	}
	return product;
};
const getTitle = index => `Room ${index + 1}`;

const KeyGenerator = (function() {
	let id = 1000;
	return {
		getId: () => `${++id}`
	};
})();
