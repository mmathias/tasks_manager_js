Todo.Utils = (function(){

  var Utils = {};

  Utils.extendWithEmitter = function(target){
    target._emitter = $({});
    target.on = $.proxy(target._emitter, "on");
  };

  return Utils;
})();
