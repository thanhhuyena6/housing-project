$(document).ready(function () {
  $(".ham-btn").click(function () {
    $(".navbar").slideToggle(500);
  });

  $(".portfolio__list__item").click(function () {
    var img = $(this).children("img").clone();
    img.appendTo(".portfolio__slideShow__img");
    $(".portfolio__slideShow").css("transform", "scale(1)");
  });

  $(".portfolio__slideShow").click(function (event) {
    var target = event.target.className;
    if (target == "portfolio__slideShow") {
      $(".portfolio__slideShow").css("transform", "scale(0)");
      $(".portfolio__slideShow__img").children("img").remove();
    }
  });

  $(".portfolio__slideShow__right-arrow").click(function () {
    var src = $(".portfolio__slideShow__img").children("img").attr("src");
    var img_order = src.replace("./images/img", "").replace(".jpg", "");
    img_order = (Number(img_order) % 6) + 1;
    var new_src = "./images/img" + img_order + ".jpg";
    console.log(new_src);
    $(".portfolio__slideShow__img").children("img").attr("src", new_src);
  });

  $(".portfolio__slideShow__left-arrow").click(function () {
    var src = $(".portfolio__slideShow__img").children("img").attr("src");
    var img_order = src.replace("./images/img", "").replace(".jpg", "");
    img_order = Number(img_order) - 1;
    if (img_order == 0) {
      img_order += 6;
    }
    var new_src = "./images/img" + img_order + ".jpg";
    console.log(new_src);
    $(".portfolio__slideShow__img").children("img").attr("src", new_src);
  });

  var previous_position;
  $(window).scroll(function (event) {
    var current_position = $("html").scrollTop();

    if ($(window).width() <= 767.98) {
      // navbar hide when scrolling
      if ($(".navbar").css("display") == "block") {
        $(".navbar").hide();
      }
      // navbar fixed after about section
      if (current_position > $(".about").offset().top) {
        $("header").css("position", "fixed");
      }
      if (current_position < $(".about").offset().top) {
        $("header").css("position", "relative");
      }
      // click outside navbar, navbar disappear
      $("body").click(function (event) {
        if ($(".navbar").css("display") == "block") {
          if (
            event.target.className.indexOf("nav-link") == -1 &&
            event.target.className.indexOf("ham-btn") == -1
          ) {
            $(".navbar").slideToggle(500);
          }
        }
      });
    }

    if (current_position < previous_position) {
      // console.log("Scroll up");
    } else {
      // console.log("Scroll down");
      var position_start_animation =
        $(".stats").offset().top - $(window).height();

      var position_end_animation = 
        $(".stats").offset().top + $(".stats").height();
        
      if (
        current_position > position_start_animation &&
        current_position < position_end_animation
      ) {
        // count up animation
        $(".stats__item__counter").text("0");
        $(".stats__item__counter").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");

          $({ countNum: $this.text() }).animate(
            {
              countNum: countTo,
            },

            {
              duration: 2000,
              easing: "linear",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              },
            }
          );
        });
        // end- count up animation
      }
    }
    previous_position = current_position;
  });
});
