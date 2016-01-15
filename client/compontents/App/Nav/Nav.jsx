Nav = React.createClass({
    render() {
        return (
            <ul className="nav nav-tabs nav-justified">
                <li><a href="/">Strona Glowna</a></li>
                <li><a href="/PlanZajec">Plan zajęć</a></li>
                <li><div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Modyfikacja studentow
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="/DodajUcznia">Dodaj/usun studneta</a></li>
                        <li><a href="/DodajGrupe">Dodaj/usun grupe</a></li>
                        <li><a href="/DodajNauczyciela">Dodaj/usun nauczyciela</a></li>
                        <li><a href="#">Dodaj nauczyciela</a></li>
                        <li><a href="#">Administracja</a></li>
                    </ul>
                </div></li>

            </ul> )
    }
});
