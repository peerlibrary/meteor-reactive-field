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

    getterSetter.__proto__ = @constructor::

    getterSetter.toString = ->
      "ReactiveField{#{@()}}"

    return getterSetter
