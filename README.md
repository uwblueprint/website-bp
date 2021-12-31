# website-bp

Website for UW Blueprint.

Currently in development!

This project was generated with [superplate](https://github.com/pankod/superplate).

## Project Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/)
   framework
2. Service: [Netlify](https://www.netlify.com/) for deployment

Please see [Blueprint Notion](https://www.notion.so/uwblueprintexecs/Website-Revamp-894519a7c3a34a419644df8b06e0e30e) for complete list of documentation.

## Local Dependencies

1. [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Run Locally

### Running the development server.

```bash
# Install dependencies
yarn
# Run locally
yarn dev
```

### Building for production.

```bash
    yarn build
```

### Running the production server.

```bash
    yarn start
```

## Development

Linters run automatically as a pre-commit hook on edited `.js, .jsx, .ts, .tsx` files you edit and commit

## Deployment

Deployments occur automatically on push to main branch and any PRs through [Netlify](https://www.netlify.com/).

Deployment Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/e3c6d294-8df3-4841-b171-7d5e5782d9ec/deploy-status)](https://app.netlify.com/sites/uwblueprint/deploys)

## License

[MIT](LICENSE)
