const path = require('path');

module.exports= {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },
    outputDir: path.resolve(__dirname, '../server/public')
}