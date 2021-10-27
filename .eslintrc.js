module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/typescript',
        // 或者选择严格模式
        // '@ecomfe/eslint-config/typescript/strict',
    ],
    rules: {
        'spaced-comment': 'never'
    }
};