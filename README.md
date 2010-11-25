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

    var { defer, print } = require('meta-promise')
    var deferred = defer()
    print(deferred.promise.foo.bar.name) // Special print that prints when promise is resolved
    setTimeout(function() { // use require('timer').setTimeout on jetpack
      deferred.resolve({ foo: { bar: { name: 'Hello meta-promise!' } } })
    }, 100)
    // you will see 'Hello meta-promise!' in 100ms

[ES Harmony Proxies]:http://wiki.ecmascript.org/doku.php?id=harmony:proxies
[teleport]:http://jeditoolkit.com/teleport/#guide
[jetpack]:https://wiki.mozilla.org/Labs/Jetpack
