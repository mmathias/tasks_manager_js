describe("Todo.KeyboardBinding", function() {
  var input, keyboard, event, callback;

  beforeEach(function() {
    input = $("<input/>");
    callback = jasmine.createSpy("callback");
    keyboard = new Todo.KeyboardBinding(input);

    event = $.Event();
    event.type = "keyup";

  });

  it("triggers enter event", function() {
    event.which = 13;
    keyboard.on("enter", callback);
    input.trigger(event);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , input.get(0)
    );
  });

  it("triggers esc event", function() {
    event.which = 27;
    keyboard.on("esc", callback);
    input.trigger(event);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , input.get(0)
    );
  });

});
