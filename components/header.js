var header = {};
header.controller = function () {
    ctrl = this;
    ctrl.newTodo = new Todo( { done: false, label: '' } );
    ctrl.submitOnEnter = function ( e ) {
        if ( e.keyCode == 13 ) {
            if ( ctrl.newTodo.label().length ) {
                todoList.list().push( ctrl.newTodo );
                ctrl.newTodo = new Todo( { done: false, label: '' } );
            }
        }
    };
};

header.view = function ( ctrl ) {
    return m( 'header', [
        m( 'h1', 'todos' ),
        m( 'input#new-todo', {
            placeholder: 'What needs to be done?',
            autofocus: '',
            oninput: m.withAttr( 'value', ctrl.newTodo.label ),
            onkeypress: ctrl.submitOnEnter,
            value: ctrl.newTodo.label()
        } )
    ] );
};
