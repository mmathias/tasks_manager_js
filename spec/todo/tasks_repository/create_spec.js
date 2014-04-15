describe("Todo.TasksRepository#create", function() {
  var repo, callback, task, deferred;

  beforeEach(function() {
    callback = jasmine.createSpy("callback");
    repo = new Todo.TasksRepository();
    task = {};

    deferred = $.Deferred();
    spyOn($, "ajax").and.returnValue(deferred);
  });

  it("triggers task.create event", function() {
    repo.on("task.create", callback);
    repo.create(task);

    // Forges the $.ajax response
    response = jasmine.any(Todo.Task);
    deferred.resolve(response);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , response
    );
  });

  it("pushes task", function() {
    // stubbing
    spyOn(repo, "push");
    repo.create(task);

    // Forges the $.ajax response
    response = jasmine.any(Todo.Task);
    deferred.resolve(response);

    expect(repo.push).toHaveBeenCalledWith(
      response
    );
  });

});
