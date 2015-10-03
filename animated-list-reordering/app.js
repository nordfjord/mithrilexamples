// Mithril port of snabbdoms animated list example: https://github.com/paldepind/snabbdom/tree/master/examples/reorder-animation

var nextKey = 11;
var margin = 8;
var sortBy = 'rank';
var totalHeight = 0;
var originalData = [ {
    rank: 1,
    title: 'The Shawshank Redemption',
    desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    elmHeight: 0
}, {
    rank: 2,
    title: 'The Godfather',
    desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    elmHeight: 0
}, {
    rank: 3,
    title: 'The Godfather: Part II',
    desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.',
    elmHeight: 0
}, {
    rank: 4,
    title: 'The Dark Knight',
    desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
    elmHeight: 0
}, {
    rank: 5,
    title: 'Pulp Fiction',
    desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    elmHeight: 0
}, {
    rank: 6,
    title: 'Schindler\'s List',
    desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    elmHeight: 0
}, {
    rank: 7,
    title: '12 Angry Men',
    desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.',
    elmHeight: 0
}, {
    rank: 8,
    title: 'The Good, the Bad and the Ugly',
    desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
    elmHeight: 0
}, {
    rank: 9,
    title: 'The Lord of the Rings: The Return of the King',
    desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    elmHeight: 0
}, {
    rank: 10,
    title: 'Fight Club',
    desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...',
    elmHeight: 0
} ];
var data = [].slice.call(originalData);

function changeSort( prop ) {
    return function () {
        sortBy = prop;
        data.sort( function ( a, b ) {
            if ( a[ prop ] > b[ prop ] ) {
                return 1;
            }
            if ( a[ prop ] < b[ prop ] ) {
                return -1;
            }
            return 0;
        } );
    };
}

function add() {
    var n = originalData[ Math.floor( Math.random() * 10 ) ];
    data = [ {
        rank: nextKey++,
        title: n.title,
        desc: n.desc,
        elmHeight: 0
    } ].concat( data );
}

function remove( movie ) {
    data = data.filter( function ( m ) {
        return m !== movie;
    } );
}

function delayed_style( delayed ) {
    return function ( el, init, ctx ) {
        var style = typeof delayed === 'function' ? delayed.apply( this, arguments ) : delayed || {};
        for ( var name in style ) {
            el.style[ name ] = style[ name ];
        }
    };
}

function remove_style( options ) {
    options = options || {};
    return function ( ev ) {
        if ( !options.style ) return;
        el = options.accessor ? options.accessor( ev ) : ev.target;
        if ( !el.addEventListener ) return;
        m.startComputation();
        var applied = [];
        var style = typeof options.style == 'function' ? options.style() : options.style || {};
        for ( var name in style ) {
            applied.push( name );
            el.style[ name ] = style[ name ];
        }
        var compStyle = window.getComputedStyle( el );
        var props = compStyle[ 'transition-property' ].split( ', ' );
        var amount = 0;
        for ( var i = 0; i < props.length; ++i ) {
            if ( ~applied.indexOf( props[ i ] ) ) ++amount;
        }
        el.addEventListener( 'transitionend', function ( ev ) {
            if ( ev.target === el ) --amount;
            if ( amount === 0 ) {
                if ( options.rm ) options.rm();
                m.endComputation();
            }
        } );
    };
}

function calculateOffset( el, movie, idx ) {
    movie.elmHeight = el.offsetHeight;
    var lastOffset = 0,
        lastHeight = 0;
    if ( idx > 0 ) {
        var prev = data[ idx - 1 ];
        lastOffset = +prev.offset;
        lastHeight = prev.elmHeight;
    }
    movie.offset = lastOffset + lastHeight + margin;
}

function movieView( movie, idx ) {
    if ( movie.visible === false ) return null;
    return m( '.row', {
        key: movie.rank,
        config: delayed_style( function ( el ) {
            calculateOffset( el, movie, idx );
            return {
                transform: 'translateY(' + movie.offset + 'px)',
                opacity: '1'
            };
        } ),
        style: {
            opacity: '0',
            transform: 'translate(-200px)'
        }
    }, [
        m( 'div', {
            style: {
                fontWeight: 'bold'
            }
        }, movie.rank ),
        m( 'div', movie.title ),
        m( 'div', movie.desc ),
        m( '.btn.rm-btn', {
            onclick: remove_style( {
                style: function () {
                    return {
                        transform: 'translateY(' + movie.offset + 'px) translateX(200px)',
                        opacity: '0'
                    };
                },
                accessor: function ( ev ) {
                    return ev.target.parentNode;
                },
                rm: function () {
                    remove( movie );
                }
            } )
        }, 'x' )
    ] );
}

var app = {
    view: function () {
        return m( 'div', [
            m( 'h1', 'Top 10 movies' ),
            m( 'div', [
                m( 'a.btn.add', {
                    onclick: add
                }, 'Add' ),
                'Sort by: ',
                m( 'span.btn-group', [
                    m( 'a.btn.rank' + ( sortBy === 'rank' ? '.active' : '' ), {
                        onclick: changeSort( 'rank' )
                    }, 'Rank' ),
                    m( 'a.btn.title' + ( sortBy === 'title' ? '.active' : '' ), {
                        onclick: changeSort( 'title' )
                    }, 'Title' ),
                    m( 'a.btn.desc' + ( sortBy === 'desc' ? '.active' : '' ), {
                        onclick: changeSort( 'desc' )
                    }, 'Description' )
                ] )
            ] ),
            m( '.list', {
                style: 'height: ' + ( data[ data.length - 1 ].offset + data[ data.length - 1 ].elmHeight ) + 'px'
            }, data.map( movieView ) )
        ] );
    }
};


m.mount( document.getElementById( 'container' ), app );
