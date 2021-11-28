# website-bp

Website for UW Blueprint.

Currently in development!

This project was generated with [superplate](https://github.com/pankod/superplate).

## Project Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/)
   framework
2. Service: [Netlify](https://www.netlify.com/) for deployment

## Local Dependencies

1. [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Run Locally

Reset your database on Heroku and then deploy your database schema run (one-time):

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

## License

MIT
