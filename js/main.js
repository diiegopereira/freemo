//Use Strict Mode
(function($) {
  "use strict";

//Remove loading-wrapper class before window load
setTimeout(function(){
  $('.loading-wrapper').removeClass('loading-wrapper-hide');
  return false;
}, 10);

//Begin - Window Load
$(window).load(function(){

  //Loader
  $('#loader-name').addClass('loader-up');
  $('#loader-job').addClass('loader-up');
  $('#loader-animation').addClass('loader-up');
  setTimeout(function(){
    $('#page-loader').addClass('loader-out');
    return false;
  }, 400);  
  $('#page-loader').delay(1000).fadeOut(10);

  // >> Testimonials
  $("#testimonial-carousel").owlCarousel({
    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,      
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    pagination: true,
    singleItem: true,    
    navigationText: ["<span class='fa fa-chevron-left'></span>","<span class='fa fa-chevron-right'></span>"],     
  });

  // >> Clients
   $("#clients-carousel").owlCarousel({ 
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      items : 5,
      itemsCustom : false,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsMobile : [479,1],
      pagination: true,
      responsiveRefreshRate : 200,
      responsiveBaseWidth: window,
      //navigationText: ["<span class='fa fa-chevron-left'></span>","<span class='fa fa-chevron-right'></span>"],     
  });

  // Portfolio Filter
  var catActive = '';

  $('#filter-header .category-item').on('click', function(event){    
    var catActive = $(this).attr('data-filter');  
    $('#filter-header .category-item').removeClass('category-item-active'); 
    $(this).addClass('category-item-active');
    $("#filter-container .filter-item").removeClass('project-item-disabled');  
    $("#filter-container .filter-item:not(." + catActive + ")").addClass('project-item-disabled');
    event.preventDefault();
  });

  
  //Fixed Menu
  $('#hero1').waypoint(function(direction) {
      if (direction === 'down') {
        $('#header').addClass( 'header-stick');       
      }
      else {
        $('#header').removeClass( 'header-stick');
      }     
    },
    {
     offset: '-2px'
  });


  //Viewport
  var windowHeight = $(window).height();

  function adjustViewport() {
    $('.viewport').css('min-height', windowHeight);
    return false;
  }
  adjustViewport();

});

//Begin - Document Ready
$(document).ready(function(){


// Fancybox

$(".fancybox-iframe-btn").fancybox({
  type: 'iframe',
  fitToView: true
});

$(".fancybox").fancybox({
});

$(".image-gallery a").fancybox({

});

// Double Tap to Go - Mobile Friendly SubMenus
$('.navbar-nav li:has(ul)').doubleTapToGo();

// Maps iframe Overlay
var map = $('#map');
map.on('click', function () {
    $('#map iframe').css("pointer-events", "auto");
    return false;
});

map.on('mouseleave', function () {
    $('#map iframe').css("pointer-events", "none");
    return false;
});

//Forms

//Modal for Forms
function hideModal() {
  $('.modal-wrap').fadeOut(300);
  return false;
}

$('.modal-wrap').on('click', function () {
  hideModal();
});   

$('.modal-bg').on('click', function () {
  hideModal();
}); 

//Anchor Smooth Scroll
   $('a[href*=#]:not([href=#])').on('click', function () {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

//==============___Contact Form Validator and Ajax Sender___================
  $("#contactForm").validate({
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "php/contact-form.php",
        data: {
          "name": $("#contactForm #name").val(),
          "email": $("#contactForm #email").val(),
          "subject": $("#contactForm #subject").val(),
          "message": $("#contactForm #message").val()
        },
        dataType: "json",
        success: function (data) {
          if (data.response == "success") {
            $("#contactSuccess").fadeIn(300);
            $("#contactError").addClass("hidden");

            $("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message")
              .val("")
              .blur()
              .closest(".control-group")
              .removeClass("success")
              .removeClass("error");              
            
          } else {
            $("#contactError").fadeIn(300);
            $("#contactSuccess").addClass("hidden");
          }
        }

      });
    }
  });

//End - Document Ready
});

//End - Use Strict mode
})(jQuery);