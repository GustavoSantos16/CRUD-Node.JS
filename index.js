const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

let numberOfRequests = 0;

function verifyProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.json({ erro: "Project does not exists" });
    }

    return next();
}


server.use((req, res, next) => {
    numberOfRequests++;
    console.log(`Número de requisições: ${numberOfRequests}`);
    return next();
})



server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    }
    projects.push(project);

    return res.json(projects);
})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', verifyProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);

    project.title = title;

    return res.json(projects);
})

server.delete('/projects/:id', verifyProjectExists, (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(p => p.id === id);

    projects.splice(index, 1);

    return res.json(projects);
})


server.post('/projects/:id/tasks', verifyProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const indexProject = projects.findIndex(p => p.id === id);

    projects[indexProject].tasks.push(title);

    return res.json(projects);


})


server.listen(3000);