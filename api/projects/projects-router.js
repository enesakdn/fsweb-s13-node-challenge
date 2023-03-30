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

router.get("/:id", middleware.validateId, async (req, res, next) => {
  try {
    res.status(200).json(req.Projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware.validateProjects, async (req, res, next) => {
  try {
    const newUser = await ProjectModel.insert(req.project);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  middleware.validateId,
  middleware.validateProjects,
  async (req, res, next) => {
    try {
      const updateProject = await ProjectModel.update(req.id, req.project);
      res.status(201).json(updateProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",

  middleware.validateId,
  async (req, res) => {
    try {
      const remove = await ProjectModel.remove(req.id);
      if (remove) {
        res.json({ message: "Silme başarılı" });
      } else {
        res.status(404).json({ message: "cartcurt" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id/actions", middleware.validateId, async (req, res, next) => {
  try {
    const bringmeAction = await ProjectModel.getProjectActions(req.id);
    res.json(bringmeAction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
