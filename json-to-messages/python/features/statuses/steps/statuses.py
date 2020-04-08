from behave import *

@given('a passed step')
@when('a passed step')
@then('a passed step')
def step_impl(context):
    pass

@given('a failed step')
@when('a failed step')
@then('a failed step')
def step_impl(context):
    raise Exception('Oups !')

@then('a skipped step')
def step_impl(context):
    pass
