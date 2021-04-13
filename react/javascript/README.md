# Cucumber-React

Cucumber-React is a set of React components for rendering Gherkin documents and Cucumber results.

## Screenshot

![Examples Tables](screenshots/examples-tables.png)

## Usage

The source code for screenshots above is:

```jsx
<Wrapper envelopes={envelopes}>
  <GherkinDocumentList />
</Wrapper>
```

The [`<GherkinDocumentList>`](src/components/app/GherkinDocumentList.tsx) React component,
is an accordion of [`<GherkinDocument>`](src/components/gherkin/GherkinDocument.tsx).

The `<GherkinDocument>` React component and any component nested within it (such as [`<Scenario>`](src/components/gherkin/Scenario.tsx)) can be rendered standalone.

## `<GherkinDocument>` features

The `<GherkinDocument>` React component is instantiated with a single `gherkinDocument` prop.
The value must be a [GherkinDocument](../../cucumber-messages/messages.md#io.cucumber.messages.GherkinDocument) object.
You can use the [Gherkin](../../gherkin) parser to generate a `GherkinDocument` object.

By default the `<GherkinDocument>` component will not display any coloured results, as the `GherkinDocument`
message object does not contain results, only the [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of the document. 
This is fine for simple use cases where results are not important.

To render a `<GherkinDocument>` with results and highlighted [Cucumber Expression parameters](https://cucumber.io/docs/cucumber/cucumber-expressions/) parameters it must be nested inside a 
[`<Wrapper>`](src/components/app/Wrapper.tsx) component.

## Styling

There are several ways you can apply different styling to the components.

### Built-in themes

Besides the default, we have a few other built-in themes:

- dark
- ???

You can activate one of these by wrapping your top-level usage with the `Theme` component:

```jsx
<Theme theme="dark">
  <GherkinDocument />
</Theme>
```

### Custom themes

You can also provide your own theme with a small amount of CSS. Pass the `Theme` component an appropriate name:

```jsx
<Theme theme="acme-widgets">
  <GherkinDocument />
</Theme>
```

That name will act as a suffix for a classname `cucumber-theme--acme-widgets`, against which you can override the supported [custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) values as desired. Here's the CSS that drives the built-in "dark" theme:

```css
.cucumber-theme--dark {
  --cucumber-background-color: #1d1d26;
  --cucumber-text-color: #c9c9d1;
  --cucumber-keyword-color: #d89077;
  --cucumber-parameter-color: #4caaee;
  --cucumber-tag-color: #85a658;
  --cucumber-docstring-color: #3d5e41;
}
```

### Custom styles

For more control over the styling, you can override the CSS used by individual components.

Let's say you want to do something totally different with the typography of doc strings. In your own CSS, you might write something like:

```css
.acme-docstring {
  font-weight: bold;
  font-style: italic;
  background-color: black;
  color: hotpink;
  text-shadow: 1px 1px 2px white;
  padding: 10px;
}
```

Then, you can wrap your usage in the `CustomRendering` component and provide an object that declares which class names you're going to override and what with:

```jsx
<CustomRendering support={{
  DocString: {
    docstring: 'acme-docstring'
  }
}}>
  <GherkinDocument />
</CustomRendering>
```

Some components have multiple styling hooks - e.g. the `<Tags>` component has the `tags` class name for the list, and the `tag` class name for each item. In these cases, you can provide custom class names for just the ones you want to change, and any you omit will pick up the built-in styling like normal.

### Custom rendering

To change the rendering of some components entirely, you can selectively provide your own component implementations to be used instead of the built-in ones.

Staying with the doc string example, you can use the same `CustomRendering` wrapper, but this time instead of an object with class names, you provide a React functional component, giving you full control over the rendering:

```jsx
<CustomRendering support={{
  DocString: (props) => (
    <>
      <p>I am going to render this doc string in a textarea:</p>
      <textarea>{props.docString.content}</textarea>
    </>
  )
}}>
  <GherkinDocument />
</CustomRendering>
```

## Build / hack

Install dependencies

    npm install

Run tests

    npm test

Interactive development

    npm run storybook

## Ideas

### `ScenarioList` component

A component that renders a list of scenarios (possibly from multiple files, filtered by e.g. tag). 

This component could be used to render relevant scenarios in 3rd-party tools, such as 
JIRA, Confluence and various issue trackers that support plugins.

### Link to JIRA

Configure with a regexp and url function, and tags will be rendered as JIRA issue links

### Search

Search by tag, but also by text. Could use http://elasticlunr.com/
or https://lunrjs.com/ - or it could simply perform filtering on an array of `GherkinDocument` messages.

### Search results

Each scenario displayed underneath each other, grouped by feature file. The feature description is "collapsed", 
(unless it contains the search term) but can be opened.

### Filtering / sorting

* by tag
* by duration (find slow ones)
* by status
* by recency (update timestamp) - exclude old ones
* by flickeriness

### Tag search

* Render a tag cloud for all tags
  * Size: count
  * Color: pass/fail/undefined
    
### On-demand data

For large reports (especially with screenshots) it may be too heavy to store it all in the browser.
The GUI should request data for the current document on demand. The GUI should also be able to filter
what kind of events it wants. For example, to render the initial screen.

### Server / App

It should be easy to use. Just run the app (Electron). It will create a named pipe where
it will listen. What's written here gets written straight to the React app (no websocket,
it's in the same process). This app can be fairly small.

### Rerun tests

Add a message to represent a config+cwd+env for a run, so the GUI can rerun it.
The config is essentially command line options. They can be modified in the gui.
Rerun on file change can also be set up. This just makes the whole DX simple.

### Alerts

The app could use the OS to send screen messages (autotest like)

