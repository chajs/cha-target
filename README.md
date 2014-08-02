cha-target
==========
> Target extension for cha.

## Install

Install target extension for cha:
```sh
npm install cha-target --save-dev
```

## Usage

Once the extension has been installed, it should required inside your scripts with this line of JavaScript:
```js
cha.target = require('cha-target')
```

Example script:
```js
var cha = require('cha')

// Require target extension.
cha.target = require('cha-target')

// Register tasks that should chaining.
cha.in('reader',    require('task-reader'))
    .in('coffee',   require('task-coffee'))
    .in('glob',     require('task-glob'))
    .in('combine',  require('task-combine'))
    .in('writer',   require('task-writer'))
    .in('uglifyjs', require('task-uglifyjs'))

function input(source){
    source
        .coffee()
        .combine()
        .uglifyjs()
        .writer('./out/foobar3.js')
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

        input(cha().reader(watched))

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
{
  "name": "cha-example",
  "scripts": {
    "dev": "node ./test/target dev",
    "dist": "node ./test/target dist",
    "all": "node ./test/target all",
  }
}
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
