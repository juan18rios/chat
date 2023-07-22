let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  var fomartDateTime = timestamp => {};
  
  var formatTime = timestamp => {
    if (timestamp) {
      this.date = new Date(timestamp);
    } else {
      this.date = new Date();
    }
  
    let getTime = (hours, minutes, seconds) => {
      if (hours >= 13) {
        hours = hours - 12;
        return `${hours}:${minutes}:${seconds} PM`;
      } else if (hours === 12) {
        return `${hours}:${minutes}:${seconds} PM`;
      } else if (hours === 24) {
        return `${12}:${minutes}:${seconds} AM`;
      } else {
        return `${hours}:${minutes}:${seconds} AM`;
      }
    };
  
    let currentTime = `${getTime(
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds()
    )} `;
  
    return currentTime;
  };
  
  var formatDate = (timestamp, seperator) => {
    if (typeof timestamp === Number) {
      let currentDate;
      let thisMonth;
      let today;
      var todayDate;
  
      if (timestamp) {
        //Convert the value from seconds to milliseconds by multiplying it to 1000
        this.date = new Date(timestamp * 1000);
      } else {
        this.date = new Date();
      }
      today = days[this.date.getDay()];
      thisMonth = months[this.date.getMonth()];
  
      currentDate = `${today}, ${thisMonth} ${this.date.getFullYear()}`;
      return currentDate;
    } else {
      today = days[this.date.getDay()];
      thisMonth = months[this.date.getMonth()];
      todayDate = this.date.getDate();
      currentDate = `${today}, ${todayDate} ${thisMonth} ${this.date.getFullYear()}`;
      return currentDate;
    }
  };
  
  var formatTimeAgo = timestamp => {
    var date = new Date();
  
    var timeStampNow = Math.floor(date.getTime() / 1000);
    var seconds;
    if (/[a-z]/i.test(timestamp)) {
      seconds = timeStampNow - Date.parse(timestamp) / 1000;
    } else {
      seconds = timeStampNow - timestamp / 1000;
    }
  
    // more that two days
    if (seconds > 2 * 24 * 3600) {
      return "a few days ago";
    }
    // a day
    if (seconds > 24 * 3600) {
      return "yesterday";
    }
    //Some hours
    if (seconds > 3600) {
      return "a few hours ago";
    }
    //half an hour
    if (seconds > 1800) {
      return "half an hour ago";
    }
    //seconds
    if (seconds > 60) {
      return Math.floor(seconds / 60) + " minutes ago";
    }
    if (seconds < 60) {
      return "few seconds ago";
    }
  };