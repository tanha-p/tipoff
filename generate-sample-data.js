'use strict'

import mongoose from 'mongoose';
import  conf from './api-server/conf/app-config';
import TipsRepo from './api-server/dao/repositories/tips/tips-repository';
import UserRepo from './api-server/dao/repositories/users/user-repository';
import ProjectRepo from './api-server/dao/repositories/projects/project-repository';
import UserModel from './api-server/dao/models/user/user-model';
import ProjectModel from './api-server/dao/models/projects/project-model';
import TipsModel from './api-server/dao/models/tip/tip-model';
import TestUtils from './api-server/utils/test-utils';
import {encryptString} from './api-server/utils/auth-utils';


const generateSampleData = async () => {
	try{ 
		await mongoose.connect(conf.mongo_uri, { 
			useNewUrlParser: true, 
			useUnifiedTopology: true 
		});
		//Remove all existing users
		await UserModel.deleteMany({}).catch(error => { console.log(err) });
		//Add User
		const demoUser = {
			user_id : 'demouser@tipoff.dev',
			password: await encryptString('tipoff'),
			name: 'Radiant Shardbearer'
		}
		let user = await new UserRepo().addUser(demoUser);

		//Remove all existing projects
		await ProjectModel.deleteMany({}).catch(error => { console.log(err) });

		let projects = TestUtils.getFakeRandomProjects(5);
		let projectNames = [
			'Alekhtar',
			'Jah Kaved',
			'Thaylenah',
			'Azir',
			'Iri'
		];
		projects = projects.map((p,idx) => {
			return Object.assign(p,{
				project_owner : demoUser.user_id,
				project_name: projectNames[idx]
			})
		})
		
		let projectIds = projects.map(p => p.project_id);
		await new ProjectRepo().saveProjects(projects); 
		console.log(`${projects.length} projects added to db`);

		//Remove All Tips
		await TipsModel.deleteMany({}).catch(error => { console.log(err) });

		//Add Tips
		const tipsCount = 500;
		console.log(`adding ${tipsCount} tips to ${mongoose.connection.db.databaseName} db`);
		let tipObjs = TestUtils.getFakeTips(tipsCount, true, true );
		tipObjs = tipObjs.map(tip => {
			return Object.assign(tip,{
				project_id : projectIds[Math.floor(Math.random()*projectIds.length)]
			})
		})
		return await new TipsRepo().saveTips(tipObjs);
	}catch(error) {
		console.log(error);
	}

}

generateSampleData()
	.then(resp => resp)
	.then(resp => {
		//console.log(`finished adding ${resp.length} tips to db`);
		
	})
	.catch(err => {
		console.log(err)
		
	})
	.finally(() => {
		console.log('Process completed')
		mongoose.connection.close();
		process.exit()
	})
