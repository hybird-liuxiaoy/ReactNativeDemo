'use strict';

export default {

    getCurrentTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month<10) month="0"+month;
        if (day<10) day="0"+day;
        return year + '-' + month + '-' + day;
    },
    parser4File(timestamp) {
        let linuxTime ;
        if (timestamp){
            linuxTime = new Date(parseInt(timestamp) * 1000);
        }else {
            linuxTime = new Date();
        }
        let Y = linuxTime.getFullYear();
        let M = linuxTime.getMonth() + 1;
        let D = linuxTime.getDate();
        let h = linuxTime.getHours();
        let m = linuxTime.getMinutes();
        let s = linuxTime.getSeconds();
        if (M<10) M="0"+M;
        if (D<10) D="0"+D;
        if (h<10) h="0"+h;
        if (m<10) m="0"+m;
        if (s<10) s="0"+s;
        return `${Y}${M}${D}-${h}:${m}:${s}`;
    },
    getCustomTime(days) {
        var now = new Date();
        var date = new Date(now.getTime() - days * 24 * 3600 * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year + '-' + month + '-' + day;
    },

    getDateOrTime(timestamp) {
        let linuxTime = new Date(parseInt(timestamp) * 1000);
        let Y = linuxTime.getFullYear();
        let M = linuxTime.getMonth() + 1;
        let D = linuxTime.getDate();
        let h = linuxTime.getHours();
        let m = linuxTime.getMinutes();
        let date = `${Y}.${M}.${D}`;
        let time = m <= 9 ? `${h}:0${m}` : `${h}:${m}`;

        var now = new Date();
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth() + 1;
        var currentDay = now.getDate();
        var currentHour = now.getHours();
        var currentMinute = now.getMinutes();
        let currentDate = `${currentYear}.${currentMonth}.${currentDay}`;
        let currentTime = `${currentHour}:${currentMinute}`;

        if (date == currentDate) {
            if (time == currentTime) {
                return '刚刚';
            } else if (((currentHour - h) * 60 - m + currentMinute) < 60) {
                // console.log(time)
                return `${(currentHour - h) * 60 - m + currentMinute }分钟前`;
            } else {
                return time;
            }
        } else {
            return date;
        }
    },

    parser(timestamp) {
        let linuxTime ;
        if (timestamp){
            linuxTime = new Date(parseInt(timestamp) * 1000);
        }else {
            linuxTime = new Date();
        }
        let Y = linuxTime.getFullYear();
        let M = linuxTime.getMonth() + 1;
        let D = linuxTime.getDate();
        let h = linuxTime.getHours();
        let m = linuxTime.getMinutes();
        let s = linuxTime.getSeconds();
        if (M<10) M="0"+M;
        if (D<10) D="0"+D;
        if (h<10) h="0"+h;
        if (m<10) m="0"+m;
        if (s<10) s="0"+s;
        return `${Y}-${M}-${D}  ${h}:${m}:${s}`;
    },

    local(timestamp) {
        let linuxTime ;
        if (timestamp){
            linuxTime = new Date(parseInt(timestamp) * 1000);
        }else {
            linuxTime = new Date();
        }
        let Y = linuxTime.getFullYear();
        let M = linuxTime.getMonth() + 1;
        let D = linuxTime.getDate();
        let h = linuxTime.getHours();
        let m = linuxTime.getMinutes();
        let s = linuxTime.getSeconds();
        if (M<10) M="0"+M;
        if (D<10) D="0"+D;
        if (h<10) h="0"+h;
        if (m<10) m="0"+m;
        if (s<10) s="0"+s;
        return `${Y}年${M}月${D}日  ${h}:${m}:${s}`;
    },

    changeToTime(timestamp) {
        let linuxTime = new Date(parseInt(timestamp) * 1000);
        let Y = linuxTime.getFullYear();
        let M = linuxTime.getMonth() + 1;
        let D = linuxTime.getDate();
        let h = linuxTime.getHours();
        let m = linuxTime.getMinutes();
        let s = linuxTime.getSeconds();
        m = m <= 9 ? '0' + m : m;
        s = s <= 9 ? '0' + s : s;
        return `${Y}.${M}.${D}  ${h}:${m}:${s}`;
    },
};
