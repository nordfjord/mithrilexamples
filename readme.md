# Talk

The slides can be found at: https://slides.com/einarnordfjord/deck

# What is mithril

Mithril is a client-side MVC framework - a tool to organize code in a way that is easy to think about and to maintain.

Light-weight  |  Robust | Fast
--------------|---------|----------
12kb gzipped | Safe-by-default templates | Virtual DOM diffing and compilable templates
Small API | Hierarchical MVC via components | Intelligent auto-redrawing system
Small learning curve ||

Mithrils developer @lhorie stated in a blog post that he had worked with Angular prior to making mithril.

Mithril is based on a fundamentally different approach to Angular. Whereas Angular decided to map Javascript functionality onto HTML, mithril goes the other way around and maps HTML onto Javascript.

This has some immediate benefits such as

1. Error lines in console lead to actual source of error, not an error in an HTML parser
2. Better performance since there's no need to write an HTML parser.

# How it compares
Framework | Loading | Rendering
----------|---------|-----------
mithril   | 0.28ms  | 9.44ms
jQuery    | 13.11ms | 40.27ms
Backbone  | 18.53ms | 23.05ms
Angular   | 7.49ms  | 118.63ms
React     | 24.99ms | 79.65ms

# differences from other frameworks

See Leo's excellent piece on just that [here](http://lhorie.github.io/mithril/comparison.html)

# The examples

The examples go from a `Hello World!` example and end with integrating Select2 into mithril.

example 4 is one of my favourites since it shows how powerful the redrawing system is (try selecting a few rows of the table as they are changin, and be amazed that the selection holds through redraw).

in the components directory you can see my components based version of todoMVC.
# Regarding Flux

Since flux is all the rage right now it might be good to talk about mithril and flux.

I should probably point to @barneycarrol who had this answer in the flux debate

> One of the big differences between Mithril and other MVC libraries is that Mithril aims to make events / dispatching automatic. The idea is that if you write self-validating models (ie models shouldn't depend upon external logic to keep their internal state coherent), Mithril will infer when a change might have occurred and go through all your views, modifying the parts in the DOM that have changed.

>Mithril does automatic checks after:

>An AJAX call completes (via m.request)
A DOM event is fired with a DOM-dependent data point (via m.withAttr)
The front-end route changes (via m.route)
If you know a change in one of your model has occurred through some other means, you can always force the check with m.redraw (although experience should show you that this is rarely if at all necessary).

>The beauty of this approach is you can forget all about setting up complex eventing system and let these things happen automatically. In other words, the Mithril philosophy is that you shouldn't need Flux in the first place.

>For a lot of people, this seems too good to be true. The truth is, the work you would be spending on wiring up a Flux architecture to bind to your MVC correctly is offset by:

>Mithril's blazing fast DOM diffing engine: all views are recomputed on any possible change, so they will all automatically be up to date with your latest model state. Mithril has a very light touch so even if you're comparing tens of thousands of elements and only a few data points may have changed, this is still faster than anything else in most situations. Plus, Mithril has all sorts of clever ways to change only the parts of the DOM that need to.
The fact the model will be queried continuously means you can't allow it to fall into invalid states. So rather than writing a model that can easily fall into states you wouldn't want the user to see, and then writing complex dispatchers to try and compensate for these failings, you make the models self-validating in the first instance, and you loose a layer of complexity.
If you think you really need some kind of eventing system like Flux, I'd be happy to advise you on how to accomplish given scenarios with Mithril.
