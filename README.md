# meta-promise #

Experimental implementation of promises on top of [ES Harmony Proxies].

# Status #

This implementation is in early alpha state. Since Spidermonkey is only
javascript engine implementing Proxies so far, you can try this out either
on Firefox 4 using [teleport] or using [jetpack].

# Install #

    npm install meta-promise

# Play #

    cd /usr/local/lib/node/.npm/meta-promise/active/package/
    teleport activate

# What works so far #

    var mp = require('meta-promise')
    // In teleport please run following seperately from first line.
    if ('undefined' == typeof setTimeout)
      var setTimeout = require('timer').setTimeout
    var deferred = mp.defer()
    var promise = deferred.promise // Promise that can be shared with consumers.
    // `mp.print` takes promise and prints it when promise is fullfilled.
    mp.print(promise.some.object.message)
    mp.print(promise.some.object.talk('meta-promise'))
    mp.print(promise.some.object.talk.apply({
      message: 'You can also use apply with {{name}}'
    }, ['meta-promise']))
    mp.print(promise.some.object.talk.apply({
      message: 'You can also use call with {{name}}'
    }, ['meta-promise']))

    setTimeout(function() {
      deferred.resolve(
      { some:
        { object:
          { message: 'Hello {{name}} !'
          , talk: function talk(name) {
              return this.message.replace('{{name}}', name);
            }
          }
        }
      })
    }, 100)
    // 'Hello {{name}} !' will be printed in 100ms.
    // 'Hello meta-promise !' will be printed in 100ms.
    // 'You can also use apply with meta-promise'
    // 'You can also use call with meta-promise'

[ES Harmony Proxies]:http://wiki.ecmascript.org/doku.php?id=harmony:proxies
[teleport]:http://jeditoolkit.com/teleport/#guide
[jetpack]:https://wiki.mozilla.org/Labs/Jetpack
