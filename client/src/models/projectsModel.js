import { Model, fk, attr } from "redux-orm";

export default class Project extends Model {
    static get fields() {
        return {
            id: attr(),
            name: attr(),
            modules: fk('Module'),
        };
    }

    static parse(projectData) {

        return this.upsert(projectData);
    }

    static generate(newAttributes = {}) {

        return this.create(newAttributes);
    }

    toJSON() {
        return {...this.ref};
    }
}

Project.modelName = "Project";
