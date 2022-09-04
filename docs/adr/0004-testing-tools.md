# 4. Testing Tools

Date: 2022-09-04

## Status

2022-09-04 proposed

## Context

It should be possible to test the app code with fast feedback and a sufficient level of confidence.

## Decision


- use jest as test runner due to its easy setup with expo
- use jest-cucumber to be able to define a living specification with feature-files (in gherkin syntax) which can be executed as tests against the code. This enables a quick and easy way to synchronize the specification with the code.
- use react native testing library


## Consequences

- the specification lives within in the git repo
- the specification is written in gherkin syntax in feature-files
