import tipsRoutes from './tips/tips-route-controller';
import addTipRoute from './add-tip/add-tip-route';
import authRoutes from './auth/auth-route-controller';
import projectRoutes from './projects/projects-route-controller';
import {protectRoute, validateOriginForProject} from '../utils/auth-utils';
import cors from 'cors';

const router = (app) => {
	app.use('/api/v1/tips', protectRoute, tipsRoutes);
	app.use('/api/v1/projects', protectRoute, projectRoutes);
	app.use('/api/v1/auth', authRoutes);
	//Allow cross origin requests for Add tip route only
	app.use('/api/v1/add-tip', cors(), validateOriginForProject, addTipRoute);
}

export default router;
