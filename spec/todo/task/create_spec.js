describe("Todo.Task#create", function() {
  var task, callback, deferred;

  beforeEach(function() {
    task = new Todo.Task({title: "Some task", status: "done"});
    callback = jasmine.createSpy("callback");

    deferred = $.Deferred();
    spyOn($, "ajax").and.returnValue(deferred);
  });

  it("performs request", function() {
    task.save();

    expect($.ajax).toHaveBeenCalledWith({
        url: "/tasks"
      , type: "post"
      , data: {task: {title: "Some task", status: "done"}}
      , dataType: "json"
    });
  });

  it("triggers create event", function() {
    task.on("create", callback);
    task.save();

    var response = {id: 1234};
    // Resolve deferred, because we're stubbing the
    // $.ajax function.
    deferred.resolve(response);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , task
    );
  });

  it("sets id attribute", function() {
    task.on("create", callback);
    task.save();

    var response = {id: 1234};
    // Resolve deferred, because we're stubbing the
    // $.ajax function.
    deferred.resolve(response);

    expect(task.id).toEqual(1234);
  });

});
