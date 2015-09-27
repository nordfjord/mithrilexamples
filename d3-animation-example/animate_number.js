// treat it as a float so that it doesn't error during transition
var format = d3.format(',.0f');

function animateNumber ( number ) {
    // the config function has several arguments
    // element: the actual dom element
    // isInitialized: has this function been run on this element before
    // ctx: a data store bound to the element (not in the dom though)
    return function ( element, isInitialized, ctx ) {
        // set up element scope
        if ( !isInitialized ) {
            // save interpolation function in the context
            ctx.interp = null;
            ctx.lastNumber = 0; // animate the first occurrance as well
            ctx.el = d3.select( element );
            element.innerHTML = '0';
        }
        ctx.number = number;
        // since this happens outside of the isInitialized bit this is run on every redraw
        if ( ctx.number != ctx.lastNumber ) {
            if ( ctx.redrawing ) {
                ctx.interp = d3.interpolateNumber( ctx.lastNumber || 0, ctx.number );
                ctx.lastNumber = ctx.number;
            } else {
                ctx.el.transition().duration( 250 )
                    .ease( 'quad-out-in' )
                    .tween( 'text', function () {
                        ctx.redrawing = true;
                        ctx.interp = d3.interpolateNumber( ctx.lastNumber || 0, ctx.number );
                        ctx.lastNumber = ctx.number;
                        return function ( t ) {
                            // since we're using ctx to hold the interpolation function
                            // we can simply swap it out if we're in the process of a redraw
                            // and the element will still update accordingly
                            this.innerHTML = format( ctx.interp( t ) );
                        };
                    } )
                    .each( 'end', function () {
                        ctx.redrawing = false;
                    } );
            }
        }
    };
}
