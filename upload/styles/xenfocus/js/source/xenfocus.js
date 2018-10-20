// Xenfocus: June 10, 2018
$(document).ready(function(){

  var html = $('html');

  // Advanced search menu
  $('.focus-search-advanced').on('click', function(){
    html.toggleClass('focus-search-menu-active');
  });

  $('.focus-search-flex input').on('focus', function(){
    html.addClass('focus-search-menu-active');
  });

  $(document).on('click', function() {
    html.removeClass('focus-search-menu-active');
  });

  $('.focus-wrap-search').on('click', function(event){
    event.stopPropagation();
  });

  // xenfocus editor: open and close with data-xenfocus-editor
  $("[data-xenfocus-editor]").on('click', function(event){
    html.toggleClass('focus-editor-open');
    event.preventDefault();
  });
  // ..and close by pressing ESC
  $(document).keyup(function(e) {
    if (e.keyCode === 27){
      html.removeClass('focus-editor-open');
    }
  });

  $(".focus-picker span").on('click', function(){
    var styleid = html.attr('data-style-id');
    var backgroundClass = $(this).attr("data-focus-bg");
    html.attr('data-focus-bg', '' + backgroundClass + '');
    setCookie('xenfocusBackground-' + styleid + '', '' + backgroundClass + '', 365);
  });

  $('.focus-editor-panel').each(function(){

    // This value is used for cookie names and class names.
    var settingName = $(this).attr('data-toggle-class');
    var settingDefault = $(this).attr('data-default');
    var settingCookie = getCookie(settingName);

    if(settingCookie === 'on'){

      $(this).find('#' + settingName + '-on').attr('checked','');
      console.log('Cookie for ' + settingName + ': on');

    } else if(settingCookie === 'off') {

      $(this).find('#' + settingName + '-off').attr('checked','');
      console.log('Cookie for ' + settingName + ': off');

    } else {
      if(settingDefault === 'on'){

        $(this).find('#' + settingName + '-on').attr('checked','');
        console.log('No cookie for ' + settingName + ', but it is on by default');

      } else{

        $(this).find('#' + settingName + '-off').attr('checked','');
        console.log('No cookie for ' + settingName + ', but it is off by default');

      }
    }

    // Change the class and cookie when the toggle is clicked
    $('.focus-editor-panel[data-toggle-class="' + settingName + '"] input').on('click', function(){

      var inputValue = $(this).attr('id');

      if(inputValue === settingName + '-on'){
        html.addClass(settingName);
        setCookie(settingName, 'on', 365);
      } else {
        html.removeClass(settingName);
        setCookie(settingName, 'off', 365);
      }

    });
    
  });

});