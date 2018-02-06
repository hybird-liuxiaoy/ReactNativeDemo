function initializeCityDatabase() {

}

function clearCityDatabase() {

}

beforeEach(() => {
    initializeCityDatabase();
});
// //if initializeCityDatabase return promise
// beforeEach(() => {
//     return initializeCityDatabase();
// });

afterEach(() => {
    clearCityDatabase();
});

// //if the database could be reused between tests
// beforeAll(() => {
//     return initializeCityDatabase();
// });
// afterAll(() => {
//     return clearCityDatabase();
// });
function isCity() {
    return true;
}

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});




