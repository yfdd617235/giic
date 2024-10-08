import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTask, getTask, getTasks, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";
import { upload } from "../middlewares/multermiddleware.js";

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/tasks', authRequired, upload.single('file'), validateSchema(createTaskSchema), createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, upload.single('file'), updateTask);

export default router;