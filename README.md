# baelte-cli

Create full-featured Svelte applications within seconds

> This project is in very early development stage, it's not advised to use it in production, at the moment, it's only a proof-of-concept

### Project Structure

At first, baelte file architecture may seem a bit chaotic and overcomplicated due to the fact that most of it is inherited from [plop.js](https://plopjs.com/) API, but by understanding what each part of the application does, everything gets really simple

```
baelte/
├─ src/
│  ├─ actions/
│  ├─ generators/
│  ├─ templates/
│  ├─ index.ts
│  ├─ plopfile.ts
```

- `actions` - Reusable built-in or custom utils shared across generators
- `generators` - Set of actions and prompts that generates an whole project, or part of it
- `templates` - Essential building block of actions, together, they determine the output of generators
- `index.ts` - Initialize `plop.js`
- `plopfile` - Register the generators to be used by the CLI

### Command-line usage

```
Usage:
  baelte <generator> <prompt answers>

baelte generators:
  component   Create a single Svelte component
  project     Create a minimal, fully working Svelte application
```
