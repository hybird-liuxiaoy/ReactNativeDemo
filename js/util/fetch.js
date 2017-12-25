'use strict';

var fetchMgr = {
    get(url,callback){
        fetch(url).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.text();
            } else
                throw new Error('Server Exception ' + response.status || '');
        }).then(json=>{
            callback(null, json);
        }).catch(e=>{
            callback({error: 'fail', message: '当前请求发生异常：'+ e});
        });
    },
    getJson(url,callback){
        fetch(url).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else
                throw new Error('Server Exception ' + response.status || '');
        }).then(json=>{
            callback(null, json);
        }).catch(e=>{
            callback({error: 'fail', message: '当前请求发生异常：'+ e});
        });
    },
};

export default fetchMgr;
