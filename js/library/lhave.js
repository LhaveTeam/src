/*!
 * LHAVE UI: Standard edition - v1.1.0 - 2017-02-26
 * by LHAVE - KingRenner
 * http://www.lhave.com
 * Copyright (c) 2017 lhave.com;
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof define === 'function' && define.cmd) {
        define(['jquery'], function(require, exports, moudles) {
            factory("undefined" == typeof window.jQuery ? require('jquery') : window.jQuery);
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function(jQuery) {

    /**
     * ------------------------------------------------------------
     * 原生 Date、String 对象方法扩展
     * @desc by KingRenner 2016-09-29
     * ------------------------------------------------------------
     */
    + function($) {
        $.extend(String.prototype, {
            noeTrim: function() {
				var text = this;
		        return text == null ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            },
            noeTrimAll: function() {
                var result = this.replace(/^\s+/g, '');
                result = result.replace(/\s+$/g, '');
                result = result.replace(/\s+/g, '');
                result = result.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1');
                return result;
            },
            noeGetStringLen: function() {
                var arr = this.match(/[^\x00-\xff]/ig);
                return this.length + (arr == null ? 0 : arr.length);
            },
            noeLeft: function(len) {
                if (isNaN(len) || len == null) {
                    len = this.length;
                } else {
                    if (parseInt(len) < 0 || parseInt(len) > this.length) {
                        len = this.length;
                    }
                }
                return this.substr(0, len);
            },
            noeToLeft: function(num, mode) {
                if (!/^[0-9]*$/.test(num)) return (this);
                var str = this.substr(0, num);
                if (!mode) return str;
                var n = str.noeGetStringLen() - str.length;
                num = num - parseInt(n / 2);
                return this.substr(0, num);
            },
            noeRight: function(len) {
                if (isNaN(len) || len == null) {
                    len = this.length;
                } else {
                    if (parseInt(len) < 0 || parseInt(len) > this.length) {
                        len = this.length;
                    }
                }
                return this.substring(this.length - len, this.length);
            },
            noeMid: function(startnum, endnum) {
                var str = this;
                if (str.length >= 0) {
                    str = str.substr(startnum, endnum);
                }
                return str;
            }
        });
    }(jQuery);
    
    /**
     * ------------------------------------------------------------
     * jQuery Extensions
     * @desc by KingRenner 2016-09-29
     * ------------------------------------------------------------
     */
    + function($) {
        'use strict';
        
        if (typeof($) === 'undefined') throw new Error('LHAVE requires jQuery.');
        if (!$.lhave) {
            $.lhave = function(obj) {
                if ($.isPlainObject(obj)) {
                    $.extend($.lhave, obj);
                }
            };
        }
        
        $.lhave({
            callEvent: function(func, event, proxy) {
                if ($.isFunction(func)) {
                    if (proxy !== undefined) {
                        func = $.proxy(func, proxy);
                    }
                    var result = func(event);
                    if (event) event.result = result;
                    return !(result !== undefined && (!result));
                }
                return 1;
            }
        });
        
    }(jQuery);
    
    /**
     * ------------------------------------------------------------
     * jQuery Easing v1.3
     * @document: http://gsgd.co.uk/sandbox/jquery/easing/
     * ------------------------------------------------------------
     */
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    jQuery.extend(jQuery.easing, {
        def: 'easeOutQuad',
        swing: function(x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function(x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function(x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function(x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function(x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function(x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function(x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function(x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function(x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function(x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function(x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function(x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function(x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function(x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
    
    /**
     * ------------------------------------------------------------
     * LHAVE: Regular Expression
     * @desc by KingRenner 2016-09-29
     * ------------------------------------------------------------
     */
    + function($) {
        var m_RegularExpression = {
            //[Rule]仅ACSII字符
            "ascii": /^[\x00-\xFF]+$/,
            "address": /^[A-Za-z0-9_()（）\#\-\u4e00-\u9fa5]+$/,
            //[Rule]仅中文
            "chinese": /^[\u4e00-\u9fa5]+$/,
            //[Rule]颜色
            "color": /^[a-fA-F0-9]{6}$/,
            "companyname": /^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]+$/,
            "companysite": /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&#=]*)?$/,
            //[Rule]Decmal浮点数
            "decmal": /^([+-]?)\d*\.\d+$/,
            //[Rule]正浮点数
            "decmal1": /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
            //[Rule]负浮点数
            "decmal2": /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/,
            "decmal3": /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/,
            //[Rule]非负浮点数（正浮点数 + 0）
            "decmal4": /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/,
            //[Rule]非正浮点数（负浮点数 + 0）
            "decmal5": /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/,
            //[Rule]日期
            "date": /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
            //[Rule]单位名
            "deptname": /^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]+$/,
            //[Rule]电子邮件
            "email": /^(\w+(?:[-+.]\w+)*)@((?:(?:[\da-zA-Z][\da-zA-Z-]{0,61})?[\da-zA-Z]\.)+(?:[a-zA-Z]{2,4}(?:\.[a-zA-Z]{2})?))$/,
            "en-int": /^[A-Za-z0-9]/,
            "fullNumber": /^[0-9]+$/,
            //[Rule]整数
            "intege": /^-?[1-9]\d*$/,
            //[Rule]正整数
            "intege1": /^[1-9]\d*$/,
            //[Rule]负整数
            "intege2": /^-[1-9]\d*$/,
            //[Rule]身份证
            "idcard": /^[1-9]([0-9]{14}|[0-9]{17})$/,
            //[Rule]IP地址（v4）
            "ip4": /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/,
            "letter": /^[A-Za-z]+$/,
            "letter_l": /^[a-z]+$/,
            "letter_u": /^[A-Z]+$/,
            //[Rule]手机
            "mobile": /^(\+?\d{2,3})?0?1(3|4|5|7|8)\d{9}$/,
            //[Rule]数字
            "num": /^([+-]?)\d*\.?\d+$/,
            //[Rule]正数（正整数 + 0）
            "num1": /^[1-9]\d*|0$/,
            //[Rule]负数（负整数 + 0）
            "num2": /^-[1-9]\d*|0$/,
            "picture": /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,
            "pub_account": /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/,
            "pub_pwd": /^[\w~!@#$%^&*()_+{}:<>?\-=[\];\.\/]{6,16}$/,
            "password": /^.*[A-Za-z0-9\w_-]+.*$/,
            "qq": /^[1-9]*[1-9][0-9]*$/,
            "rar": /(.*)\.(rar|zip|7zip|tgz)$/,
            "realname": /^[A-Za-z\u4e00-\u9fa5]+$/,
            //[Rule]电话号码（包括验证国内区号、国际区号、分机号）
            "tel": /^[0-9\-()（）]{7,18}$/,
            "urls": /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/,
            //[Rule]邮政编码
            "zipcode": /^\d{6}$/
        };
        
        $.lhave({
            re: m_RegularExpression
        });
    }(jQuery);
    
    /**
     * ------------------------------------------------------------
     * LHAVE: Browser浏览器检测模块
     * @desc by KingRenner 2016-09-29
     * ------------------------------------------------------------
     */
    + function($) {
        var agent = navigator.userAgent.toLowerCase(), 
            opera = window.opera, 
            browser = {
                /**
                 * @property {boolean} ie 检测当前浏览器是否为IE
                 */
                ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent), 
                /**
                 * @property {boolean} opera 检测当前浏览器是否为Opera
                 */
                opera: (!!opera && opera.version), 
                /**
                 * @property {boolean} webkit 检测当前浏览器是否是webkit内核的浏览器
                 */
                webkit: (agent.indexOf(' applewebkit/') > -1), 
                /**
                 * @property {boolean} mac 检测当前浏览器是否是运行在mac平台下
                 */
                mac: (agent.indexOf('macintosh') > -1), 
                /**
                 * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
                 */
                quirks: (document.compatMode == 'BackCompat')
            };
            
        /**
         * @property {boolean} gecko 检测当前浏览器内核是否是gecko内核
         */
        browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);
        var version = 0;
        //Internet Explorer 6.0+
        if (browser.ie) {
            var v1 = agent.match(/(?:msie\s([\w.]+))/);
            var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
            if (v1 && v2 && v1[1] && v2[1]) {
                version = Math.max(v1[1] * 1, v2[1] * 1);
            } else if (v1 && v1[1]) {
                version = v1[1] * 1;
            } else if (v2 && v2[1]) {
                version = v2[1] * 1;
            } else {
                version = 0;
            }
            browser.ie11Compat = document.documentMode == 11;
            /**
             * @property { boolean } ie9Compat 检测浏览器模式是否为 IE9 兼容模式
             * @warning 如果浏览器不是IE，则该值为undefined
             */
            browser.ie9Compat = document.documentMode == 9;
            /**
             * @property { boolean } ie8 检测浏览器是否是IE8浏览器
             * @warning 如果浏览器不是IE，则该值为undefined
             */
            browser.ie8 = !!document.documentMode;
            /**
             * @property { boolean } ie8Compat 检测浏览器模式是否为 IE8 兼容模式
             * @warning 如果浏览器不是IE，则该值为undefined
             */
            browser.ie8Compat = document.documentMode == 8;
            /**
             * @property { boolean } ie7Compat 检测浏览器模式是否为 IE7 兼容模式
             * @warning 如果浏览器不是IE，则该值为undefined
             */
            browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7);
            /**
             * @property { boolean } ie6Compat 检测浏览器模式是否为 IE6 模式 或者怪异模式
             * @warning 如果浏览器不是IE，则该值为undefined
             */
            browser.ie6Compat = (version < 7 || browser.quirks);
            browser.ie9above = version > 8;
            browser.ie9below = version < 9;
            browser.ie11above = version > 10;
            browser.ie11below = version < 11;
        }
        
        //Gecko.
        if (browser.gecko) {
            var geckoRelease = agent.match(/rv:([\d\.]+)/);
            if (geckoRelease) {
                geckoRelease = geckoRelease[1].split('.');
                version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;
            }
        }
        
        /**
         * @property { Number } chrome 检测当前浏览器是否为Chrome；如果是，则返回Chrome的大版本号
         * @warning 如果浏览器不是chrome，则该值为undefined
         */
        if (/chrome\/(\d+\.\d)/i.test(agent)) {
            browser.chrome = +RegExp['\x241'];
        }
        
        /**
         * @property { Number } safari 检测当前浏览器是否为Safari；如果是，则返回Safari的大版本号
         * @warning 如果浏览器不是safari，则该值为undefined
         */
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {
            browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
        }
        
        //Opera 9.50+
        if (browser.opera) version = parseFloat(opera.version());
        
        //WebKit 522+ (Safari 3+)
        if (browser.webkit) version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);
        
        /**
         * @property { Number } version 检测当前浏览器版本号
         * @remind
         * <ul>
         *   <li>IE系列返回值为5、6、7、8、9、10等</li>
         *   <li>gecko系列会返回10900、158900等</li>
         *   <li>webkit系列会返回其build号（如 522等）</li>
         * </ul>
         */
        browser.version = version;
        
        /**
         * @property { boolean } isCompatible 检测当前浏览器是否能够良好兼容
         */
        browser.isCompatible = !browser.mobile && (
            (browser.ie && version >= 6) || (browser.gecko && version >= 10801) || (browser.opera && version >= 9.5) || (browser.air && version >= 1) || (browser.webkit && version >= 522) || false);
            
        $.lhave({
            browser: browser
        });
    }(jQuery);
    
    /**
     * ------------------------------------------------------------
     * LHAVE: Utils常用工具类
     * @desc by KingRenner 2016-09-29
     * ------------------------------------------------------------
     */
    + function($) {
        var m_Utils = {
            createNew: function() {
                var __temporary = {};
                
                /**
                 * Converts `value` to a string if it's not one. An empty string is returned
                 * @param {*} value The value to process.
                 * @returns {string} Returns the string.
                 */
                __temporary.baseToString = function(value) {
                    return value == null ? '' : (value + '');
                };
                
                /**
                 * Checks if `value` is empty. 
                 */
                __temporary.isEmpty = function(value) {
                    if (value == null || value == "null" || value == undefined || value == "undefined" || value == "") {
                        return true;
                    } else {
                        value = value.replace(/^\s+|\s+$/g, "");
                        if (value == "") {
                            return true;
                        }
                        return false;
                    }
                };
                
                __temporary.UUID = function() {
                    var V4 = function() {
                        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                    };
                    return (V4() + V4() + "-" + V4() + "-" + V4() + "-" + V4() + "-" + V4() + V4() + V4());
                };
                
                /**
                 * 仿C# format方法（KingRenner增强版）
                 */
                __temporary.format = function(obj, args) {
                    if (arguments.length < 2) {
                        return arguments[0];
                    }
                    var tempArgs = [],
                        result = obj;
                    for (var n = 1; n < arguments.length; n++) {
                        tempArgs.push(arguments[n]);
                    }
                    /*
                    if (tempArgs.length == 0) {
                        return "";
                    }
                    */
                    if (arguments.length == 2 && $.isPlainObject(args)) {
                        for (var key in args) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        };
                    } else {
                        for (var i = 0; i < tempArgs.length; i++) {
                            if (tempArgs[i] != undefined) {
                                if ($.isPlainObject(tempArgs[i])) {
                                    for (var k in tempArgs[i]) {
                                        var re = new RegExp("({" + k + "})", "g");
                                        result = result.replace(re, tempArgs[i][k]);
                                    }
                                }
                                var reg = new RegExp("({)" + i + "(})", "gm");
                                result = result.replace(reg, tempArgs[i]);
                            }
                        };
                    }
                    return result;
                };
                
                /**
                 * 获得字符串实际长度（中文2、英文1）
                 */
                __temporary.getStrLength = function(str) {
                    var THIS = this;
                    str = THIS.baseToString(str);
                    if (THIS.isEmpty(str)) {
                        return 0;
                    }
                    var realLength = 0,
                        len = str.length,
                        charCode = -1;
                    for (var i = 0; i < len; i++) {
                        charCode = str.charCodeAt(i);
                        if (charCode >= 0 && charCode <= 128) {
                            realLength += 1;
                        } else {
                            realLength += 2;
                        }
                    }
                    return realLength;
                };
                
                /**
                 * 获取Url参数
                 * @param {String} p 参数名
                 * @param {String} url 地址。如果为空，则默认浏览器地址栏
                 */
                __temporary.getQuery = function(p, url) {
                    var THIS = this;
                    p = THIS.baseToString(p).noeTrim();
                    url = THIS.baseToString(url);
                    if (THIS.isEmpty(p)) {
                        return '';
                    }
                    if (THIS.isEmpty(url)) {
                        url = window.location.href + '';
                    } else {
                        url += '';
                    }
                    var reg = new RegExp("[?&](" + p + ")=([^&]+)", "i");
                    var __result = reg.exec(url);
                    if (__result) {
                        return decodeURIComponent(__result[2]);
                    } else {
                        return '';
                    }
                };
                
                /**
                 * 取分隔符的左边字符串
                 */
                __temporary.CLeft = function(str, separator) {
                    return King_LR(str, separator)[0];
                };
                /**
                 * 取分隔符的右边字符串
                 */
                __temporary.CRight = function(str, separator) {
                    return King_LR(str, separator)[1];
                };
                
                __temporary.isTagName = function(e, whitelists) {
                    e = $.event.fix(e);
                    var target = e.target || e.srcElement;
                    if (whitelists && $.inArray(String(target.tagName).toUpperCase(), whitelists) == -1) {
                        return false;
                    }
                    return true;
                };
                
                __temporary.playAnimateOnce = function(options) {
                    var THIS = this;
                    var __animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    var __defaults = {
                        type: 'animateCss', 
                        el: null, 
                        effect: '', 
                        callback: null, 
                        isRunCallBack: true
                    };
                    var opt = $.extend({}, __defaults, options);
                    var __effect = $.trim(THIS.baseToString(opt.effect));
                    var __effectClass = opt.type === 'magic' ? 'magictime' : 'animated';
                    var __effectNewer = __effectClass + ' ' + __effect;
                    if (!opt.el[0] || THIS.isEmpty(__effect)) {
                        return;
                    }
                    if ($.lhave.browser.ie && $.lhave.browser.version < 10) {
                        if ($.isFunction(opt.callback) && opt.isRunCallBack) {
                            opt.callback(opt.el, __effect);
                        }
                        return;
                    }
                    opt.el.addClass(__effectNewer);
                    $(opt.el).one(__animationEnd, function() {
                        $(opt.el).removeClass(__effectNewer);
                        if ($.isFunction(opt.callback) && opt.isRunCallBack) {
                            opt.callback(opt.el, __effect);
                        }
                    });
                };
                
                /* [Private Methods] ****************************** */
                function King_LR(str, separator) {
                    str = __temporary.baseToString(str);
                    var n;
                    var arr = new Array();
                    n = str.noeTrim().indexOf(separator);
                    if (n > -1) {
                        arr[0] = str.noeLeft(n);
                        arr[1] = str.noeMid(n + separator.length);
                    } else {
                        arr[0] = str;
                        arr[1] = '';
                    }
                    return arr;
                }
                return __temporary;
            }
        };
        
        $.lhave({
            utils: m_Utils.createNew()
        });
    }(jQuery);

}));