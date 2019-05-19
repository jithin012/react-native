import { combineReducers } from 'redux';

const initialState = {
	color: '',
	data: {},
	selectedRoomId: ''
};
const room = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_COLOR':
			return { ...state, color: action.payload.color };
		case 'CREATE_ROOMS':
			return { ...state, data: action.payload.data };
		case 'UPDATE_SELECTED_ROOM_ID':
			return { ...state, selectedRoomId: action.payload.selectedRoomId };
		case 'UPDATE_ROOM_NAME':
			let roomData = state.data[action.payload.roomId];
			roomData.roomTitle = action.payload.roomTitle;
			return { ...state, data: { ...state.data, [action.payload.roomId]: roomData } };
		case 'UPDATE_CONNECTOR_DATA':
			let room = state.data[action.payload.roomId];
			room.connector = action.payload.connector;
			return { ...state, data: { ...state.data, [action.payload.roomId]: room } };

		//old one

		case 'UPDATE_SWITCH_BOARD_DATA':
			return { ...state, count: 0 };
		default:
			return state;
	}
};

const appReducers = combineReducers({
	room
});

const rootReducer = (state = {}, action) => {
	return appReducers(state, action);
};

export default rootReducer;
