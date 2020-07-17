class AppConst {

    static get isDev() {
        return true;
    }

    static get port() {
        return 5000;
    }

    static get configFile() {
        return '/data/introspection-config.json';
    }
}


module.exports = AppConst;