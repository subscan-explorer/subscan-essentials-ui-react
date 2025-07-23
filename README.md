# subscan-essentials-ui-react

React UI for Subscan Essentials

## Demo

A demo of the application is available at [https://essentials-stg.vercel.app/](https://essentials-stg.vercel.app/)

## Features

* View Substrate/Smart Contract block and extrinsic data from Substrate-based chains.
* Responsive design for use on desktop and mobile devices.
* Comprehensive testing suite using Jest and React Testing Library.

## Custom Theme Guide

This project utilizes Hero UI's theming system for consistent styling across the application. The theming system is based on TailwindCSS and allows for extensive customization.

### Customizing the Theme

You can customize the theme by modifying the `tailwind.config.js` file. The Hero UI plugin is already configured, allowing you to:

1. Define custom colors
2. Create light and dark themes
3. Customize component appearances

```javascript
// Example of customizing theme in tailwind.config.js
const {heroui} = require("@heroui/react");

module.exports = {
  // ... other configs
  plugins: [
    heroui({
      themes: {
        '${networkNode}': {
          extend: 'dark',
          colors: {
            primary: {
              50: '#3B096C',
              100: '#520F83',
              200: '#7318A2',
              300: '#9823C2',
              400: '#c031e2',
              500: '#DD62ED',
              600: '#F182F6',
              700: '#FCADF9',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#DD62ED',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
    // Other plugins
  ],
}
```

```javascript
// Example of customizing theme in layout.tsx, corresponding theme name will be applied in className

<Providers>
    <div className="${networkNode} flex flex-col min-h-screen">
        <div className="flex-grow">
        {children}
        </div>
        <Footer />
    </div>
</Providers>

```

### Network Branding Assets

#### Network Logo

Network logos should be placed in the `/public/images/network/${networkNode}` directory with the following specifications:

* File Format: PNG format (transparent background recommended)
* Design Style: Both circular or square logos are acceptable, but visual clarity should be ensured

Currently available network logos:

* `assethub-westend`
* `paseo`
* `bifrost-testnet`

#### Network Banner Images

Network banner images should be placed in:

* Path: `/public/images/network/${networkNode}`
* File Format: PNG or JPG
* Banner images will be displayed at the top of network pages
* Design Style: Should reflect the network's characteristics and may include the network name, logo, and related visual elements

#### Adding New Network Images

1. Prepare image files according to the specifications above
2. Add the network logo to `/public/images/network/${networkNode}/logo.png`
3. Update the network banner to `/public/images/network/${networkNode}/banner.png`
4. The application will automatically detect and display the corresponding images based on the network identifier

## Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itering/subscan-essentials-ui-react.git
   ```

1. Navigate to the project directory:

   ```bash
   cd subscan-essentials-ui-react
   ```

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Tests

```bash
npm test
# or
yarn test
```

To run tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

To generate a test coverage report:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## Helm Chart Deployment

For Kubernetes production deployments, it is recommended to use the official [Subscan Essentials Helm Chart](https://github.com/subscan-explorer/subscan-essentials-chart).

### Quick Start

1. Add the Helm repository:

   ```bash
   helm repo add subscan https://subscan-explorer.github.io/subscan-essentials-chart/
   helm repo update
   ```

2. Install (modify `values.yaml` as needed for your environment):

   ```bash
   helm install subscan-essentials subscan/subscan-essentials-chart -f example/subscan-essentials/values.yaml
   ```

3. Upgrade:

   ```bash
   helm upgrade subscan-essentials subscan/subscan-essentials-chart -f example/subscan-essentials/values.yaml
   ```

For advanced configuration and environment variable details, please refer to the [subscan-essentials-chart repository README](https://github.com/subscan-explorer/subscan-essentials-chart).

> This Helm Chart supports multi-network (mainnet/testnet), custom images, resource limits, Ingress (traefik/ingress-nginx), database and cache services, and other production-grade deployment requirements.

## Linting and Formatting

To check for linting and formatting errors:

```bash
npm run lint
npm run prettier
```

To automatically fix linting and formatting errors:

```bash
npm run lint-fix
npm run prettier-fix
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
