/**
* @author Eneh, James Erozonachi
*
* @description entry operations pecification
*
* */
import assert from 'assert';
import newEntry from '../api/core/new-entry';

// test data for add entry module
const testCase = [
  {
    testData: {
      title: '',
      description: 'Entry description',
      conclusion: '',
    },
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry title is required' },
      }),
    },
  },
  {
    testData: {
      title: 'Entry title blahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
      description: 'Entry description',
      conclusion: '',
    },
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry title exceeds max character length of 50' },
      }),
    },
  },
  {
    testData: {
      title: 'Entry title',
      description: '',
      conclusion: '',
    },
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry description is required' },
      }),
    },
  },
  {
    testData: {
      title: 'Entry title',
      description: 'Entry description',
      conclusion: '',
    },
    expectedResult: {
      statusCode: 201,
      data: JSON.stringify({
        status: 'succeeded',
        data: { message: 'New entry created successfully' },
      }),
    },
  },
];
describe('Entry Specification', () => {
  // add entry module test
  describe('#newEntry()', () => {
    testCase.forEach((entry) => {
      it(`should return ${entry.expectedResult}`, () => {
        assert.deepStrictEqual(newEntry(entry.testData, []), entry.expectedResult);
      });
    });
  });
});
