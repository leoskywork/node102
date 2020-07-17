const AppConst = require('./app-const');
const path = require('path');

class Config {

    readIntrospectionSync() {
        const fullPath = path.join(__dirname, AppConst.configFile);
        return this.readSync(fullPath);
    }



    read(path, onSuccess, onError) {
        const fs = require('fs');

        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.err(err);
                return onError(err);
            }

            onSuccess(data);
        });
    }

    readSync(path) {
        const fs = require('fs');
        return fs.readFileSync(path, 'utf8');
    }
}

module.exports = new Config();