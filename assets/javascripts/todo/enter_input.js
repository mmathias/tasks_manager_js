Todo.EnterInput = (function(){

  function EnterInput(input){
    this.input = input;
    this.keyboard = new Todo.KeyboardBinding(this.input);
    Todo.Utils.extendWithEmitter(this);
  }

  EnterInput.fn = EnterInput.prototype;

  EnterInput.fn.init = function() {
    // this.input.on("keyup", $.proxy(this, "onKeyUp"));
    this.keyboard.on("enter", $.proxy(this, "onEnter"));
  };

  EnterInput.fn.onEnter = function(event, input) {
    var value = input.value;

    if(!value){
      return;
    }

    // Clears the input value
     input.value = "";

    // Emitter our custom event with
    // the typed value
    this._emitter.trigger("enter", value);
  };

  return EnterInput;
})();
