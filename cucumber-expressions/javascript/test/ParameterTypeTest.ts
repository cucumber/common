import assertThrows from "./assert_throws";
import ParameterType from "../src/ParameterType";

describe("ParameterType", () => {
  it("does not allow ignore flag on regexp", () => {
    assertThrows(
      () =>
        new ParameterType(
          "case-insensitive",
          /[a-z]+/i,
          String,
          s => s,
          true,
          true
        ),
      "ParameterType Regexps can't use flag 'i'"
    );
  });
});
