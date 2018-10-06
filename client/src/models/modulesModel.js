import { Model, fk, attr } from "redux-orm";

export default class Module extends Model {
    static get fields() {
        return {
            id: attr(),
            txt: attr(),
            // x: attr(),
            // y: attr(),
            module: fk("Project")
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

Module.modelName = "Module";
