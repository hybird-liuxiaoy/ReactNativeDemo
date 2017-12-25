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
});

test('test mock property', () => {
    const myMock = jest.fn();
    const a = new myMock();
    const b = {};
    const bound = myMock.bind(b);
    bound();
    // This function was instantiated exactly twice
    expect(myMock.mock.instances.length).toBe(2);

    // The object returned by the first instantiation of this function
    // had a `name` property whose value was set to 'test'
    // expect(myMock.mock.instances[0].name).toEqual('test');
});

test('test mock return values', () => {
    const myMock = jest.fn();
    myMock.mockReturnValueOnce(10)
        .mockReturnValueOnce('x')
        .mockReturnValue(true);
    console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true
    // expect(myMock()).toBe(10);
    // expect(myMock()).toBe('x');
    // expect(myMock()).toBe(true);

    const mock = jest.fn();
    mock.mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
    forEach([1,2],mock)
    expect(mock.mock.instances.length).toBe(2);
    expect(mock.mock.calls.length).toBe(2);
    expect(mock.mock.calls[0][0]).toBe(1);
    expect(mock.mock.calls[1][0]).toBe(2);
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
});
