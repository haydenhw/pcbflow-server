export function printModuleNames(thumbnail) {
  const children = JSON.parse(thumbnail).
    children[0].
    children[0].
    children[5].
    children.
    forEach(module => console.log(module.children[0].attrs.text));
}

export function getModulesObject(thumbnail) {
  const children = JSON.parse(thumbnail).
    children[0].
    children[0].
    children[5].
    children.
    forEach(module => console.log(module.children[0]));
}

//
