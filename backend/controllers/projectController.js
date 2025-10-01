import Project from '../models/ProjectModel.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (we'll add auth later)
const createProject = async (req, res) => {
  const { title, description, imageUrl, category } = req.body;

  try {
    const project = new Project({
      title,
      description,
      imageUrl,
      category,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid project data' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (we'll add auth later)
const updateProject = async (req, res) => {
  const { title, description, imageUrl, category } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.imageUrl = imageUrl || project.imageUrl;
      project.category = category || project.category;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating project' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (we'll add auth later)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export { getProjects, createProject, updateProject, deleteProject };