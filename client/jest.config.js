export default {
    preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
    testEnvironment: 'node', // Set the test environment (e.g., node or jsdom)
    moduleFileExtensions: ['ts', 'js'], // Recognize .ts and .js files
    transform: {
        '^.+\\.ts$': 'ts-jest', // Use ts-jest for transforming .ts files
    },
    testMatch: ['**/?(*.)+(spec|test).[tj]s'], // Match test files
    watchman: false,
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageReporters: ["html", "text", "text-summary", "cobertura"],
};
