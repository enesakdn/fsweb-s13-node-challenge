// projects ara yazılımları buraya

const projectModel = require("../projects/projects-model");

async function validateId(req, res, next) {
  const { id } = req.params;
  try {
    const Projects = await projectModel.get(id);
    if (Projects) {
      res.status(200).json(Projects);
    } else {
      res.status(404).json(null);
    }
    req.Projects = Projects;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { validateId };
