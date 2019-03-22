const express = require('express');

const Actions = require('../data/helpers/actionModel.js');
const Projectsdb = require('../data/helpers/projectModel.js');

const actionsRouter = express.Router();

actionsRouter.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ error: `Error occurred while retrieving actions: ${error}` })
    }
});

actionsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const action = await Actions.get(id);
        console.log(action);
        if(action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Action does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: `Error occurred while retrieving action: ${error}` })
    }
});

actionsRouter.post('/', async (req, res) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: `Bad request, submit project Id, description and notes for the action.`
        });
    } else {
        try {
            const action = await Actions.get(project_id);
            if (!action) {
                res.status(404).json({ message: 'Action does not exist.' });
            } else {
                const { id } = await Actions.insert(req.body);
                const newAction = await Actions.get(id);
                res.status(201).json(newAction);
            }
        } catch (error) {
            res.status(500).json({ error: `Error occurred while creating action: ${error}` });
        }
    }
});

actionsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const actionToDelete = await Actions.get(id);
        if (!actionToDelete) {
            res.status(404).json({ message: 'Action does not exist' });
        } else {
            const count = await Actions.remove(id);
            if (count) {
                res.status(200).json(actionToDelete);
            }
        }
    } catch (error) {
        res.status(500).json({ error: `Error occurred while deleting action: ${error}` });
    }
});

actionsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const { project_id, description, notes } = changes;

    if(!project_id || !description || !notes ) {
        res.status(400).json({ message: 'Needs a description, project Id or notes'});
    }
    try {
        const action = await Actions.get(project_id);
        if (!action) {
            res.status(404).json({ message: 'Project does not exist' });
        }
        const count = await Actions.update(id, changes);
        if(!count) {
            res.status(404).json({ message: 'Action does not exist' });
        } else {
            const changedAction = await Actions.get(id);
            res.status(200).json(changedAction);
        }
    } catch (error) {
        res.status(500).json({ error: `Error occurred while updating action: ${error}` });
    }
});


module.exports = actionsRouter;