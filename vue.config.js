const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5070', // Адрес вашего бэкенд-сервера
  //       changeOrigin: true,
  //     },
  //   },
  // }
})
