import { When, Then } from '@cucumber/fake-cucumber'
// TODO: Figure out a better way to export this
import DataTable from '@cucumber/fake-cucumber/dist/src/DataTable'

When('the following table is transposed:', function(table: DataTable) {
  this.transposed = table.transpose()
})

Then('it should be:', function(expected: DataTable) {
  this.transposed.diff(expected)
})
