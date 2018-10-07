import { Model, fk, attr } from "redux-orm";

export default class Project extends Model {
  static get fields() {
    return {
      _id: attr(),
      board: attr(),
      id: attr(),
      name: attr(),
      ownderId: attr(),
    };
  }

  static generate(newAttributes = {}) {
    const combinedAttributes = {
      ...defaultAttributes,
      ...newAttributes,
    };

    return this.create(combinedAttributes);
  }
}

Project.modelName = "Project";
