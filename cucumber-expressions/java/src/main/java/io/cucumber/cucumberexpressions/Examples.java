package io.cucumber.cucumberexpressions;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static io.cucumber.cucumberexpressions.ParameterType.Transform.transform;
import static io.cucumber.cucumberexpressions.ParameterType.Transform.transformCaptureGroups;

public final class Examples {

    static class Color {

        static Color getInstance(String name) {
            return null;
        }
    }

    static class Chroma {

        static Chroma getInstance(String[] elements) {
            return null;
        }
    }

    static class OverloadedColor {

        static OverloadedColor getInstance(String name) {
            return null;
        }

        static OverloadedColor getInstance(int hex) {
            return null;
        }
    }

    static class OverloadedChroma {

        static OverloadedChroma getInstance(String[] elements) {
            return null;
        }

        static OverloadedChroma getInstance(int[] hex) {
            return null;
        }
    }

    public static void main(String... vargs) {

        // The base case. Create a color from a string.

        new ParameterType<>(
                "color",
                "r|g|b",
                Color.class,
                Color::getInstance,
                true,
                true
        );

        // The other base case. Create a chroma from an array of strings.

        new ParameterType<>(
                "chroma",
                "r|g|b",
                Chroma.class,
                Chroma::getInstance,
                true,
                true
        );

        // The static helper method.

        // Slightly more verbose because we're using a static constructor to
        // create the Transform. Also note that the the generic type of ParameterType can't be inferred now.

        // (This also means we can get rid of it entirely if we move up to Java 8 and if we chose to go with the base case)

        new ParameterType<Color>(
                "color",
                "r|g|b",
                Color.class,
                transform(Color::getInstance),
                true,
                true
        );

        new ParameterType<Chroma>(
                "chroma",
                "r|g|b",
                Chroma.class,
                transformCaptureGroups(Chroma::getInstance),
                true,
                true
        );


        // So how do we handle over loading?

        // The base case with over loading:
        // It's not very verbose. The lambda is even shorter.

        new ParameterType<>(
                "color",
                "r|g|b",
                OverloadedColor.class,
                (String arg) -> OverloadedColor.getInstance(arg),
                true,
                true
        );

        new ParameterType<>(
                "color",
                "r|g|b",
                OverloadedColor.class,
                (Transformer<OverloadedColor>) OverloadedColor::getInstance,
                true,
                true
        );

        // The static helper method case with overloading:

        // This is indeed a bit less verbose but comes at the cost of **always** having to use the static helper.

        // And it doesn't even safe that much! Like 20 characters or so.

        new ParameterType<OverloadedColor>(
                "color",
                "r|g|b",
                Color.class,
                transform(OverloadedColor::getInstance),
                true,
                true
        );


        // It's even more obvious when using the longer transformCaptureGroups name
        // It's actually longer then the lambda (and again note the requirement for the generic in ParameterType.
        // Arguably you can avoid this by using a shorter name but the gains are minimal.

        // As such I think it's okay to use lambda's when static constructors are overloaded.

        new ParameterType<OverloadedChroma>(
                "chroma",
                "r|g|b",
                OverloadedChroma.class,
                transformCaptureGroups(OverloadedChroma::getInstance),
                true,
                true
        );


        new ParameterType<>(
                "chroma",
                "r|g|b",
                OverloadedChroma.class,
                (String[] args) -> OverloadedChroma.getInstance(args),
                true,
                true
        );


        new ParameterType<>(
                "chroma",
                "r|g|b",
                OverloadedChroma.class,
                (MultiTransformer<OverloadedChroma>) OverloadedChroma::getInstance,
                true,
                true
        );
    }


}
