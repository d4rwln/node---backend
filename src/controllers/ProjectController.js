const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const Task = mongoose.model("Task");

module.exports = {
    async index(req, res) {
        try {
            const project = await Project.find().populate(['user', 'tasks']); //busca as informações do relacionamento
            return res.json(project)

        } catch (e) { return res.status(400).send({ error: 'Error in get all project' }) }

    },
    async create(req, res) {
        try {
            const { title, tasks } = req.body
            const project = await Project.create({ title, user: req.userId }); //id do usuário setado no meddleware

            //esperar todas as promises
            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id, assignedTo: req.userId })
                await projectTask.save()
                project.tasks.push(projectTask)
            }));

            await project.save()
            return res.json(project)
        } catch (e) { 
            console.log(e)
            return res.status(400).send({ error: 'Error in create project' }) }

    },
    async getById(req, res) {
        try {
            const project = await Project.findById(req.params.id).populate(['user', 'tasks']);
            return res.json(project)

        } catch (e) { return res.status(400).send({ error: 'Error in getId project' }) }

    },
    async update(req, res) {
        try {
            const {title, tasks} = req.body
            const project = await Project.findByIdAndUpdate(req.params.id, { title, }, { new: true }); //retorne atualizado

            //apagar tudo antes de atualizar
            project.tasks = []
            await Task.remove({project: project._id})


            //esperar todas as promises
            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id, assignedTo: req.userId })
                await projectTask.save()
                project.tasks.push(projectTask)
            }));

            await project.save()
            return res.json(project)



        } catch (e) { return res.status(400).send({ error: 'Error in update project' }) }

    },
    async remove(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.id); //retorne atualizado
            return res.json({ "success": true })

        } catch (e) { return res.status(400).send({ error: 'Error in remove project' }) }

    },
};             