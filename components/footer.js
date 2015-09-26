var footer = {};

var undone = function ( todo ) {
    return !todo.done();
};

footer.controller = function () {
    this.countUndone = function () {
        return todoList.list().filter( undone ).length;
    };
};

// Notice here that m.route can be used as a config function
// In that case it makes sure that the href of the virtual dom element
// anchors to the correct link (depends on m.route.mode) so href=/active becomes href=/?/active
// this ensures that ctrl-clicking a link actually works

footer.view = function ( ctrl ) {
    var undone = ctrl.countUndone();
    return m( 'footer#footer', [
        m( 'span#todo-count', [ m( 'strong', undone ), undone === 1 ? ' item' : ' items', ' left' ] ),
        m( 'ul#filters', [
            m( 'li', m( 'a', {
                href: '/',
                config: m.route,
                className: m.route() == '/' ? 'selected' : ''
            }, 'All' ) ),
            m( 'li', m( 'a', {
                href: '/active',
                config: m.route,
                className: m.route() == '/active' ? 'selected' : ''
            }, 'Active' ) ),
            m( 'li', m( 'a', {
                href: '/completed',
                config: m.route,
                className: m.route() == '/completed' ? 'selected' : ''
            }, 'Completed' ) ),
        ] )
    ] );
};
