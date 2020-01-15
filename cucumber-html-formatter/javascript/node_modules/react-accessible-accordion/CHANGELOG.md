# Changelog

> All notable changes to this project are documented in this file. This project
> adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [[v3.0.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v3.0.1)

### FIXED

-   Refactor away `Array.prototype.findIndex` in favour of `Array.prototype.indexOf` to reinstate IE 11 support without use of a polyfill (https://github.com/springload/react-accessible-accordion/issues/237, https://github.com/springload/react-accessible-accordion/issues/224).

## [[v3.0.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v3.0.0)

This release is the culmination of a massive amount of work, resulting in some
new features and significantly stronger and more reliable WAI ARIA spec
compliance. Notably, the project has been migrated from Flow to Typescript, and
a full accessibility audit has been performed - revealing a few holes in our
compliance which have now been entirely addressed.

Thanks to everyone who has contributed to this release - and not just those who
have written code. Contribution by way of issues relating to spec compliance,
pull-request commentary, advice and assistance is all greatly appreciated.
Thanks also to the patient users who have endured an extended period without a
release while we made sure to get this 100% right! Release cadence should return
to normal again now.

### Breaking Changes - Upgrade Guide:

1. Rename all of your `AccordionItemTitle` components to `AccordionItemHeading`
   and then nest an `AccordionItemButton` directly inside of each one. Note that
   in order for your Accordion to remain spec-compliant, you may _not_ put any
   other children inside `AccordionItemHeading`.

    ```tsx
    // Before:
    import { AccordionItemTitle } from 'react-accessible-accordion';

    const headingBefore = <AccordionItemTitle>Foo</AccordionItemTitle>;
    ```

    ```tsx
    //  After:
    import {
        AcccordionItemHeading,
        AccordionItemButton,
    } from 'react-accessible-accordion';

    const headingAfter = (
        <AccordionItemHeading>
            <AccordionItemButton>Foo</AccordionItemButton>
        </AccordionItemHeading>
    );
    ```

2. Rename all of your `AccordionItemBody` components to `AccordionItemPanel`.

    ```tsx
    // Before:
    import { AccordionItemBody } from 'react-accessible-accordion';

    const panelBefore = (
        <AccordionItemBody>
            Voluptate elit eiusmod laborum proident esse officia dolor laboris
            laboris amet nulla officia cillum.
        </AccordionItemBody>
    );
    ```

    ```tsx
    // After:
    import { AccordionItemPanel } from 'react-accessible-accordion';

    const panelAfter = (
        <AccordionItemPanel>
            Voluptate elit eiusmod laborum proident esse officia dolor laboris
            laboris amet nulla officia cillum.
        </AccordionItemPanel>
    );
    ```

3. Remove all instances of `hideBodyClassName`. This prop is no longer valid, as
   `AccordionItemPanel` components are now hidden without additional styling. If
   you _must_ have a different `className` prop when an item is collapsed, then
   you may leverage the new `AccordionItemState` component.

    ```tsx
    // Before
    import { AccordionItemPanel } from 'react-accessible-accordion';

    const panelBefore = (
        <AccordionItemPanel className="foo" hideBodyClassName="foo--hidden" />
    );
    ```

    ```tsx
    // After:
    import {
        AccordionItemPanel,
        AccordionItemState,
    } from 'react-accessible-accordion';

    const panelAfter = (
        <AccordionItemState>
            {({ expanded }) => (
                <AccordionItemPanel
                    className={expanded ? 'foo' : 'foo foo--hidden'}
                />
            )}
        </AccordionItemState>
    );
    ```

4. Remove all instances of `AccordionItem`’s `expanded` prop and instead use
   `Accordion`’s `preExpanded` prop. Note that this means that ‘controlled’
   accordions are no longer a supported pattern. Please raise an issue if you
   have a use-case which calls for the ability to manually control expanded
   state.

    ```tsx
    // Before
    import { Accordion, AccordionItem } from 'react-accessible-accordion';

    const accordionBefore = (
        <Accordion>
            <AccordionItem expanded />
        </Accordion>
    );
    ```

    ```tsx
    // After:
    import { Accordion, AccordionItem } from 'react-accessible-accordion';

    const accordionAfter = (
        <Accordion preExpanded={['foo']}>
            <AccordionItem uuid="foo" />
        </Accordion>
    );
    ```

5. Remove all instances of `Accordion`’s `accordion` prop. Instead, use a
   combination of `allowZeroExpanded` and `allowMultipleExpanded` props to suit
   your requirements. If you were not explicitly setting `accordion` to `false`
   then you probably are not required to make any changes here.

    ```tsx
    // Before
    import { Accordion } from 'react-accessible-accordion';

    const accordionBefore = <Accordion accordion={false} />;
    ```

    ```tsx
    // After:
    import { Accordion } from 'react-accessible-accordion';

    const accordionAfter = <Accordion allowMultipleExpanded />;
    ```

6. Upgrade to React v16.3+

7. Remove your `minimal-example.css` import. These styles only applied
   `display: none` to panels when collapsed, but browsers apply these styles to
   elements with the `hidden` attribute, which the `AccordionItemPanel`
   component now has (when collapsed).

### Added

-   Added `AccordionItemButton` component.
-   Added `AccordionItemState` component.
-   Added `allowZeroExpanded` prop to `Accordion`.
-   Added `allowMultipleExpanded` prop to `Accordion`.
-   Out-of-the-box Typescript support.
-   Integration tests to explicitly assert every line of the WAI ARIA
    'Accordion' spec.
-   Additional keyboard functionality (Up, Down, Left, Right, Home, End).

### Changed

-   Renamed `AccordionItemTitle` to `AccordionItemHeading` to be consistent with
    the language used in the WAI ARIA spec.
-   Renamed `AccordionItemBody` to `AccordionItemPanel` to be consistent with
    the language used in the WAI ARIA spec.
-   Updated `AccordionItemPanel` to have a `hidden` attribute.
-   Roles and aria attributes all audited and updated to match the WAI ARIA
    spec.
-   Update `onChange` to always be called with an array of the currently
    expanded items.

### Fixed

-   Fixes SSR (server-side rendering).
-   Fixes incorrect roles and attributes as per the WAI ARIA spec.

### Removed

-   Removed Flow support (but we hope to reinstate typing in the future. Track
    progress
    [here](https://github.com/springload/react-accessible-accordion/issues/151)).
-   Removed undocumented `expanded` mechanism for `AccordionItems`.
-   Removed undocumented `disabled` mechanism for `AccordionItems`.
-   Remove `hideBodyClassName` prop.

## [[v2.4.5]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.5)

### Fixed

-   Fixes SSR.

## [[v2.4.4]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.4)

### Fixed

-   Fixes
    [performance issue](https://github.com/springload/react-accessible-accordion/issues/110)
    with not re-instantiating render-prop callbacks on each re-render.

## [[v2.4.3]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.3)

### Fixed

-   Fixes issue with spacebar scrolling the page (see PR#99)
-   Fixes IE compatibility by replacing uses of Array.prototype.find.

## [[v2.4.2]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.2)

### Changed

-   Removes invalid test
-   Minor change to package.json to remove some redundant Jest config.
-   Upgrade one forgotten devDependency.

### Fixed

-   Emergency bug fix to remove asyc/await from the code (see PR#95)

## [[v2.4.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.1)

This release brings support for React 16.3+ by way of some minor refactoring to
remove deprecated lifecycle methods.

### Changed

-   Replace deprecated lifecycle methods 'componentWillReceiveProps',
    'componentWillUpdate' and 'componentWillMount'.
-   Updated `unstated` (internal dependency) to latest major release.
-   Updated all devDependencies.

## [[v2.4.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.0)

### Added

-   Possibility to have custom uuid on `AccordionItem` - suggested by
    https://github.com/springload/react-accessible-accordion/issues/70

### Fixed

-   Fix rollup config after version bump -
    https://gist.github.com/Rich-Harris/d472c50732dab03efeb37472b08a3f32
-   Adds existing arrow animation for aria-selected=true in fancy CSS

## [[v2.3.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.3.1)

### Fixed

-   Add `dist` folder to list of Flow ignores, so Flow doesn’t error after a
    build.
-   Issue with babel helpers. Just reverted commit
    6f9f2c324a6fad4a35a84307241f4f710407f242 for now.

### Changed

-   Removed a couple of old npm scripts from the days before we introduced
    rollup to the build pipeline.
-   Upgraded a bunch of devDependencies, including Webpack which required a bit
    of a config refactor.

## [[v2.3.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.3.0)

### Changed

-   Refactored to use `unstated` for state-management instead of `mobx` +
    `mobx-react`, cutting the size of the bundle by approximately 60% 🎉.

## [[v2.2.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.2.1)

### Changed

-   Fixes mixed up filenames in the README

## [[v2.2.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.2.0)

### Added

-   Demo styles added to the bundle as two optional files:
    -   `minimal-example.css`: 'Minimal' theme - hide/show the AccordionBody
        component
    -   `fancy-example.css`: 'Fancy' theme - boilerplate styles for all
        components, as seen on our demo

## [[v2.1.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.1.0)

### Added

-   Publish flow types.

### Changed

-   Update all React components to accept arbitrary HTMLDivElement props (eg.
    'lang', 'role' etc).
-   Upgrade all dev-dependencies except the eslint configs.
-   Replace snapshot tests with explicit assertions in AccordionItemBody and
    AccordionItemTitle.
-   Add specific assertions to tests in accordionStore.
-   Minor syntax change in AccordionItemBody

## [[v2.0.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.0.0)

Version 2.0 represents a total refactor, with a new context-based approach which
should make this library more flexible, more maintainable and more
comprehensively testable.

As this is a major release, users should expect some breaking changes - though
they should be limited to the removal of the `activeItems` prop (read more
below).

### Added

-   Exports `resetNextId`
    (https://github.com/springload/react-accessible-accordion/issues/41).

### Fixed

-   Defect where controlled components' props were overridden by
    React.Children.map
    (https://github.com/springload/react-accessible-accordion/issues/33).
-   Defect where accordion crashed with unexpected `children` types
    (https://github.com/springload/react-accessible-accordion/issues/45).
-   Defect where React Accessible Accordion's components could not be extended.
-   Defect where the `children` of `Accordion` or `AccordionItem` could not be
    arbitrary.
-   Defect where `AccordionItem` had to be a child of `Accordion` (as opposed to
    to an arbitrary-level descendant).
-   Defect where `AccordionItemBody` and `AccordionItemTitle` had to be children
    of `AccordionItem` (as opposed to arbitrary-level descendants).

### Removed:

-   🚨 Breaking change 🚨 `activeItems` property is no longer supported.

Control at the `Accordion` level (via the `activeItems` prop) and
`AccordionItem` level (via the `expanded` prop) fought against one another, and
choosing which control mechanism to give preference to would have been an
arbitrary decision - and whichever way we went, we would have had test cases
which demonstrated unusual/unpredictable behaviour. The `activeItems` mechanism
was the obvious one to remove - it was arguably the "less React-y way", and we
considered it more of a convenience than a feature. Crucially though, it fought
too hard against the new architecture of the library, and keeping it would have
prevented us enabling lots of other new features or resolving some of the issues
that our users had raised.

If you're currently using activeItems, you're upgrade path might look like this:

```diff
const items = ['Foo', 'Bar'];
const activeItems = [0];

return (
-    <Accordion activeItems={activeItems} />
+    <Accordion />
        {activeItems.forEach((item, i) => (
-            <AccordionItem key={item}>{item}</AccordionItem>
+            <AccordionItem key={item} expanded={activeItems.includes(i)}>{item}</AccordionItem>
        )}
    </Accordion>
);
```

Please don't hesitate to reach out to one of the maintainers (or raise an issue)
if you're having trouble upgrading - we're happy to help!

## [[v1.0.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v1.0.1)

-   Renders predictable `id`
    attributes.(https://github.com/springload/react-accessible-accordion/pull/29)

## [[v1.0.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v1.0.0)

-   Replace prop-types implementation with flow-types
    (https://github.com/springload/react-accessible-accordion/pull/22) Thanks
    @ryami333 for the great contribution

NB: This version is backward compatible. It's just bumping to 1.0 to represent
maturity rather than API changes.

## [[v0.6.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.6.0)

-   Improved accessibility support (Following
    https://github.com/springload/react-accessible-accordion/pull/19)
-   Adds possibility to programmatically open
    items(https://github.com/springload/react-accessible-accordion/pull/13)
    Thanks @epotockiy for the contribution
-   Improved accessibility status on demo page
-   Documentation about accessibility for this component

## [[v0.5.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.5.0)

-   Possibility to add a CSS class to hidden blocks (Following
    https://github.com/springload/react-accessible-accordion/pull/16)
-   Githooks are executable
    (https://github.com/springload/react-accessible-accordion/pull/15)
-   Bump to Node 8 / NPM 5

## [[v0.4.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.4.0)

-   Supports React 15.5+

## [[v0.3.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.3.0)

-   No warnings when you have only one item in the accordion

## [[v0.2.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.2.0)

-   Possibility to have extra blocks in AccordionItem

## [[v0.1.2]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.1.2)

-   Accordion mode / Collapse mode
-   Possibility to pre expand items
-   100% coverage with unit tests
-   Possibility to customise CSS.
-   Clean CSS for the demo/github page.

## [[vx.y.z]](https://github.com/springload/Quicktube.js/releases/tag/x.y.z) Template from http://keepachangelog.com/

### Added

-   Something was added to the API / a new feature was introduced.

### Changed

### Fixed

### Removed
