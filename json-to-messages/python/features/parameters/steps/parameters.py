from behave import *

@given('I have {int} cucumbers')
def step_impl(context, count):
    raise Exception('spam', 'eggs')

@when('I eat {int} cucumbers')
def step_impl(context, eaten):
    pass

@then('I have {int} cucumbers left')
def step_impl(context, left):
    pass

@given('a step with a doctring')
def step_impl(context):
    pass

@when('a step with a datatable')
def step_impl(context):
    pass
