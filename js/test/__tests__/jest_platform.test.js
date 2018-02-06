
test('jest-changed-files', () => {
    const {getChangedFilesForRoots} = require('jest-changed-files');
    // print the set of modified files since last commit in the current repo
    getChangedFilesForRoots(['./'], {
        lastCommit: true,
    }).then(result => console.log(result.changedFiles));
});

test('jest-diff', () => {
    const diff = require('jest-diff');

    const a = {a: {b: {c: 5}}};
    const b = {a: {b: {c: 6}}};

    const result = diff(a, b);

    // print diff
    console.log(result);
});

test('jest-docblock', () => {
    const {parse: parseWithComments} = require('jest-docblock');

    const code = `
    /**
     * This is a sample
     *
     * @flow
     */
     
     console.log('Hello World!');
    `;

    const parsed = parseWithComments(code);

    // prints an object with two attributes: comments and pragmas.
    console.log(parsed);
});

test('jest-get-type', () => {
    const getType = require('jest-get-type');

    const array = [1, 2, 3];
    const nullValue = null;
    const undefinedValue = undefined;

    // prints 'array'
    console.log(getType(array));
    // prints 'null'
    console.log(getType(nullValue));
    // prints 'undefined'
    console.log(getType(undefinedValue));
});

test('jest-validate', () => {
    const {validate} = require('jest-validate');

    const configByUser = {
        transform: '<rootDir>/node_modules/my-custom-transform',
    };

    const result = validate(configByUser, {
        comment: '  Documentation: http://custom-docs.com',
        exampleConfig: {transform: '<rootDir>/node_modules/babel-jest'},
    });

    console.log(result);
});

test('jest-worker', () => {
    main();
});

async function main() {
    const worker = new Worker(require.resolve('./heavy_task.js'));

    // run 2 tasks in parallel with different arguments
    const results = await Promise.all([
        worker.myHeavyTask({foo: 'bar'}),
        worker.myHeavyTask({bar: 'foo'}),
    ]);

    console.log(results);
}

test('pretty-format', () => {
    const prettyFormat = require('pretty-format');

    const val = {object: {}};
    val.circularReference = val;
    val[Symbol('foo')] = 'foo';
    val.map = new Map([['prop', 'value']]);
    val.array = [-0, Infinity, NaN];

    console.log(prettyFormat(val));
});
