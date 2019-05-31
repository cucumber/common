"use strict";

import assert from "assert";
import assertThrows from "./assert_throws";
import CucumberExpression from "../src/CucumberExpression";
import RegularExpression from "../src/RegularExpression";
import ParameterTypeRegistry from "../src/ParameterTypeRegistry";
import ParameterType from "../src/ParameterType";

class Color {
  /// [color-constructor]
  constructor(public readonly name: string) {}
  /// [color-constructor]
}

class CssColor {
  constructor(public readonly name: string) {}
}

describe("Custom parameter type", () => {
  let parameterTypeRegistry: ParameterTypeRegistry;

  beforeEach(() => {
    parameterTypeRegistry = new ParameterTypeRegistry();
    /* eslint-disable prettier/prettier */
    /// [add-color-parameter-type]
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        "color", // name
        /red|blue|yellow/, // regexp
        Color, // type
        s => new Color(s), // transformer
        false, // useForSnippets
        true // preferForRegexpMatch
      )
    );
    /// [add-color-parameter-type]
    /* eslint-enable prettier/prettier */
  });

  describe("CucumberExpression", () => {
    it("throws exception for illegal character in parameter name", () => {
      assertThrows(
        () => new ParameterType("[string]", /.*/, String, s => s, false, true),
        "Illegal character '[' in parameter name {[string]}"
      );
    });

    it("matches parameters with custom parameter type", () => {
      const expression = new CucumberExpression(
        "I have a {color} ball",
        parameterTypeRegistry
      );
      const value = expression.match("I have a red ball")[0].getValue(null);
      assert.strictEqual(value.name, "red");
    });

    it("matches parameters with multiple capture groups", () => {
      class Coordinate {
        constructor(
          public readonly x: number,
          public readonly y: number,
          public readonly z: number
        ) {}
      }

      parameterTypeRegistry.defineParameterType(
        new ParameterType(
          "coordinate",
          /(\d+),\s*(\d+),\s*(\d+)/,
          Coordinate,
          (x: string, y: string, z: string) =>
            new Coordinate(Number(x), Number(y), Number(z)),
          true,
          true
        )
      );
      const expression = new CucumberExpression(
        "A {int} thick line from {coordinate} to {coordinate}",
        parameterTypeRegistry
      );
      const args = expression.match("A 5 thick line from 10,20,30 to 40,50,60");

      const thick = args[0].getValue(null);
      assert.strictEqual(thick, 5);

      const from = args[1].getValue(null);
      assert.strictEqual(from.x, 10);
      assert.strictEqual(from.y, 20);
      assert.strictEqual(from.z, 30);

      const to = args[2].getValue(null);
      assert.strictEqual(to.x, 40);
      assert.strictEqual(to.y, 50);
      assert.strictEqual(to.z, 60);
    });

    it("matches parameters with custom parameter type using optional capture group", () => {
      parameterTypeRegistry = new ParameterTypeRegistry();
      parameterTypeRegistry.defineParameterType(
        new ParameterType(
          "color",
          [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
          Color,
          s => new Color(s),
          false,
          true
        )
      );
      const expression = new CucumberExpression(
        "I have a {color} ball",
        parameterTypeRegistry
      );
      const value = expression
        .match("I have a dark red ball")[0]
        .getValue(null);
      assert.strictEqual(value.name, "dark red");
    });

    it("defers transformation until queried from argument", () => {
      parameterTypeRegistry.defineParameterType(
        new ParameterType(
          "throwing",
          /bad/,
          null,
          s => {
            throw new Error(`Can't transform [${s}]`);
          },
          false,
          true
        )
      );

      const expression = new CucumberExpression(
        "I have a {throwing} parameter",
        parameterTypeRegistry
      );
      const args = expression.match("I have a bad parameter");
      assertThrows(() => args[0].getValue(null), "Can't transform [bad]");
    });

    describe("conflicting parameter type", () => {
      it("is detected for type name", () => {
        assertThrows(
          () =>
            parameterTypeRegistry.defineParameterType(
              new ParameterType(
                "color",
                /.*/,
                CssColor,
                s => new CssColor(s),
                false,
                true
              )
            ),
          "There is already a parameter type with name color"
        );
      });

      it("is not detected for type", () => {
        parameterTypeRegistry.defineParameterType(
          new ParameterType(
            "whatever",
            /.*/,
            Color,
            s => new Color(s),
            false,
            false
          )
        );
      });

      it("is not detected for regexp", () => {
        parameterTypeRegistry.defineParameterType(
          new ParameterType(
            "css-color",
            /red|blue|yellow/,
            CssColor,
            s => new CssColor(s),
            true,
            false
          )
        );

        assert.strictEqual(
          new CucumberExpression(
            "I have a {css-color} ball",
            parameterTypeRegistry
          )
            .match("I have a blue ball")[0]
            .getValue(null).constructor,
          CssColor
        );
        assert.strictEqual(
          new CucumberExpression(
            "I have a {css-color} ball",
            parameterTypeRegistry
          )
            .match("I have a blue ball")[0]
            .getValue(null).name,
          "blue"
        );
        assert.strictEqual(
          new CucumberExpression("I have a {color} ball", parameterTypeRegistry)
            .match("I have a blue ball")[0]
            .getValue(null).constructor,
          Color
        );
        assert.strictEqual(
          new CucumberExpression("I have a {color} ball", parameterTypeRegistry)
            .match("I have a blue ball")[0]
            .getValue(null).name,
          "blue"
        );
      });
    });

    // JavaScript-specific
    it("creates arguments using async transform", async () => {
      parameterTypeRegistry = new ParameterTypeRegistry();
      /// [add-async-parameter-type]
      parameterTypeRegistry.defineParameterType(
        new ParameterType(
          "asyncColor",
          /red|blue|yellow/,
          Color,
          async s => new Color(s),
          false,
          true
        )
      );
      /// [add-async-parameter-type]

      const expression = new CucumberExpression(
        "I have a {asyncColor} ball",
        parameterTypeRegistry
      );
      const args = await expression.match("I have a red ball");
      const value = await args[0].getValue(null);
      assert.strictEqual(value.name, "red");
    });
  });

  describe("RegularExpression", () => {
    it("matches arguments with custom parameter type", () => {
      const expression = new RegularExpression(
        /I have a (red|blue|yellow) ball/,
        parameterTypeRegistry
      );
      const value = expression.match("I have a red ball")[0].getValue(null);
      assert.strictEqual(value.constructor, Color);
      assert.strictEqual(value.name, "red");
    });
  });
});
