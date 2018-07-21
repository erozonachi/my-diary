/**
* @author Eneh, James Erozonachi
*
* @description entry operations pecification
*
* */
import assert from 'assert';
import newEntry from '../api/core/new-entry';
import fetchAllEntries from '../api/core/all-entries';
import fetchSingleEntry from '../api/core/single-entry';
import modifyEntry from '../api/core/modify-entry';

// test data and expected result for add entry module
const testCase1 = [
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
// test data and expected result for fetch single entry module
const testCase2 = [
  {
    testData: null,
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry ID is required' },
      }),
    },
  },
  {
    testData: 'rtrtykj',
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Invalid entry ID' },
      }),
    },
  },
  {
    testData: -1,
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry ID cannot be a negative number' },
      }),
    },
  },
  {
    testData: 1,
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 404,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'ID out of range! No entry found for the specified Id' },
      }),
    },
  },
  {
    testData: 0,
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 200,
      data: JSON.stringify({
        status: 'succeeded',
        data: {
          title: 'some title',
          description: 'some description',
          conclusion: 'some conclusion',
          createdAt: '2018/07/20 01:25:07',
        },
      }),
    },
  },
];
// test data and expected result for modify entry module
const testCase3 = [
  {
    testData: {
      id: null,
      entry: {
        title: 'Entry title',
        description: 'Entry description',
        conclusion: '',
      },
    },
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry ID is required' },
      }),
    },
  },
  {
    testData: {
      id: 'gdhsjs',
      entry: {
        title: 'Entry title',
        description: 'Entry description',
        conclusion: '',
      },
    },
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Invalid entry ID' },
      }),
    },
  },
  {
    testData: {
      id: -1,
      entry: {
        title: 'Entry title',
        description: 'Entry description',
        conclusion: '',
      },
    },
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 400,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'Entry ID cannot be a negative number' },
      }),
    },
  },
  {
    testData: {
      id: 0,
      entry: {
        title: '',
        description: 'Entry description',
        conclusion: '',
      },
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
      id: 0,
      entry: {
        title: 'Entry title blahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
        description: 'Entry description',
        conclusion: '',
      },
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
      id: 0,
      entry: {
        title: 'Entry title',
        description: '',
        conclusion: '',
      },
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
      id: 1,
      entry: {
        title: 'Entry title',
        description: 'Entry description',
        conclusion: '',
      },
    },
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 404,
      data: JSON.stringify({
        status: 'failed',
        data: { message: 'ID out of range! No entry found for the specified Id' },
      }),
    },
  },
  {
    testData: {
      id: 0,
      entry: {
        title: 'Entry title',
        description: 'Entry description',
        conclusion: '',
      },
    },
    store: [{
      title: 'some title',
      description: 'some description',
      conclusion: 'some conclusion',
      createdAt: '2018/07/20 01:25:07',
    }],
    expectedResult: {
      statusCode: 200,
      data: JSON.stringify({
        status: 'succeeded',
        data: {
          message: 'Entry modified successfully',
        },
      }),
    },
  },
];
// Expected result for fetch all entries module
const getAllExpectedResult = {
  statusCode: 200,
  data: JSON.stringify({
    status: 'succeeded',
    data: [{}],
  }),
};
describe('Entry Specification', () => {
  // add entry module test
  describe('#newEntry()', () => {
    testCase1.forEach((entry) => {
      it(`should return ${entry.expectedResult}`, () => {
        assert.deepStrictEqual(newEntry(entry.testData, []), entry.expectedResult);
      });
    });
  });
  // fetchAllEntries module test
  describe('#fetchAllEntries()', () => {
    it(`should return ${getAllExpectedResult}`, () => {
      assert.deepStrictEqual(fetchAllEntries([{}]), getAllExpectedResult);
    });
  });
  // fetchSingleEntry module test
  describe('#fetchSingleEntry()', () => {
    testCase2.forEach((entry) => {
      it(`should return ${entry.expectedResult}`, () => {
        assert.deepStrictEqual(fetchSingleEntry(entry.testData, entry.store), entry.expectedResult);
      });
    });
  });
  // modifyEntry module test
  describe('#modifyEntry()', () => {
    testCase3.forEach((entry) => {
      it(`should return ${entry.expectedResult}`, () => {
        assert.deepStrictEqual(modifyEntry(entry.testData.id, entry.testData.entry, entry.store),
          entry.expectedResult);
      });
    });
  });
});
