const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 生成一周七天日历
const allWeek = dateTime => {
  var me = this;
  var sevenDays = [];
    var time = dateTime.getTime();
    var dateStrList = [];
    for (var i = 0; i < 7; i++) {
    var date = new Date(time + i * 24 * 3600 * 1000);
    var weekTime = formatDate(date);
    var splitArr = weekTime.split(" ");
    var dateStr = splitArr[0];
    var weekStr = splitArr[1];
    var dates = splitArr[2]
    var dateObj = {};
    dateObj.dateStr = dateStr;
    dateObj.weekStr = weekStr;
    dateObj.dates = dates;
    sevenDays.push(dateObj);
  }
  sevenDays[0].weekStr = '今日'
  return sevenDays;
 }
const formatDate = date => {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1);
  month = month <= 9 ? '0' + month : month;
  var day = date.getDate();
  day = day <= 9 ? '0' + day : day;
  var datetime = day;
  var dates = timestamp(year + '-' + month + '-' + day)
  var week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
  return datetime + ' ' + week + ' ' + dates;
 }
// 日期转时间戳
function timestamp(tamp) {
  return Date.parse(new Date(tamp.replace(/-/g, "/"))) / 1000;
}

module.exports = {
  formatTime: formatTime,
  allWeek:allWeek,
}