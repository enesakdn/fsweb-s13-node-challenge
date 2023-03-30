// "eylem" routerını buraya yazın
const ActionsModel = require("./actions-model");

const express = require("express");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const action = await ActionsModel.get();
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const action = await ActionsModel.get(id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const action = await ActionsModel.get();
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { notes, description, completed, project_id } = req.body;

    if (notes && description && project_id) {
      const newAction = await ActionsModel.insert({
        notes: notes,
        description: description,
        completed: completed,
        project_id: project_id,
      });

      res.status(201).json(newAction);
    } else {
      res.status(400).json({
        message: "Lütfen bir not ve açıklama sağlayın ve bir proje belirtin.",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { notes, description, completed, project_id } = req.body;

    const { id } = req.params;

    if (notes && description && project_id) {
      const newAction = await ActionsModel.update(id, {
        notes: notes,
        description: description,
        completed: completed,
        project_id: project_id,
      });

      res.status(201).json(newAction);
    } else {
      res.status(400).json({
        message: "Lütfen bir not ve açıklama sağlayın ve bir proje belirtin.",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await ActionsModel.remove(id);
    if (remove) {
      res.json({ message: "Silme başarılı" });
    } else {
      res.status(404).json({ message: "cartcurt" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
