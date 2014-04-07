Todo.EnterInput = (function(){
  // The <enter> keycode.
  var ENTER = 13;

  function EnterInput(input){
    this.input = input;
    Todo.Utils.extendWithEmitter(this);
  }

  EnterInput.fn = EnterInput.prototype;

  EnterInput.fn.init = function() {
    this.input.on("keyup", $.proxy(this, "onKeyUp"));
  };

  EnterInput.fn.onKeyUp = function(event) {
    var value = event.target.value;
    if(event.which !== ENTER){
      return;
    }

    if(!value){
      return;
    }

    // Clears the input value
    event.target.value = "";

    // Emitter our custom event with
    // the typed value
    this._emitter.trigger("enter", value);
  };

  return EnterInput;
})();
