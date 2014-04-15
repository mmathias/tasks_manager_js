(function($){
  $.fn.fadeOutAndRemove = function(duration){
    return this.fadeOut(duration, function(){
      $(this).remove();
    });
  };
})(jQuery);
