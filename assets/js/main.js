$(function() {
  $('.copy-to-clipboard input').click(function() {
      $(this).focus();
      $(this).select();
      document.execCommand('copy');
      $(".copied").text("Copied to clipboard").show().fadeOut(2500);
  });
});

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

function deleteAddress() {
  localStorage.removeItem('mails');
  document.getElementById("msg-items").replaceChildren();
  jQuery.ajax({
      url: "../functions/newMailbox.php",
      success: function(result) {
          jQuery("#mailaddress").val(result);
          var timestamp = (new Date().addHours(1));
          var info = {
              'addr': result,
              'timestamp': timestamp
          };
          localStorage.setItem('addr', JSON.stringify(info));
      }
  });
  startTimer()
}

function getAddress() {
  if (localStorage.getItem("addr") === null) {
      jQuery.ajax({
          url: "../functions/newMailbox.php",
          success: function(result) {
              jQuery("#mailaddress").val(result);
              var timestamp = (new Date().addHours(1));
              var info = {
                  'addr': result,
                  'timestamp': timestamp
              };
              localStorage.setItem('addr', JSON.stringify(info));
          }
      });
  }
  startTimer()
}

function startTimer() {
  var retrievedObject = localStorage.getItem('addr');
  var test = JSON.parse(retrievedObject);
  countDownDate = Date.parse(test.timestamp); // parse to date object
  var timer = setInterval(function() {
      var now = new Date().getTime();
      var timeleft = countDownDate - now;
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById("time").innerHTML = minutes + " minutes left"
      if (timeleft < 0) {
          clearInterval(timer);
          document.getElementById("time").innerHTML = "time´s up. <button onclick='getAddress()'>new mailbox?</button>";
          localStorage.clear();
      }
  }, 1000)
}


function getSecondPart(str) {
  const test = str.split(' ')[1];
  return test.slice(3);
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function displayMail(mail) {
  const node = document.createElement("div");
  node.classList.add("msg-item");

  var fromnode = document.createElement('span')
  fromnode.classList.add("msg-item-name");
  fromnode.innerHTML = mail.from;
  node.appendChild(fromnode);

  var subjnode = document.createElement('span')
  subjnode.classList.add("msg-item-subject");
  subjnode.innerHTML = mail.subject;
  node.appendChild(subjnode);
  var timenode = document.createElement('span')
  timenode.classList.add("msg-item-time");
  timenode.innerHTML = getSecondPart(mail.date);
  node.dataset.num = mail.id;
  node.appendChild(timenode);
  node.onclick = function() {
      jQuery(".msg-item").removeClass("open")
      jQuery(this).addClass("open")
      jQuery(this).addClass("alreadyOpen")
      var retrievedObject = localStorage.getItem('addr');
      var mailaddress = JSON.parse(retrievedObject)

      var maildata = { //Fetch form data
          'addr': mailaddress.addr,
          'id': $(this).attr("data-num")
      };
      $.ajax({
          url: "../functions/getMail.php",
          type: "post",
          data: maildata,
          success: function(response) {
              let email = JSON.parse(response)
              let rsmail = "<h4>" + email.subject + "<span>" + getSecondPart(mail.date) + "</span></h4><p>" + email.htmlBody + "</p>"
              $(".msg-area").html(rsmail)
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
          }
      });
  };
  document.getElementById("msg-items").appendChild(node);
}

function displayMails(maillist, method) {
  if (method == "replace") {
      document.getElementById("msg-items").replaceChildren();
  }
  for (var mail of maillist) {
      const node = document.createElement("div");
      node.classList.add("msg-item");

      var fromnode = document.createElement('span')
      fromnode.classList.add("msg-item-name");
      fromnode.innerHTML = mail.from;
      node.appendChild(fromnode);

      var subjnode = document.createElement('span')
      subjnode.classList.add("msg-item-subject");
      subjnode.innerHTML = mail.subject;
      node.appendChild(subjnode);
      var timenode = document.createElement('span')
      timenode.classList.add("msg-item-time");
      timenode.innerHTML = getSecondPart(mail.date);
      node.dataset.num = mail.id;
      node.appendChild(timenode);
      node.onclick = function() {
          jQuery(".msg-item").removeClass("open")
          jQuery(this).addClass("open")
          jQuery(this).addClass("alreadyOpen")
          var retrievedObject = localStorage.getItem('addr');
          var mailaddress = JSON.parse(retrievedObject)

          var maildata = { //Fetch form data
              'addr': mailaddress.addr,
              'id': $(this).attr("data-num")
          };
          $.ajax({
              url: "../functions/getMail.php",
              type: "post",
              data: maildata,
              success: function(response) {
                  let email = JSON.parse(response)
                  let rsmail = "<h4>" + email.subject + "<span>" + getSecondPart(mail.date) + "</span></h4><p>" + email.htmlBody + "</p>"
                  $(".msg-area").html(rsmail)
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log(textStatus, errorThrown);
              }
          });
      };
      document.getElementById("msg-items").appendChild(node);
  }
}

function refreshMailbox() {
  jQuery(".icon-sync").addClass("active")
  var retrievedObject = localStorage.getItem('addr');
  var mailaddress = JSON.parse(retrievedObject)

  var adddata = {
      'addr': mailaddress.addr
  };
  $.ajax({
      url: "../functions/checkMailbox.php",
      type: "post",
      data: adddata,
      success: function(response) {
          jQuery(".icon-sync").removeClass("active")
          let converted = JSON.parse(response)
          if (isEmpty(converted)) {
              // if no response
              console.log("no new messages")
          } else if (localStorage.getItem("mails") === null && !isEmpty(converted)) {
              console.log("trifft zu regel 2")
              // if response but no local storage entry, here we must display every msg from response
              localStorage.setItem('mails', response);
              const mails = localStorage.getItem('mails');
              let maillist = JSON.parse(mails)
              displayMails(maillist, "replace")
          } else {
              console.log("trifft zu regel 3")
              // got response and local storage entry is active, here we must compare and eventually display msgs
              const mails = localStorage.getItem('mails')
              const lsmails_json = JSON.parse(mails)
              var lsmailsLength = lsmails_json.length;
              const response_json = JSON.parse(response)
              var responseLenght = response_json.length;
              var i = 0;
              var b = 0;
              while (i < responseLenght) {
                  while (b < lsmailsLength) {
                      if (lsmails_json[b].id === response_json[i].id) {
                          console.log(response_json[i].id, "already in ls and displayd")
                      } else if (lsmails_json[b].id != response_json[i].id) {
                          const mail = response_json[i]
                          print(mail)
                          displayMail(mail)
                          localStorage.setItem('mails', response);
                      }
                      i++;
                      b++;
                  }
                  i++;
              }
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
      }
  });
}

$(document).ready(function() {
  getAddress()
  refreshMailbox()
  if (localStorage.getItem("mails")) {
      const mails = localStorage.getItem('mails');
      let maillist = JSON.parse(mails)
      displayMails(maillist, "replace")
  }
});