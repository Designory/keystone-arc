const express = require('express');
const { Keystone } = require('@keystonejs/keystone');
const { Text, Password, Checkbox } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { StaticApp } = require('@keystonejs/app-static');
//const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { RoutesApp } = require('./test-middleware');
const Arc = require('@arc-cms/core');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "key5";

// let's instantiate the keystone instance
// before we also instantiate arc
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
});

// now that the keystone object has been created, let's pass it into a 
// new arc instance
const arc = new Arc({
  keystone,
	homeSlug:'/home',
	treeModel:'Page',
	adminUi: {
		'landingPage': [
			{
				title: 'Main Site Content',
				items: [
					// {
					// listName:'Location',
					// // svg:function(color) {
					// // 	return `<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Utils" transform="translate(-180.000000, -540.000000)" fill="${color}"><g id="icons" transform="translate(20.000000, 20.000000)"><path d="M177.29325,524.12175 L165.24325,536.17175 L163.82925,534.75775 L175.87925,522.70775 C176.26925,522.31675 176.90225,522.31675 177.29325,522.70775 C177.68425,523.09775 177.68425,523.73075 177.29325,524.12175 L177.29325,524.12175 Z M176.66425,536.72275 C176.91525,537.33175 176.46725,538.00075 175.80825,538.00075 L175.80125,538.00075 C175.42625,538.00075 175.08725,537.77375 174.94525,537.42575 L172.58125,531.66275 L173.99725,530.24575 L176.66425,536.72275 Z M162.57325,525.04275 C162.22625,524.90075 162.00025,524.56275 162.00025,524.18675 C162.00025,523.52775 162.66925,523.07975 163.27925,523.33175 L169.75525,526.00275 L168.34025,527.41775 L162.57325,525.04275 Z M179.41425,522.00075 L178.00025,520.58575 C177.21925,519.80475 175.95325,519.80475 175.17225,520.58575 L171.16825,524.59075 L164.29225,521.76475 C162.24625,520.92375 160.00025,522.42775 160.00025,524.64075 C160.00025,525.45075 160.48925,526.18175 161.23925,526.48975 L166.92625,528.83175 L163.12125,532.63675 C162.73125,533.02675 162.09825,533.02675 161.70725,532.63675 L161.70725,532.63675 C161.31725,532.24575 160.68425,532.24575 160.29325,532.63675 L160.29325,532.63675 C159.90225,533.02675 159.90225,533.65975 160.29325,534.05075 L165.95025,539.70775 C166.34025,540.09775 166.97425,540.09775 167.36425,539.70775 L167.36425,539.70775 C167.75525,539.31675 167.75525,538.68375 167.36425,538.29375 L167.36425,538.29375 C166.97425,537.90275 166.97425,537.26975 167.36425,536.87875 L171.16925,533.07475 L173.51125,538.76175 C173.81925,539.51175 174.54925,540.00075 175.36025,540.00075 C177.57225,540.00075 179.07725,537.75475 178.23625,535.70875 L175.41025,528.83275 L179.41425,524.82875 C180.19525,524.04775 180.19525,522.78175 179.41425,522.00075 L179.41425,522.00075 Z" id="airplane_mode-[#1406]"></path></g></g></g></svg>`
					// // },
					// label:'Hello Location'
					// },
					'Location',
					'Tile',
					'Career',	
				]
			},
			{
				title: 'Reference',
				items:  [
					{
						label: 'Pattern Library',
						href: 'https://google.com'
					},
					{
						label: 'Zeplin Project',
						href: 'https://google.com'
					},
					{
						label: 'Marvel Link',
						href: 'https://google.com'
					}
				]
			},
			{
				title: 'Form Submissions',
				items: [
					'ContactSubmission',
					'CareerSubmission'
				]
			}, 
			{
				title:'Settings',
				items:[
					'SocialMedia',
					'ContactRecipient'
				]
			}
		],
		'utilityNavigation':[],
		'theme': {
			logo:'s',
			primaryColor:'#1a73e8',
			secondaryColor:'#fff'
		}
	},
	lang:{
		config:{
			globalLabelsList:'PageGlobal'
		},
		primary:{
			 path:'en',
			 label:'English',
			 translatedLabel:'English'
		},
		secondaries:[
			{
				path:'zh',
				label:'Chinese',
				listPrefix: 'Zh__',
				translatedLabel:'中文'
			},
			{
				path:'ja',
				label:'Japanese',
				listPrefix: 'Ja__',
				translatedLabel:'日本語'
			},
			{
				path:'it',
				label:'Italian',
				listPrefix:'It__',
				translatedLabel:'Italiano'
			},
			{
				path:'pt',
				label:'Portuguese',
				listPrefix:'Pt__',
				translatedLabel:'Português'
			},
			{
				path:'es',
				label:'Español',
				listPrefix:'Es__',
				translatedLabel:'Español'
			},
			{
				path:'fr',
				label:'French',
				listPrefix:'Fr__',
				translatedLabel:'Français'
			}//,
			// {
			// 	path:'de',
			// 	label:'German',
			// 	modelPostfix:'De'
			// }
		]
	},
	cache:{
		'defaultPrefix':'__CACHEIY__',
		'excludes':'/styles/css-body',
		//'redisUrl':process.env.REDIS_URL,
		'enableCacheOnPost':false, // default falsy
		'expires': 10, // in ms, default/falsy is forever
		'debounceWait': 20 // in ms, default is 3000,
		//'cacheIsFlushed': (arc) => {console.log('yo yo yo cache is flushed ', typeof arc)}
		//'expiration': 60 * 60 * 24 // in seconds, default is 'forever'
  }
});

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    password: { type: Password, isRequired: true },
    isAdmin: { type: Checkbox },
  },
});

arc.createList('Test', {
  arcType: 'module',
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
    anotherthing:{ type: Text, schemaDoc: 'This is the thing you need to do' }
  },
  moduleQuery: ({stgPrefix, langPrefix, helpers}) => {
    return `query {
      allTests {
        id
        name
      }
      _allTestsMeta {
        count
      }
    }`
  }
});

// const arc = new Arc(keystone);

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  newThanks:'fjdskjd',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
  },
  plugins:[atTracking({}), byTracking({})]
});

//console.log(keystone);

// const authStrategy = keystone.createAuthStrategy({
//   type: PasswordAuthStrategy,
//   list: 'User',
//   config: {
//     /*...config */
//   },
// });

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({enableDefaultRoute: true}),
   // new ArcAdminUIApp({enableDefaultRoute: true}),
    new RoutesApp({keystone})
  ],
};

// const dev = process.env.NODE_ENV !== 'production';
// const preparations = [new GraphQLApp(), new AdminUIApp({ enableDefaultRoute: true })].map(app =>
//   app.prepareMiddleware({ keystone, dev })
// );

// Promise.all(preparations).then(async middlewares => {
//   await keystone.connect();
//   const app = express();
//   app.use(middlewares).listen(3000);
// });