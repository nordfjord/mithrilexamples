// creates a unique ID within the application
// useful for key-ing elements
var uniqueID = ( function () {
    var count = 0;
    return function () {
        return ++count;
    };
}() );

var Todo = function ( data ) {
    this.label = m.prop( data.label );
    this.done = m.prop( data.done );
    // since we're using the todo component in a list
    // it is wiser to have keys on our elements
    // so that mithril can more easily detect when a change should occurr
    // this is something that would normally be handled
    // server side
    this.key = uniqueID();
};

Todo.list = function () {
    return m.request( {
        method: 'GET',
        url: 'todos.json',
        type: Todo
    } );
};
