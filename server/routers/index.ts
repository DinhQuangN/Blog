import userRouter from './authRouter';
import blogRouter from './blogRouter';
import categoryRouter from './categoryRouter';
import commentRouter from './commentRouter';

const routes = [categoryRouter, userRouter, blogRouter, commentRouter];
export default routes;
