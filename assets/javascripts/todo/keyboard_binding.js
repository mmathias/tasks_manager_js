Todo.KeyboardBinding = (function(){
  var MAPPING = {
      13: "enter"
    , 27: "esc"
  };

  function KeyboardBinding(input){
    Todo.Utils.extendWithEmitter(this);
    this.input = input;
    this.input.on("keyup", $.proxy(this, "onKeyUp"));
  }

  KeyboardBinding.fn = KeyboardBinding.prototype;

  KeyboardBinding.fn.onKeyUp = function(event) {
    var code = MAPPING[event.which];

    if(code){
      this._emitter.trigger(code, event.target);
    }
  };

  return KeyboardBinding;
})();
