const timerGame = function (callback) {
    console.log('Ready....go!');
    setTimeout(() => {
        console.log('Times up -- stop!');
        callback && callback();
    }, 1000);
};

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
    timerGame();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test('calls the callback after 1 second', () => {
    const callback = jest.fn();

    timerGame(callback);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});


function infiniteTimerGame(callback) {
    console.log('Ready....go!');

    setTimeout(() => {
        console.log('Times up! 10 seconds before the next game starts...');
        callback && callback();

        // Schedule the next game in 10 seconds
        setTimeout(() => {
            infiniteTimerGame(callback);
        }, 10000);
    }, 1000);
}

test('schedules a 10-second timer after 1 second', () => {
    const callback = jest.fn();

    infiniteTimerGame(callback);

    // At this point in time, there should have been a single call to
    // setTimeout to schedule the end of the game in 1 second.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Fast forward and exhaust only currently pending timers
    // (but not any new timers that get created during that process)
    jest.runOnlyPendingTimers();

    // At this point, our 1-second timer should have fired it's callback
    expect(callback).toBeCalled();

    // And it should have created a new timer to start the game over in
    // 10 seconds
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
});

// renamed from runTimersToTime to advanceTimersByTime in Jest 22.0.0
it('calls the callback after 1 second via advanceTimersByTime', () => {
    const callback = jest.fn();

    timerGame(callback);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runTimersToTime(1000);

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});


// More to see https://github.com/facebook/jest/tree/master/examples/timer
