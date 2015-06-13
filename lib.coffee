class ReactiveField
  constructor: (initialValue, equalsFunc) ->
    value = new ReactiveVar initialValue, equalsFunc
    getterSetter = (newValue) ->
      if arguments.length > 0
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

    return getterSetter
