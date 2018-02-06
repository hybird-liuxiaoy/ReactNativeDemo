import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// require('react-native-mock/mock');

let fetch = jest.fn();
fetch.mockResponseSuccess = (body) => {
    fetch.mockImplementationOnce(
        () => Promise.reject({
            status: 400,
            json: () => Promise.resolve(JSON.parse(body))
        }.toString())
    )
};

fetch.mockResponseSuccessWithPromise = (body) => {
    fetch.mockImplementationOnce(
        () => ({json: () => Promise.resolve(JSON.parse(body))})
    )
};

fetch.mockResponseFailure = (body) => {
    fetch.mockImplementationOnce(
        () => Promise.resolve({json: () => Promise.resolve(JSON.parse(body))})
    )
};

fetch.mockResponseError = (error) => {
    fetch.mockImplementationOnce(
        () => Promise.reject(error)
    )
};
fetch.mockResponseSuccess({});
global.fetch = fetch;

jest.mock('Linking', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        openURL: () => {
            let temp = jest.fn();
            temp.catch = jest.fn();
            return temp
        },
        canOpenURL: jest.fn(),
        getInitialURL: jest.fn(),
    }
});

jest.mock('NativeModules', () => ({
    KeyboardObserver: {
        addListener: jest.fn(),
        removeListener: jest.fn()
    },
    UIManager: {
        setLayoutAnimationEnabledExperimental: jest.fn(),
    },
    AsyncRocksDBStorage: {
        getItem(key, callback) {
        },

        setItem(
            key, value, callback) {
        },

        removeItem(key, callback) {
        },

        mergeItem(key, value, callback) {
        },

        clear(callback) {
        },

        getAllKeys(callback) {
        },

        multiSet(keyValuePairs, callback) {
        },

        multiRemove(keys, callback) {
        },

        multiMerge(keyValuePairs, callback) {
        },
    },
    StatusBarManager: {
        HEIGHT: 44,
        setStyle() {},
        setHidden() {},
        setNetworkActivityIndicatorVisible() {},
    },
    RNDeviceInfo: {},
    RNAliPush: {
        clearBadge: jest.fn()
    }
}));
