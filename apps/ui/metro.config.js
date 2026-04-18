const path = require('path');
const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot, { isCSSEnabled: true });

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, 'node_modules'),
	path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve (sub)dependencies only from the nodeModulesPaths
config.resolver.disableHierarchicalLookup = true;

const { assetExts, sourceExts } = config.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
	cacheVersion: 'ui',
	transformer: {
		babelTransformerPath: require.resolve('react-native-svg-transformer'),
	},
	resolver: {
		assetExts: assetExts.filter((extension) => extension !== 'svg'),
		sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
	},
};

const nxConfig = withNxMetro(mergeConfig(config, customConfig), {
	// Change this to true to see debugging info.
	// Useful if you have issues resolving modules
	debug: true,
	// all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx', 'json'
	extensions: [],
	// Specify folders to watch, in addition to Nx defaults (workspace libraries and node_modules)
	watchFolders: [],
});

// RADICAL FIX: Force projectRoot BACK to the local project directory.
// withNxMetro hardcodes this to workspaceRoot, which causes PostCSS path doubling.
nxConfig.projectRoot = projectRoot;

module.exports = nxConfig;
