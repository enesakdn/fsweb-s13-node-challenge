const ActionsModel = require("./actions-model");
const { validateId, validateAction } = require("./actions-middlware");

const express = require("express");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
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

router.get("/:id", validateId, async (req, res, next) => {
  try {
    res.status(200).json(req.actions);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateAction, async (req, res, next) => {
  try {
    const newAction = await ActionsModel.insert(req.action);

    res.status(201).json(newAction);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateId, validateAction, async (req, res, next) => {
  try {
    const updatedAction = await ActionsModel.update(req.id, req.action);

    res.status(200).json(updatedAction);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const remove = await ActionsModel.remove(req.id);
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
