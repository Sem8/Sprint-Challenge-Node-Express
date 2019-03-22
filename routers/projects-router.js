const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "The projects information could not be retrieved."
        });
    }
});

// router.get('/:id', (req, res) => {
//     const id =req.params.id
//     Projects.get(id).then(projects => {
//         if (projects) {
//             res.status(200).json(projects);
//         } else {
//             res.status(404).json({ message: 'The project with the specified ID does not exist' });
//         }        
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: "The projects information could not be retrieved."});
//     });
// });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        console.log(project);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "Project does not exist" });
        }
    } catch (error) {
        res.status(500).json({ error: `Error occurred while retrieving project: ${error}`})
    }
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    if( !name || !description ) {
        res.status(400).json({message: "Bad request, submit name and description of new project."})
    } else {
        try {
            const { id } = await Projects.insert(req.body);
            const newProject = await Projects.get(id);
            console.log(newProject);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ error: `Error occurred while creating project: ${error}`})
        }
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const projectToDelete = await Projects.get(id);
        if (!projectToDelete) {
            res.status(404).json({ message: 'Project does not exist' });
        }
        const count = await Projects.remove(id);
        if(count > 0 ) {
            res.status(200).json(projectToDelete);
        }
    } catch (error) {
        res.status(500).json({ error: `Error occurred while deleting project: ${error}` });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.name || !changes.description) {
        res.status(400).json({ message: 'Need either a name or description.'});
    }
    try {
        const count = await Projects.update(id, changes);
        if (!count) {
            res.status(404).json({ message: 'Project does not exist.'});
        } else {
            const changedProject = await Projects.get(id);
            res.status(200).json(changedProject);
        }
    } catch (error) {
        res.status(500).json({ error: `Error occurred while updating project: ${error}` });
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        if(actions && actions.length > 0 ) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({ message: 'No actions for this post' });
        }
    } catch (error) {
        res.status(500).json({ message: `error getting the actions for this post: ${error}`})
    }
});

module.exports = router;

