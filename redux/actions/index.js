import fetchData from '../../screens/clac/RoomHandler';

export const updateProductColor = color => {
	return function(dispatch) {
		dispatch({ type: 'UPDATE_COLOR', payload: { color } });
	};
	// return { type: 'UPDATE_COLOR', payload: { color } };
};

export const createRooms = totalNumber => {
	return function(dispatch) {
		const roomArr = fetchData(totalNumber);
		let roomData = {};
		roomArr.map(data => {
			roomData[data.roomId] = data;
		});
		dispatch({ type: 'CREATE_ROOMS', payload: { data: roomData } });
	};
};

export const updateSelectedRoomid = roomId => {
	return function(dispatch) {
		dispatch({ type: 'UPDATE_SELECTED_ROOM_ID', payload: { selectedRoomId: roomId } });
	};
};

export const updateRoomName = (roomId, roomTitle) => {
	return function(dispatch) {
		dispatch({ type: 'UPDATE_ROOM_NAME', payload: { roomId, roomTitle } });
	};
};

export const updateConnector = (roomId, connector) => {
	return function(dispatch) {
		dispatch({ type: 'UPDATE_CONNECTOR_DATA', payload: { roomId, connector } });
	};
};
