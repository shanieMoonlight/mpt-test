export default {
  displayName: 'mpt-test',
  preset: './jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: './coverage/mpt-test',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  // Allow transforming ESM `.mjs` files and specific ESM packages inside node_modules.
  // This lets Jest transform Angular's fesm2022 `.mjs` files and other modern ESM packages.
  // Temporarily allow transforming node_modules so ESM `.mjs` and related packages
  // are properly transformed by `jest-preset-angular`. This can be narrowed later
  // if performance becomes an issue.
  transformIgnorePatterns: [],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)',
  ],
};
