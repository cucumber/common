import assert from 'assert'
import { When, Then, DataTable } from '@cucumber/fake-cucumber'

When('the following table is transposed:', function(table: DataTable) {
  this.transposed = table.transpose()
})

Then('it should be:', function(expected: DataTable) {
  this.transposed.diff(expected)
})
