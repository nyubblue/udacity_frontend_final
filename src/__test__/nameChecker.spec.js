import { checkForName } from "../client/js/nameChecker";

const testData = [{input: '', expected: false}, {input: '123', expected: true}, {input: 'Hello', expected: true}];

testData.forEach((item) => {
    describe("Validate function", () => {
        test(`Enter a "${item.input}"`, () => {
          expect(checkForName(item.input)).toBe(item.expected);
        });
      });
})