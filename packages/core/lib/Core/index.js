const arcList = require('../list');

module.exports = class Core {
    constructor({
        keystone,
        stgPrefix = 'Stg',
        homeSlug = '/home',
        treeModel = 'Page',
        adminUi = {},
        lang = {
            config:{},
            primary:{},
            secondaries:[]
        },
        cache = {}
    }) {  
        
        // settings from config object
        this.keystone = keystone;
        this.stgPrefix = stgPrefix;
        this.homeSlug = homeSlug;
        this.treeModel = treeModel;
        this.adminUi = adminUi;
        this.lang = lang;
        this.cache = cache;
        
        // settings to be populated 
        this.lists = {};
        this.queries = {};
    }

    // // Because Arc can establish and build queries on rel fields
    // // the `setting` of a list and the `registration of a list in keystone
    // // are two different actions. The `registerLists` must be called after 
    // // all `setList` methods are run.  
    // createList(name, config){
    // }

    // // this method needs to be run after all lists are set becuase the query building part needs 
    // // access to all set list data (`setList`)
    // registerLists(config){
    //     // buildStagables
    //     // buildLangs
    // }

    // takes the same arguments as keystone.createList
    // https://www.keystonejs.com/api/create-list
    // however, Arc adds additional properties to the config object
    // TODO: readme for this ☝️
    createList(name, config){
        
        //const list = new createList(name, config, this);
        const list = new arcList(name, config, this);  
        list.registerList();
        
        // buildStagables
        // buildLangs

       // this.lists[name] = list;
        // buildQuery
        // collectHooks

       // this.lists[name] = listObj;

        //list.prepareQuery();

    } 


};  


