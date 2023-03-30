// projects ara yazılımları buraya

const projectModel = require("../projects/projects-model");

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const Projects = await projectModel.get(id);
    if (Projects) {
      req.Projects = Projects;
      req.id = id;
      next();
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
}

async function validateProjects(req, res, next) {
  const { name, description, completed } = req.body;

  if (name && description) {
    req.project = {
      name: name,
      description: description,
      completed: completed,
    };
    next();
  } else {
    res
      .status(400)
      .json({ message: "Lütfen bir message ve description sağlayın" });
    next();
  }
}

module.exports = { validateId, validateProjects };
