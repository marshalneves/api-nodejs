import { Router } from "express";

import { postsController } from '../controllers/posts.controller';
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const postsRouter = Router();

// postsRouter.use(ensureAuthenticated);

// postsRouter.get('/:post_id', postsController.getById);
// postsRouter.get('/recents/:user_id', postsController.recentPosts);
// postsRouter.get('/balance/:user_id', postsController.getBalance);

postsRouter.post('/insert', postsController.insert);
postsRouter.post('/update', postsController.update);
postsRouter.post('/list', postsController.list);
postsRouter.post('/remove', postsController.remove);

postsRouter.get('/recents/:user_id/:limit', postsController.recentPosts);
postsRouter.get('/balance/:user_id', postsController.getBalance);

export default postsRouter;