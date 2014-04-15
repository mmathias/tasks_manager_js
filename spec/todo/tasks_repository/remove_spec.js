describe("Todo.TasksRepository#remove", function() {
  var repo, callback, task, deferred;

  beforeEach(function() {
    callback = jasmine.createSpy("callback");
    repo = new Todo.TasksRepository();

    deferred = $.Deferred();

    // Create a task object, but stub the remove method.
    task = new Todo.Task({id: 1234});
    spyOn(task, "remove").and.returnValue(deferred);

    // To remove a task, it must be
    // available on the list.
    repo.push(task);
  });

  it("triggers task.remove event", function() {
    repo.on("task.remove", callback);
    repo.remove(task.id);

    // Since we're overriding the remove function,
    // we must resolve the task by ourselves.
    deferred.resolve(task);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , jasmine.any(Todo.Task)
    );
  });

  it("removes task", function() {
    repo.remove(task.id);

    // Since we're overriding the remove function,
    // we must resolve the task by ourselves.
    deferred.resolve(task);

    expect(repo.contains(task)).toBeFalsy();
  });
});
