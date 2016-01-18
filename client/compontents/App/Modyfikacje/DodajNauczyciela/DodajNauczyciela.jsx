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
                            <label>Imię i nazwisko:</label>
                            <input type="text" className="form-control" id="teacherName">
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <form>
                        <div>
                            <AddTeacherClass />
                        </div>
                    </form>
                </div>
                <br/>

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
            GroupsList.remove({_id: markedTeacher._id});
        });
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
                <label><input type="checkbox" onClick={this.handleClick} value="">{this.props.teacherName}</input></label>
            </div>


        )
    }
});


