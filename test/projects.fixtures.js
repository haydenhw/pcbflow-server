const project = {
  name: 'New Project',
  owner_id: 1,
  board_height: 300,
  board_width: 500,
  board_x: -3.5,
  board_y: 204,
  board_thumbnail:
    '{"attrs":{"width":520,"height":320},"className":"Stage","children":[{"attrs":{"name":"boardLayer"},"className":"Layer","children":[{"attrs":{"name":"boardGroup","x":10,"y":10,"width":500,"height":300,"draggable":"true"},"className":"Group","children":[{"attrs":{"name":"board","width":500,"height":300,"fill":"#e3e3e5","opacity":"0.5","stroke":"#ccc"},"className":"Rect"},{"attrs":{"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"topLeft","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"x":500,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"topRight","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"y":300,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"bottomLeft","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"x":500,"y":300,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"bottomRight","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{},"className":"Group","children":[]}]}]}]}'
}

const modules = [{
  project_id: 1,
  module_id: '105',
  price: 48,
  icon_height: '70px',
  icon_src: 'images/COM-connector.svg',
  image_src: 'images/COM-connector.svg',
  image_height: 125,
  image_width: 250,
  image_y: 4,
  image_x: 2,
  text_y: 32,
  text_x: 76,
  text: 'COM Connector',
  inner_group_y: -60.5,
  inner_group_x: 193.5,
  bound_to_side_index: null,
  rotation: 90,
  height: 133,
  width: 254,
  stroke: '#01579b',
  y: 80.5,
  x: 200.5,
  dependencies: '109'
},
  {
    project_id: 1,
    module_id: '109',
    price: 9.75,
    icon_height: '70px',
    icon_src: 'images/regulator-5V5A-icon.svg',
    image_src: 'images/regulator-5V5A.svg',
    image_height: 80,
    image_width: 40,
    image_y: 10,
    image_x: 12.5,
    text_y: 25,
    text_x: 15,
    text: '5V/5A Regulator',
    inner_group_y: 17.5,
    inner_group_x: 82.5,
    bound_to_side_index: null,
    rotation: 90,
    height: 100,
    width: 65,
    stroke: '#7e57c2',
    y: 169,
    x: 85,
    dependencies: '110'
  }
]

function makeProjectsWithModules() {
  return [{...project, modules}]
}

function makeProjects() {
  return [project];
}

function makeMaliciousArticle() {
  const maliciousArticle = {
    id: 911,
    style: 'How-to',
    date_published: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  }
  const expectedArticle = {
    ...maliciousArticle,
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  }
  return {
    maliciousArticle,
    expectedArticle,
  }
}

module.exports = {
  makeProjects,
  makeProjectsWithModules,
  makeMaliciousArticle,
}
