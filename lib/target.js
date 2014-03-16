var Promise = require('es6-promise').Promise;
var nopt = require("nopt");

var targets = {};
var knownOpts = {};
var shortHands = {};
var args = nopt(knownOpts, shortHands, process.argv, 2);

/**
 * Define target.
 * @param name
 * @param tasks
 */
module.exports = function (name, tasks) {
    targets[name] = tasks;
    var remain = args.argv.remain;
    if(remain.indexOf(name) > -1 && remain.length === 1){
        run(name);
    }
};

/**
 * Run target.
 * @param name
 */
var run = module.exports.run = function (name){

    var tasks = targets[name];

    if(Array.isArray(tasks)){
        return tasks.reduce(function(sequence, name) {
            return sequence.then(function() {
                return run(name);
            })
        }, Promise.resolve());

    }else if(typeof tasks == 'function'){
        return new Promise(function (resolve, reject) {
            var options = Object.create(args);
            delete options.argv;
            resolve(tasks(options));
        })
    }
};
