/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3001/", "http://localhost:3001/products"],
      startServerCommand: "pnpm start --port 3001",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 60_000,
      numberOfRuns: 3,
      settings: {
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false,
        },
        onlyCategories: ["performance", "accessibility"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./reports/lighthouse",
    },
  },
};
