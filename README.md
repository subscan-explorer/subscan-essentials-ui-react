# subscan-essentials-ui-react

React UI for Subscan Essentials

## Demo

A demo of the application is available at [https://essentials-stg.vercel.app/](https://essentials-stg.vercel.app/)

## Features

* View Substrate/PVM block and extrinsic data from Substrate-based chains.
* Responsive design for use on desktop and mobile devices.
* Comprehensive testing suite using Jest and React Testing Library.

## Custom Theme Guide

### Network Logo

Network logos should be placed in the `/public/images/network/` directory with the following specifications:

* File Format: PNG format (transparent background recommended)
* File Naming: Should match the network identifier (e.g., `assethub-westend.png`, `paseo.png`)
* Design Style: Both circular or square logos are acceptable, but visual clarity should be ensured

Currently available network logos:

* `assethub-westend.png`
* `paseo.png`

### Network Banner Images

Network banner images should be placed in:

* Path: `/public/images/banner/`
* File Format: PNG or JPG
* Banner images will be displayed at the top of network pages
* Design Style: Should reflect the network's characteristics and may include the network name, logo, and related visual elements

### Adding New Network Images

1. Prepare image files according to the specifications above
2. Add the network logo to `/public/images/network/[network-id].png`
3. Update the network banner to `/public/images/banner/navbar.png`
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
