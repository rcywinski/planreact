DodajNauczyciela = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            // do the sort
            teachers: TeachersList.find({name: {$exists: true}}, {sort: {name: 1}}).fetch(),
            students: StudentsList.find({}, {
                fields: {
                    _id: 1,
                    name: 1,
                    startTime: 1,
                    endTime: 1,
                    groupDB: 1,
                    teacher: 1,
                    days: 1,
                }
            }).fetch()
        };
    },

    renderTeachersList(){

        var teachers = this.data.teachers;
        var showTeachers = teachers.map((teacher) => {
            //if (teacher.isMarked === false) {
            return <Teacher key={teacher._id} id={teacher._id} teacherName={teacher.name}/>

        });
        return showTeachers;
    },

    render()
    {
        return (
            <div>
                {this.props.nav}
                <h3>Nauczyciele dostępni w bazie:</h3>
                <ul>{this.renderTeachersList()}</ul>

                <h4>Dodaj nowego nauczyciela:</h4>

                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-4">
                            <label>Podaj nazwę nowego nauczyciela:</label>
                            <input type="text" className="form-control" id="teacherName">
                            </input>
                        </div>
                    </div>
                </div>

                <AddTeacherClass />
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
        _.each(markedTeachers, (markedTeacher) => {
            TeachersList.remove({_id: markedTeacher._id});

        });
    },

    renderPlanForTeacher(){
        var checkedTeacher = TeachersList.find({isMarked: true}).fetch();
        if (checkedTeacher.length > 0) {
            var valueCheckedTeacher = checkedTeacher[0].name;
            var studentsForTeacher = StudentsList.find ({teacher: valueCheckedTeacher}).fetch();
            var showStudentsForTeacher = studentsForTeacher.map((studentsForTeacher)=> {
                return <StudentsForTeacher key={studentsForTeacher._id} studentsForTeacherName={studentsForTeacher.name}
                                           studentsForTeacherStartTime={studentsForTeacher.startTime}
                                           studentsForTeacherEndTime={studentsForTeacher.endTime}
                                           studentsForTeacherGroupDB={studentsForTeacher.groupDB}
                                           studentsForTeacherDays={studentsForTeacher.days}/>
            });
        }
        return (
            <div>
                <h3> Plan zajęć dla zaznaczonego nauczyciela</h3>
                <table className="table">

                    <thead>
                    <tr>
                        <th>Imie i nazwisko</th>
                        <th>Początek zajęć</th>
                        <th>Koniec zajęć</th>
                        <th>Grupa</th>
                        <th>Dzień tygodnia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showStudentsForTeacher}
                    </tbody>
                </table>

            </div>
        )
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
                <div>
                    {this.renderPlanForTeacher()}
                </div>
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

        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" onClick={this.handleClick}
                           value="">{this.props.teacherName}
                    </input>
                </label>
                <div>
                </div>
            </div>


        )
    }
});
StudentsForTeacher = React.createClass({


    render(){
        return (

            <tr>
                <td>{this.props.studentsForTeacherName}</td>
                <td>{this.props.studentsForTeacherStartTime}</td>
                <td>{this.props.studentsForTeacherEndTime}</td>
                <td>{this.props.studentsForTeacherGroupDB}</td>
                <td>{this.props.studentsForTeacherDays}</td>
            </tr>

        )
    }

});

