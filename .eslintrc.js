module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        'jest/globals': true
    },
    extends: [
        'standard',
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['jest'],
    rules: {
        semi: [2, 'never'],
        'prettier/prettier': ['error']
    }
}
