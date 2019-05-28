'use strict';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

const KEY_USER = 'user';
const KEY_ADMIN = 'admin';

class LocalStorage {

    constructor() {
        const self = this;
        self.storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: null,
            enableCache: true
        });
    }

    save(key, data) {
        const self = this;
        self.storage.save({
            key: key,
            rawData: data
        });
    }

    remove(key) {
        const self = this;
        self.storage.remove({
            key: key
        });
    }

    load(key, callback) {
        const self = this;
        self.storage.load({
            key: key
        }).then(data => {
            if (callback) {
                callback(null, data);
            }
        }).catch(err => {
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
                default:
                // console.log(err);
            }
            if (callback) {
                callback({error: 'fail', message: err});
            }
        });
    }
}

const localStorage = new LocalStorage();
export default class LocalData {
    static save(key, data) {
        localStorage.save(key, data);
    }

    static remove(key) {
        localStorage.remove(key);
    }

    static load(key, callback) {
        localStorage.load(key, callback);
    }

    static saveUser(data) {
        localStorage.save(KEY_USER, data);
    }

    static removeUser() {
        localStorage.remove(KEY_USER);
    }

    static loadUser(callback) {
        localStorage.load(KEY_USER, callback);
    }

    static saveAdmin(data) {
        localStorage.save(KEY_ADMIN, data);
    }

    static loadAdmin(callback) {
        localStorage.load(KEY_ADMIN, callback);
    }
};
