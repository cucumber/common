import { When } from 'cucumber'

When('a passed step', function () {});

When('a failed step', function () {
  throw new Error('BOOM !');
});

When('a pending step', function () {
  return 'pending';
});