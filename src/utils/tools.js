/**
 * 工具函数集
 */
import fecha from 'fecha';
import qs from 'qs';


/**
 * 日期格式化函数
 * @param  {Date}   date   将要格式化的日期
 * @param  {String} format 转化格式，默认YYYY-MM-DD hh:mm:ss
 * @return {string}        返回字符串形式的格式化后的日期
 */
export const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return date;
  return fecha.format(date instanceof Date ? date : new Date(date), format);
};

/**
 * 深拷贝
 * 可确保任何情况下，对象都能被正确深拷贝
 * @param  {object} obj 将要拷贝的对象
 * @return {object}     深拷贝后的对象
 */
export const deepCopy = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  let result;
  if (Array.isArray(obj)) {
    result = [];
    obj.forEach((item) => {
      result.push(typeof item === 'object' && !(item instanceof Date) ? deepCopy(item) : item);
    });
  } else {
    result = {};
    Object.keys(obj).forEach((key) => {
      result[key] = typeof obj[key] === 'object' && !(obj[key] instanceof Date) ?
        deepCopy(obj[key]) : obj[key];
    });
  }
  // }
  return result;
};

/**
 * 解析url search字符串
 * @param {String}  search 形如：?pageNo=1&pageSize=10
 * @param {Boolean} trim   是否裁剪前后空格，缺省裁剪
 */
export const parseSearch = (search, trim = true) => {
  const querystring = (search || '').replace(/^\?/, '');
  const ret = qs.parse(querystring);
  for (const k in ret) {
    if (ret[k] === '') {
      delete ret[k];
    } else if (trim && typeof ret[k] === 'string') {
      ret[k] = ret[k].trim();
    }
  }
  return ret;
};

/**
 * 格式化表单数据以便提交
 * @param {Object} formData
 * @param {Boolean} trim   是否裁剪前后空格，缺省裁剪
 */
export const formatFormData = (formData, trim = true) => {
  const isArray = Array.isArray(formData);
  const ret = isArray ? [] : {};
  for (const k in formData) {
    if ({}.hasOwnProperty.call(formData, k)) {
      const item = formData[k];
      let tmp;
      if (typeof item !== 'undefined' && item !== null && item !== '') {
        if (typeof item.utc === 'function' && typeof item.format === 'function') { // Moment 对象
          tmp = item.format();
        } else if (typeof item === 'object' && !(item instanceof Date)) { // 递归处理
          tmp = formatFormData(item);
        } else if (trim && typeof item === 'string') {
          tmp = item.trim();
        } else {
          tmp = item;
        }
        if (isArray) {
          ret.push(tmp);
        } else {
          ret[k] = tmp;
        }
      }
    }
  }
  return ret;
};

/**
 * 复制字符串到粘贴板
 * @param  {string} str 将要复制的字符串
 */
export const copyString = (str) => {
  const copyDom = document.createElement('input');
  copyDom.setAttribute('type', 'text');
  copyDom.setAttribute('value', str);
  copyDom.setAttribute('style', 'width:1;height:1');
  document.body.appendChild(copyDom);
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        copyDom.select();
        document.execCommand('Copy');
        document.body.removeChild(copyDom);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    }, 100);
  });
};

/**
 * 将指定节点全屏
 * @param  {DOM} dom 要全屏的dom节点，默认为body
 */
export const fullScreen = (dom = document.body) => {
  if (document.documentElement.requestFullscreen) {
    dom.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    dom.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    dom.mozRequestFullScreen();
  } else if (document.documentElement.msRequestFullscreen) {
    dom.msRequestFullscreen();
  }
};

/**
 * 退出全屏
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msCancelFullScreen) {
    document.msCancelFullScreen();
  }
};

/**
 * @description 获取type & id
 * @param {string} unid = `${type}_${id}`
 * @return {string} 获取到 type || id
 */
export const getUniqueByKey = (unid, key) => {
  if (!unid) return;
  const splitArr = unid.split('_');
  if (splitArr.length > 1) {
    switch (key) {
      default:
        return unid;
      case 'type':
        return splitArr[1];
      case 'id':
        return splitArr[0];
    }
  }
};

/**
 * @description 设置路由名称 localStorage
 * @param {string} name
 */
export const setBreadcrumbName = (name) => {
  const currentName = localStorage.getItem('breadcrumb');
  if (!currentName || name !== currentName) {
    localStorage.setItem('breadcrumb', name);
  }
};

/**
 * @description 获取路由名称 localStorage
 * @return {string} name
 */
export const getBreadcrumbName = () => {
  return localStorage.getItem('breadcrumb') || '';
};

/**
 * @description 根据 value值 过滤Object对象 用于表单提交选填项为空
 * @param {Object, rejectValueArray} rejectValue =  过滤值数组
 * @return {Object}
 */
export const filteredObject = (myObject, rejectValue) => {
  return Object.keys(myObject).reduce((r, e) => {
    /* eslint-disable */
    if (rejectValue.includes(myObject[e])) delete myObject[e];
    /* eslint-enable */
    return myObject;
  }, {});
};

/**
 * @description 遍历对象的属性和值并返回 `${key1}=${value1}&${key2}=${value2}...`
 * @param {Object} 需要遍历的对象
 * @return {String}
 */
export const objectToString = (obj) => {
  let objString = '';
  for (const [k, v] of Object.entries(obj)) {
    let value = JSON.stringify(v);
    if (Array.isArray(v)) value = v.join(',');
    if (value) {
      objString += `&${k}=${value}`;
    }
    return objString;
  }
};

/**
 * @description 遍历对象，如果value为数组则转为string
 * @param {Object} 需要遍历的对象
 * @returns {Object}
 */
export const objectValueToString = (obj) => {
  let newObj = {};
  for (const [k, v] of Object.entries(obj)) {
    let value = JSON.stringify(v);
    if (Array.isArray(v)) value = v.join(GET_SPLIT_DOT);
    if (value) {
      newObj = {
        [k]: value,
      };
    }
    return newObj;
  }
};

/**
 * @description 遍历对象，清除为空值的key
 * @param {Object} 需要遍历的对象
 * @returns {Object}
 */
export const objectClear = (obj) => {
  const newObj = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] !== '' && obj[key] !== 'undefined' && obj[key] !== 'null') {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * @description 两个数字显示比分
 * @param {number} num1 num2
 * @return {string} 比分
 */
export const transformNumberToScore = (num1, num2) => {
  if (!num1 || !num2) { return false; }
  // 分母不能为 0
  if (num2 === 0 || num1 === 0) {
    return false;
    // 第二个数可做分母
  } else if (num1 % num2 === 1) {
    return `${num1}: ${num2}`;
  } else if (num1 % num2 === 0) {
    return `${num1 / num2} : 1`;
  } else {
    // 取两数 最大公约数 然后除以
    const tempNum = getMathData(num1, num2);
    return `${num1 / tempNum}: ${num2 / tempNum}`;
  }
};
const getMathData = (num1, num2) => {
  return num2 !== 0 ? getMathData(num2, num1 % num2) : num1;
};
/**
 * is location
 */

export const isLocation = () => window.location.hostname === '127.0.0.1';

/**
 * 计算字符串长度（英文占1个字符，中文汉字占2个字符）
 * @param {string} 字符串
 * @return {number} 长度
 */
export const strlen = (str) => {
  let len = 0;
  str.split('').forEach((item, index) => {
    if (str.charCodeAt(index) > 127 || str.charCodeAt(index) === 94) {
      len += 2;
    } else {
      len += 1;
    }
  });
  return len;
};



/**
* 当前浏览器为IE几
*/

export const IEVersion = () => {
  const { userAgent } = navigator; // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion === 7) {
      return 7;
    } else if (fIEVersion === 8) {
      return 8;
    } else if (fIEVersion === 9) {
      return 9;
    } else if (fIEVersion === 10) {
      return 10;
    } else {
      return 6;// IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';// edge
  } else if (isIE11) {
    return 11; // IE11
  } else {
    return -1;// 不是ie浏览器
  }
};

/**
 * @description px转换rem
 * @param {number|string} value 要设置的值
 * @param {number} remUnit 基准像素值
 * @return {string} rem
 */
export const px2rem = (value, remUnit = 75) => {

  if (typeof (value) == 'string' && value.indexOf("px") > -1) {
    value = Number(value.split("px")[0])
  }
  value = parseFloat(value);
  if (isNaN(value)) {
    console.error('px2rem方法参数有误！');
  }
  return `${value / remUnit}rem`;
}

/**
 * @desc 函数防抖
 * @param func 延迟执行函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

/**
 * @desc 函数节流
 * @param func 延迟执行函数
 * @param wait 多久执行一次
 */
export const throttle = (fun, delay) => {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}

/**
 * @desc 检测字符串是否包含汉字
 * @param {string}  str 字符串
 */
export const checkChinese = (str) => {
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(str)) {
    return true;
  }
  return false;
}

export const compareObj = (origin, target) => { // 比较两个对象是否相等
  if (typeof target === 'object') {
    if (typeof origin !== 'object') return false;
    for (const key of Object.keys(target)) { if (!compareObj(origin[key], target[key])) return false; }
    return true;
  } else return origin === target;
};

export const inWX = (origin, target) => { //判断是否在微信中
  var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    }
    return false
};


export const inIos = (origin, target) => { //判断是否在ios中
  var ua = window.navigator.userAgent.toLowerCase();
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
};


window.inWX = inWX
window.inIos = inIos


