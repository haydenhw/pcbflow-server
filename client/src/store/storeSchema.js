const store = {
  entities: {
    projects: {
      'id-string' : {
        name: 'string',
        ownerId: 'string',
        board: {
          height: 'number',
          width : 'number',
          x : 'number',
          y : 'number',
          anchors: {
            topLeft: {
              x: 'number',
              y: 'number',
            },
            topRight: {
              x: 'number',
              y: 'number',
            },
            bottomLeft: {
              x: 'number',
              y: 'number',
            },
            bottomRight: {
              x: 'number',
              y: 'number',
            },
          }
        },
      }
    },
    modules: {
      ... moduleProps
    }
  },
  triggers: {
    saveProject: 'bool',
    // should this be built in to project save?
  },
  projects: {
    isFetching: 'bool',
    activeProjectId: 'string',
  },
  modules: {
    activeModuleId: 'string',
    draggingModuleId: 'string',
  },
  ui: {
    sidebar: {
      isHidden: 'bool',
    },
    contextMenu: {
      isActive: 'bool',
    },
    modal: {
      isActive: 'bool',
      type: 'string',
      props: {},
  },
  mouse: {
    ...all current props
    // can some of these props be calculated ?
  },
  tutorial: {
    ... todoProps
  },
}
