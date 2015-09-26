var todoApp = {};

var done = function ( todo ) {
    return todo.done();
};

todoApp.controller = function () {
    this.allCompleted = function () {
        return todoList.list().filter( done ).length == todoList.list().length;
    };
    this.completeAll = function ( complete ) {
        todoList.list().forEach( function ( todo ) {
            todo.done( complete );
        } );
    };
};

todoApp.view = function ( ctrl ) {
    return [
        m.component( header ),
        m( 'section#main', [
            // we could put this input in another component if we wanted to
            m( 'input#toggle-all[type=checkbox]', {
                onchange: m.withAttr( 'checked', ctrl.completeAll ),
                checked: ctrl.allCompleted()
            } ),
            m( 'label', {
                for: 'toggle-all'
            }, 'Mark all as ' + ( ctrl.allCompleted() ? 'in' : '' ) + 'complete' ),
            m.component( todoList )
        ] ),
        m.component( footer )
    ];
};


m.route.mode = 'hash'; // use # based routing instead of the default ? based one
m.route( document.getElementById( 'todoapp' ), '/', {
    '/': todoApp,
    '/active': todoApp,
    '/completed': todoApp
} );
