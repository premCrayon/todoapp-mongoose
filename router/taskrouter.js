const express = require("express");
const router = express.Router();
const TaskRouter = require("../schema/taskSchema");
//create
router.post("/create", async (req, res) => {
  var data = new TaskRouter({
    task: req.body.task,
    description: req.body.description,
    completed: req.body.completed,
    user: req.body.userId,
  });
  await data.save();
  res.json(data);
});
//getByid
router.get("/get", async (req, res) => {
  const user = req.query.id;
  var findData = await TaskRouter.find({ user }).populate([{ path: "user" }]);
  res.json(findData);
});
//getAll
router.get("/getall", async (req, res) => {
  var findData = await TaskRouter.find();
  res.json(findData);
});
//update
router.put("/update", async (req, res) => {
  // console.log(req);
  var task = await TaskRouter.findById(req.body._id);

  console.log(task);

  if (!task) {
    res.json({ message: "No task Found with given id" });
  }

  var update = await TaskRouter.findByIdAndUpdate(
    { _id: task._id },
    {
      task: req.body.task,
      completed: req.body.completed,
    }
  );
  res.json(update);
});
//deleter
router.delete("/del", async (req, res) => {
  var delData = await TaskRouter.findOneAndRemove(req.params.id).then((e) => {
    res.json({ message: "deleted successfully" });
  });

  res.json(delData);
});
router.get("/", (req, res) => {
  res.json("i am from router");
});
module.exports = router;
