# 5. State Management

Date: 2022-09-04

## Status

2022-09-04 proposed

## Context

We want to explicitly decide how to manage the state within the app.
There multiple options including core react hooks, redux, mobx, jotai, and many more.

## Decision

We want to use the core react hooks for **component-local** state management and redux to manage state which is shared across *multiple components*.
For more effective and simpler development, we use Redux Toolkit (https://redux-toolkit.js.org). 

## Consequences

- additional dependency
- state should be shared via redux
- there is a learning overhead for redux and redux toolkit
