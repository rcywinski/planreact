DodajNauczyciela = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            // do the sort
            teachers: TeachersList.find({name: {$exists: true}}, {sort: {name: 1}}).fetch()
        };
    },
    renderTeachersList(){

        var teachers = this.data.teachers;
        var showTeachers = teachers.map((teacher) => {
            return <Teacher key={teacher._id} id={teacher._id} teacherName={teacher.name}/>
        });
        return showTeachers;
    },

    render(){
        return (
            <div>
                {this.props.nav}
                <h4>Nauczyciele dostępni w bazie:</h4>
                <ul>{this.renderTeachersList()}</ul>

                <h4>Dodaj nowego nauczyciela:</h4>

                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-4">
                            <label>Podaj nazwę nowej grupy:</label>
                            <input type="text" className="form-control" id="teacherName">
                            </input>

                        </div>
                        <br/>
                    </div>
                </div>

                <AddTeacherClass />
                <ShowPlanForTeacher />
            </div>

        )
    }
});


AddTeacherClass = React.createClass({


    addTeacher(e){
        e.preventDefault;
        var teacherName = $("#teacherName").val();

        TeachersList.insert({
            name: teacherName,
            isMarked: false
        });
    },
    deleteTeacher(){
        var markedTeachers = TeachersList.find({isMarked: true}).fetch();
        //console.log("marked teachers", markedTeachers);
        _.each(markedTeachers, (markedTeacher) => {
            // console.log ("marekd", markedTeacher._id);
            TeachersList.remove({_id: markedTeacher._id});

        });
    },
    showPlanForTeacher(){
    },

    render(){
        return (
            <div>
                <input type="submit" className="btn btn-success" id="submitName" onClick={this.addTeacher}
                       value="Dodaj nauczyciela">
                </input>
                <input type="submit" className="btn btn-warning" id="deleteTeacher" onClick={this.deleteTeacher}
                       value="Usuń zaznaczonych nauczycieli">
                </input>
                <a href="/PlanZajec"> plan </a>
                <input type="submit" className="btn btn-succes" id="showPlanForTeacher"
                       onClick={this.showPlanForTeacher}
                       value="Pokaż plan dla zaznaczonego nauczyciela">
                </input>
            </div>
        )
    }
});


Teacher = React.createClass({
    handleClick(e){
        e.preventDefault;
        var TeacherIsMarkedStatus = TeachersList.findOne({_id: this.props.id});
        TeachersList.update ({_id: this.props.id}, {$set: {isMarked: !TeacherIsMarkedStatus.isMarked}});

    },
    render(){
        console.log (this.props.teacherName, this.props.id);
        return (
            <div className="checkbox">
                <label><input type="checkbox" onClick={this.handleClick}
                              value="">{this.props.teacherName}</input></label>
            </div>


        )
    }
});

ShowPlanForTeacher = React.createClass ({
    mixins: [ReactMeteorData],
    getMeteorData(){
        //console.log('jestem');
        return { // select name , sur from StudentsList
            teachers: TeachersList.find({name: {$exists: true}}, {sort: {name: 1}}).fetch(),
            students: StudentsList.find({}, {
                fields: {
                    _id: 1,
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

        // Get tasks from this.data.tasks
        var _students;
        var _teachers = this.data.teachers;
        if (this.data.students) {
            _students = this.data.students;
        }
        if ((_students) && (_students.length > 0)) {

            var _a = _students.map((student) => {
                return <Name key={student._id} name={student.name} startTime={student.startTime}
                             endTime={student.endTime} groupDB={student.groupDB} teacher={student.teacher}/>;
            });
            var _b = _teachers.map((teacher) => {
                return <TeacherName key={teacher._id} teacherName={teacher.name} isMarked={teacher.isMarked}/>;
            });

            return (
                <div>
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
                    <table className="table">

                        <thead>
                        <tr>
                            <th>Imie i nazwisko nauczyciela</th>
                            <th>Czy zaznaczony</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_b}
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

TeacherName = React.createClass({
    render(){
        return (
            <tr>
                <td>{this.props.teacherName}</td>
                <td>{this.props.isMarked}</td>
            </tr>

        );
    }

});

