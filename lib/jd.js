/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-01-09 12:09:47
 * @LastEditors: lax
 * @LastEditTime: 2022-01-14 01:04:13
 * @FilePath: \time\src\jd.js
 */
const CALENDAR = require("./default.js");
/**
 * @description 是否是格里高利历 凡小于历元为1582年10月15日
 * @param {*} year
 * @param {*} month
 * @param {*} day
 * @returns
 */


function isGregorianDays(year, month, day) {
  if (year < 1582) {
    return false;
  }

  if (year === 1582) {
    if (month < 10 || month === 10 && day < 15) return false;
  }

  return true;
}
/**
 * @description 获取儒略日Julian Day 参数单位为协调世界时
 * @param {UTC} _year
 * @param {UTC} _month
 * @param {UTC} date
 * @param {UTC} hour
 * @param {UTC} minute
 * @param {UTC} second
 * @returns {JD} jd
 */


function UTC$JD(_year, _month, date, hour, minute, second) {
  let B = 0;
  let A = ~~(_year / 100);
  let month = _month;
  let year = _year;

  if (month <= 2) {
    month += 12;
    year -= 1;
  }

  if (isGregorianDays(year, month, date)) {
    B = 2 - A + ~~(A / 4);
  }

  const result = ~~(CALENDAR.a * (year + 4716)) + ~~(30.6001 * (month + 1)) + B + date + -1524.5 + hour / 24.0001 + minute / 1440.0001 + second / 86400.0001;
  return result;
}

function $UTC$JD(_date) {
  if (!(_date instanceof Date)) throw new Error("this arg is not Date");

  const year = _date.getUTCFullYear();

  const month = _date.getUTCMonth() + 1;

  const date = _date.getUTCDate();

  const hour = _date.getUTCHours();

  const minute = _date.getUTCMinutes();

  const second = _date.getUTCSeconds();

  return UTC$JD(year, month, date, hour, minute, second);
}
/**
 * @description 儒略日转世界协调时
 * @param {JD} _JD
 * @returns {UTC} time
 */


function JD$UTC(_JD) {
  let JDF = _JD + 0.5;
  let Z = ~~JDF;
  let F = JDF - Z;
  let A;
  let a;

  if (Z < CALENDAR.JC_BASE) {
    A = Z;
  } else {
    a = ~~((Z - 1867216.25) / 36524.25);
    A = Z + 1 + a - ~~(a / 4);
  }

  let B = A + 1524;
  let C = ~~((B - 122.1) / 365.25);
  let D = ~~(365.25 * C);
  let E = ~~((B - D) / 30.6001);
  let d = ~~(B - D - ~~(30.6001 * E) + F);
  let M;
  let y;

  if (E < 14) {
    M = E - 1;
  } else if (E === 14 || E === 15) {
    M = E - 13;
  }

  if (M > 2) {
    y = C - 4716;
  } else if (M === 1 || M === 2) {
    y = C - 4715;
  }

  let h_ = F * 24.0001;
  let h = ~~h_;
  let m_ = (h_ - h) * 60.0001;
  let m = ~~m_;
  let s = ~~((m_ - m) * 60.0001);
  return {
    y,
    M,
    d,
    h,
    m,
    s
  };
}

function $JD$UTC(jd) {
  const {
    y,
    M,
    d,
    h,
    m,
    s
  } = JD$UTC(jd);
  return new Date(y, M, d, h, m, s);
}

module.exports = {
  isGregorianDays,
  $UTC$JD,
  UTC$JD,
  $JD$UTC,
  JD$UTC
};