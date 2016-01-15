FlowRouter.route('/', {
    name: 'StronaGlowna',
    action() {
        ReactLayout.render(App, {
            StronaGlowna: <StronaGlowna />,
            nav: <Nav />
        });
    }
});

FlowRouter.route('/PlanZajec', {
    name: 'PlanZajec',
    action() {
        ReactLayout.render(PlanZajec, {
            //PlanZajec: <PlanZajec />,
            nav: <Nav />
        });
    }
});

//FlowRouter.route('/Modyfikacje', {
//    name: 'Modyfikacje',
//    action() {
//        ReactLayout.render(Modyfikacje, {
//            //modyfikacje: <modyfikacje />,
//            nav: <Nav />
//        });
//    }
//});
FlowRouter.route('/DodajUcznia', {
    name: 'DodajUcznia',
    action() {
        ReactLayout.render(DodajUcznia, {
            //modyfikacje: <modyfikacje />,
            nav: <Nav />
        });
    }
});
FlowRouter.route('/DodajGrupe', {
    name: 'DodajGrupe',
    action() {
        ReactLayout.render(DodajGrupe, {
            //modyfikacje: <modyfikacje />,
            nav: <Nav />
        });
    }
});
FlowRouter.route('/DodajNauczyciela', {
    name: 'DodajNauczyciela',
    action() {
        ReactLayout.render(DodajNauczyciela, {
            //modyfikacje: <modyfikacje />,
            nav: <Nav />
        });
    }
});
FlowRouter.route('/ModyfikujGrupe', {
    name: 'ModyfikujGrupe',
    action() {
        ReactLayout.render(EdycjaGrupy, {
            //modyfikacje: <modyfikacje />,
            nav: <Nav />
        });
    }
});