import faker from 'faker';

import CommonUtils from './common-utils';

export default class TestUtils {

    static  generateStackTrace = () => {
        return new Error("new error occured").stack;  
    }

    static getRandomProjectName = () => {
        let projects = ["IotWorx", "Sensaar-UI", "Sensaar-API", "ResourceTracker", "MyShopper"];
        return projects[Math.floor(Math.random()*projects.length)];
    }

    static getRandomApp(){
        const iotWorxTitles = ["Fetching news with page 2", "Loading jobs for location London,GB", "Getting resources"];
        const iotWorxTags = [["jobs","news","resources"],["resources"],["jobs","resources"],["news","jobs"]];

        const sensarUITitles = ["Fetch list of sensors", "Get Sensor Data for type temperature", "Restart sensor"];
        const sensarTags = [["temperature","humidity","motion"],["motion"],["humidity","temperature"],["motion","humidity"]];
        const sensarAPITitles = ["Get list of sensors from DB", "Send temperature out of range notification", "Add new humidity sensor"];

        const resourceTrackerTitles = ["resource left laboratory", "Resource entered facility", "15 resources in boiler room"];
        const resourceTrackerTags = [["resource entering","boiler-room exit","factory entry"],["boiler-room entry"],["factory exit","resource left"]];

        const myShopperTitles = ["Add product to cart", "Fetch list of productions", "Add product to favorites"];
        const myShopperTags = [["cart","checkout","product","favorites"],["cart"],["favorites","product"],["checkout"],["product"]];

        const projects = [
            {
                project_id : "ck7pld8yk0000b15ubsgq82fu",
                event_title: iotWorxTitles[Math.floor(Math.random()*iotWorxTitles.length)],
                tags: iotWorxTags[Math.floor(Math.random()*iotWorxTags.length)]
            },
            {
                project_id : "ck7ieik7q000izu5u885cf497",
                event_title: sensarUITitles[Math.floor(Math.random()*sensarUITitles.length)],
                tags: sensarTags[Math.floor(Math.random()*sensarTags.length)]
            },
            {
                project_id : "ck7ieihsj000hzu5uclp7e1pa",
                event_title: sensarAPITitles[Math.floor(Math.random()*sensarUITitles.length)],
                tags: sensarTags[Math.floor(Math.random()*sensarTags.length)]
            },
            {
                project_id : "ck7ieiftn000gzu5u59pxagnh",
                event_title: resourceTrackerTitles[Math.floor(Math.random()*resourceTrackerTitles.length)],
                tags: resourceTrackerTags[Math.floor(Math.random()*resourceTrackerTags.length)]
            },
            {
                project_id : "ck7ieib3o000fzu5ugtkphsvd",
                event_title: myShopperTitles[Math.floor(Math.random()*myShopperTitles.length)],
                tags: myShopperTags[Math.floor(Math.random()*myShopperTags.length)]
            }
        ];
        let p = projects[Math.floor(Math.random()*projects.length)];
        return p;

    }

    static getRandomEventType(){
        const eventTypes = ["success","warning","error","info","unhandled","custom","my-type","app-specific"];
        return eventTypes[Math.floor(Math.random()*eventTypes.length)];
    }

    static getRandomUserAgent(){
        const agents = [
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
                browser: { name: 'Chrome', version: '79.0.3945.88', major: '79' },
                engine: { name: 'Blink', version: '79.0.3945.88' },
                os: { name: 'Windows', version: '10' },
                device: { vendor: undefined, model: undefined, type: undefined },
                cpu: { architecture: 'amd64' }
            },
            {
                ua: 'Mozilla/5.0 (iPad; CPU OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/79.0.3945.73 Mobile/15E148 Safari/604.1',
                browser: { name: 'Chrome', version: '79.0.3945.73', major: '79' },
                engine: { name: 'WebKit', version: '605.1.15' },
                os: { name: 'iOS', version: '13.1' },
                device: { vendor: 'Apple', model: 'iPad', type: 'tablet' },
                cpu: { architecture: undefined }
            },
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362',
                browser: { name: 'Edge', version: '18.18362', major: '18' },
                engine: { name: 'EdgeHTML', version: '18.18362' },
                os: { name: 'Windows', version: '10' },
                device: { vendor: undefined, model: undefined, type: undefined },
                cpu: { architecture: 'amd64' }
            },
            {
                ua: 'Mozilla/5.0 (Linux; Android 9; SM-G950U1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.116 Mobile Safari/537.36',
                browser: { name: 'Chrome', version: '79.0.3945.116', major: '79' },
                engine: { name: 'Blink', version: '79.0.3945.116' },
                os: { name: 'Android', version: '9' },
                device: { vendor: 'Samsung', model: 'SM-G950U1', type: 'mobile' },
                cpu: { architecture: undefined }
            },
            {
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15',
                browser: { name: 'Safari', version: '12.1.2', major: '12' },
                engine: { name: 'WebKit', version: '605.1.15' },
                os: { name: 'Mac OS', version: '10.14.6' },
                device: { vendor: undefined, model: undefined, type: undefined },
                cpu: { architecture: undefined }
            },
            {
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
                browser: { name: 'Chrome', version: '79.0.3945.88', major: '79' },
                engine: { name: 'Blink', version: '79.0.3945.88' },
                os: { name: 'Mac OS', version: '10.14.6' },
                device: { vendor: undefined, model: undefined, type: undefined },
                cpu: { architecture: undefined }
            },
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0',
                browser: { name: 'Firefox', version: '68.0', major: '68' },
                engine: { name: 'Gecko', version: '68.0' },
                os: { name: 'Windows', version: '10' },
                device: { vendor: undefined, model: undefined, type: undefined },
                cpu: { architecture: 'amd64' }
            }

        ];
        return agents[Math.floor(Math.random()*agents.length)];
    }

    static getFakeTips(count = 10, shouldCreateWithTipId = false, tipsForMultipleProjects = false){
        let tips = [];
        let project = TestUtils.getRandomApp();
        for(let i = 0 ; i < count ; i++){
            if(tipsForMultipleProjects){
                project = TestUtils.getRandomApp();
            }
            const eventType = TestUtils.getRandomEventType();
            let tip = {
                project_id : project.project_id,
                event_type : eventType,
                event_title : project.event_title,
                event_stack: eventType === "error" ? {
                    stackTrace : TestUtils.generateStackTrace()
                } : {},
                created_on: faker.date.recent(25) ,
                user_agent: TestUtils.getRandomUserAgent()
            }
            if(i%3 === 0){
                tip.user = {
                    user_id : faker.internet.email()
                }
            }
            if(i%5 === 0){
                tip.note= faker.random.words();
            }
            if(i%2 === 0){
                tip.tags= project.tags;
            }
            tips.push(tip);
        }

        if(tips.length && shouldCreateWithTipId){
            tips = tips.map(tip => {
                tip.tip_id = CommonUtils.getCuid();
                return tip;
            });
        }
        return tips;
    }

    static getFakeRandomUsers(count = 1){
        let users = [];

        for(let i = 0 ;i < count; i++){
            let user = {
                user_id : faker.internet.email(),
                name: faker.name.findName(),
                password: 'tipoff',
                created_on: faker.date.recent(25) 
            }
            users.push(user);
        }
        return users;
    }

    static getFakeRandomUserForUserSvcTest(){
        const fakeUser = TestUtils.getFakeRandomUsers(1)[0];
		const req = {
			body : {
				userId: fakeUser.user_id,
				password: fakeUser.password,
				name: fakeUser.name
			}
        };
        const resp = {
            fakeUser : fakeUser,
            req: req
        }
        return resp;
        
    }

    static getFakeRandomProjects(count = 1){
        let projects = [];

        for(let i = 0 ;i < count; i++){
            const fakeMembers = [
                "shallan_davar@yahoo.com",
                "kaladin49@hotmail.com",
                "dalinar_kholin99@hotmail.com",
                "szeth51@hotmail.com",
                "kalak@gmail.com",
                "jasnah@gmail.com",
                "sylpherna@yahoo.com",
                "Artmyrn69@yahoo.com",
                "gavilar_kholin@yahoo.com",
                "hnanan79@gmail.com"
            ];
            const randomMemberCount = Math.ceil(Math.random()*5);
            let members = [];
            for(let i = 0 ; i < randomMemberCount; ){
                const member = fakeMembers[Math.floor(Math.random()*fakeMembers.length)];
                if(members.indexOf(member) < 0){
                    members.push(member);
                    i++;
                }
            }
            let project = {
                project_id : CommonUtils.getCuid(),
                project_name: TestUtils.getRandomProjectName(),
                project_members: members,
                project_owner: "lead@tipoff.dev",
                created_on: faker.date.recent(25),
                excluded_event_types: [TestUtils.getRandomEventType()],
                archived: false
            }
            projects.push(project);
        }
        return projects;
    }

}