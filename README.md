
# Playwright Framework

## Folder Structure
```
project-root/
├── tests/
│   ├── e2e/
│   │   ├── test.spec.js
│   └── fixtures/
│       └── testData.json
├── pages/
│   ├── loginPage.js
│   └── homePage.js
├── utils/
│   ├── allureReporter.js
│   └── dataHelper.js
├── playwright.config.js
├── package.json
└── README.md

```

## Project Setup - From scratch

```bash
npm init -y
npm install playwright @playwright/test
npm install allure-playwright allure-commandline --save-dev
npm install dotenv
npm install @slack/web-api

# copy over files like config, and other js
# draft up test cases, modify test data
```

## Execute - this project

```bash
npx playwright install
npm install
#update testData.json
npm run test
npm run report
```

## Additional Options to Setup

* Environment Variables: Use dotenv for sensitive data.
* CI/CD Integration: Integrate with Jenkins, GitHub Actions, or another CI/CD tool.
* Advanced Reporting: Customize Allure for screenshots, attachments, and detailed step logging.
