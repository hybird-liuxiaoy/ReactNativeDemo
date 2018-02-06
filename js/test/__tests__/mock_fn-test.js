function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

test('test mock function', () => {
    const mockCallback = jest.fn();
    forEach([0, 1], mockCallback);

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    expect(mockCallback.mock.instances.length).toBe(2);
    expect(mockCallback.mock.instances[0]).toBeUndefined();
    expect(mockCallback.mock.instances[1]).toBeUndefined();


    const mockCallback2 = jest.fn();
    mockCallback2(1, 2);
    mockCallback2(42, 22);
    // The mock function was called at least once
    expect(mockCallback2).toBeCalled();

    // The mock function was called at least once with the specified args
    // expect(mockCallback2).toBeCalledWith(1, 2);

    // The last call to the mock function was called with the specified args
    expect(mockCallback2).lastCalledWith(42, 22);

    // All calls and the name of the mock is written as a snapshot
    expect(mockCallback2).toMatchSnapshot();


    // The mock function was called at least once
    expect(mockCallback2.mock.calls.length).toBeGreaterThan(0);

    // The mock function was called at least once with the specified args
    // expect(mockCallback2.mock.calls).toContain([1, 2]);

    // The last call to the mock function was called with the specified args
    expect(mockCallback2.mock.calls[mockCallback2.mock.calls.length - 1]).toEqual([
        42,
        22,
    ]);

    // The first arg of the last call to the mock function was `42`
    // (note that there is no sugar helper for this specific of an assertion)
    expect(mockCallback2.mock.calls[mockCallback2.mock.calls.length - 1][0]).toBe(42);

    // A snapshot will check that a mock was invoked the same number of times,
    // in the same order, with the same arguments. It will also assert on the name.
    expect(mockCallback2.mock.calls).toEqual([[1, 2], [42, 22]]);
    // expect(mockCallback2.mock.getMockName()).toBe('a mock name');
});

test('test mock property', () => {
    const myMock = jest.fn();
    const a = new myMock();
    const b = {name: 'test'};
    const bound = myMock.bind(b);
    bound();
    // This function was instantiated exactly twice
    expect(myMock.mock.instances.length).toBe(2);

    // The object returned by the first instantiation of this function
    // had a `name` property whose value was set to 'test'
    expect(myMock.mock.instances[1].name).toEqual('test');
});

test('test mock return values', () => {
    const myMock = jest.fn();
    myMock.mockReturnValueOnce(10)
        .mockReturnValueOnce('x')
        .mockReturnValue(true);
    // console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true
    expect(myMock()).toBe(10);
    expect(myMock()).toBe('x');
    expect(myMock()).toBe(true);
    expect(myMock()).toBe(true);

    const mock = jest.fn();
    mock.mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
    forEach([1, 2], mock);
    expect(mock.mock.instances.length).toBe(2);
    expect(mock.mock.calls.length).toBe(2);
    expect(mock.mock.calls[0][0]).toBe(1);
    expect(mock.mock.calls[1][0]).toBe(2);

    const myObj = {
        myMethod: jest.fn().mockReturnThis(),
    };
    // is the same as
    const otherObj = {
        myMethod: jest.fn(function() {
            return this;
        }),
    };
});

test('test mock implementations', () => {
    let myMock = jest.fn(cb => cb(null, true));
    myMock((err, val) => console.log(val));
    // > true
    myMock((err, val) => console.log(val));
    // > true

    myMock = jest.fn()
        .mockImplementationOnce(cb => cb(null, true))
        .mockImplementationOnce(cb => cb(null, false));
    myMock((err, val) => console.log(val));
    // > true
    myMock((err, val) => console.log(val));
    // > false

    const myMockFn = jest
        .fn(() => 'default')
        .mockImplementationOnce(() => 'first call')
        .mockImplementationOnce(() => 'second call');

    console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
    // > 'first call', 'second call', 'default', 'default'

});

//available in Jest 22.0.0+
test('test mock names', () => {
    const myMockFn = jest
        .fn()
        .mockReturnValue('default')
        .mockImplementation(scalar => 42 + scalar)
        .mockName('add42');
    expect(myMockFn(1)).toBe(43);
});
