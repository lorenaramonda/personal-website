# Lorena Ramonda

> Resume in Nuxt.js

## Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/0d2afc2b-cd8b-4606-9df1-aefcac7bfb39/deploy-status)](https://app.netlify.com/sites/lorenaramonda/deploys)

The site is deployed via Netlify, reachable at https://lorena.ramonda.me/.

## Versioning

Original code, work in progress and experiments are hosted by Gitlab.  
Final code is hosted by Github and free to consult.

### Branches

**master** Github (public) and Gitlab (private)  
**develop** Only on Gitlab (private)  
**features** Only on Gitlab (private)

### Flow

Original Git Flow with some rules:

- Every featured branch must be **squashed** into one descriptive commit before **rebasing** it into develop

## Package manager

Use [Yarn](https://yarnpkg.com/cli/install)

## Upgrade Nuxt

To upgrade Nuxt and all depencencies always run:

```bash
nuxi upgrade --force
```

Check Nuxt version: `npm view nuxt version`
