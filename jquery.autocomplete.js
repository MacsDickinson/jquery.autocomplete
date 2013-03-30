(function( $ ){
  $.fn.autocomplete = function(options) {
    var settings = $.extend( {
      'containerclass': 'jquery-autocomplete-container',
      'searchclass' : 'jquery-autocomplete-search',
      'resultsclass' : 'jquery-autocomplete-results',
      'selectedclass': 'jquery-autocomplete-selected'
    }, options);
    
    var cont = settings.containerclass;
    var search = settings.searchclass;
    var result = settings.resultsclass;
    var select = settings.selectedclass;
    
    var displayMatches = function(element) {
      var f = $(element).attr('for');
          $(element).next().empty();
          var v = $(element).val().toLowerCase();
          if (v.length > 0) {
            var mchs = [];
            var x = 0;
            $('#'+f).children().each(function() {
              if($(this).text().toLowerCase().match(v)) {
                mchs[x] = { val: $(this).val(), text: $(this).text()};
                x++;
              }
            });
            if(mchs.length > 0) {
              for(var mch in mchs) {
                var $li = $('<li/>', {value: mchs[mch].val});
                $li.click(liClicked);
                $('<span/>', { text: mchs[mch].text})
                .appendTo($li);
                $li.appendTo($('.'+result+'[for="'+f+'"]'));
              }
              $('.'+result+'[for="'+f+'"]').show();
            }
            else {
              $('.'+result+'[for="'+f+'"]').hide();
            }
            if($('.'+result+'[for="'+f+'"]').children()===0) {
              $('.'+result+'[for="'+f+'"]').hide();
            }
          }
          else {
            $('.'+result+'[for="'+f+'"]').hide();
          }
    };
    
    var liClicked = function() {
      var f = $(this).attr('for');
      if ($(this).hasClass(select)) {
        $(this).parent().prev().val($(this).text());
        $(this).parent().prev().attr('value', $(this).attr('value'));
        $(this).parent().hide();
      }
      else {
        $(this).parent().children().removeClass(select);
        $(this).addClass(select);
      }
    };
    var sunkMyBattleShip = function(element,x,y){
      var keepOpen = false;
      var pos = $(element).offset();
      var w = $(element).width();
      var h = $(element).height();
      if(x >= pos.left & x <= pos.left+w & y >= pos.top & y <= pos.top+h) {
        keepOpen=true;
      }
      return keepOpen;
    };
    this.each(function() {
      $(this).hide();
      var i = $('.'+cont).length;
      var $d = $('<div/>', {'class':  cont, 
                            'width': $(this).attr('width'), 
                            'margin': $(this).attr('margin')
                           });
      if($(this).attr('id') === undefined) {
        $(this).attr('id', 'jquery-autocomplete'+i);
      }
      var id = $(this).attr('id');
      var $in = $('<input/>', {'class': search, 
                               'for':id
                              });
      $in.css('padding', $d.css('padding'));
      $in.keydown(function(e) {
        var f = $(this).attr('for');
        if(e.keyCode === 38 || e.keyCode === 40){
          if ($('.'+result+'[for="'+f+'"] .'+select).length === 1) {
            var $sel = $('.'+result+'[for="'+f+'"]').children('.'+select);
            $sel.removeClass(select);
            var $nxt;
            if (e.keyCode === 38) {
              if($sel.prev().length > 0) {
                $nxt = $sel.prev();
              }
              else {
                $nxt = $sel;
              }
            }
            if (e.keyCode === 40) {
              if($sel.next().length > 0) {
                $nxt = $sel.next();
              }
              else {
                $nxt = $sel;
              }
            }
            $nxt.addClass(select);
            var $res = $('.'+result+'[for="'+f+'"]');
            var itemheight = parseInt($nxt.css('height'), 10);
            var scrolltop = $res.scrollTop();
            var offsettop = $nxt.offset().top-$('.'+result+'[for="'+f+'"]').children(':first').offset().top;
            if (offsettop+itemheight > scrolltop + parseInt($res.css('height'), 10)) {
              $res.scrollTop(offsettop+itemheight-parseInt($res.css('height'), 10));
            }
            if (offsettop < scrolltop) {
              $res.scrollTop(offsettop);
            }
          }
          else {
            $('.'+result+'[for="'+f+'"]').children(':first').addClass(select);
          }
        }
        else if(e.keyCode === 13){
          if ($('.'+result+'[for="'+f+'"] .'+select).length === 1) {
            $(this).val($('.'+result+'[for="'+f+'"] .'+select).text());
            $('.'+result+'[for="'+f+'"]').hide();
          }
        }
      });
      $in.keyup(function(e) {
        if(e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40){
          displayMatches(this);
        }
      });
      $in.focus(function() {
          displayMatches(this);
      });
      $in.appendTo($d);
      $(this).after($d);
      var $r = $('<ul/>', {'class': result, 
                           'for': id
                          });
      $r.css('width', $in.css('width'));
      $r.css('padding-left', 0);
      $r.css('margin-left', $in.css('margin-left'));
      $r.css('margin-right', $in.css('margin-right'));
      $r.css('margin-top', parseInt($in.css('margin-bottom'), 10)*-1);
      $r.css('position', 'absolute');
      $r.children().on('load', function() {
        $(this).css('color', 'red');
      });
      $r.children().on('click', function() {
        $(this).parent().children().removeClass(select);
        $(this).addClass(select);
      });
      $r.appendTo($d);
      $(document).click(function(e) {
        var x = e.clientX;
        var y = e.clientY;
        
        $('.'+result+':visible').each(function() {
          var keepOpen = false;
          if(sunkMyBattleShip($(this),x,y)) {
            keepOpen= true;
          }
          if(sunkMyBattleShip($(this).parent(),x,y)) {
            keepOpen= true;
          }
          if(sunkMyBattleShip($(this).prev(),x,y)) {
            keepOpen= true;
          }
          if(!keepOpen) {
            $(this).hide();
          }
        });
        $('.'+search).each(function() {
          var pos = $(this).offset();
          var w = $(this).width();
          var h = $(this).height();
          if(x >= pos.left & x <= pos.left+w & y >= pos.top & y <= pos.top+h) {
            keepOpen=true;
          }
          var res = $(this);
        });
        $('.'+select).each(function() {
          var pos = $(this).offset();
          var w = $(this).width();
          var h = $(this).height();
          if(x >= pos.left & x <= pos.left+w & y >= pos.top & y <= pos.top+h) {
            keepOpen=true;
          }
          var res = $(this);
        });
      });
    });
  };
})( jQuery );