# PNPM Commands

1. The Core Isolation Command
   Run this from the Root of the Hub. Replace @hub/ai-text-summarizer-backend with the name defined in that project's package.json.

```bash
## Installs only the Hub root dependencies AND the specific project dependencies
pnpm install --filter . --filter "@hub/ai-text-summarizer-backend"
```

--filter .: Ensures the Hub's root tools (like typescript or jq if they are in the root) are installed.

--filter "@hub/ai-text-summarizer-backend": Only looks at the package.json inside that specific suite folder.

1. Running a Command in Isolation

If you want to run the tests for just one project without triggering the others:

```bash
pnpm --filter "@hub/ai-text-summarizer-backend" test
```

1. Adding a Dependency to a Specific Project

```bash
pnpm add axios --filter "@hub/ai-text-summarizer-backend"
pnpm add axios --filter "@hub/ai-text-summarizer-frontend"
pnpm add axios --filter "@hub/rick-and-morty-graphs-and-stuff"
```

1. Adding a Dependencie to a root Project

```bash
pnpm add -wD wait-on
```

`-w`: Stands for --workspace-root. This tells pnpm to ignore the sub-packages and put it in the top-level package.json.

`-D`: Saves it as a devDependencies.
