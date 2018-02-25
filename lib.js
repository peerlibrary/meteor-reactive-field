export class ReactiveField {
  constructor(initialValue, equalsFunc, storePrevious) {
    // To allow not passing equalsFunc, but just storePrevious.
    if (!_.isFunction(equalsFunc) && (arguments.length === 2)) {
      storePrevious = equalsFunc;
      equalsFunc = null;
    }
    let previousValue = undefined;
    const value = new ReactiveVar(initialValue, equalsFunc);

    const getterSetter = function (newValue) {
      if (arguments.length > 0) {
        if (storePrevious) {
          Tracker.nonreactive(() => {
            const oldValue = value.get();
            // Only if the new value is different than currently stored value, we update the previous value.
            if (!(equalsFunc || ReactiveVar._isEqual)(oldValue, newValue)) {
              previousValue = oldValue;
            }
          });
        }

        value.set(newValue);
        // We return the value as well, but we do not want to register a dependency.
        return Tracker.nonreactive(() => {
          return value.get();
        });
      }

      return value.get();
    };

    // We mingle the prototype so that getterSetter instanceof ReactiveField is true.
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(getterSetter, this.constructor.prototype);
    }
    else {
      getterSetter.__proto__ = this.constructor.prototype;
    }

    getterSetter.toString = function () {
      return `ReactiveField{${this()}}`;
    };

    getterSetter.apply = function (obj, args) {
      if (args && args.length > 0) {
        return getterSetter(args[0]);
      }
      else {
        return getterSetter();
      }
    };

    getterSetter.call = function (obj, arg) {
      if (arguments.length > 1) {
        return getterSetter(arg);
      }
      else {
        return getterSetter();
      }
    };

    getterSetter.previous = function() {
      if (!storePrevious) {
        throw new Error("Storing previous value is not enabled.");
      }
      return previousValue;
    };

    return getterSetter;
  }
}
