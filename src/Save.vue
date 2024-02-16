<!-- SAVE SHOW DAY -->
<!-- if(new Date(ctime) < startTime) {
  // console.log(this.selectedDays[0])
  // console.log(this.dayList)
  let pastDay = this.dayList.find(item => item.value == this.selectedDays[0].value && item.inMonth && this.selectedDays[1].inMonth)
  if(!pastDay) {
    pastDay = this.dayList.find(item => item.value == this.isDatesEqual(item, this.selectedDays[0]))
  }
  if(!pastDay) return;
  pastDay.checked = false;
  this.selectedDays.shift();
  this.selectedDays.unshift(obj)
}
else {
  // console.log(this.dayList)
  // console.log(this.selectedDays[1])
  // ?
  let pastDay = this.dayList.find(item => item.moment._d.toString() == this.selectedDays[1].moment._d)
  // if(!pastDay) {
  //   pastDay = this.dayList.find(item => item.value == this.isDatesEqual(item, this.selectedDays[1]))
  // }
  // console.log('сравнение', pastDay === this.selectedDays[1])
  // if(!pastDay) return;
  // console.log('pastDay', pastDay)
  // pastDay.checked = false;
  console.log(pastDay)
  console.log('сравнение 1', pastDay === this.dayList[39])
  console.log('сравнение 2', this.selectedDays[1] === obj)
  if(pastDay !== this.selectedDays[1] && pastDay) {
    pastDay.checked = false;
    console.log('pastDay work')
  }
  else {
    this.selectedDays[1].checked = false;
    console.log('selectedDays work')
  }
  this.selectedDays.pop();
  this.selectedDays.push(obj)
}
console.log(this.dayList)
console.log(obj)
console.log(this.selectedDays)
obj.checked = true;
}
-->





<!-- 13.06 16:41 -->



<script>
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _moment = require('moment');

    _moment.updateLocale('en', {
        week : {
            dow : 1 // Monday is the first day of the week
        }
    });
    _moment.locale('en')

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    exports.default = {
        props: {
            required: false,
            time: {
                type: String,
                required: true
            },
            option: {
                type: Object,
                default: function _default() {
                    return {
                        type: 'day',
                        SundayFirst: false,
                        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        format: 'YYYY-MM-DD',
                        color: {
                            checked: '#F50057',
                            header: '#3f51b5',
                            headerText: '#fff'
                        },
                        inputStyle: {
                            'display': 'inline-block',
                            'padding': '6px',
                            'line-height': '22px',
                            'font-size': '16px',
                            'border': '2px solid #fff',
                            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                            'border-radius': '2px',
                            'color': '#5F5F5F'
                        },
                        placeholder: '',
                        buttons: {
                            ok: 'OK',
                            cancel: 'Cancel'
                        },
                        overlayOpacity: 0.5,
                        dismissible: true,
                        selectedDays: [],
                        inline: false
                    };
                }
            },
            limit: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        data: function data() {
            function hours() {
                var list = [];
                var hour = 24;
                while (hour > 0) {
                    hour--;

                    list.push({
                        checked: false,
                        value: hour < 10 ? '0' + hour : hour
                    });
                }
                return list;
            }
            function mins() {
                var list = [];
                var min = 60;
                while (min > 0) {
                    min--;
                    list.push({
                        checked: false,
                        value: min < 10 ? '0' + min : min
                    });
                }
                return list;
            }
            return {
                hours: hours(),
                mins: mins(),
                showInfo: {
                    hour: false,
                    day: false,
                    month: false,
                    year: false,
                    check: false
                },
                displayInfo: {
                    month: ''
                },
                library: {
                    week: this.option.week,
                    month: this.option.month,
                    year: []
                },
                checked: {
                    oldtime: '',
                    currentMoment: null,
                    year: '',
                    month: '',
                    day: '',
                    hour: '00',
                    min: '00'
                },
                dayList: [],
                selectedDays: (this.option.selectedDays ? this.option.selectedDays : []),
            };
        },
        watch: {
            'time': function (nVal, oVal) {
                if (this.option.type === 'week-picker') {
                    var self = this;
                    var day = this.dayList.filter(function (obj) {
                        return obj.moment.format('MM/DD/Y') == _moment(self.time).format('MM/DD/Y');
                    });
                    this.checkDay(day);
                    var weekStart = _moment(self.time);
                    this.selectedDays = [];
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
            }
        },
        created () {
            if (this.option.type === 'week-picker') {
                if (this.selectedDays.length == 0) {
                    var weekStart = (0, _moment2.default)().startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
                this.picked();
            }
            this.showDay();
        },

        methods: {
            pad: function pad(n) {
                n = Math.floor(n);
                return n < 10 ? '0' + n : n;
            },
            nextMonth: function nextMonth(type) {
                var next = null;
                type === 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M');
                this.showDay(next);
            },
            showDay: function showDay(time) {
                if (time === undefined || !Date.parse(time)) {
                    this.checked.currentMoment = (0, _moment2.default)();
                } else {
                    this.checked.currentMoment = (0, _moment2.default)(time, this.option.format);
                }
                this.showOne('day');
                this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format('YYYY');
                this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format('MM');
                this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format('DD');

                this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()];

                var days = [];
                var currentMoment = this.checked.currentMoment;
                var firstDay = (0, _moment2.default)(currentMoment).date(1).day();

                // gettting previous and next month
                // let currentMonth = moment(currentMoment)
                var previousMonth = (0, _moment2.default)(currentMoment);
                var nextMonth = (0, _moment2.default)(currentMoment);
                nextMonth.add(1, 'months');
                previousMonth.subtract(1, 'months');

                var monthDays = (0, _moment2.default)(currentMoment).daysInMonth();
                var oldtime = this.checked.oldtime;
                for (var i = 1; i <= monthDays; ++i) {
                    days.push({
                        value: i,
                        inMonth: true,
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(i)
                    });
                    if (i === Math.ceil((0, _moment2.default)(currentMoment).format('D')) && (0, _moment2.default)(oldtime, this.option.format).year() === (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime, this.option.format).month() === (0, _moment2.default)(currentMoment).month()) {
                        days[i - 1].checked = true;
                    }
                }

                if (firstDay === 0) firstDay = 7;

                for (var _i = 0; _i < firstDay - (this.option.SundayFirst ? 0 : 1); _i++) {
                    var passiveDay = {
                        value: previousMonth.daysInMonth() - _i,
                        inMonth: false,
                        action: 'previous',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(1).subtract(_i + 1, 'days')
                    };
                    days.unshift(passiveDay);
                }

                var passiveDaysAtFinal = 42 - days.length;
                for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
                    var _passiveDay = {
                        value: _i2,
                        inMonth: false,
                        action: 'next',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).add(1, 'months').date(_i2)
                    };
                    days.push(_passiveDay);
                }

                if (this.limit.length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.limit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var li = _step.value;

                            switch (li.type) {
                                case 'fromto':
                                    days = this.limitFromTo(li, days);
                                    break;
                                case 'weekday':
                                    days = this.limitWeekDay(li, days);
                                    break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                if(this.option.type === 'multi-day')
                  this.checkBySelectDays(days);
                this.dayList = days;
            },
            isDatesEqual: function(date1, date2) {
                if(!date1 || !date2) return;
                const { _d: date1Obj } = date1.moment;
                const { _d: date2Obj } = date2.moment;

                return date1Obj.getFullYear() === date2Obj.getFullYear() &&
                        date1Obj.getHours() === date2Obj.getHours() &&
                        date1Obj.getMinutes() === date2Obj.getMinutes() &&
                        date1Obj.getDay() === date2Obj.getDay() &&
                        date1Obj.getDate() === date2Obj.getDate() &&
                        date1Obj.getMonth() === date2Obj.getMonth()
            },
            checkBySelectDays: function checkBySelectDays(days) {
                this.selectedDays.forEach((day) => {
                  days.forEach((item, index) => {
                    if (this.isDatesEqual(item, day)) {
                        days[index].checked = true;
                    }
                  })
                });
            },
            limitWeekDay: function limitWeekDay(limit, days) {
                return days.map(function (day) {
                    if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
                        day.unavailable = true;
                    }
                    return day;
                });
            },
            limitFromTo: function limitFromTo(limit, days) {
                var _this2 = this;

                if (limit.from || limit.to) {
                    days.map(function (day) {
                        if (_this2.getLimitCondition(limit, day)) {
                            day.unavailable = true;
                        }
                    });
                }
                return days;
            },
            getLimitCondition: function getLimitCondition(limit, day) {
                var tmpMoment = (0, _moment2.default)(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
                if (limit.from && !limit.to) {
                    return !tmpMoment.isAfter(limit.from);
                } else if (!limit.from && limit.to) {
                    return !tmpMoment.isBefore(limit.to);
                } else {
                    return !tmpMoment.isBetween(limit.from, limit.to);
                }
            },
            checkDayInRange: function checkDayInRange(day) {
              if ((day.unavailable && this.option.type != 'multi-day') || day.value === '' || day.moment == undefined || this.selectedDays.length <= 1) {
                    return false;
                }
              
              if (this.option.type != 'multi-day') return;

              const startTime = new Date(this.selectedDays[0].moment._d)
              const endTime = new Date(this.selectedDays[1].moment._d)
              const dayD = day.moment._d;
              if(
                dayD >= startTime &&
                dayD <= endTime
              )
                return true;
              else 
                return false;
            },
            checkDay: function checkDay(obj) {
                if (obj.unavailable || obj.value === '' || obj.moment == undefined) {
                    return false;
                }

                if (!obj.inMonth) {
                    this.nextMonth(obj.action);
                }

                var day = this.pad(obj.value);
                if (this.option.type === 'day' || this.option.type === 'min') {
                    this.dayList.map(function (x) {
                        x.checked = false;
                    });
                    this.checked.day = day;
                    obj.checked = true;
                    this.selectedDays = [];
                } else if (this.option.type === 'week-picker') {
                    this.selectedDays = [];
                    var weekStart = obj.moment.startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                    var _this = this;
                    this.dayList.map(function (day) {
                        if (_this.selectedDays.indexOf(day.moment.format('YYYY-MM-DD')) !== -1) {
                            day.checked = true;
                        } else {
                            day.checked = false;
                        }
                    });
                } else {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + day;

                    if(!obj.inMonth) return;

                    if (obj.checked === true) {
                        obj.checked = false;
                        // this.selectedDays.$remove(obj);
                        this.selectedDays = this.selectedDays.filter(item => item.value !== obj.value)
                    } 
                    else if (this.selectedDays.length === 2) {
                        const startTime = this.selectedDays[0].moment._d;
                        const endTime = this.selectedDays[1].moment._d;

                        if(new Date(ctime) < startTime) {
                            let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[0]))
                            if(pastDay !== this.selectedDays[0] && pastDay) {
                              pastDay.checked = false;
                            }
                            else {
                              this.selectedDays[0].checked = false;
                            }
                            this.selectedDays.shift();
                            this.selectedDays.unshift(obj)
                        }
                        else {
                            let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[1]))
                            if(pastDay !== this.selectedDays[1] && pastDay) {
                              pastDay.checked = false;
                            }
                            else {
                              this.selectedDays[1].checked = false;
                            }
                            this.selectedDays.pop();
                            this.selectedDays.push(obj)
                        }
                        obj.checked = true;
                    }
                    else {
                      if(!this.selectedDays[0]) {
                        this.selectedDays.push(obj);
                      }
                      else if(obj.moment._d < this.selectedDays[0].moment._d) {
                        this.selectedDays.unshift(obj);
                      }
                      else {
                        this.selectedDays.push(obj);
                      }
                      obj.checked = true;
                    }
                }

                switch (this.option.type) {
                    case 'day':
                    case 'week-picker':
                        this.picked();
                        break;
                    case 'min':
                        this.showOne('hour');
                        break;
                }
            },
            showYear: function showYear() {
                var year = (0, _moment2.default)(this.checked.currentMoment).year();
                this.library.year = [];
                var yearTmp = [];
                for (var i = year - 100; i < year + 5; ++i) {
                    yearTmp.push(i);
                }
                this.library.year = yearTmp;

                this.showOne('year');

                var self = this;
                this.$nextTick(function () {
                    var listDom = document.getElementById('yearList');
                    listDom.scrollTop = listDom.scrollHeight - 100;
                    self.addYear();
                });
            },
            showOne: function showOne(type) {
                switch (type) {
                    case 'year':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = true;
                        this.showInfo.month = false;
                        break;
                    case 'month':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = true;
                        break;
                    case 'day':
                        this.showInfo.hour = false;
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    case 'hour':
                        this.showInfo.hour = true;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    default:
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        this.showInfo.hour = false;
                }
            },
            showMonth: function showMonth() {
                this.showOne('month');
            },
            addYear: function addYear() {
                var _this3 = this;

                var listDom = document.getElementById('yearList');
                // let tmp = 0
                listDom.addEventListener('scroll', function (e) {
                    if (listDom.scrollTop < listDom.scrollHeight - 100) {
                        var len = _this3.library.year.length;
                        var lastYear = _this3.library.year[len - 1];
                        _this3.library.year.push(lastYear + 1);
                    }
                }, false);
            },
            setYear: function setYear(year) {
                this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            setMonth: function setMonth(month) {
                var mo = this.library.month.indexOf(month) + 1;
                if (mo < 10) {
                    mo = '0' + '' + mo;
                }
                this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            showCheck: function showCheck() {
                if (this.time === '' && (!this.selectedDays[0] && this.option.type === 'multi-day')) {
                    this.showDay();
                } else {
                    if (this.option.type === 'day' || this.option.type === 'min' || this.option.type === 'week-picker') {
                        this.checked.oldtime = this.time;
                        this.showDay(this.time);
                    } else {
                        if (this.selectedDays.length) {
                            this.showDay(this.selectedDays[0].moment._d);
                        } else {
                            const [ firstDay, lastDay ] = this.time.split(' - ')
                            const firstDate = new Date(firstDay)
                            const lastDate = new Date(lastDay)

                            this.selectedDays[0] = {
                                value: firstDate.getDate(),
                                inMonth: true,
                                unavailable: false,
                                checked: true,
                                moment: (0, _moment2.default)(firstDate).date(firstDate.getDate())
                            }
                            
                            if(lastDay) {
                              this.selectedDays[1] = {
                                  value: lastDate.getDate(),
                                  inMonth: true,
                                  unavailable: false,
                                  checked: true,
                                  moment: (0, _moment2.default)(lastDate).date(lastDate.getDate())
                              }
                            }
                            this.showDay(this.selectedDays[0].moment._d);
                        }
                    }
                }
                this.showInfo.check = true;
            },
            setTime: function setTime(type, obj, list) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        item.checked = false;
                        if (item.value === obj.value) {
                            item.checked = true;
                            this.checked[type] = item.value;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            },
            prepareDate: function(date) {
              if(!date) return;
              return this.pad(date.moment._d.getMonth() + 1) + '/' + this.pad(date.moment._d.getDate()) + '/' + date.moment._d.getFullYear()
            },
            picked: function picked() {
                if (this.option.type === 'day' || this.option.type === 'min') {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
                    this.checked.currentMoment = (0, _moment2.default)(ctime, 'YYYY-MM-DD HH:mm');
                    this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
                } else if (this.option.type === 'week-picker') {
                    // return as a result the first day of the week
                    var weekStart = (0, _moment2.default)(this.selectedDays[0], 'YYYY-MM-DD').startOf('week');
                    this.time = weekStart.format(this.option.format);
                } else {
                  const ftime = this.prepareDate(this.selectedDays[0]);
                  const ltime = this.prepareDate(this.selectedDays[1]);
                  this.time = ltime ? `${ftime} - ${ltime}` : ftime
                }
                this.showInfo.check = false;
                this.$emit('change', this.time, this.dayList, this.selectedDays);
                this.$dispatch('date-picker::selected', this.time)
            },
            dismiss: function dismiss(evt) {
                if (evt.target.className === 'datepicker-overlay') {
                    if (this.option.dismissible === undefined || this.option.dismissible) {
                        this.showInfo.check = false;
                        this.$emit('cancel');
                    }
                }
            }
        }
    };
</script>
<style scoped>
  .datepicker-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index:998;
    top:0;
    left: 0;
    overflow: hidden;
    -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 0.5s; /* Firefox < 16 */
    -ms-animation: fadein 0.5s; /* Internet Explorer */
    -o-animation: fadein 0.5s; /* Opera < 12.1 */
    animation: fadein 0.5s;
  }


  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .cov-date-body {
    display: inline-block;
    background: #3F51B5;
    overflow: hidden;
    position: relative;
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 400;
    position: fixed;
    display: block;
    width: 400px;
    max-width: 100%;
    z-index: 999;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

  .cov-picker-box {
    background: #fff;
    width: 100%;
    display: inline-block;
    padding: 25px;
    box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    -ms-box-sizing: border-box !important;
    width: 400px;
    max-width: 100%;
    height: 280px;
    text-align: start!important;
  }

  .cov-picker-box td {
    height: 34px;
    width: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    text-align: center;
    cursor: pointer;
  }

  .cov-picker-box td:hover {
    background: #E6E6E6;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  .day {
    width: 14.2857143%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    height: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    vertical-align: middle;
  }

  .week ul {
    margin: 0 0 8px;
    padding: 0;
    list-style: none;
  }

  .week ul li {
    width: 14.2%;
    display: inline-block;
    text-align: center;
    background: transparent;
    color: #000;
    font-weight: bold;
  }

  .passive-day{
    color: #bbb;
  }
  .checked {
    background: #F50057;
    color: #FFF !important;
    border-radius: 3px;
  }

  .unavailable {
    color: #ccc;
    cursor: not-allowed;
  }

  .cov-date-monthly {
    height: 150px;
  }

  .cov-date-monthly > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    vertical-align: middle;
    color: #fff;
    height: 150px;
    float: left;
    text-align: center;
    cursor: pointer;
  }

  .cov-date-previous,
  .cov-date-next {
    position: relative;
    width: 20% !important;
    text-indent: -300px;
    overflow: hidden;
    color: #fff;
  }

  .cov-date-caption {
    width: 60%;
    padding: 50px 0!important;
    box-sizing: border-box;
    font-size: 24px;
  }

  .cov-date-caption span:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .cov-date-previous:hover,
  .cov-date-next:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .day:hover {
    background: #EAEAEA;
  }

  .unavailable:hover {
    background: none;
  }

  .checked:hover {
    background: #FF4F8E;
  }

  .day-in-range {
    background-color: #039ae563;
  }

  .cov-date-next::before,
  .cov-date-previous::before {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    top: 50%;
    margin-top: -7px;
    margin-left: -7px;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-next::after,
  .cov-date-previous::after {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    margin-top: 6px;
    margin-left: -7px;
    top: 50%;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .cov-date-previous::after {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-previous::before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .date-item {
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
    cursor: pointer;
  }

  .date-item:hover {
    background: #e0e0e0;
  }

  .date-list {
    overflow: auto;
    vertical-align: top;
    padding: 0;
  }

  .cov-vue-date {
    display: inline-block;
    color: #5D5D5D;
  }

  .button-box {
    background: #fff;
    vertical-align: top;
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding-right: 20px;
  }

  .button-box span {
    cursor: pointer;
    padding: 10px 20px;
  }

  .watch-box {
    height: 100%;
    overflow: hidden;
  }

  .hour-box,
  .min-box {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 100%;
    overflow: auto;
    float: left;
  }
  .hour-box ul,
  .min-box ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .hour-item, .min-item {
    padding: 10px;
    font-size: 36px;
    cursor: pointer;
  }
  .hour-item:hover, .min-item:hover{
    background: #E3E3E3;
  }
  .hour-box .active, .min-box .active{
    background: #F50057;
    color: #FFF !important;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #E3E3E3;
  }
  ::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: 2px;
  }
</style>
<template>
  <div class="cov-vue-date">
    <div v-if="!option.inline && !option.element" class="datepickbox">
      <input
              type="text"
              title="input date"
              class="cov-datepicker"
              readonly="readonly"
              placeholder="{{option.placeholder}}"
              v-model="time"
              :required="required"
              @click="showCheck"
              @foucus="showCheck"
              :style="option.inputStyle"/>
    </div>
    <i v-if="option.element == 'image'" :style="option.inputStyle" @click="showCheck" class="datepickimage material-icons input-field">today</i>
    <!-- MODAL LAYOUT -->
    <div class="datepicker-overlay"
         v-if="showInfo.check"
         @click="dismiss($event)"
         :style="{
    'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'
    }">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'day-in-range': checkDayInRange(day),
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
    <!-- INLINE LAYOUT -->
    <div v-if="option.inline" class="datepicker-inline">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>



<!-- !!!!! -->















<!-- 13.02 16.13 -->


<script>
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _moment = require('moment');

    _moment.updateLocale('en', {
        week : {
            dow : 1 // Monday is the first day of the week
        }
    });
    _moment.locale('en')

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    exports.default = {
        props: {
            required: false,
            time: {
                type: String,
                required: true
            },
            option: {
                type: Object,
                default: function _default() {
                    return {
                        type: 'day',
                        SundayFirst: false,
                        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        format: 'YYYY-MM-DD',
                        color: {
                            checked: '#F50057',
                            header: '#3f51b5',
                            headerText: '#fff'
                        },
                        inputStyle: {
                            'display': 'inline-block',
                            'padding': '6px',
                            'line-height': '22px',
                            'font-size': '16px',
                            'border': '2px solid #fff',
                            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                            'border-radius': '2px',
                            'color': '#5F5F5F'
                        },
                        placeholder: '',
                        buttons: {
                            ok: 'OK',
                            cancel: 'Cancel'
                        },
                        overlayOpacity: 0.5,
                        dismissible: true,
                        selectedDays: [],
                        inline: false
                    };
                }
            },
            limit: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        data: function data() {
            function hours() {
                var list = [];
                var hour = 24;
                while (hour > 0) {
                    hour--;

                    list.push({
                        checked: false,
                        value: hour < 10 ? '0' + hour : hour
                    });
                }
                return list;
            }
            function mins() {
                var list = [];
                var min = 60;
                while (min > 0) {
                    min--;
                    list.push({
                        checked: false,
                        value: min < 10 ? '0' + min : min
                    });
                }
                return list;
            }
            return {
                hours: hours(),
                mins: mins(),
                showInfo: {
                    hour: false,
                    day: false,
                    month: false,
                    year: false,
                    check: false
                },
                displayInfo: {
                    month: ''
                },
                library: {
                    week: this.option.week,
                    month: this.option.month,
                    year: []
                },
                checked: {
                    oldtime: '',
                    currentMoment: null,
                    year: '',
                    month: '',
                    day: '',
                    hour: '00',
                    min: '00'
                },
                dayList: [],
                selectedDays: (this.option.selectedDays ? this.option.selectedDays : []),
            };
        },
        watch: {
            'time': function (nVal, oVal) {
                if (this.option.type === 'week-picker') {
                    var self = this;
                    var day = this.dayList.filter(function (obj) {
                        return obj.moment.format('MM/DD/Y') == _moment(self.time).format('MM/DD/Y');
                    });
                    this.checkDay(day);
                    var weekStart = _moment(self.time);
                    this.selectedDays = [];
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
            }
        },
        created () {
            if (this.option.type === 'week-picker') {
                if (this.selectedDays.length == 0) {
                    var weekStart = (0, _moment2.default)().startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
                this.picked();
            }
            this.showDay();
        },

        methods: {
            pad: function pad(n) {
                n = Math.floor(n);
                return n < 10 ? '0' + n : n;
            },
            nextMonth: function nextMonth(type) {
                var next = null;
                type === 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M');
                this.showDay(next);
            },
            showDay: function showDay(time) {
                if (time === undefined || !Date.parse(time)) {
                    this.checked.currentMoment = (0, _moment2.default)();
                } else {
                    this.checked.currentMoment = (0, _moment2.default)(time, this.option.format);
                }
                this.showOne('day');
                this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format('YYYY');
                this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format('MM');
                this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format('DD');

                this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()];

                var days = [];
                var currentMoment = this.checked.currentMoment;
                var firstDay = (0, _moment2.default)(currentMoment).date(1).day();

                // gettting previous and next month
                // let currentMonth = moment(currentMoment)
                var previousMonth = (0, _moment2.default)(currentMoment);
                var nextMonth = (0, _moment2.default)(currentMoment);
                nextMonth.add(1, 'months');
                previousMonth.subtract(1, 'months');

                var monthDays = (0, _moment2.default)(currentMoment).daysInMonth();
                var oldtime = this.checked.oldtime;
                for (var i = 1; i <= monthDays; ++i) {
                    days.push({
                        value: i,
                        inMonth: true,
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(i)
                    });
                    if (i === Math.ceil((0, _moment2.default)(currentMoment).format('D')) && (0, _moment2.default)(oldtime, this.option.format).year() === (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime, this.option.format).month() === (0, _moment2.default)(currentMoment).month()) {
                        days[i - 1].checked = true;
                    }
                }

                if (firstDay === 0) firstDay = 7;

                for (var _i = 0; _i < firstDay - (this.option.SundayFirst ? 0 : 1); _i++) {
                    var passiveDay = {
                        value: previousMonth.daysInMonth() - _i,
                        inMonth: false,
                        action: 'previous',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(1).subtract(_i + 1, 'days')
                    };
                    days.unshift(passiveDay);
                }

                var passiveDaysAtFinal = 42 - days.length;
                for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
                    var _passiveDay = {
                        value: _i2,
                        inMonth: false,
                        action: 'next',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).add(1, 'months').date(_i2)
                    };
                    days.push(_passiveDay);
                }

                if (this.limit.length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.limit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var li = _step.value;

                            switch (li.type) {
                                case 'fromto':
                                    days = this.limitFromTo(li, days);
                                    break;
                                case 'weekday':
                                    days = this.limitWeekDay(li, days);
                                    break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                if(this.option.type === 'multi-day')
                  this.checkBySelectDays(days);
                this.dayList = days;
            },
            isDatesEqual: function(date1, date2) {
                // if(!date1 || !date2) return;

                // return date1.value == date2.value && date1.inMonth && date2.inMonth
                
                if(!date1 || !date2) return;
                const { _d: date1Obj } = date1.moment;
                const { _d: date2Obj } = date2.moment;

                return date1Obj.getFullYear() === date2Obj.getFullYear() &&
                        date1Obj.getHours() === date2Obj.getHours() &&
                        date1Obj.getMinutes() === date2Obj.getMinutes() &&
                        date1Obj.getDay() === date2Obj.getDay() &&
                        date1Obj.getDate() === date2Obj.getDate() &&
                        date1Obj.getMonth() === date2Obj.getMonth()
            },
            checkBySelectDays: function checkBySelectDays(days) {
                var _this = this;
                // console.log(this.selectedDays)
                // console.log(this.dayList)
                this.selectedDays.forEach((day) => {
                  days.forEach((item, index) => {
                    if (this.isDatesEqual(item, day)) {
                        days[index].checked = true;
                    }
                  })
                });
                // console.log('AFTER')
                // console.log(this.selectedDays)
                // console.log(this.dayList)
            },
            limitWeekDay: function limitWeekDay(limit, days) {
                return days.map(function (day) {
                    if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
                        day.unavailable = true;
                    }
                    return day;
                });
            },
            limitFromTo: function limitFromTo(limit, days) {
                var _this2 = this;

                if (limit.from || limit.to) {
                    days.map(function (day) {
                        if (_this2.getLimitCondition(limit, day)) {
                            day.unavailable = true;
                        }
                    });
                }
                return days;
            },
            getLimitCondition: function getLimitCondition(limit, day) {
                var tmpMoment = (0, _moment2.default)(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
                if (limit.from && !limit.to) {
                    return !tmpMoment.isAfter(limit.from);
                } else if (!limit.from && limit.to) {
                    return !tmpMoment.isBefore(limit.to);
                } else {
                    return !tmpMoment.isBetween(limit.from, limit.to);
                }
            },
            // change
            checkDayInRange: function checkDayInRange(day) {
              if ((day.unavailable && this.option.type != 'multi-day') || day.value === '' || day.moment == undefined || this.selectedDays.length <= 1) {
                    return false;
                }
              
              if (this.option.type != 'multi-day') return;

              // const startTime = new Date("2024-02-01")
              // const endTime = new Date("2024-02-12")
              const startTime = new Date(this.selectedDays[0].moment._d)
              const endTime = new Date(this.selectedDays[1].moment._d)
              const dayD = day.moment._d;
              if(
                dayD >= startTime &&
                dayD <= endTime
              )
                return true;
              else 
                return false;
            },
            checkDay: function checkDay(obj) {
                if (obj.unavailable || obj.value === '' || obj.moment == undefined) {
                    return false;
                }
                // console.log('checked', this.checked)

                if (!obj.inMonth) {
                    this.nextMonth(obj.action);
                }

                var day = this.pad(obj.value);
                if (this.option.type === 'day' || this.option.type === 'min') {
                    this.dayList.map(function (x) {
                        x.checked = false;
                    });
                    this.checked.day = day;
                    obj.checked = true;
                    this.selectedDays = [];
                } else if (this.option.type === 'week-picker') {
                    this.selectedDays = [];
                    var weekStart = obj.moment.startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                    var _this = this;
                    this.dayList.map(function (day) {
                        if (_this.selectedDays.indexOf(day.moment.format('YYYY-MM-DD')) !== -1) {
                            day.checked = true;
                        } else {
                            day.checked = false;
                        }
                    });
                } else {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + day;

                    if(!obj.inMonth) return;

                    if (obj.checked === true) {
                        obj.checked = false;
                        // this.selectedDays.$remove(obj);
                        this.selectedDays = this.selectedDays.filter(item => item.value !== obj.value)
                    } 
                    else if (this.selectedDays.length === 2) {
                        const startTime = this.selectedDays[0].moment._d;
                        const endTime = this.selectedDays[1].moment._d;

                        if(new Date(ctime) < startTime) {
                            // console.log(this.selectedDays[0])
                            // console.log(this.dayList)
                            let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[0]))
                            if(pastDay !== this.selectedDays[0] && pastDay) {
                              pastDay.checked = false;
                            }
                            else {
                              this.selectedDays[0].checked = false;
                            }
                            this.selectedDays.shift();
                            this.selectedDays.unshift(obj)
                        }
                        else {
                            // console.log(this.dayList)
                            // console.log(this.selectedDays[1])
                            // ?
                            let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[1]))
                            // if(!pastDay) {
                            //   pastDay = this.dayList.find(item => item.value == this.isDatesEqual(item, this.selectedDays[1]))
                            // }
                            // console.log('сравнение', pastDay === this.selectedDays[1])
                            // if(!pastDay) return;
                            // console.log('pastDay', pastDay)
                            // pastDay.checked = false;
                            // console.log(pastDay)
                            // console.log('сравнение 1', pastDay === this.dayList[39])
                            // console.log('сравнение 2', this.selectedDays[1] === obj)
                            if(pastDay !== this.selectedDays[1] && pastDay) {
                              pastDay.checked = false;
                              // console.log('pastDay work')
                            }
                            else {
                              this.selectedDays[1].checked = false;
                              // console.log('selectedDays work')
                            }
                            this.selectedDays.pop();
                            this.selectedDays.push(obj)
                        }
                        // console.log(this.dayList)
                        // console.log(obj)
                        // console.log(this.selectedDays)
                        obj.checked = true;
                        // this.checked.currentMoment._d = this.checked.currentMoment._i = this.selectedDays[0].moment._d
                        // this.checked.oldtime = this.selectedDays[0].moment._d;
                    }
                    else {
                      if(!this.selectedDays[0]) {
                        this.selectedDays.push(obj);
                      }
                      else if(obj.moment._d < this.selectedDays[0].moment._d) {
                        this.selectedDays.unshift(obj);
                      }
                      else {
                        this.selectedDays.push(obj);
                      }
                      obj.checked = true;
                      // this.checked.currentMoment._d = this.checked.currentMoment._i = this.selectedDays[0].moment._d
                      // this.checked.oldtime = this.selectedDays[0].moment._d;
                    }
                }

                switch (this.option.type) {
                    case 'day':
                    case 'week-picker':
                        this.picked();
                        break;
                    case 'min':
                        this.showOne('hour');
                        break;
                }
            },
            showYear: function showYear() {
                var year = (0, _moment2.default)(this.checked.currentMoment).year();
                this.library.year = [];
                var yearTmp = [];
                for (var i = year - 100; i < year + 5; ++i) {
                    yearTmp.push(i);
                }
                this.library.year = yearTmp;

                this.showOne('year');

                var self = this;
                this.$nextTick(function () {
                    var listDom = document.getElementById('yearList');
                    listDom.scrollTop = listDom.scrollHeight - 100;
                    self.addYear();
                });
            },
            showOne: function showOne(type) {
                switch (type) {
                    case 'year':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = true;
                        this.showInfo.month = false;
                        break;
                    case 'month':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = true;
                        break;
                    case 'day':
                        this.showInfo.hour = false;
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    case 'hour':
                        this.showInfo.hour = true;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    default:
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        this.showInfo.hour = false;
                }
            },
            showMonth: function showMonth() {
                this.showOne('month');
            },
            addYear: function addYear() {
                var _this3 = this;

                var listDom = document.getElementById('yearList');
                // let tmp = 0
                listDom.addEventListener('scroll', function (e) {
                    if (listDom.scrollTop < listDom.scrollHeight - 100) {
                        var len = _this3.library.year.length;
                        var lastYear = _this3.library.year[len - 1];
                        _this3.library.year.push(lastYear + 1);
                    }
                }, false);
            },
            setYear: function setYear(year) {
                this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            setMonth: function setMonth(month) {
                var mo = this.library.month.indexOf(month) + 1;
                if (mo < 10) {
                    mo = '0' + '' + mo;
                }
                this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            showCheck: function showCheck() {
                if (this.time === '' && (!this.selectedDays[0] && this.option.type === 'multi-day')) {
                    this.showDay();
                } else {
                    if (this.option.type === 'day' || this.option.type === 'min' || this.option.type === 'week-picker') {
                        this.checked.oldtime = this.time;
                        this.showDay(this.time);
                    } else {
                        // change !
                        if (this.selectedDays.length) {
                            this.showDay(this.selectedDays[0].moment._d);
                        } else {
                            const [ firstDay, lastDay ] = this.time.split(' - ')
                            const firstDate = new Date(firstDay)
                            const lastDate = new Date(lastDay)

                            this.selectedDays[0] = {
                                value: firstDate.getDate(),
                                inMonth: true,
                                unavailable: false,
                                checked: true,
                                moment: (0, _moment2.default)(firstDate).date(firstDate.getDate())
                            }
                            
                            if(lastDay) {
                              this.selectedDays[1] = {
                                  value: lastDate.getDate(),
                                  inMonth: true,
                                  unavailable: false,
                                  checked: true,
                                  moment: (0, _moment2.default)(lastDate).date(lastDate.getDate())
                              }
                            }
                            this.showDay(this.selectedDays[0].moment._d);
                        }
                    }
                }
                this.showInfo.check = true;
            },
            setTime: function setTime(type, obj, list) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        item.checked = false;
                        if (item.value === obj.value) {
                            item.checked = true;
                            this.checked[type] = item.value;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            },
            // change !
            prepareDate: function(date) {
              if(!date) return;
              return this.pad(date.moment._d.getMonth() + 1) + '/' + this.pad(date.moment._d.getDate()) + '/' + date.moment._d.getFullYear()
            },
            picked: function picked() {
                if (this.option.type === 'day' || this.option.type === 'min') {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
                    this.checked.currentMoment = (0, _moment2.default)(ctime, 'YYYY-MM-DD HH:mm');
                    this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
                } else if (this.option.type === 'week-picker') {
                    // return as a result the first day of the week
                    var weekStart = (0, _moment2.default)(this.selectedDays[0], 'YYYY-MM-DD').startOf('week');
                    this.time = weekStart.format(this.option.format);
                } else { // change !
                  const ftime = this.prepareDate(this.selectedDays[0]);
                  const ltime = this.prepareDate(this.selectedDays[1]);
                  this.time = ltime ? `${ftime} - ${ltime}` : ftime
                  // this.time = ltime ? [ftime, ltime] : ftime
                }
                this.showInfo.check = false;
                // if(this.selectedDays.length)
                //   this.checked.currentMoment = this.selectedDays[0].moment._d
                this.$emit('change', this.time, this.dayList, this.selectedDays);
                this.$dispatch('date-picker::selected', this.time)
            },
            dismiss: function dismiss(evt) {
                if (evt.target.className === 'datepicker-overlay') {
                    if (this.option.dismissible === undefined || this.option.dismissible) {
                        this.showInfo.check = false;
                        this.$emit('cancel');
                    }
                }
            }
        }
    };
</script>

<template>
  <div class="cov-vue-date">
    <div v-if="!option.inline && !option.element" class="datepickbox">
      <input
              type="text"
              title="input date"
              class="cov-datepicker"
              readonly="readonly"
              placeholder="{{option.placeholder}}"
              v-model="time"
              :required="required"
              @click="showCheck"
              @foucus="showCheck"
              :style="option.inputStyle"/>
    </div>
    <i v-if="option.element == 'image'" :style="option.inputStyle" @click="showCheck" class="datepickimage material-icons input-field">today</i>
    <!-- MODAL LAYOUT -->
    <div class="datepicker-overlay"
         v-if="showInfo.check"
         @click="dismiss($event)"
         :style="{
    'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'
    }">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'day-in-range': checkDayInRange(day),
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
    <!-- INLINE LAYOUT -->
    <div v-if="option.inline" class="datepicker-inline">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>



<!-- !!!!!!!!!!!! -->

























<!-- ESLINT SAVE -->


<script>
    'use strict'
    /* eslint-disable */

    Object.defineProperty(exports, '__esModule', {
      value: true
    })

    var _moment = require('moment')

    _moment.updateLocale('en', {
      week: {
        dow: 1 // Monday is the first day of the week
      }
    })
    _moment.locale('en')

    var _moment2 = _interopRequireDefault(_moment)

    function _interopRequireDefault (obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    exports.default = {
      props: {
        required: false,
        time: {
          type: String,
          required: true
        },
        option: {
          type: Object,
          default: function _default () {
            return {
              type: 'day',
              SundayFirst: false,
              week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
              month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              format: 'YYYY-MM-DD',
              color: {
                checked: '#F50057',
                header: '#3f51b5',
                headerText: '#fff'
              },
              inputStyle: {
                'display': 'inline-block',
                'padding': '6px',
                'line-height': '22px',
                'font-size': '16px',
                'border': '2px solid #fff',
                'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                'border-radius': '2px',
                'color': '#5F5F5F'
              },
              placeholder: '',
              buttons: {
                ok: 'OK',
                cancel: 'Cancel'
              },
              overlayOpacity: 0.5,
              dismissible: true,
              selectedDays: [],
              inline: false
            }
          }
        },
        limit: {
          type: Array,
          default: function _default () {
            return []
          }
        }
      },
      data: function data () {
        function hours () {
          var list = []
          var hour = 24
          while (hour > 0) {
            hour--

            list.push({
              checked: false,
              value: hour < 10 ? '0' + hour : hour
            })
          }
          return list
        }
        function mins () {
          var list = []
          var min = 60
          while (min > 0) {
            min--
            list.push({
              checked: false,
              value: min < 10 ? '0' + min : min
            })
          }
          return list
        }
        return {
          hours: hours(),
          mins: mins(),
          showInfo: {
            hour: false,
            day: false,
            month: false,
            year: false,
            check: false
          },
          displayInfo: {
            month: ''
          },
          library: {
            week: this.option.week,
            month: this.option.month,
            year: []
          },
          checked: {
            oldtime: '',
            currentMoment: null,
            year: '',
            month: '',
            day: '',
            hour: '00',
            min: '00'
          },
          dayList: [],
          selectedDays: (this.option.selectedDays ? this.option.selectedDays : [])
        }
      },
      watch: {
        'time': function (nVal, oVal) {
          if (this.option.type === 'week-picker') {
            var self = this
            var day = this.dayList.filter(function (obj) {
              return obj.moment.format('MM/DD/Y') === _moment(self.time).format('MM/DD/Y')
            })
            this.checkDay(day)
            var weekStart = _moment(self.time)
            this.selectedDays = []
            for (var d = 0; d < 7; d++) {
              var weekDay = weekStart.add((d === 0) ? 0 : 1, 'd').format('YYYY-MM-DD')
              this.selectedDays.push(weekDay)
            }
          }
        }
      },
      created () {
        if (this.option.type === 'week-picker') {
          if (this.selectedDays.length === 0) {
            var weekStart = (0, _moment2.default)().startOf('week')
            for (var d = 0; d < 7; d++) {
              var weekDay = weekStart.add((d === 0) ? 0 : 1, 'd').format('YYYY-MM-DD')
              this.selectedDays.push(weekDay)
            }
          }
          this.picked()
        }
        this.showDay()
      },
      methods: {
        pad: function pad (n) {
          n = Math.floor(n)
          return n < 10 ? '0' + n : n
        },
        nextMonth: function nextMonth (type) {
          var next = null
          type === 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M')
          this.showDay(next)
        },
        showDay: function showDay (time) {
          if (time === undefined || !Date.parse(time)) {
            this.checked.currentMoment = (0, _moment2.default)()
          } else {
            this.checked.currentMoment = (0, _moment2.default)(time, this.option.format)
          }
          this.showOne('day')
          this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format('YYYY')
          this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format('MM')
          this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format('DD')

          this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()]

          var days = []
          var currentMoment = this.checked.currentMoment
          var firstDay = (0, _moment2.default)(currentMoment).date(1).day()

          // gettting previous and next month
          // let currentMonth = moment(currentMoment)
          var previousMonth = (0, _moment2.default)(currentMoment)
          var nextMonth = (0, _moment2.default)(currentMoment)
          nextMonth.add(1, 'months')
          previousMonth.subtract(1, 'months')

          var monthDays = (0, _moment2.default)(currentMoment).daysInMonth()
          var oldtime = this.checked.oldtime
          for (var i = 1; i <= monthDays; ++i) {
            days.push({
              value: i,
              inMonth: true,
              unavailable: false,
              checked: false,
              moment: (0, _moment2.default)(currentMoment).date(i)
            })
            if (i === Math.ceil((0, _moment2.default)(currentMoment).format('D')) && (0, _moment2.default)(oldtime, this.option.format).year() === (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime, this.option.format).month() === (0, _moment2.default)(currentMoment).month()) {
              days[i - 1].checked = true
            }
          }

          if (firstDay === 0) firstDay = 7

          for (var _i = 0; _i < firstDay - (this.option.SundayFirst ? 0 : 1); _i++) {
            var passiveDay = {
              value: previousMonth.daysInMonth() - _i,
              inMonth: false,
              action: 'previous',
              unavailable: false,
              checked: false,
              moment: (0, _moment2.default)(currentMoment).date(1).subtract(_i + 1, 'days')
            }
            days.unshift(passiveDay)
          }

          var passiveDaysAtFinal = 42 - days.length
          for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
            var _passiveDay = {
              value: _i2,
              inMonth: false,
              action: 'next',
              unavailable: false,
              checked: false,
              moment: (0, _moment2.default)(currentMoment).add(1, 'months').date(_i2)
            }
            days.push(_passiveDay)
          }

          if (this.limit.length > 0) {
            var _iteratorNormalCompletion = true
            var _didIteratorError = false
            var _iteratorError

            try {
              for (var _iterator = this.limit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var li = _step.value

                switch (li.type) {
                  case 'fromto':
                    days = this.limitFromTo(li, days)
                    break
                  case 'weekday':
                    days = this.limitWeekDay(li, days)
                    break
                }
              }
            } catch (err) {
              _didIteratorError = true
              _iteratorError = err
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return()
                }
              } finally {
                if (_didIteratorError) {
                  throw new Error(`Iterator error: ${_iteratorError}`)
                }
              }
            }
          }
          if(this.option.type === 'multi-day')
            this.checkBySelectDays(days)
          this.dayList = days
        },
          isDatesEqual: function(date1, date2) {
              if(!date1 || !date2) return;
              const { _d: date1Obj } = date1.moment;
              const { _d: date2Obj } = date2.moment;

              return date1Obj.getFullYear() === date2Obj.getFullYear() &&
                      date1Obj.getHours() === date2Obj.getHours() &&
                      date1Obj.getMinutes() === date2Obj.getMinutes() &&
                      date1Obj.getDay() === date2Obj.getDay() &&
                      date1Obj.getDate() === date2Obj.getDate() &&
                      date1Obj.getMonth() === date2Obj.getMonth()
          },
          checkBySelectDays: function checkBySelectDays(days) {
              this.selectedDays.forEach((day) => {
                days.forEach((item, index) => {
                  if (this.isDatesEqual(item, day)) {
                      days[index].checked = true;
                  }
                })
              });
          },
          limitWeekDay: function limitWeekDay(limit, days) {
              return days.map(function (day) {
                  if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
                      day.unavailable = true;
                  }
                  return day;
              });
          },
          limitFromTo: function limitFromTo(limit, days) {
              var _this2 = this;

              if (limit.from || limit.to) {
                  days.map(function (day) {
                      if (_this2.getLimitCondition(limit, day)) {
                          day.unavailable = true;
                      }
                  });
              }
              return days;
          },
          getLimitCondition: function getLimitCondition(limit, day) {
              var tmpMoment = (0, _moment2.default)(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
              if (limit.from && !limit.to) {
                  return !tmpMoment.isAfter(limit.from);
              } else if (!limit.from && limit.to) {
                  return !tmpMoment.isBefore(limit.to);
              } else {
                  return !tmpMoment.isBetween(limit.from, limit.to);
              }
          },
          checkDayInRange: function checkDayInRange(day) {
            if ((day.unavailable && this.option.type != 'multi-day') || day.value === '' || day.moment == undefined || this.selectedDays.length <= 1) {
                  return false;
              }
            
            if (this.option.type != 'multi-day') return;

            const startTime = new Date(this.selectedDays[0].moment._d)
            const endTime = new Date(this.selectedDays[1].moment._d)
            const dayD = day.moment._d;
            if(
              dayD >= startTime &&
              dayD <= endTime
            )
              return true;
            else 
              return false;
          },
          checkDay: function checkDay(obj) {
              if (obj.unavailable || obj.value === '' || obj.moment == undefined) {
                  return false;
              }

              if (!obj.inMonth) {
                  this.nextMonth(obj.action);
              }

              var day = this.pad(obj.value);
              if (this.option.type === 'day' || this.option.type === 'min') {
                  this.dayList.map(function (x) {
                      x.checked = false;
                  });
                  this.checked.day = day;
                  obj.checked = true;
                  this.selectedDays = [];
              } else if (this.option.type === 'week-picker') {
                  this.selectedDays = [];
                  var weekStart = obj.moment.startOf('week');
                  for (var d = 0; d < 7; d++) {
                      var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                      this.selectedDays.push(weekDay);
                  }
                  var _this = this;
                  this.dayList.map(function (day) {
                      if (_this.selectedDays.indexOf(day.moment.format('YYYY-MM-DD')) !== -1) {
                          day.checked = true;
                      } else {
                          day.checked = false;
                      }
                  });
              } else {
                  var ctime = this.checked.year + '-' + this.checked.month + '-' + day;

                  if(!obj.inMonth) return;

                  if (obj.checked === true) {
                      obj.checked = false;
                      // this.selectedDays.$remove(obj);
                      this.selectedDays = this.selectedDays.filter(item => item.value !== obj.value)
                  } 
                  else if (this.selectedDays.length === 2) {
                      const startTime = this.selectedDays[0].moment._d;
                      const endTime = this.selectedDays[1].moment._d;

                      if(new Date(ctime) < startTime) {
                          let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[0]))
                          if(pastDay !== this.selectedDays[0] && pastDay) {
                            pastDay.checked = false;
                          }
                          else {
                            this.selectedDays[0].checked = false;
                          }
                          this.selectedDays.shift();
                          this.selectedDays.unshift(obj)
                      }
                      else {
                          let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[1]))
                          if(pastDay !== this.selectedDays[1] && pastDay) {
                            pastDay.checked = false;
                          }
                          else {
                            this.selectedDays[1].checked = false;
                          }
                          this.selectedDays.pop();
                          this.selectedDays.push(obj)
                      }
                      obj.checked = true;
                  }
                  else {
                    if(!this.selectedDays[0]) {
                      this.selectedDays.push(obj);
                    }
                    else if(obj.moment._d < this.selectedDays[0].moment._d) {
                      this.selectedDays.unshift(obj);
                    }
                    else {
                      this.selectedDays.push(obj);
                    }
                    obj.checked = true;
                  }
              }

              switch (this.option.type) {
                  case 'day':
                  case 'week-picker':
                      this.picked();
                      break;
                  case 'min':
                      this.showOne('hour');
                      break;
              }
          },
          showYear: function showYear() {
              var year = (0, _moment2.default)(this.checked.currentMoment).year();
              this.library.year = [];
              var yearTmp = [];
              for (var i = year - 100; i < year + 5; ++i) {
                  yearTmp.push(i);
              }
              this.library.year = yearTmp;

              this.showOne('year');

              var self = this;
              this.$nextTick(function () {
                  var listDom = document.getElementById('yearList');
                  listDom.scrollTop = listDom.scrollHeight - 100;
                  self.addYear();
              });
          },
          showOne: function showOne(type) {
              switch (type) {
                  case 'year':
                      this.showInfo.hour = false;
                      this.showInfo.day = false;
                      this.showInfo.year = true;
                      this.showInfo.month = false;
                      break;
                  case 'month':
                      this.showInfo.hour = false;
                      this.showInfo.day = false;
                      this.showInfo.year = false;
                      this.showInfo.month = true;
                      break;
                  case 'day':
                      this.showInfo.hour = false;
                      this.showInfo.day = true;
                      this.showInfo.year = false;
                      this.showInfo.month = false;
                      break;
                  case 'hour':
                      this.showInfo.hour = true;
                      this.showInfo.day = false;
                      this.showInfo.year = false;
                      this.showInfo.month = false;
                      break;
                  default:
                      this.showInfo.day = true;
                      this.showInfo.year = false;
                      this.showInfo.month = false;
                      this.showInfo.hour = false;
              }
          },
          showMonth: function showMonth() {
              this.showOne('month');
          },
          addYear: function addYear() {
              var _this3 = this;

              var listDom = document.getElementById('yearList');
              // let tmp = 0
              listDom.addEventListener('scroll', function (e) {
                  if (listDom.scrollTop < listDom.scrollHeight - 100) {
                      var len = _this3.library.year.length;
                      var lastYear = _this3.library.year[len - 1];
                      _this3.library.year.push(lastYear + 1);
                  }
              }, false);
          },
          setYear: function setYear(year) {
              this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
              this.showDay(this.checked.currentMoment);
          },
          setMonth: function setMonth(month) {
              var mo = this.library.month.indexOf(month) + 1;
              if (mo < 10) {
                  mo = '0' + '' + mo;
              }
              this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
              this.showDay(this.checked.currentMoment);
          },
          showCheck: function showCheck() {
              if (this.time === '' && (!this.selectedDays[0] && this.option.type === 'multi-day')) {
                  this.showDay();
              } else {
                  if (this.option.type === 'day' || this.option.type === 'min' || this.option.type === 'week-picker') {
                      this.checked.oldtime = this.time;
                      this.showDay(this.time);
                  } else {
                      if (this.selectedDays.length) {
                          this.showDay(this.selectedDays[0].moment._d);
                      } else {
                          const [ firstDay, lastDay ] = this.time.split(' - ')
                          const firstDate = new Date(firstDay)
                          const lastDate = new Date(lastDay)

                          this.selectedDays[0] = {
                              value: firstDate.getDate(),
                              inMonth: true,
                              unavailable: false,
                              checked: true,
                              moment: (0, _moment2.default)(firstDate).date(firstDate.getDate())
                          }
                          
                          if(lastDay) {
                            this.selectedDays[1] = {
                                value: lastDate.getDate(),
                                inMonth: true,
                                unavailable: false,
                                checked: true,
                                moment: (0, _moment2.default)(lastDate).date(lastDate.getDate())
                            }
                          }
                          this.showDay(this.selectedDays[0].moment._d);
                      }
                  }
              }
              this.showInfo.check = true;
          },
          setTime: function setTime(type, obj, list) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                  for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var item = _step2.value;

                      item.checked = false;
                      if (item.value === obj.value) {
                          item.checked = true;
                          this.checked[type] = item.value;
                      }
                  }
              } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                      }
                  } finally {
                      if (_didIteratorError2) {
                          throw _iteratorError2;
                      }
                  }
              }
          },
          prepareDate: function(date) {
            if(!date) return;
            return this.pad(date.moment._d.getMonth() + 1) + '/' + this.pad(date.moment._d.getDate()) + '/' + date.moment._d.getFullYear()
          },
          picked: function picked() {
              if (this.option.type === 'day' || this.option.type === 'min') {
                  var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
                  this.checked.currentMoment = (0, _moment2.default)(ctime, 'YYYY-MM-DD HH:mm');
                  this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
              } else if (this.option.type === 'week-picker') {
                  // return as a result the first day of the week
                  var weekStart = (0, _moment2.default)(this.selectedDays[0], 'YYYY-MM-DD').startOf('week');
                  this.time = weekStart.format(this.option.format);
              } else {
                const ftime = this.prepareDate(this.selectedDays[0]);
                const ltime = this.prepareDate(this.selectedDays[1]);
                this.time = ltime ? `${ftime} - ${ltime}` : ftime
              }
              this.showInfo.check = false;
              this.$emit('change', this.time, this.dayList, this.selectedDays);
              this.$dispatch('date-picker::selected', this.time)
          },
          dismiss: function dismiss(evt) {
              if (evt.target.className === 'datepicker-overlay') {
                  if (this.option.dismissible === undefined || this.option.dismissible) {
                      this.showInfo.check = false;
                      this.$emit('cancel');
                  }
              }
          }
      }
    };
</script>
<style scoped>
  .datepicker-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index:998;
    top:0;
    left: 0;
    overflow: hidden;
    -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 0.5s; /* Firefox < 16 */
    -ms-animation: fadein 0.5s; /* Internet Explorer */
    -o-animation: fadein 0.5s; /* Opera < 12.1 */
    animation: fadein 0.5s;
  }


  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .cov-date-body {
    display: inline-block;
    background: #3F51B5;
    overflow: hidden;
    position: relative;
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 400;
    position: fixed;
    display: block;
    width: 400px;
    max-width: 100%;
    z-index: 999;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

  .cov-picker-box {
    background: #fff;
    width: 100%;
    display: inline-block;
    padding: 25px;
    box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    -ms-box-sizing: border-box !important;
    width: 400px;
    max-width: 100%;
    height: 280px;
    text-align: start!important;
  }

  .cov-picker-box td {
    height: 34px;
    width: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    text-align: center;
    cursor: pointer;
  }

  .cov-picker-box td:hover {
    background: #E6E6E6;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  .day {
    width: 14.2857143%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    height: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    vertical-align: middle;
  }

  .week ul {
    margin: 0 0 8px;
    padding: 0;
    list-style: none;
  }

  .week ul li {
    width: 14.2%;
    display: inline-block;
    text-align: center;
    background: transparent;
    color: #000;
    font-weight: bold;
  }

  .passive-day{
    color: #bbb;
  }
  .checked {
    background: #F50057;
    color: #FFF !important;
    border-radius: 3px;
  }

  .unavailable {
    color: #ccc;
    cursor: not-allowed;
  }

  .cov-date-monthly {
    height: 150px;
  }

  .cov-date-monthly > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    vertical-align: middle;
    color: #fff;
    height: 150px;
    float: left;
    text-align: center;
    cursor: pointer;
  }

  .cov-date-previous,
  .cov-date-next {
    position: relative;
    width: 20% !important;
    text-indent: -300px;
    overflow: hidden;
    color: #fff;
  }

  .cov-date-caption {
    width: 60%;
    padding: 50px 0!important;
    box-sizing: border-box;
    font-size: 24px;
  }

  .cov-date-caption span:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .cov-date-previous:hover,
  .cov-date-next:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .day:hover {
    background: #EAEAEA;
  }

  .unavailable:hover {
    background: none;
  }

  .checked:hover {
    background: #FF4F8E;
  }

  .day-in-range {
    background-color: #039ae563;
  }

  .cov-date-next::before,
  .cov-date-previous::before {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    top: 50%;
    margin-top: -7px;
    margin-left: -7px;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-next::after,
  .cov-date-previous::after {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    margin-top: 6px;
    margin-left: -7px;
    top: 50%;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .cov-date-previous::after {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-previous::before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .date-item {
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
    cursor: pointer;
  }

  .date-item:hover {
    background: #e0e0e0;
  }

  .date-list {
    overflow: auto;
    vertical-align: top;
    padding: 0;
  }

  .cov-vue-date {
    display: inline-block;
    color: #5D5D5D;
  }

  .button-box {
    background: #fff;
    vertical-align: top;
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding-right: 20px;
  }

  .button-box span {
    cursor: pointer;
    padding: 10px 20px;
  }

  .watch-box {
    height: 100%;
    overflow: hidden;
  }

  .hour-box,
  .min-box {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 100%;
    overflow: auto;
    float: left;
  }
  .hour-box ul,
  .min-box ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .hour-item, .min-item {
    padding: 10px;
    font-size: 36px;
    cursor: pointer;
  }
  .hour-item:hover, .min-item:hover{
    background: #E3E3E3;
  }
  .hour-box .active, .min-box .active{
    background: #F50057;
    color: #FFF !important;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #E3E3E3;
  }
  ::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: 2px;
  }
</style>
<template>
  <div class="cov-vue-date">
    <div v-if="!option.inline && !option.element" class="datepickbox">
      <input
              type="text"
              title="input date"
              class="cov-datepicker"
              readonly="readonly"
              placeholder="{{option.placeholder}}"
              v-model="time"
              :required="required"
              @click="showCheck"
              @foucus="showCheck"
              :style="option.inputStyle"/>
    </div>
    <i v-if="option.element == 'image'" :style="option.inputStyle" @click="showCheck" class="datepickimage material-icons input-field">today</i>
    <!-- MODAL LAYOUT -->
    <div class="datepicker-overlay"
         v-if="showInfo.check"
         @click="dismiss($event)"
         :style="{
    'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'
    }">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'day-in-range': checkDayInRange(day),
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
    <!-- INLINE LAYOUT -->
    <div v-if="option.inline" class="datepicker-inline">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>



<!-- !!! -->






<!-- Save 13.02 утром-->

<script>
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _moment = require('moment');

    _moment.updateLocale('en', {
        week : {
            dow : 1 // Monday is the first day of the week
        }
    });
    _moment.locale('en')

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    exports.default = {
        props: {
            required: false,
            time: {
                type: String,
                required: true
            },
            option: {
                type: Object,
                default: function _default() {
                    return {
                        type: 'day',
                        SundayFirst: false,
                        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        format: 'YYYY-MM-DD',
                        color: {
                            checked: '#F50057',
                            header: '#3f51b5',
                            headerText: '#fff'
                        },
                        inputStyle: {
                            'display': 'inline-block',
                            'padding': '6px',
                            'line-height': '22px',
                            'font-size': '16px',
                            'border': '2px solid #fff',
                            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                            'border-radius': '2px',
                            'color': '#5F5F5F'
                        },
                        placeholder: '',
                        buttons: {
                            ok: 'OK',
                            cancel: 'Cancel'
                        },
                        overlayOpacity: 0.5,
                        dismissible: true,
                        selectedDays: [],
                        inline: false
                    };
                }
            },
            limit: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        data: function data() {
            function hours() {
                var list = [];
                var hour = 24;
                while (hour > 0) {
                    hour--;

                    list.push({
                        checked: false,
                        value: hour < 10 ? '0' + hour : hour
                    });
                }
                return list;
            }
            function mins() {
                var list = [];
                var min = 60;
                while (min > 0) {
                    min--;
                    list.push({
                        checked: false,
                        value: min < 10 ? '0' + min : min
                    });
                }
                return list;
            }
            return {
                hours: hours(),
                mins: mins(),
                showInfo: {
                    hour: false,
                    day: false,
                    month: false,
                    year: false,
                    check: false
                },
                displayInfo: {
                    month: ''
                },
                library: {
                    week: this.option.week,
                    month: this.option.month,
                    year: []
                },
                checked: {
                    oldtime: '',
                    currentMoment: null,
                    year: '',
                    month: '',
                    day: '',
                    hour: '00',
                    min: '00'
                },
                dayList: [],
                selectedDays: (this.option.selectedDays ? this.option.selectedDays : []),
            };
        },
        watch: {
            'time': function (nVal, oVal) {
                if (this.option.type === 'week-picker') {
                    var self = this;
                    var day = this.dayList.filter(function (obj) {
                        return obj.moment.format('MM/DD/Y') == _moment(self.time).format('MM/DD/Y');
                    });
                    this.checkDay(day);
                    var weekStart = _moment(self.time);
                    this.selectedDays = [];
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
            }
        },
        created () {
            if (this.option.type === 'week-picker') {
                if (this.selectedDays.length == 0) {
                    var weekStart = (0, _moment2.default)().startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
                this.picked();
            }
            this.showDay();
        },

        methods: {
            pad: function pad(n) {
                n = Math.floor(n);
                return n < 10 ? '0' + n : n;
            },
            nextMonth: function nextMonth(type) {
                var next = null;
                type === 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M');
                this.showDay(next);
            },
            showDay: function showDay(time) {
                if (time === undefined || !Date.parse(time)) {
                    this.checked.currentMoment = (0, _moment2.default)();
                } else {
                    this.checked.currentMoment = (0, _moment2.default)(time, this.option.format);
                }
                this.showOne('day');
                // console.log('check!!', this.checked)
                this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format('YYYY');
                this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format('MM');
                this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format('DD');

                this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()];

                var days = [];
                var currentMoment = this.checked.currentMoment;
                var firstDay = (0, _moment2.default)(currentMoment).date(1).day();

                // gettting previous and next month
                // let currentMonth = moment(currentMoment)
                var previousMonth = (0, _moment2.default)(currentMoment);
                var nextMonth = (0, _moment2.default)(currentMoment);
                nextMonth.add(1, 'months');
                previousMonth.subtract(1, 'months');

                var monthDays = (0, _moment2.default)(currentMoment).daysInMonth();
                var oldtime = this.checked.oldtime;
                for (var i = 1; i <= monthDays; ++i) {
                    days.push({
                        value: i,
                        inMonth: true,
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(i)
                    });
                    if (i === Math.ceil((0, _moment2.default)(currentMoment).format('D')) && (0, _moment2.default)(oldtime, this.option.format).year() === (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime, this.option.format).month() === (0, _moment2.default)(currentMoment).month()) {
                        days[i - 1].checked = true;
                    }
                }

                if (firstDay === 0) firstDay = 7;

                for (var _i = 0; _i < firstDay - (this.option.SundayFirst ? 0 : 1); _i++) {
                    var passiveDay = {
                        value: previousMonth.daysInMonth() - _i,
                        inMonth: false,
                        action: 'previous',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(1).subtract(_i + 1, 'days')
                    };
                    days.unshift(passiveDay);
                }

                var passiveDaysAtFinal = 42 - days.length;
                for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
                    var _passiveDay = {
                        value: _i2,
                        inMonth: false,
                        action: 'next',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).add(1, 'months').date(_i2)
                    };
                    days.push(_passiveDay);
                }

                if (this.limit.length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.limit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var li = _step.value;

                            switch (li.type) {
                                case 'fromto':
                                    days = this.limitFromTo(li, days);
                                    break;
                                case 'weekday':
                                    days = this.limitWeekDay(li, days);
                                    break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                // console.log('in show days')

                this.checkBySelectDays(days);
                this.dayList = days;
                // console.log('FINALL', this.dayList === days)
            },
            isDatesEqual: function(date1, date2) {
                // if(!date1 || !date2) return;

                // return date1.value == date2.value && date1.inMonth && date2.inMonth
                
                if(!date1 || !date2) return;
                const { _d: date1Obj } = date1.moment;
                const { _d: date2Obj } = date2.moment;

                return date1Obj.getFullYear() === date2Obj.getFullYear() &&
                        date1Obj.getHours() === date2Obj.getHours() &&
                        date1Obj.getMinutes() === date2Obj.getMinutes() &&
                        date1Obj.getDay() === date2Obj.getDay() &&
                        date1Obj.getDate() === date2Obj.getDate() &&
                        date1Obj.getMonth() === date2Obj.getMonth()
                // if(
                  // date1Obj.getFullYear() === date2Obj.getFullYear() &&
                  // date1Obj.getHours() === date2Obj.getHours() &&
                  // date1Obj.getMinutes() === date2Obj.getMinutes() &&
                  // date1Obj.getDay() === date2Obj.getDay() &&
                  // date1Obj.getDate() === date2Obj.getDate() &&
                  // date1Obj.getMonth() === date2Obj.getMonth()
                // ) {
                //   console.log(date1Obj)
                //   console.log(date2Obj)
                //   return true;
                // }
                // else return false;
            },
            checkBySelectDays: function checkBySelectDays(days) {
                var _this = this;
                console.log(this.selectedDays)
                console.log(this.dayList)
                this.selectedDays.forEach((day) => {
                  days.forEach((item, index) => {
                    if (this.isDatesEqual(item, day)) {
                      // console.log('dayInSel', day)
                      // console.log('dayInList', item)
                      console.log('!!!', index)
                      // console.log('checked', this.checked)
                        days[index].checked = true;
                    }
                  })
                });
                console.log('AFTER')
                console.log(this.selectedDays)
                console.log(this.dayList)
            },
            limitWeekDay: function limitWeekDay(limit, days) {
                return days.map(function (day) {
                    if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
                        day.unavailable = true;
                    }
                    return day;
                });
            },
            limitFromTo: function limitFromTo(limit, days) {
                var _this2 = this;

                if (limit.from || limit.to) {
                    days.map(function (day) {
                        if (_this2.getLimitCondition(limit, day)) {
                            day.unavailable = true;
                        }
                    });
                }
                return days;
            },
            getLimitCondition: function getLimitCondition(limit, day) {
                var tmpMoment = (0, _moment2.default)(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
                if (limit.from && !limit.to) {
                    return !tmpMoment.isAfter(limit.from);
                } else if (!limit.from && limit.to) {
                    return !tmpMoment.isBefore(limit.to);
                } else {
                    return !tmpMoment.isBetween(limit.from, limit.to);
                }
            },
            // change
            checkDayInRange: function checkDayInRange(day) {
              if ((day.unavailable && this.option.type != 'multi-day') || day.value === '' || day.moment == undefined || this.selectedDays.length <= 1) {
                    return false;
                }
              
              if (this.option.type != 'multi-day') return;

              // const startTime = new Date("2024-02-01")
              // const endTime = new Date("2024-02-12")
              const startTime = new Date(this.selectedDays[0].moment._d)
              const endTime = new Date(this.selectedDays[1].moment._d)
              const dayD = day.moment._d;
              if(
                dayD >= startTime &&
                dayD <= endTime
              )
                return true;
              else 
                return false;
            },
            checkDay: function checkDay(obj) {
                if (obj.unavailable || obj.value === '' || obj.moment == undefined) {
                    return false;
                }
                console.log('checked', this.checked)

                if (!obj.inMonth) {
                    this.nextMonth(obj.action);
                }

                var day = this.pad(obj.value);
                if (this.option.type === 'day' || this.option.type === 'min') {
                    this.dayList.map(function (x) {
                        x.checked = false;
                    });
                    this.checked.day = day;
                    obj.checked = true;
                    this.selectedDays = [];
                } else if (this.option.type === 'week-picker') {
                    this.selectedDays = [];
                    var weekStart = obj.moment.startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                    var _this = this;
                    this.dayList.map(function (day) {
                        if (_this.selectedDays.indexOf(day.moment.format('YYYY-MM-DD')) !== -1) {
                            day.checked = true;
                        } else {
                            day.checked = false;
                        }
                    });
                } else {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + day;

                    if(!obj.inMonth) return;

                    if (obj.checked === true) {
                        obj.checked = false;
                        // this.selectedDays.$remove(obj);
                        this.selectedDays = this.selectedDays.filter(item => item.value !== obj.value)
                    } 
                    else if (this.selectedDays.length === 2) {
                        const startTime = this.selectedDays[0].moment._d;
                        const endTime = this.selectedDays[1].moment._d;

                        if(new Date(ctime) < startTime) {
                            // console.log(this.selectedDays[0])
                            // console.log(this.dayList)
                            let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[0]))
                            if(pastDay !== this.selectedDays[0] && pastDay) {
                              pastDay.checked = false;
                            }
                            else {
                              this.selectedDays[0].checked = false;
                            }
                            this.selectedDays.shift();
                            this.selectedDays.unshift(obj)
                        }
                        else {
                            // console.log(this.dayList)
                            // console.log(this.selectedDays[1])
                            // ?
                            let pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[1]))
                            // if(!pastDay) {
                            //   pastDay = this.dayList.find(item => item.value == this.isDatesEqual(item, this.selectedDays[1]))
                            // }
                            // console.log('сравнение', pastDay === this.selectedDays[1])
                            // if(!pastDay) return;
                            // console.log('pastDay', pastDay)
                            // pastDay.checked = false;
                            // console.log(pastDay)
                            // console.log('сравнение 1', pastDay === this.dayList[39])
                            // console.log('сравнение 2', this.selectedDays[1] === obj)
                            if(pastDay !== this.selectedDays[1] && pastDay) {
                              pastDay.checked = false;
                              // console.log('pastDay work')
                            }
                            else {
                              this.selectedDays[1].checked = false;
                              // console.log('selectedDays work')
                            }
                            this.selectedDays.pop();
                            this.selectedDays.push(obj)
                        }
                        // console.log(this.dayList)
                        // console.log(obj)
                        // console.log(this.selectedDays)
                        obj.checked = true;
                        // this.checked.currentMoment._d = this.checked.currentMoment._i = this.selectedDays[0].moment._d
                        // this.checked.oldtime = this.selectedDays[0].moment._d;
                    }
                    else {
                      if(!this.selectedDays[0]) {
                        this.selectedDays.push(obj);
                      }
                      else if(obj.moment._d < this.selectedDays[0].moment._d) {
                        this.selectedDays.unshift(obj);
                      }
                      else {
                        this.selectedDays.push(obj);
                      }
                      obj.checked = true;
                      // this.checked.currentMoment._d = this.checked.currentMoment._i = this.selectedDays[0].moment._d
                      // this.checked.oldtime = this.selectedDays[0].moment._d;
                    }
                }

                switch (this.option.type) {
                    case 'day':
                    case 'week-picker':
                        this.picked();
                        break;
                    case 'min':
                        this.showOne('hour');
                        break;
                }
            },
            showYear: function showYear() {
                var year = (0, _moment2.default)(this.checked.currentMoment).year();
                this.library.year = [];
                var yearTmp = [];
                for (var i = year - 100; i < year + 5; ++i) {
                    yearTmp.push(i);
                }
                this.library.year = yearTmp;

                this.showOne('year');

                var self = this;
                this.$nextTick(function () {
                    var listDom = document.getElementById('yearList');
                    listDom.scrollTop = listDom.scrollHeight - 100;
                    self.addYear();
                });
            },
            showOne: function showOne(type) {
                switch (type) {
                    case 'year':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = true;
                        this.showInfo.month = false;
                        break;
                    case 'month':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = true;
                        break;
                    case 'day':
                        this.showInfo.hour = false;
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    case 'hour':
                        this.showInfo.hour = true;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    default:
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        this.showInfo.hour = false;
                }
            },
            showMonth: function showMonth() {
                this.showOne('month');
            },
            addYear: function addYear() {
                var _this3 = this;

                var listDom = document.getElementById('yearList');
                // let tmp = 0
                listDom.addEventListener('scroll', function (e) {
                    if (listDom.scrollTop < listDom.scrollHeight - 100) {
                        var len = _this3.library.year.length;
                        var lastYear = _this3.library.year[len - 1];
                        _this3.library.year.push(lastYear + 1);
                    }
                }, false);
            },
            setYear: function setYear(year) {
                this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            setMonth: function setMonth(month) {
                var mo = this.library.month.indexOf(month) + 1;
                if (mo < 10) {
                    mo = '0' + '' + mo;
                }
                this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            showCheck: function showCheck() {
              // console.log('in showCheck', this.selectedDays)
              // console.log('time', this.time)
                if (this.time === '' && !this.selectedDays[0]) {
                    this.showDay();
                } else {
                    if (this.option.type === 'day' || this.option.type === 'min' || this.option.type === 'week-picker') {
                        this.checked.oldtime = this.time;
                        this.showDay(this.time);
                    } else {
                        // this.selectedDays = JSON.parse(this.time);
                        // change !
                        if (this.selectedDays.length) {
                            // this.checked.oldtime = this.selectedDays[0].moment._d;
                            this.showDay(this.selectedDays[0].moment._d);
                        } else {
                            this.showDay();
                        }
                    }
                }
                this.showInfo.check = true;
            },
            setTime: function setTime(type, obj, list) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        item.checked = false;
                        if (item.value === obj.value) {
                            item.checked = true;
                            this.checked[type] = item.value;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            },
            // change !
            prepareDate: function(date) {
              return this.pad(date.moment._d.getMonth() + 1) + '-' + this.pad(date.moment._d.getDate()) + '-' + date.moment._d.getFullYear()
            },
            picked: function picked() {
                if (this.option.type === 'day' || this.option.type === 'min') {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
                    this.checked.currentMoment = (0, _moment2.default)(ctime, 'YYYY-MM-DD HH:mm');
                    this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
                } else if (this.option.type === 'week-picker') {
                    // return as a result the first day of the week
                    var weekStart = (0, _moment2.default)(this.selectedDays[0], 'YYYY-MM-DD').startOf('week');
                    this.time = weekStart.format(this.option.format);
                } else { // change !
                  const ftime = this.prepareDate(this.selectedDays[0]);
                  const ltime = this.prepareDate(this.selectedDays[1]);
                  this.time = `${ftime} - ${ltime}`
                }
                this.showInfo.check = false;
                // if(this.selectedDays.length)
                //   this.checked.currentMoment = this.selectedDays[0].moment._d
                this.$emit('change', this.time, this.dayList, this.selectedDays);
                this.$dispatch('date-picker::selected', this.time)
            },
            dismiss: function dismiss(evt) {
                if (evt.target.className === 'datepicker-overlay') {
                    if (this.option.dismissible === undefined || this.option.dismissible) {
                        this.showInfo.check = false;
                        this.$emit('cancel');
                    }
                }
            }
        }
    };
</script>
<style scoped>
  .datepicker-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index:998;
    top:0;
    left: 0;
    overflow: hidden;
    -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 0.5s; /* Firefox < 16 */
    -ms-animation: fadein 0.5s; /* Internet Explorer */
    -o-animation: fadein 0.5s; /* Opera < 12.1 */
    animation: fadein 0.5s;
  }


  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .cov-date-body {
    display: inline-block;
    background: #3F51B5;
    overflow: hidden;
    position: relative;
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 400;
    position: fixed;
    display: block;
    width: 400px;
    max-width: 100%;
    z-index: 999;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

  .cov-picker-box {
    background: #fff;
    width: 100%;
    display: inline-block;
    padding: 25px;
    box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    -ms-box-sizing: border-box !important;
    width: 400px;
    max-width: 100%;
    height: 280px;
    text-align: start!important;
  }

  .cov-picker-box td {
    height: 34px;
    width: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    text-align: center;
    cursor: pointer;
  }

  .cov-picker-box td:hover {
    background: #E6E6E6;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  .day {
    width: 14.2857143%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    height: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    vertical-align: middle;
  }

  .week ul {
    margin: 0 0 8px;
    padding: 0;
    list-style: none;
  }

  .week ul li {
    width: 14.2%;
    display: inline-block;
    text-align: center;
    background: transparent;
    color: #000;
    font-weight: bold;
  }

  .passive-day{
    color: #bbb;
  }
  .checked {
    background: #F50057;
    color: #FFF !important;
    border-radius: 3px;
  }

  .unavailable {
    color: #ccc;
    cursor: not-allowed;
  }

  .cov-date-monthly {
    height: 150px;
  }

  .cov-date-monthly > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    vertical-align: middle;
    color: #fff;
    height: 150px;
    float: left;
    text-align: center;
    cursor: pointer;
  }

  .cov-date-previous,
  .cov-date-next {
    position: relative;
    width: 20% !important;
    text-indent: -300px;
    overflow: hidden;
    color: #fff;
  }

  .cov-date-caption {
    width: 60%;
    padding: 50px 0!important;
    box-sizing: border-box;
    font-size: 24px;
  }

  .cov-date-caption span:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .cov-date-previous:hover,
  .cov-date-next:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .day:hover {
    background: #EAEAEA;
  }

  .unavailable:hover {
    background: none;
  }

  .checked:hover {
    background: #FF4F8E;
  }

  .day-in-range {
    background-color: #2e069c77;
  }

  .cov-date-next::before,
  .cov-date-previous::before {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    top: 50%;
    margin-top: -7px;
    margin-left: -7px;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-next::after,
  .cov-date-previous::after {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    margin-top: 6px;
    margin-left: -7px;
    top: 50%;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .cov-date-previous::after {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-previous::before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .date-item {
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
    cursor: pointer;
  }

  .date-item:hover {
    background: #e0e0e0;
  }

  .date-list {
    overflow: auto;
    vertical-align: top;
    padding: 0;
  }

  .cov-vue-date {
    display: inline-block;
    color: #5D5D5D;
  }

  .button-box {
    background: #fff;
    vertical-align: top;
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding-right: 20px;
  }

  .button-box span {
    cursor: pointer;
    padding: 10px 20px;
  }

  .watch-box {
    height: 100%;
    overflow: hidden;
  }

  .hour-box,
  .min-box {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 100%;
    overflow: auto;
    float: left;
  }
  .hour-box ul,
  .min-box ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .hour-item, .min-item {
    padding: 10px;
    font-size: 36px;
    cursor: pointer;
  }
  .hour-item:hover, .min-item:hover{
    background: #E3E3E3;
  }
  .hour-box .active, .min-box .active{
    background: #F50057;
    color: #FFF !important;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #E3E3E3;
  }
  ::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: 2px;
  }
</style>
<template>
  <div class="cov-vue-date">
    <div v-if="!option.inline && !option.element" class="datepickbox">
      <input
              type="text"
              title="input date"
              class="cov-datepicker"
              readonly="readonly"
              placeholder="{{option.placeholder}}"
              v-model="time"
              :required="required"
              @click="showCheck"
              @foucus="showCheck"
              :style="option.inputStyle"/>
    </div>
    <i v-if="option.element == 'image'" :style="option.inputStyle" @click="showCheck" class="datepickimage material-icons input-field">today</i>
    <!-- MODAL LAYOUT -->
    <div class="datepicker-overlay"
         v-if="showInfo.check"
         @click="dismiss($event)"
         :style="{
    'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'
    }">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'day-in-range': checkDayInRange(day),
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
    <!-- INLINE LAYOUT -->
    <div v-if="option.inline" class="datepicker-inline">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- !!!!!!!!!!!!! -->













<!-- Save 12.02 -->
<script>
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _moment = require('moment');

    _moment.updateLocale('en', {
        week : {
            dow : 1 // Monday is the first day of the week
        }
    });
    _moment.locale('en')

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    exports.default = {
        props: {
            required: false,
            time: {
                type: String,
                required: true
            },
            option: {
                type: Object,
                default: function _default() {
                    return {
                        type: 'day',
                        SundayFirst: false,
                        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        format: 'YYYY-MM-DD',
                        color: {
                            checked: '#F50057',
                            header: '#3f51b5',
                            headerText: '#fff'
                        },
                        inputStyle: {
                            'display': 'inline-block',
                            'padding': '6px',
                            'line-height': '22px',
                            'font-size': '16px',
                            'border': '2px solid #fff',
                            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                            'border-radius': '2px',
                            'color': '#5F5F5F'
                        },
                        placeholder: '',
                        buttons: {
                            ok: 'OK',
                            cancel: 'Cancel'
                        },
                        overlayOpacity: 0.5,
                        dismissible: true,
                        selectedDays: [],
                        inline: false
                    };
                }
            },
            limit: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        data: function data() {
            function hours() {
                var list = [];
                var hour = 24;
                while (hour > 0) {
                    hour--;

                    list.push({
                        checked: false,
                        value: hour < 10 ? '0' + hour : hour
                    });
                }
                return list;
            }
            function mins() {
                var list = [];
                var min = 60;
                while (min > 0) {
                    min--;
                    list.push({
                        checked: false,
                        value: min < 10 ? '0' + min : min
                    });
                }
                return list;
            }
            return {
                hours: hours(),
                mins: mins(),
                showInfo: {
                    hour: false,
                    day: false,
                    month: false,
                    year: false,
                    check: false
                },
                displayInfo: {
                    month: ''
                },
                library: {
                    week: this.option.week,
                    month: this.option.month,
                    year: []
                },
                checked: {
                    oldtime: '',
                    currentMoment: null,
                    year: '',
                    month: '',
                    day: '',
                    hour: '00',
                    min: '00'
                },
                dayList: [],
                selectedDays: (this.option.selectedDays ? this.option.selectedDays : []),
            };
        },
        watch: {
            'time': function (nVal, oVal) {
                if (this.option.type === 'week-picker') {
                    var self = this;
                    var day = this.dayList.filter(function (obj) {
                        return obj.moment.format('MM/DD/Y') == _moment(self.time).format('MM/DD/Y');
                    });
                    this.checkDay(day);
                    var weekStart = _moment(self.time);
                    this.selectedDays = [];
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
            }
        },
        created () {
            if (this.option.type === 'week-picker') {
                if (this.selectedDays.length == 0) {
                    var weekStart = (0, _moment2.default)().startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                }
                this.picked();
            }
            this.showDay();
        },

        methods: {
            pad: function pad(n) {
                n = Math.floor(n);
                return n < 10 ? '0' + n : n;
            },
            nextMonth: function nextMonth(type) {
                var next = null;
                type === 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M');
                this.showDay(next);
            },
            // change !
            isDatesEqual: function(date1, date2) {
                if(!date1 || !date2) return;

                return date1.value === date2.value && date1.inMonth && date2.inMonth
            },
            showDay: function showDay(time) {
                if (time === undefined || !Date.parse(time)) {
                    this.checked.currentMoment = (0, _moment2.default)();
                } else {
                    this.checked.currentMoment = (0, _moment2.default)(time, this.option.format);
                }
                this.showOne('day');

                this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format('YYYY');
                this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format('MM');
                this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format('DD');

                this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()];

                var days = [];
                var currentMoment = this.checked.currentMoment;
                var firstDay = (0, _moment2.default)(currentMoment).date(1).day();

                // gettting previous and next month
                // let currentMonth = moment(currentMoment)
                var previousMonth = (0, _moment2.default)(currentMoment);
                var nextMonth = (0, _moment2.default)(currentMoment);
                nextMonth.add(1, 'months');
                previousMonth.subtract(1, 'months');

                var monthDays = (0, _moment2.default)(currentMoment).daysInMonth();
                var oldtime = this.checked.oldtime;
                for (var i = 1; i <= monthDays; ++i) {
                    days.push({
                        value: i,
                        inMonth: true,
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(i)
                    });
                    if (i === Math.ceil((0, _moment2.default)(currentMoment).format('D')) && (0, _moment2.default)(oldtime, this.option.format).year() === (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime, this.option.format).month() === (0, _moment2.default)(currentMoment).month()) {
                        days[i - 1].checked = true;
                    }
                }

                if (firstDay === 0) firstDay = 7;

                for (var _i = 0; _i < firstDay - (this.option.SundayFirst ? 0 : 1); _i++) {
                    var passiveDay = {
                        value: previousMonth.daysInMonth() - _i,
                        inMonth: false,
                        action: 'previous',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).date(1).subtract(_i + 1, 'days')
                    };
                    days.unshift(passiveDay);
                }

                var passiveDaysAtFinal = 42 - days.length;
                for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
                    var _passiveDay = {
                        value: _i2,
                        inMonth: false,
                        action: 'next',
                        unavailable: false,
                        checked: false,
                        moment: (0, _moment2.default)(currentMoment).add(1, 'months').date(_i2)
                    };
                    days.push(_passiveDay);
                }

                if (this.limit.length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.limit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var li = _step.value;

                            switch (li.type) {
                                case 'fromto':
                                    days = this.limitFromTo(li, days);
                                    break;
                                case 'weekday':
                                    days = this.limitWeekDay(li, days);
                                    break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                console.log('in show days', this.selectedDays)
                this.checkBySelectDays(days);
                this.dayList = days;
            },
            checkBySelectDays: function checkBySelectDays(days) {
                var _this = this;
                this.selectedDays.forEach((day) => {
                  days.forEach((item, index) => {
                    if (this.isDatesEqual(item, day)) {
                        days[index].checked = true;
                    }
                  })
                });
            },
            limitWeekDay: function limitWeekDay(limit, days) {
                return days.map(function (day) {
                    if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
                        day.unavailable = true;
                    }
                    return day;
                });
            },
            limitFromTo: function limitFromTo(limit, days) {
                var _this2 = this;

                if (limit.from || limit.to) {
                    days.map(function (day) {
                        if (_this2.getLimitCondition(limit, day)) {
                            day.unavailable = true;
                        }
                    });
                }
                return days;
            },
            getLimitCondition: function getLimitCondition(limit, day) {
                var tmpMoment = (0, _moment2.default)(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
                if (limit.from && !limit.to) {
                    return !tmpMoment.isAfter(limit.from);
                } else if (!limit.from && limit.to) {
                    return !tmpMoment.isBefore(limit.to);
                } else {
                    return !tmpMoment.isBetween(limit.from, limit.to);
                }
            },
            checkDayInRange: function checkDayInRange(day) {
              if (day.unavailable || day.value === '' || day.moment == undefined || this.selectedDays.length <= 1) {
                    return false;
                }
              
              if (this.option.type != 'multi-day') return;

              // const startTime = new Date("2024-02-01")
              // const endTime = new Date("2024-02-12")
              const startTime = new Date(this.selectedDays[0].moment._d)
              const endTime = new Date(this.selectedDays[1].moment._d)
              const dayD = day.moment._d;
              if(
                dayD >= startTime &&
                dayD <= endTime
              )
                return true;
              else 
                return false;
            },
            checkDay: function checkDay(obj) {
                if (obj.unavailable || obj.value === '' || obj.moment == undefined) {
                    return false;
                }

                if (!obj.inMonth) {
                    this.nextMonth(obj.action);
                }

                var day = this.pad(obj.value);
                if (this.option.type === 'day' || this.option.type === 'min') {
                    this.dayList.map(function (x) {
                        x.checked = false;
                    });
                    this.checked.day = day;
                    obj.checked = true;
                    this.selectedDays = [];
                } else if (this.option.type === 'week-picker') {
                    this.selectedDays = [];
                    var weekStart = obj.moment.startOf('week');
                    for (var d = 0; d < 7; d++) {
                        var weekDay = weekStart.add((d == 0) ? 0 : 1, 'd').format('YYYY-MM-DD');
                        this.selectedDays.push(weekDay);
                    }
                    var _this = this;
                    this.dayList.map(function (day) {
                        if (_this.selectedDays.indexOf(day.moment.format('YYYY-MM-DD')) !== -1) {
                            day.checked = true;
                        } else {
                            day.checked = false;
                        }
                    });
                } else {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + day;

                    if (obj.checked === true) {
                        obj.checked = false;
                        // this.selectedDays.$remove(obj);
                        this.selectedDays = this.selectedDays.filter(item => item.value !== obj.value)
                    } 
                    else if (this.selectedDays.length === 2) {
                        const startTime = this.selectedDays[0].moment._d;
                        const endTime = this.selectedDays[1].moment._d;

                        if(new Date(ctime) < startTime) {
                            console.log(this.dayList)
                            const pastDay = this.dayList.find(item => item.moment._d.toString() == this.selectedDays[0].moment._d)
                            if(!pastDay) return;
                            pastDay.checked = false;
                            this.selectedDays.shift();
                            this.selectedDays.unshift(obj)
                        }
                        else {
                            console.log(this.dayList)
                            console.log(this.selectedDays[1])
                            const pastDay = this.dayList.find(item => this.isDatesEqual(item, this.selectedDays[1]))
                            pastDay.checked = false;
                            this.selectedDays.pop();
                            this.selectedDays.push(obj)
                        }
                        obj.checked = true;
                    }
                    else {
                      if(!this.selectedDays[0]) {
                        this.selectedDays.push(obj);
                      }
                      else if(obj.moment._d < this.selectedDays[0].moment._d) {
                        this.selectedDays.unshift(obj);
                      }
                      else {
                        this.selectedDays.push(obj);
                      }
                      obj.checked = true;
                    }
                }

                switch (this.option.type) {
                    case 'day':
                    case 'week-picker':
                        this.picked();
                        break;
                    case 'min':
                        this.showOne('hour');
                        break;
                }
            },
            showYear: function showYear() {
                var year = (0, _moment2.default)(this.checked.currentMoment).year();
                this.library.year = [];
                var yearTmp = [];
                for (var i = year - 100; i < year + 5; ++i) {
                    yearTmp.push(i);
                }
                this.library.year = yearTmp;

                this.showOne('year');

                var self = this;
                this.$nextTick(function () {
                    var listDom = document.getElementById('yearList');
                    listDom.scrollTop = listDom.scrollHeight - 100;
                    self.addYear();
                });
            },
            showOne: function showOne(type) {
                switch (type) {
                    case 'year':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = true;
                        this.showInfo.month = false;
                        break;
                    case 'month':
                        this.showInfo.hour = false;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = true;
                        break;
                    case 'day':
                        this.showInfo.hour = false;
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    case 'hour':
                        this.showInfo.hour = true;
                        this.showInfo.day = false;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        break;
                    default:
                        this.showInfo.day = true;
                        this.showInfo.year = false;
                        this.showInfo.month = false;
                        this.showInfo.hour = false;
                }
            },
            showMonth: function showMonth() {
                this.showOne('month');
            },
            addYear: function addYear() {
                var _this3 = this;

                var listDom = document.getElementById('yearList');
                // let tmp = 0
                listDom.addEventListener('scroll', function (e) {
                    if (listDom.scrollTop < listDom.scrollHeight - 100) {
                        var len = _this3.library.year.length;
                        var lastYear = _this3.library.year[len - 1];
                        _this3.library.year.push(lastYear + 1);
                    }
                }, false);
            },
            setYear: function setYear(year) {
                this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            setMonth: function setMonth(month) {
                var mo = this.library.month.indexOf(month) + 1;
                if (mo < 10) {
                    mo = '0' + '' + mo;
                }
                this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
                this.showDay(this.checked.currentMoment);
            },
            showCheck: function showCheck() {
              console.log('in showCheck', this.selectedDays)
              console.log('time', this.time)
                if (this.time === '') {
                    this.showDay();
                } else {
                    if (this.option.type === 'day' || this.option.type === 'min' || this.option.type === 'week-picker') {
                        this.checked.oldtime = this.time;
                        this.showDay(this.time);
                    } else {
                        // this.selectedDays = JSON.parse(this.time);
                        // change !
                        if (this.selectedDays.length) {
                            this.checked.oldtime = this.selectedDays[0].moment._d;
                            this.showDay(this.selectedDays[0].moment._d);
                        } else {
                            this.showDay();
                        }
                    }
                }
                this.showInfo.check = true;
            },
            setTime: function setTime(type, obj, list) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        item.checked = false;
                        if (item.value === obj.value) {
                            item.checked = true;
                            this.checked[type] = item.value;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            },
            // change !
            prepareDate: function(date) {
              return this.pad(date.moment._d.getMonth() + 1) + '-' + this.pad(date.moment._d.getDate()) + '-' + date.moment._d.getFullYear()
            },
            picked: function picked() {
                if (this.option.type === 'day' || this.option.type === 'min') {
                    var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
                    this.checked.currentMoment = (0, _moment2.default)(ctime, 'YYYY-MM-DD HH:mm');
                    this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
                } else if (this.option.type === 'week-picker') {
                    // return as a result the first day of the week
                    var weekStart = (0, _moment2.default)(this.selectedDays[0], 'YYYY-MM-DD').startOf('week');
                    this.time = weekStart.format(this.option.format);
                } else { // change !
                  const ftime = this.prepareDate(this.selectedDays[0]);
                  const ltime = this.prepareDate(this.selectedDays[1]);
                    this.time = `${ftime} - ${ltime}`
                }
                this.showInfo.check = false;
                this.$emit('change', this.time, this.dayList, this.selectedDays);
                this.$dispatch('date-picker::selected', this.time)
            },
            dismiss: function dismiss(evt) {
                if (evt.target.className === 'datepicker-overlay') {
                    if (this.option.dismissible === undefined || this.option.dismissible) {
                        this.showInfo.check = false;
                        this.$emit('cancel');
                    }
                }
            }
        }
    };
</script>
<style scoped>
  .datepicker-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index:998;
    top:0;
    left: 0;
    overflow: hidden;
    -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 0.5s; /* Firefox < 16 */
    -ms-animation: fadein 0.5s; /* Internet Explorer */
    -o-animation: fadein 0.5s; /* Opera < 12.1 */
    animation: fadein 0.5s;
  }


  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .cov-date-body {
    display: inline-block;
    background: #3F51B5;
    overflow: hidden;
    position: relative;
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 400;
    position: fixed;
    display: block;
    width: 400px;
    max-width: 100%;
    z-index: 999;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

  .cov-picker-box {
    background: #fff;
    width: 100%;
    display: inline-block;
    padding: 25px;
    box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    -ms-box-sizing: border-box !important;
    width: 400px;
    max-width: 100%;
    height: 280px;
    text-align: start!important;
  }

  .cov-picker-box td {
    height: 34px;
    width: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    text-align: center;
    cursor: pointer;
  }

  .cov-picker-box td:hover {
    background: #E6E6E6;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  .day {
    width: 14.2857143%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    height: 34px;
    padding: 0;
    line-height: 34px;
    color: #000;
    background: #fff;
    vertical-align: middle;
  }

  .week ul {
    margin: 0 0 8px;
    padding: 0;
    list-style: none;
  }

  .week ul li {
    width: 14.2%;
    display: inline-block;
    text-align: center;
    background: transparent;
    color: #000;
    font-weight: bold;
  }

  .passive-day{
    color: #bbb;
  }
  .checked {
    background: #F50057;
    color: #FFF !important;
    border-radius: 3px;
  }

  .unavailable {
    color: #ccc;
    cursor: not-allowed;
  }

  .cov-date-monthly {
    height: 150px;
  }

  .cov-date-monthly > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    vertical-align: middle;
    color: #fff;
    height: 150px;
    float: left;
    text-align: center;
    cursor: pointer;
  }

  .cov-date-previous,
  .cov-date-next {
    position: relative;
    width: 20% !important;
    text-indent: -300px;
    overflow: hidden;
    color: #fff;
  }

  .cov-date-caption {
    width: 60%;
    padding: 50px 0!important;
    box-sizing: border-box;
    font-size: 24px;
  }

  .cov-date-caption span:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .cov-date-previous:hover,
  .cov-date-next:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .day:hover {
    background: #EAEAEA;
  }

  .unavailable:hover {
    background: none;
  }

  .checked:hover {
    background: #FF4F8E;
  }

  .day-in-range {
    background-color: #2e069c77;
  }

  .cov-date-next::before,
  .cov-date-previous::before {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    top: 50%;
    margin-top: -7px;
    margin-left: -7px;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-next::after,
  .cov-date-previous::after {
    width: 20px;
    height: 2px;
    text-align: center;
    position: absolute;
    background: #fff;
    margin-top: 6px;
    margin-left: -7px;
    top: 50%;
    left: 50%;
    line-height: 0;
    content: '';
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .cov-date-previous::after {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cov-date-previous::before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .date-item {
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
    cursor: pointer;
  }

  .date-item:hover {
    background: #e0e0e0;
  }

  .date-list {
    overflow: auto;
    vertical-align: top;
    padding: 0;
  }

  .cov-vue-date {
    display: inline-block;
    color: #5D5D5D;
  }

  .button-box {
    background: #fff;
    vertical-align: top;
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding-right: 20px;
  }

  .button-box span {
    cursor: pointer;
    padding: 10px 20px;
  }

  .watch-box {
    height: 100%;
    overflow: hidden;
  }

  .hour-box,
  .min-box {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 100%;
    overflow: auto;
    float: left;
  }
  .hour-box ul,
  .min-box ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .hour-item, .min-item {
    padding: 10px;
    font-size: 36px;
    cursor: pointer;
  }
  .hour-item:hover, .min-item:hover{
    background: #E3E3E3;
  }
  .hour-box .active, .min-box .active{
    background: #F50057;
    color: #FFF !important;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #E3E3E3;
  }
  ::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: 2px;
  }
</style>
<template>
  <div class="cov-vue-date">
    <div v-if="!option.inline && !option.element" class="datepickbox">
      <input
              type="text"
              title="input date"
              class="cov-datepicker"
              readonly="readonly"
              placeholder="{{option.placeholder}}"
              v-model="time"
              :required="required"
              @click="showCheck"
              @foucus="showCheck"
              :style="option.inputStyle"/>
    </div>
    <i v-if="option.element == 'image'" :style="option.inputStyle" @click="showCheck" class="datepickimage material-icons input-field">today</i>
    <!-- MODAL LAYOUT -->
    <div class="datepicker-overlay"
         v-if="showInfo.check"
         @click="dismiss($event)"
         :style="{
    'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'
    }">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'day-in-range': checkDayInRange(day),
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
    <!-- INLINE LAYOUT -->
    <div v-if="option.inline" class="datepicker-inline">
      <div
              class="cov-date-body"
              :style="{
        'background-color': option.color ? option.color.header : '#3f51b5'
      }">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div
                  class="cov-date-caption"
                  :style="{'color': option.color ? option.color.headerText : '#fff'}"
          >
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
                    class="day"
                    v-for="day in dayList"
                    track-by="$index"
                    @click="checkDay(day)"
                    :class="{
              'checked':day.checked,
              'unavailable':day.unavailable,
              'passive-day': !(day.inMonth)
            }"
                    :style="day.checked ? (option.color && option.color.checked ? { background: option.color.checked } : { background: '#F50057' }) : {}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li
                          class="hour-item"
                          v-for="hitem in hours"
                          @click="setTime('hour', hitem, hours)"
                          :class="{'active':hitem.checked}"
                          :style="{background:hitem.checked ? option.color.checked : 'inherit'}"
                  >{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div
                        class="min-item"
                        v-for="mitem in mins"
                        @click="setTime('min',mitem, mins)"
                        :class="{'active':mitem.checked}"
                        :style="{background:mitem.checked ? option.color.checked : 'inherit'}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
