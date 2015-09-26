var todoList = {
    controller: function () {
        this.list = todoList.list;
        // we don't want to reinitialize the list on route changes
        if ( todoList.list().length ) {
            return;
        }
        Todo.list()
            .then( this.list );
    },
    // the list is stored as a static method on the component
    // this makes it globally accessible from other components
    list: m.prop( [] ),
    view: function ( ctrl ) {
        return m( 'ul#todo-list', [
            ctrl.list().filter( function ( todo, index ) {
                // filters based on the active route
                return ( m.route() == '/completed' && todo.done() ) ||
                    ( m.route() == '/active' && !todo.done() ) ||
                    ( m.route() === '/' );
            } ).map( function ( _todo ) {
                // this is where it comes in handy having a key property on our todos
                // if we did not, then checkboxes might not update correctly
                return m.component( todo, _todo );
            } )
        ] );
    }
};
