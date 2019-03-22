const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const projects = await Projects.get(req.query);
//         res.status(200).json(projects);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: "The projects information could not be retrieved."
//         });
//     }
// });

// router.get('/', (req, res) => {
//     const id =req.params.id
//     Projects.get(id).then(projects => {
//         res.status(200).json(projects);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "The projects information could not be retrieved."});
//     });
// });

router.get('/:id', (req, res) => {
    const id =req.params.id
    Projects.get(id).then(projects => {
        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "The projects information could not be retrieved."});
    });
});

module.exports = router;

