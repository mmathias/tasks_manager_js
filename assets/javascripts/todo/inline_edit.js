Todo.InlineEditing = (function(){
  // The InlineEditing component must perform
  // the following actions:
  // - Cancel editing when triggering the blur event
  // - Cancel editing when pressing the ESC key
  // - Commit when pressing the ENTER key
  // - Trigger the event "commit" when commiting
  function InlineEditing(element){
    Todo.Utils.extendWithEmitter(this);
    this.element = element;
    this.input = $("<input/>")
      .addClass("editable")
      .addClass("hidden")
    ;

    this.keyboard = new Todo.KeyboardBinding(this.input);
  }

  InlineEditing.fn = InlineEditing.prototype;

  InlineEditing.fn.init = function() {
    this.element.before(this.input);

    this.keyboard
      .on("blur", $.proxy(this, "deactivate"))
      .on("esc", $.proxy(this, "deactivate"))
      .on("enter", $.proxy(this, "commit"))
    ;
  };

  InlineEditing.fn.activate = function() {
    this.element.addClass("hidden");

    this.input
      .removeClass("hidden")
      .val(this.element.text())
      .select()
    ;
  };

  InlineEditing.fn.deactivate = function() {
    this.element.removeClass("hidden");
    this.input.addClass("hidden");
  };

  InlineEditing.fn.commit = function() {
    this.deactivate();
    this._emitter.trigger("commit", [this.element, this.input.val()]);
  };

  return InlineEditing;
})();
