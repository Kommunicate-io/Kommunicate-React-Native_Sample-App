// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const kommunicateSdkRoot = path.resolve(
  projectRoot,
  '../Kommunicate-React-Native-SDK'
);
const config = getDefaultConfig(projectRoot);

// The local SDK is outside this project. Watch it, but resolve its React
// dependencies from this app so Metro does not look for a second installation.
config.watchFolders = [...config.watchFolders, kommunicateSdkRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
