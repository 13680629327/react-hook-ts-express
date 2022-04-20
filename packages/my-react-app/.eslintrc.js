module.exports = {
  extends: [
    'eslint-config-ali/typescript/react',
    'prettier'
  ],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};
