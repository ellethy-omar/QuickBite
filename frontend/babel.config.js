module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-reanimated/plugin', // Keep this for Reanimated
        ['@babel/plugin-transform-private-methods', { loose: true }] // Add this plugin with loose mode
    ],
};