import { Model, fk, attr } from "redux-orm";

export default class Module extends Model {
  static get fields() {
    return {
      boundToSideIndex: attr(),
      dependencies: attr(),
      dependencyId: attr(),
      height: attr(),
      iconHeight: attr(),
      iconSrc: attr(),
      id: attr(),
      _id: attr(),
      imageHeight: attr(),
      imageNode: attr(),
      imageSrc: attr(),
      imageWidth: attr(),
      imageX: attr(),
      imageY: attr(),
      info: attr(),
      innerGroupX: attr(),
      innerGroupY: attr(),
      price: attr(),
      rotation: attr(),
      text: attr(),
      textX: attr(),
      textY: attr(),
      width: attr(),
      x: attr(),
      y: attr(),
      project: fk('Project'),
    }
  }

  static generate(newAttributes = {}) {
    const combinedAttributes = {
      ...defaultAttributes,
      ...newAttributes,
    };

    return this.create(combinedAttributes);
  }
}

Module.modelName = "Module";
