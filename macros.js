var fs = require('fs');
var cwd = process.cwd();

var _ = require('lodash');

module.exports = {
    SLITERAL: function(str) {
        return str;
    },
    cmsparse: function(str) {
        var template;
        try {
            template = fs.readFileSync(cwd + '/public/' + file).toString();
            return this.eval(template);
        } catch(err) {
            return '';
        }
    },
    include: function(str) {
        return this.eval(str);
    },
    parse: function(file) {
        var template;
        try {
            template = fs.readFileSync(cwd + '/' + file).toString();
            return this.eval(template);
        } catch(err) {
            return '';
        }
    },
    isString: function(str) {
        return _.isString(str);
    }
};