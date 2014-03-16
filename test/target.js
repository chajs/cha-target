var cha = require('cha')

// Require target extension.
cha.target = require('../')

// Setting a "dev" target.
cha.target('dev', function(){
    console.log('Deving')
})

cha.target('test', function(){
    console.log('Testing')
})

// Setting a "dist" target.
cha.target('dist', function(){
    console.log('Disting')
})

// Setting a "all" target.
cha.target('all', ['dev', 'test', 'dist'])

// Running target.
// cha.target.run('all')
