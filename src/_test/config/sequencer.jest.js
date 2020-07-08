const Sequencer = require('@jest/test-sequencer').default;

/**
 * This class allow to order alphabetically the test suite
 * For use just set the "testSequencer" option in the package.json whit this file ("testSequencer": "../src/test/sequencer.jest.ts")
 */
class CustomSequencer extends Sequencer {
  /**
   * allow to order alphabetically the test suite
   * @param {any} tests the test you want to sort
   * @return {any} the test sorted alphabetically
   */
  sort(tests) {
    // The test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

module.exports = CustomSequencer;
