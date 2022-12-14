# Example: React-Native Tic Tac Toe

This repository is an example react-native based implementation of the game "tic tac toe".

## Specification And Concept

The specification is written in form of a living documentation (see adr [docs/adr/0004-testing-tools.md](docs/adr/0004-testing-tools.md)).
The specification lives in `/features`.

The basic UX concept lives in [docs/ux_concept.md](docs/ux_concept.md).

## Architecture Decisions Records (ADR)

Important decisions are logged using [architecture decisions records (ADR)](https://adr.github.io).
The adrs live in the directory `docs/adr` (see `.adr.json` for configuration).

Create a new adr:
`npm run adr-new "<title>"`

Related npm scripts:
 - `npm run adr-list`: list all ADRs
 - `npm run adr-export`: exports ADRs to html (`export.hmtl`)

## Code Quality

- Eslint and prettier  (see [docs/adr/0003-use-eslint-and-prettier.md](docs/adr/0003-use-eslint-and-prettier.md)).
- Check code quality: `npm run eslint`
