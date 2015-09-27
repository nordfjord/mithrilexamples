var app = {};

var ENTER_KEY = 13;

// we don't need to use `this` in controllers
// that's one of the reasons we can proudly claim
// that mithril doesn't force a coding style on you
app.controller = function () {
    return {
        number: m.prop(1234567890)
    };
};

app.view = function (ctrl) {
    return m('.col-md-6.col-md-push-3', [
        m('.well', [
            m('input.form-input[type=text]', {
                value: ctrl.number(),
                oninput: m.withAttr('value', ctrl.number)
            }),
            m('h3', [
                'The number is: ',
                m('span', {
                    config: animateNumber(ctrl.number())
                })
            ])
        ])
    ]);
};

m.mount(document.body, app);
