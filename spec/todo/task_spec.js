describe("Todo.task", function() {
  describe("initialization", function() {
    it("sets attributes", function() {
      var task = new Todo.Task({title: "Some task", status: "complete"});

      expect(task.title).toEqual("Some task");
      expect(task.status).toEqual("complete");
    });

  });
  describe(".setDone()", function() {
    it("sets task as done", function() {
      var task = new Todo.Task();
      task.setDone(true);

      expect(task.isDone()).toBeTruthy();
    });

    it("sets task as pending", function() {
      var task = new Todo.Task();
      task.setDone(true);
      task.setDone(false);

      expect(task.isDone()).toBeFalsy();
    });
  });
});
