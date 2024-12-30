# E2E Login Test with Playwright using typescript

This repository contains an **end-to-end (E2E) test automation framework** built using [Playwright](https://playwright.dev/) and TypeScript. The framework is designed to test the login  functionalities of the [SauceDemo](https://www.saucedemo.com) website, providing modularity and scalability for production-grade automation.

## Features

- **Page Object Model (POM)**: Encapsulates web page elements and actions for reusability.
- **Environment Configuration**: Supports multiple environments using GitHub Actions.
- **Modern CI/CD**: Integrated GitHub Actions for seamless test execution.
- **Cross-Browser Support**: Tests run on Chromium, Firefox, and WebKit.
- **Detailed Reporting**: Playwright's trace and video recordings for test analysis.

## Prerequisites

Before running the tests, ensure the following are installed:

- Node.js (v16 or higher)
- npm (Node package manager)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mohaiminul-shovon/playwright-typescript-project.git
cd playwright-typescript-project
npm install
```
## Running Tests Locally
Set environment variables for the application URLs in .env:
```bash
LOGIN_URL=https://www.saucedemo.com
INVENTORY_URL=https://www.saucedemo.com/inventory.html
```
## Run tests:
```bash
npm run test
```
## Key Scripts
- Run Tests: `npm run test`
- Debug Tests: `npm run test:debug`
- Install Browsers: `npx playwright install`

## GitHub Actions Workflow
The project includes a CI pipeline that:
- Installs dependencies.
- Installs Playwright browsers.
- Executes Playwright tests.
- Provides results and trace files for debugging.

## Contributing
Feel free to fork this repository, make improvements, and create pull requests. Contributions are always welcome!

## License
This project is licensed under the MIT License. See the LICENSE file for details.