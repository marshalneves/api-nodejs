import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

usersRouter.post('/auth', usersController.auth);
usersRouter.post('/create', usersController.insert);
// usersRouter.post('/create', usersController.createUser);
// usersRouter.get('/list/role/user', ensureAuthenticated, usersController.getUsersAccounts);
// usersRouter.get('/:user_id', ensureAuthenticated, usersController.getUserById);

export default usersRouter;