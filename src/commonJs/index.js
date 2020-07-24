const common = {
    //返回上一页
    goBack: function() {
        window.history.go(-1)
    },
    // 正则验证车牌,验证通过返回true,不通过返回false
    isLicensePlate: function(str) {
        //return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳农运扫原新]{1}$)|(^[A-Z0-9]{1,9}$)|(^[A-Z]{2}[\u4E00-\u9FA5]{0,1}[A-Z0-9]{1,7}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳农运扫原新]{1}$)|(^[A-Z0-9]{1,9}[挂学警军港澳农运扫原新使]{1}$)/.test(str);
        return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(str);
    },
    //倒计时
    timeStamp: function(second_time) {
        var time = parseInt(second_time) + "秒";
        if (parseInt(second_time) > 60) {
            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分" + second + "秒";

            if (min > 60) {
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt(parseInt(second_time / 60) / 60);
                time = hour + "小时" + min + "分" + second + "秒";

                if (hour > 24) {
                    hour = parseInt(parseInt(second_time / 60) / 60) % 24;
                    var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
                    time = day + "天" + hour + "小时" + min + "分" + second + "秒";
                }
            }
        }
        return time;
    },
    //判断是否是微信浏览器的函数
    isWeiXin: function() {
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    timestampToTime: function(timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        // var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());

        var strDate = Y + M + D + h + m;
        return strDate;

    },
    //比较两个日期的大小
    tabDate: function(date1, date2) {
        var oDate1 = new Date(date1.replace(/\-/g, '/'));
        var oDate2 = new Date(date2.replace(/\-/g, '/'));
        if (oDate1.getTime() > oDate2.getTime()) {
            return 0 //开始时间大于结束时间
        } else if (oDate1.getTime() == oDate2.getTime()) {
            return 2 //开始时间等于结束时间
        } else {
            return 1 //开始时间小于结束时间
        }
    },
    //输入框禁止输入空格
    clearTrim: function(obj) {
        document.getElementById(obj).value = document.getElementById(obj).value.replace(/\s*/g, "");
    },

    // 身份证号验证
    idcardReg: function(val, callback) {
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!idcardReg.test(val)) {
            return callback()
        }
    },

    // 非空验证
    emptyReg: function(val, callback) {
        if (!val) {
            return callback()
        }
    },

    //账号显示中间星号
    starReplace: function(code, num) {
        let str = ''
        for (let i = 0; i < num; i++) {
            str += '*'
        }
        return code.replace(/^(.{1})(?:\d+)(.{4})$/, '$1' + str + '$2')
    },
    //限制输入框输入长度
    limitInputNumber: function(val, num, callback) {
        if (val.length > num) {
            return callback(this.val = val.substr(0, num))
        }
    },
    //
}

export default common