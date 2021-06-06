const typescript = require('rollup-plugin-typescript2');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    //need to add typescript in the first place because => https://github.com/rollup/rollup-plugin-babel/issues/318
    config.plugins.unshift(
      typescript({
        clean: true,
        tsconfig: 'tsconfig.json',
        typescript: require('typescript'),
      })
    );
    return config;
  },
};
