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
            return <Teacher key={teacher._id} name={teacher.name}/>
        });
        return showTeachers;
    },



    render(){
        return (
            <div>
                {this.props.nav}
                <div>{this.renderTeachersList}</div>

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

Teacher = React.createClass({
    render(){

        return (
            <div>
                {this.props.name}
            </div>
        )
    }
});

AddTeacherClass = React.createClass({


    addTeacher(e){
        e.preventDefault;
        var teacherName = $("#teacherName").val();

        TeachersList.insert({
            name: name
        });
    },

    render(){
        return (
            <input type="submit" className="btn btn-success" id="submitName" onClick={this.addTeacher}
                   value="Dodaj nauczyciela">
            </input>
        )
    }
});


