//num
const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('two plus two', () => {
    expect(2 + 2).toBeGreaterThan(3);
    expect(2 + 2).toBeGreaterThanOrEqual(3.5);
    expect(2 + 2).toBeLessThan(5);
    expect(2 + 2).toBeLessThanOrEqual(4.5);
});
//float
test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});


//string
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});


//array
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});


//object
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
    expect(data).not.toBe({one: 1, two: 2});//===
    expect(data).toBe(data);

    expect(null).toBeNull();// not undefined
    expect(undefined).toBeUndefined();
    expect(null).toBeDefined();
    expect(data).toBeDefined();

    expect(1).toBeTruthy();
    expect(2).toBeTruthy();
    expect("abcd").toBeTruthy();
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeFalsy();
    expect(0).toBeFalsy();
});


//throw error
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});


//callbacks
function doSomething(c) {
    c('peanut butter');
}

test('test callback', done => {
    function callback(data) {
        expect(data).toBe('peanut butter');
        done();//note this
    }
    doSomething(callback);
});

//promises
function doPromise() {
    return new Promise((resolve, reject) => {
        resolve('peanut butter');
    });
}
function doPromiseError() {
    return new Promise((resolve, reject) => {
        reject('error');
    });
}

test('test promise', () => {
    expect.assertions(1);
    return doPromise().then(data => {
        expect(data).toBe('peanut butter');
    });
});

test('test promise fails with an error', () => {
    expect.assertions(1);
    return doPromiseError().catch(e =>
        expect(e).toMatch('error')
    );
});

//.resolves / .rejects  available in Jest 20.0.0+
test('test promise resolves', () => {
    expect.assertions(1);
    return expect(doPromise()).resolves.toBe('peanut butter');
});

test('test promise rejects', () => {
    expect.assertions(1);
    return expect(doPromiseError()).rejects.toMatch('error');
});

//Async/Await
test('test promise use async/await', async () => {
    expect.assertions(1);
    const data = await doPromise();
    expect(data).toBe('peanut butter');
});

test('test promise failed use async/await', async () => {
    expect.assertions(1);
    try {
        await doPromiseError();
    } catch (e) {
        expect(e).toMatch('error');
    }
});

//available in Jest 20.0.0+
test('test promise resolves use async/await', async () => {
    expect.assertions(1);
    await expect(doPromise()).resolves.toBe('peanut butter');
});
//available in Jest 20.0.0+
test('test promise rejects use async/await', async () => {
    expect.assertions(1);
    await expect(doPromiseError()).rejects.toMatch('error');
});











