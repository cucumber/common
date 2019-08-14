# Cucumber-React

Cucumber-React is a set of React components for rendering Gherkin documents and Cucumber results.

## Build / hack

You should do a full build of the monorepo first, as this library depends on other
libraries in the monorepo. Then:

    npm install
    npm run storybook

## Ideas

### `ScenarioList` component

A component that renders a list of scenarios (possibly from multiple files, filtered by e.g. tag). 

This component could be used to render relevant scenarios in 3rd-party tools, such as 
JIRA, Confluence and various issue trackers that support plugins.

### Link to JIRA

Configure with a regexp and url function, and tags will be rendered as JIRA issue links

## Search

Search by tag, but also by text. Could use http://elasticlunr.com/
or https://lunrjs.com/

## Search results

Each scenario displayed underneath each other, grouped by feature file. The feature description is "collapsed", 
(unless it contains the search term) but can be opened.

## Filtering / sorting

* by tag
* by duration (find slow ones)
* by status
* by recency (update timestamp) - exclude old ones
* by flickeriness

## Tag search

* Render a tag cloud for all tags
  * Size: count
  * Color: pass/fail/undefined
    
## On-demand data

For large reports (especially with screenshots) it may be too heavy to store it all in the browser.
The GUI should request data for the current document on demand. The GUI should also be able to filter
what kind of events it wants. For example, to render the initial screen.

## Server / App

It should be easy to use. Just run the app (Electron). It will create a named pipe where
it will listen. What's written here gets written straight to the React app (no websocket,
it's in the same process). This app can be fairly small.

## Rerun tests
Add a message to represent a config+cwd+env for a run, so the GUI can rerun it.
The config is essentially command line options. They can be modified in the gui.
Rerun on file change can also be set up. This just makes the whole DX simple.

## Alerts

The app could use the OS to send screen messages (autotest like)

