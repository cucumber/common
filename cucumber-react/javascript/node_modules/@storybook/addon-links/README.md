# Story Links Addon

The Storybook Links addon can be used to create links that navigate between stories in [Storybook](https://storybook.js.org).

[Framework Support](https://github.com/storybookjs/storybook/blob/master/ADDONS_SUPPORT.md)

## Getting Started

Install this addon by adding the `@storybook/addon-links` dependency:

```sh
yarn add -D @storybook/addon-links
```

First configure it as an addon by adding it to your addons.js file (located in the Storybook config directory).

```js
import '@storybook/addon-links/register';
```

Then you can import `linkTo` in your stories and use like this:

```js
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

storiesOf('Button', module)
  .add('First', () => (
    <button onClick={linkTo('Button', 'Second')}>Go to "Second"</button>
  ))
  .add('Second', () => (
    <button onClick={linkTo('Button', 'First')}>Go to "First"</button>
  ));
```

Have a look at the linkTo function:

```js
import { linkTo } from '@storybook/addon-links'

linkTo('Toggle', 'off')
linkTo(() => 'Toggle', () => 'off')
linkTo('Toggle') // Links to the first story in the 'Toggle' kind
```

With that, you can link an event in a component to any story in the Storybook.

-   First parameter is the story kind name (what you named with `storiesOf`).
-   Second (optional) parameter is the story name (what you named with `.add`). 
    If the second parameter is omitted, the link will point to the first story in the given kind.

You can also pass a function instead for any of above parameter. That function accepts arguments emitted by the event and it should return a string:

```js
import { storiesOf } from '@storybook/react';
import { LinkTo, linkTo } from '@storybook/addon-links';

storiesOf('Select', module)
  .add('Index', () => (
    <select value="Index" onChange={linkTo('Select', e => e.currentTarget.value)}>
      <option>Index</option>
      <option>First</option>
      <option>Second</option>
      <option>Third</option>
    </select>
  ))
  .add('First', () =>  <LinkTo story="Index">Go back</LinkTo>)
  .add('Second', () => <LinkTo story="Index">Go back</LinkTo>)
  .add('Third', () => <LinkTo story="Index">Go back</LinkTo>);
```

## hrefTo function

If you want to get an URL for a particular story, you may use `hrefTo` function. It returns a promise, which resolves to string containing a relative URL:

```js
import { storiesOf } from '@storybook/react';
import { hrefTo } from '@storybook/addon-links';
import { action } from '@storybook/addon-actions';

storiesOf('Href', module)
  .add('log', () => {
    hrefTo('Href', 'log').then(action('URL of this story'));

    return <span>See action logger</span>;
  });
```

## withLinks decorator

`withLinks` decorator enables a declarative way of defining story links, using data attributes.
Here is an example in React, but it works with any framework:

```js
import { storiesOf } from '@storybook/react'
import { withLinks } from '@storybook/addon-links'

storiesOf('Button', module)
  .addDecorator(withLinks)
  .add('First', () => (
    <button data-sb-kind="OtherKind" data-sb-story="OtherStory">Go to "OtherStory"</button>
  ))
```

## LinkTo component (React only)

One possible way of using `hrefTo` is to create a component that uses native `a` element, but prevents page reloads on plain left click, so that one can still use default browser methods to open link in new tab.
A React implementation of such a component can be imported from `@storybook/addon-links` package:

```js
import { storiesOf } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';

storiesOf('Link', module)
  .add('First', () => (
    <LinkTo story="Second">Go to Second</LinkTo>
  ))
  .add('Second', () => (
    <LinkTo story="First">Go to First</LinkTo>
  ));
```

It accepts all the props the `a` element does, plus `story` and `kind`. It the `kind` prop is omitted, the current kind will be preserved.

```js
<LinkTo
  kind="Toggle"
  story="off"
  target="_blank"
  title="link to second story"
  style={{color: '#1474f3'}}
>Go to Second</LinkTo>
```

To implement such a component for another framework, you need to add special handling for `click` event on native `a` element. See [`RoutedLink` sources](https://github.com/storybookjs/storybook/blob/master/lib/components/src/navigation/routed_link.js#L4-L9) for reference. 
