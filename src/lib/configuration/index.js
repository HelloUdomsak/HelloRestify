var nconf = require('nconf')

function Config() {
    nconf.argv().env();
    var environment = nconf.get('NODE_ENV') || 'development'
    nconf.file(environment, './configs/' + environment.toLowerCase() + '.json')
    nconf.file('default', './config/default.json')
}

Config.prototype.get = function(key) {
    return nconf.get(key)
}

module.exports = new Config()
