// Custom Jest setup to replace jest-expo preset and avoid window redefinition
// This replaces the problematic React Native Jest setup

// Set up global environment variables
global.IS_REACT_ACT_ENVIRONMENT = true;
global.IS_REACT_NATIVE_TEST_ENVIRONMENT = true;

// Set up essential globals for React Native components without redefining window
if (typeof global.window === 'undefined') {
  // Only define window if it doesn't exist (jsdom will have already created it)
  global.window = global;
}

// Define other essential React Native globals
Object.defineProperties(global, {
  __DEV__: {
    configurable: true,
    enumerable: true,
    value: true,
    writable: true,
  },
  cancelAnimationFrame: {
    configurable: true,
    enumerable: true,
    value: function(id) {
      return clearTimeout(id);
    },
    writable: true,
  },
  nativeFabricUIManager: {
    configurable: true,
    enumerable: true,
    value: {},
    writable: true,
  },
  performance: {
    configurable: true,
    enumerable: true,
    value: {
      now: jest.fn(Date.now),
    },
    writable: true,
  },
  requestAnimationFrame: {
    configurable: true,
    enumerable: true,
    value: function(callback) {
      return setTimeout(() => callback(jest.now()), 0);
    },
    writable: true,
  },
});

// Mock React Native modules that might be imported
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  StyleSheet: {
    create: (styles) => styles,
  },
  Platform: {
    OS: 'web',
    select: (obj) => obj.web || obj.default,
  },
}));

// Mock Expo modules
jest.mock('expo', () => ({}));

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Circle: 'Circle',
  Rect: 'Rect',
  Path: 'Path',
  G: 'G',
}));
