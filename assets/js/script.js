window.onload = function () {

  var request = new XMLHttpRequest();

  var hamburger = document.querySelector(".hamburger");
  var modal = document.querySelector(".modal");
  var join_now = document.querySelectorAll("table tr td:last-child");
  var cancel = document.querySelector(".cancel");
  var no_scroll = document.querySelector("html");
  var counters = document.querySelectorAll('.counter');
  var section = document.querySelector(".counters");

  var submit = document.querySelector(".contact form .form-controls button");
  var subscribe = document.querySelector(".subscribe button");
  var modal_button = document.querySelector(".modal button");
  var modalinputs = document.querySelectorAll(".modal input");
  var input = document.querySelectorAll(".contact input");
  var subscriber = document.querySelectorAll(".subscribe input");

  var day = this.document.querySelectorAll(".schedule ul a");
  var dayArray = Array.from(day);

  var inputArray = Array.from(input);
  var subscriberArray = Array.from(subscriber);
  var modalinputsArray = Array.from(modalinputs);

  submit.addEventListener("click", function (element) {
    submits(element, inputArray)
  });

  subscribe.addEventListener("click", function (element) {
    submits(element, subscriberArray);
  });



  var join_nowArray = Array.from(join_now);

  hamburger.addEventListener("click", show);
  cancel.addEventListener("click", closeModal);

  join_nowArray.forEach(function (element) {
    element.addEventListener("click", openModal);
  });

  function show(e) {
    var nav = document.querySelector("nav");
    nav.classList.toggle("active");
    no_scroll.classList.toggle("overflow");
  }

  function openModal() {
    modal.classList.add("active-modal");
    no_scroll.classList.toggle("overflow");
  }

  function closeModal() {
    modal.classList.remove("active-modal");
    no_scroll.classList.toggle("overflow");
  }


  window.addEventListener("scroll", function () {
    var pageAt = (window.innerHeight + window.scrollY);
    var pos = (section.offsetTop + section.offsetHeight / 2);

    if (pageAt > pos && !section.classList.contains("active")) {
      section.classList.add("active");
      startCounter();
    }
  })

  function startCounter() {
    counters.forEach(
      function (counter) {

        function updateCounter() {

          var target = +counter.getAttribute('data-target');
          var count = +counter.getAttribute('data-current');

          var increment = target / 100;

          if (count < target) {
            var currentVal = count + increment;
            counter.setAttribute("data-current", currentVal);
            counter.innerText = Math.floor(currentVal);
            setTimeout(updateCounter, 50);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
      });
  }


  var Regex = [
    firstName_regex = /([a-zA-Z]){2,10}$/,
    lastName_regex = /([a-zA-Z]){2,10}$/,
    subject_regex = /([a-zA-Z0-9]){9,20}$/,
    email_regex = /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/
  ]

  subscriberArray.forEach(function (element) {
    element.addEventListener("keyup", function () {
      validate(Regex[3], this);
    });
  });


  inputArray.forEach(function (element) {
    var index = inputArray.indexOf(element);

    element.addEventListener("keyup", function () {
      validate(Regex[index], this);
    });
  });

  function validate(RegularExpression, input) {
    var parent = input.parentNode;
    if (input.value == "") {
      parent.classList = "validate";
    }
    else if (RegularExpression.test(input.value)) {
      parent.classList = "validate success"
    } else {
      parent.classList = "validate error"
    }
  }




  function submits(e, inputArray) {
    e.preventDefault();

    var True = null;

    for (var i = 0; i < inputArray.length; i++) {
      var parent = inputArray[i].parentNode;
      if (parent.classList.contains("error") || parent.classList == "validate") {
        True = false;
        inputArray.forEach(function (element) {
          if (element.value === "") {
            element.parentNode.classList = "validate error";
          }
        });
        break;
      } else if (parent.classList.contains("success")) { True = true; }
    }

    if (True) {

      alert("FORM SUCCESSFULLY SUBMITED");

      inputArray.forEach(function (element) {
        element.parentNode.classList.remove("success");
      });
    }
  }






  dayArray.forEach(function (element) {
    element.addEventListener("click", function () {
      getdata(this);
    });
  });

  function getdata(element) {
    var dDay = element.getAttribute("data-day");

    request.open('get', 'data.json');

    request.onload = function () {

      var data = JSON.parse(request.responseText);

      data.forEach(function (element) {
        var a = element.day;
        if (a === dDay) {
          var table_session = Array.from(document.querySelectorAll("table tr td:first-child"));

          table_session.forEach(function (field) {
            for (const key in element) {
              var field_session = field.getAttribute("data-session");
              if(field_session === key){
                field.nextElementSibling.innerText = element[key].time;
                field.nextElementSibling.nextElementSibling.innerText = element[key].trainer;
              }
            }
          });
        }        
      });
    }
    request.send();
  }

}


$(document).ready(function () {

  $('.classes-slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

