const { override, addLessLoader } = require('customize-cra');
module.exports = override(
  // 添加 less-loader
  addLessLoader()
);