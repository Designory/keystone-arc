const _ = require('lodash');
const traverse = require('traverse');
const {jsonToGraphQLQuery, VariableType} = require('json-to-graphql-query');

const fieldsMap = class mapFieldsForQuery {
    constructor({arc, fields}) {
        this.arc = arc;
        this.fields = _.cloneDeep(fields);
    }

    getQueryFromFields({fields, lang, env}) {
        //console.log('this.fields ', this.fields);
        let self = this;

        // simplify the schema object
        // we can remove anything at the "{type} level" 
        // because we don't need to pass this to the 
        // graphql query, with the one exception of rel's
        traverse(fields || this.fields).forEach(function(val) {
            //console.log(val);
            if (this.node.rel) {
                let list = self.getFieldsFromList(this.node.rel, lang, env);
                this.update({[this.node.rel]:self.getQueryFromFields(list)})
            }
            else if (this.node.type) {
                this.update('field');
            }
        });
   
        return jsonToGraphQLQuery(this.fields, { pretty: true });

    }

    getFieldsFromList(){

    }

}

module.exports = fieldsMap;