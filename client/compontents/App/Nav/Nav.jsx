Nav = React.createClass({
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Strona Główna</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="/PlanZajec">Plan Lekcji</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Uczniowie, grupy i nauczyciele<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/DodajUcznia">Dodaj/usuń ucznia</a></li>
                                    <li><a href="/DodajGrupe">Dodaj/usuń grupę</a></li>
                                    <li><a href="/DodajNauczyciela">Dodaj/usuń nauczyciela</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});
