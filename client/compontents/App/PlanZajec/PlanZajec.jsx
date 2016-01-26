PlanZajec = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData(){
        //console.log('jestem');
        return { // select name , sur from StudentsList
            students: StudentsList.find({}, {
                fields: {
                    _id: 1,
                    days: 1,
                    name: 1,
                    startTime: 1,
                    endTime: 1,
                    groupDB: 1,
                    teacher: 1
                }
            }).fetch()

        }
    },
    renderStudentList() {

        var _students;
        if (this.data.students) {
            _students = this.data.students;
        }
        if ((_students) && (_students.length > 0)) {

            var _a = _students.map((student) => {
                return <Name key={student._id} days={student.days} name={student.name} startTime={student.startTime}
                             endTime={student.endTime} groupDB={student.groupDB} teacher={student.teacher}/>;
            });

            //var findDay = StudentsList.find({days: "1"}).fetch();
            //var days = _students.map((studentDay) => {
            //  return <Days key={studentDay._id} day = {studentDay.days} />;
            //});



                return (
                <div>
                    <h3></h3>
                    <table className="table">

                        <thead>
                        <tr>
                            <th>Imie i nazwisko</th>
                            <th>Początek zajęć</th>
                            <th>Koniec zajęć</th>
                            <th>Grupa</th>
                            <th>Nauczyciel</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_a}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return <div>Nie ma studentow.</div>;
        }
    },


    render() {
        return (
            <div>
                {this.props.nav}
                <div>
                    <div className="container">
                    </div>
                    <h1>Plan zajęć</h1>

                    {this.renderStudentList()}

                </div>
                {this.props.planZajec}
            </div>
        );

    }

});

Name = React.createClass({
    render(){
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.startTime}</td>
                <td>{this.props.endTime}</td>
                <td>{this.props.groupDB}</td>
                <td>{this.props.teacher}</td>
            </tr>

        );
    }

});
