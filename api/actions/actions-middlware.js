// eylemlerle ilgili ara katman yazılımları yazın

const actionsModel = require("./actions-model");

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const actions = await actionsModel.get(id);
    if (actions) {
      req.actions = actions;
      req.id = id;
      next();
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
}

async function validateAction(req, res, next) {
  try {
    const { notes, description, completed, project_id } = req.body;
    if (notes && description && project_id) {
      req.action = {
        notes: notes,
        description: description,
        completed: completed,
        project_id: project_id,
      };
      next();
    } else {
      res.status(400).json({
        message: "Lütfen bir not ve açıklama sağlayın ve bir proje belirtin.",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateId, validateAction };
