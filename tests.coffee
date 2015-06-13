class BasicTestCase extends ClassyTestCase
  @testName: 'reactive-field - basic'

  testBasic: ->
    foo = new ReactiveField 42

    @assertEqual foo(), 42
    @assertInstanceOf foo, ReactiveField
    @assertEqual foo.constructor, ReactiveField
    @assertEqual foo(43), 43
    @assertEqual foo(), 43

    @assertEqual foo.apply(), 43
    @assertEqual foo.apply(null, [42]), 42
    @assertEqual foo.apply(), 42

    @assertEqual foo.call(), 42
    @assertEqual foo.call(null, 43), 43
    @assertEqual foo.call(), 43

    @assertEqual "#{foo}", 'ReactiveField{43}'

  testReactive: ->
    foo = new ReactiveField 42

    changes = []
    handle = Tracker.autorun (computation) =>
      changes.push foo()

    foo(43)

    Tracker.flush()

    foo(44)

    Tracker.flush()

    foo(44)

    Tracker.flush()

    foo(43)

    Tracker.flush()

    @assertEqual changes, [42, 43, 44, 43]

    handle.stop()

ClassyTestCase.addTest new BasicTestCase()
