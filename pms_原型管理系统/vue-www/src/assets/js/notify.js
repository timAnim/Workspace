  var instance = {}

  export default {
    show: (title, msg, url, icon) => {

      var _id = new Date().valueOf()
      var options = {
        body: msg,
        icon: icon || "static/img/img01.jpg"
      };
      var Notification = window.Notification || window.mozNotification || window.webkitNotification;
      
      if (Notification && Notification.permission === "granted") {
        instance[_id] = new Notification(title, options);
        instance[_id].onclick = function() {
          // Something to do
          console.log(url)
        };
        instance[_id].onerror = function() {
          // Something to do
        };
        instance[_id].onshow = function() {
          // Something to do
          setTimeout(function() {
            instance[_id].close();
          }, 3000)
        };
        instance[_id].onclose = function() {
          // Something to do
        };
      } else if (Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {
          if (Notification.permission !== status) {
            Notification.permission = status;
          }
          // If the user said okay
          if (status === "granted") {
            instance[_id] = new Notification(title, options);
            instance[_id].onclick = function() {
              // Something to do
              console.log(url)
            };
            instance[_id].onerror = function() {
              // Something to do
            };
            instance[_id].onshow = function() {
              setTimeout(function() {
                instance[_id].close();
              }, 3000)
            };
            instance[_id].onclose = function() {
              // Something to do
            };
          } else {
            return false
          }
        });
      } else {
        return false;
      }
    }
  }
