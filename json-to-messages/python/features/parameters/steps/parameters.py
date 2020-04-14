from behave import *

@given('I have {count:d} cucumbers')
def step_impl(context, count):
    context.cucumbers = count

@when('I eat {eaten:d} cucumbers')
def step_impl(context, eaten):
    context.cucumbers -= eaten

@then('I have {left:d} cucumbers left')
def step_impl(context, left):
    assert context.cucumbers == left

@given('a step with a doctring')
def step_impl(context):
    pass

@when('a step with a datatable')
def step_impl(context):
    pass
