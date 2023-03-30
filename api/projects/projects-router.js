// "project" routerını buraya yazın!

const ProjectModel = require("./projects-model");

const express = require("express");

const router = express.Router();

router.use(express.json());

const middleware = require("./projects-middleware.js");

router.get("/", async (req, res, next) => {
  try {
    const allusers = await ProjectModel.get();
    if (allusers) {
      res.status(200).json(allusers);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", middleware.validateId, async (req, res) => {
  await ProjectModel.get(req.projects);
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    if (name && description) {
      const newUser = await ProjectModel.insert({
        name: name,
        description: description,
        completed: completed,
      });
      res.status(201).json(newUser);
    } else {
      res
        .status(400)
        .json("message:lütfen bir message ve description sağlayın");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    if (name && description) {
      const updateProject = await ProjectModel.update(id, {
        name: name,
        description: description,
        completed: completed,
      });
      res.status(201).json(updateProject);
    } else {
      res.status(400).json({ message: "dsfsdf" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await ProjectModel.remove(id);
    if (remove) {
      res.json({ message: "Silme başarılı" });
    } else {
      res.status(404).json({ message: "cartcurt" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", async (req, res, next) => {
  const { id } = req.params;
  try {
    const bringmeAction = await ProjectModel.getProjectActions(id);
    res.json(bringmeAction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
