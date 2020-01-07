const {jsonToGraphQLQuery, VariableType} = require('json-to-graphql-query');
const fieldsQueryMapper = require('./mapFieldsforQuery');
const { Checkbox, Virtual, Text } = require('@keystonejs/fields');

module.exports = class CreateList {
    constructor(
        key, 
        config = {},
        arc
    ) {
        this.config = config;
        this.arc = arc;
        this.key = key;
    }

    registerList() {
        
        // if the list is archived, then we just ignore it and quit 
        if (this.config.archive) return;

        //this.arc.keystone.createList()
        this.addFieldPlugins();
        //this.doSomethingElse()
        
        this.createMainList();
        
        this.createLangLists();
        

    }

    addFieldPlugins() {
        (this.config.plugins || (this.config.plugins = [])).push(this.listPluginAddPublishables);
    }

    listPluginAddPublishables({ fields, ...config }) {
        return {
            ...config,
            fields: {
                ...fields,
                existsOnLive:{
                    type: Checkbox,
                    default:false,
                    noedit: true
                },
                updateTimestamp:{
                    type: Checkbox,
                    default:false,
                    noedit: true
                },
                publishToProduction:{
                    type: Checkbox,
                    default:false,
                    label:'Publish to Live',
                    hooks: {
                        resolveInput: async ({
                            resolvedData,
                            context,
                          }) => {
                            if (resolvedData.publishToProduction) context.hello = 'well hi there';
                            return false;
                        },
                        beforeChange: async ({
                            operation,
                            existingItem,
                            originalInput,
                            resolvedData,
                            context,
                            actions,
                            addFieldValidationError,
                          }) => {
                            //console.log(operation);

                           // console.log('actions ', actions);

                            //console.log('originalInput ', originalInput);
                            //console.log('existingItem ', existingItem);

                        
                            //console.log('originalInput ' originalInput)

                            // Throw error objects or register validation errors with addFieldValidationError(<String>)
                            // Return values ignored
                        },
                        afterChange: async ({
                            operation,
                            existingItem,
                            originalInput,
                            resolvedData,
                            context,
                            actions,
                            addFieldValidationError,
                          }) => {
                            //console.log(operation);
                            
                            console.log('after context ', context.hello);
                            
                            // Throw error objects or register validation errors with addFieldValidationError(<String>)
                            // Return values ignored
                        }
                    }
                },
                unpublishProduction:{
                    type: Checkbox,
                    default:false,
                    label:'Remove from Live'
                },
                existsOnLive: {
                    type: Text,
                    default: 'hello',
                    access: {
                        create: true,
                        read: true,
                        update: true,
                    }
                }
            }
        };
    }

    createMainList(){
        this.config.isPrimary = true;
        this.arc.keystone.createList(this.key, this.config);
    }

    createLangLists(){
        this.config.isPrimary = false;
        this.config.primaryListName = this.key;
       
//console.log(this.arc);
        this.arc.lang.secondaries.forEach(item => {
            this.config.lang = item;
            this.arc.keystone.createList(item.listPrefix + this.key, this.config);
        });

    //     newConfigObject.baseListName = newConfigObject.listName;
	// 				newConfigObject.listName += item.modelPostfix;
	// 				newConfigObject.lang = item;
	// 				newConfigObject.primary = false;


    //     this.arc.keystone.createList(this.key, this.config);
    }

    prepareQuery() {
        //this.fieldsMapped = new fieldsQueryMapper({arc:this.arc, fields:this.config.fields});
        //console.log(jsonToGraphQLQuery(fieldsMapped, { pretty: true }));
        // console.log(jsonToGraphQLQuery(this.config.fields, { pretty: true }));
    }

    getQuery(){
        
    }

}