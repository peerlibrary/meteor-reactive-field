export class ReactiveField
  constructor: (initialValue, equalsFunc, storePrevious) ->
    # To allow not passing equalsFunc, but just storePrevious.
    if not _.isFunction(equalsFunc) and arguments.length is 2
      storePrevious = equalsFunc
      equalsFunc = null
    previousValue = undefined
    value = new ReactiveVar initialValue, equalsFunc

    getterSetter = (newValue) ->
      if arguments.length > 0
        if storePrevious
          Tracker.nonreactive =>
            oldValue = value.get()
            # Only if the new value is different than currently stored value, we update the previous value.
            unless (equalsFunc or ReactiveVar._isEqual)(oldValue, newValue)
              previousValue = oldValue

        value.set newValue
        # We return the value as well, but we do not want to register a dependency.
        return Tracker.nonreactive =>
          value.get()

      value.get()

    # We mingle the prototype so that getterSetter instanceof ReactiveField is true.
    if Object.setPrototypeOf
      Object.setPrototypeOf getterSetter, @constructor::
    else
      getterSetter.__proto__ = @constructor::

    getterSetter.toString = ->
      "ReactiveField{#{@()}}"

    getterSetter.apply = (obj, args) ->
      if args?.length > 0
        getterSetter args[0]
      else
        getterSetter()

    getterSetter.call = (obj, arg) ->
      if arguments.length > 1
        getterSetter arg
      else
        getterSetter()

    getterSetter.previous = ->
      throw new Error "Storing previous value is not enabled." unless storePrevious
      previousValue

    return getterSetter
