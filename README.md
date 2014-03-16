cha-target
==========
> Target extension for cha.

## How to setting targets?

```js
var cha = require('cha')
var tasks = require('./tasks')

// Require target extension.
cha.target = require('cha-target')

cha.in('read',     tasks.read)
    .in('glob',    tasks.glob)
    .in('cat',     tasks.cat)
    .in('coffee',  tasks.coffee)
    .in('write',   tasks.write)
    .in('uglifyjs',tasks.uglifyjs)


function input(source){
    source
        .coffee()
        .cat()
        .uglifyjs()
        .write('./out/foobar3.js')
}

// Setting a "dev" target.
cha.target('dev', function(){

    // Require watch extension.
    cha.watch = require('cha-watch')

    // Start watcher.
    cha.watch('./fixtures/coffee/*.coffee', {
        cwd: __dirname,
        immediately: true
    }, function(filepath, event, watched){

        input(cha().read(watched))

    })
})

// Setting a "dist" target.
cha.target('dist', function(){

    input(cha().glob({
        patterns: './fixtures/coffee/*.coffee',
        cwd: __dirname
    }))

})

// Setting a "all" target.
cha.target('all', ['dev', 'dist'])

// Running target.
// cha.target.run('all')

```

Add a arbitrary command to the `scripts` object:
```json
"dev": "node ./test/target dev",
"dist": "node ./test/target dist",
```

To run the command we prepend our script name with run:
```sh
$ npm run dev

> cha@0.1.1 dev /cha
> node ./test/target dev

read /cha/test/fixtures/coffee/bar.coffee
read /cha/test/fixtures/coffee/foo.coffee
concat /cha/test/fixtures/coffee/bar.coffee,/cha/test/fixtures/coffee/foo.coffee
write ./out/foobar3.js
```
