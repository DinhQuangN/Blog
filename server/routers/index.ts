import userRouter from './authRouter';
import blogRouter from './blogRouter';
import categoryRouter from './categoryRouter';

const routes = [categoryRouter, userRouter, blogRouter];
export default routes;
