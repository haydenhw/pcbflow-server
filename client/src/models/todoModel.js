
export class Todo extends ValidatingModel {
    static reducer(action, Todo, session) {
        const { payload, type } = action;
        switch (type) {
        case CREATE_TODO:
            // Payload includes a comma-delimited string
            // of tags, corresponding to the `name` property
            // of Tag, which is also its `idAttribute`.
            const tagIds = action.payload.tags.split(',').map(str => str.trim());

            // You can pass an array of ids for many-to-many relations.
            // `redux-orm` will create the m2m rows automatically.
            const props = Object.assign({}, payload, { tags: tagIds, done: false });
            Todo.create(props);
            break;
        case MARK_DONE:
            // withId returns a Model instance.
            // Assignment doesn't mutate Model instances.
            Todo.withId(payload).done = true;
            break;
        case DELETE_TODO:
            Todo.withId(payload).delete();
            break;
        case ADD_TAG_TO_TODO:
            Todo.withId(payload.todo).tags.add(payload.tag);
            break;
        case REMOVE_TAG_FROM_TODO:
            Todo.withId(payload.todo).tags.remove(payload.tag);
            break;
        }
    }
}
Todo.modelName = 'Todo';
Todo.fields = {
    id: attr(),
    done: attr(),
    text: attr(),
    tags: many('Tag', 'todos'),
    user: fk('User', 'todos'),
};
Todo.propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    user: PropTypes.oneOfType([
        PropTypes.instanceOf(User),
        PropTypes.number,
    ]).isRequired,
    tags: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.instanceOf(Tag),
        PropTypes.string,
    ])).isRequired,
};
Todo.defaultProps = {
    done: false,
};
