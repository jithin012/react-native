const COLORS = {
	white: '#ffffff'
};

// Actuator = 6
const products = {
	'Switch Board': {
		light: '10',
		// 'Ac': '',
		Fan: '1',
		Curtain: '1',
		Dimmer: '0'
	}
};
// System Access Point : 'A Controller for this system'

// Calculate for A switch board
/**
 *       = 10 / 2 = 5
 *  Fan = 1 * 1 = 1
 *  Curtain = 1 * 1
 *  Dimmer = 0 * 1 = 0
 *
 */
// A Final Out put
/**
 * Product Name     Item Code       Quantity
 *  SAP : 1
 *  Light : 20
 */
