describe("Todo.EnterInput", function() {
  var input, enterInput, enter, callback;

  beforeEach(function() {
    input = $("<input value='teste'/>");

    enter = $.Event();
    enter.type = "keyup";
    enter.which = 13; // ENTER

    callback = jasmine.createSpy("callback");

    enterInput = new Todo.EnterInput(input);
    enterInput.init();
  });

  it("triggers enter event", function() {
    enterInput.on("enter", callback);
    input.trigger(enter);

    expect(callback).toHaveBeenCalled();
  });

  it("skips enter event when have no value", function() {
    enterInput.on("enter", callback);
    input
      .val("")
      .trigger(enter);

    expect(callback).not.toHaveBeenCalled();
  });

  it("emmits typed text", function() {
    enterInput.on("enter", callback);

    input
      .val("Some task")
      .trigger(enter)
    ;

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , "Some task"
    );
  });

  it("clears input's value", function() {
    input
      .val("Some task")
      .trigger(enter);

    expect(input.val()).toEqual("");
  });

  it("skips keys other than enter", function() {

    var event = $.Event();
    event.type = "keyup";
    event.which = 23; // ENTER

    enterInput.on("enter", callback);
    input.trigger(event);

    expect(callback).not.toHaveBeenCalled();
  });
});
