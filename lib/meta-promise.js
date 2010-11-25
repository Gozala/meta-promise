'use strict'

if ('undefined' == typeof Proxy)
  throw new Error('This library depends on ES Harmony `Proxy` that is not availbale on your platform')

const { when, defer, get, post, put, isPromise, isResolved } = require('q')

function required() throw new Error('Missing required property')
function _getPropertyNames(object) {
  let names = Object.getOwnPropertyNames(object)
  ,   proto = Object.getPrototoypeOf(object)
  return proto ? names.concat(_getPropertyNames(proto)) : names
}

exports.defer = function() {
  let deferred = defer()
  ,   promise = MetaPromise(deferred.promise)

  return Object.create(deferred, { promise: { value: promise } })
}

const MetaPromiseHandler =
{ promise: { get: required, set: required }
, getOwnPropertyDescriptor: function getOwnPropertyDescriptor(name)
    { configurable: false
    , get: function get() {
      }
    , set: function set() {
      }
    }
, getPropertyDescriptor: function getPropertyDescriptor(name)
    this.getOwnPropertyDescriptor(name)
, getOwnPropertyNames: function getOwnPropertyNames()
    Object.getOwnPropertyNames(this.promise.valueOf())
, getPropertyNames: function getPropertyNames() {
     _getPropertyNames(this.promise.valueOf())
, defineProperty: function(name, descriptor)
    when(this.promise, function onFulfill(object) {
      Object.defineProperty(object, name, descriptor)
    })
, delete: function delete(name)
    // Can't know in advance if will be successful.
    when(this.promise, function onFulfill(object) {
      return delete object[name]
    })
, fix: function fix() {
    if (isResolved(this.promise)) {
      let object = Object.freeze(this.promise.valueOf())
      return Object.getOwnPropertyNames(object).map(function(name) {
         return Object.getOwnPropertyDescriptor(object, name)
      })
     }
     // If promise is not fulfilled proxy won't allow itself to be fixed,
     // attempt to do so will throw `TypeError`.
   }
, has: function has(name) name in this.promise.valueOf()
, hasOwn: function hasOwn(name)
    Object.prototype.hasOwnProperty.call(this.promise.valueOf(), name)
, get: function get(receiver, name) MetaPromise(get(this.promise, name))
, set: function(receiver, name, value) {
    MetaPromise(put(this.promise, name, value))
    return true // Can't tell if set will fail or not
  }
, enumerate: function enumerate() _getPropertyNames(this.promise.valueOf())
, keys: function keys() Object.keys(this.promise.valueOf())
}

function MetaPromise(promise) {
  return Proxy.create
  ( Object.create(MetaPromiseHandler, { promise: { value: promise })
  , promise
  )
}
exports.MetaPromise = MetaPromise
