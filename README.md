Reactive field for Meteor
=========================

Reactive field for [Meteor](https://meteor.com/) provides an alternative syntax for
[`ReactiveVar`](http://docs.meteor.com/#/full/reactivevar_pkg):

```javascript
var field = new ReactiveField('initialValue');
console.log(field()); // prints 'initialValue' string
field('newValue');
console.log(field()); // prints 'newValue' string
```

So instead of `field.get()` and `field.set()`, you can simply call it as a function which (reactively) returns a
value, or call it with an argument to set the new value. Setter still returns the value.

Optionally, you can pass custom equality function:

```javascript
new ReactiveField('initialValue', function (a, b) {return a === b});
```

Adding this package to your [Meteor](http://www.meteor.com/) application adds the `ReactiveField` constructor into
the global scope.

Both client and server side.

Installation
------------

```
meteor add peerlibrary:reactive-field
```

Motivation
----------

The main motivation for this package is that you can assign reactive values to
[Blaze Components](https://github.com/peerlibrary/meteor-blaze-components) and then you can access them in the template
by simply doing `{{field}}` instead of `{{field.get}}`. And same for any other objects for which you create reactive
fields in the constructor and then you or have `this.field.get()` calls all around the code, which is ugly because if
you ever decide to convert `this.field` into a getter with some additional logic you have to change code everywhere.
Or you create a `this.field()` getter in advance, which calls `this._field.get()` for you, but that is again a lot of
work. So the easiest thing is to have reactive fields be methods to begin with so you can change them later on if
necessary while keeping backwards compatibility.

Related projects
----------------

* [reactive-var](https://atmospherejs.com/meteor/reactive-var) – the official Meteor reactive variable implementation
which this package just wraps, so the functionality is the same, just syntax how to use it is different
* [meteor-variable](https://github.com/awwx/meteor-variable) – an obsolete package offering similar syntax to this
package
