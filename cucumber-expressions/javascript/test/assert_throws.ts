import assert from "assert";

// A better assert.error that allows an exact error message
export default (fn: () => any, message: string) => {
  const regexp = new RegExp(message.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"));
  assert.throws(fn, regexp);
};
