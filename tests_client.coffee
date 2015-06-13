class TemplateTestCase extends ClassyTestCase
  @testName: 'reactive-field - template'

  testTemplate: ->
    foo = new ReactiveField 42

    output = Blaze.toHTMLWithData Template.reactiveFieldTestTemplate, {foo}
    @assertEqual output, '42'

    # We want to test that after use in a template, value stays the same. So that there was no value
    # passed to the field when using it inside a template, which would set it to a new value.
    @assertEqual foo(), 42

ClassyTestCase.addTest new TemplateTestCase()
