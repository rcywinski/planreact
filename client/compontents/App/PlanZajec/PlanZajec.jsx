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
        if ((_students) && (_students.length > 0)){

            function compare(a,b) {
                if (a.startTime < b.startTime)
                    return -1;
                if (a.startTime > b.startTime)
                    return 1;
                return 0;
            }

           _students = _students.sort(compare);

            var _schedule = [ [], [], [], [], [] ];
            _.each(_students, (student) => {
               _schedule[student.days - 1].push(student);
            });

            var _days = _.map(_schedule, (day, index) => {

                return (
                <div>
                    <h3>{index + 1}</h3>
                    <table className="table">

                        <thead>
                        <tr>
                            <th>Imie i nazwisko</th>
                            <th>Początek zajęć</th>
                            <th>Koniec zajęć</th>
                            <th>Grupa</th>
                            <th>Nauczyciel</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _.map(day, (student) => {
                            return <Name key={student._id} days={student.days} name={student.name} startTime={student.startTime}
                                         endTime={student.endTime} groupDB={student.groupDB} teacher={student.teacher}/>;
                        })
                        }
                        </tbody>
                    </table>
                </div>
            )
            });
            return _days;
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
    mixins: [ReactMeteorData],
    getMeteorData(){

        return { // do sort
            groups: GroupsList.find({groupDB: {$exists: true}}, {sort: {startTime: 1}}).fetch(),
            teachers: TeachersList.find({name: {$exists: true}}, {sort: {name: 1}}).fetch()

        };
    },
    getInitialState() {
        return {editing: false};
    },
    renderGroupList(){
        var groups = this.data.groups;
        var groupDBvar = groups.map((group) => {
            return <Group key={group._id} groupDB={group.groupDB}/>
        });
        return groupDBvar;
    },
    renderTeachersList(){
        var teachers = this.data.teachers;
        var showTeachers = teachers.map((teacher) => {
            return <TeacherList key={teacher._id} id={teacher._id} teacherName={teacher.name}/>
        });
        return showTeachers;
    },

    editStudentState(){
        this.setState({editing: !this.state.editing});
    },
    editingStudent: function () {
        var studentId = StudentsList.findOne({name: this.props.name})._id;
        return (
            <tr>
                <td><input type="text" defaultValue={this.props.name} id="studentName" ></input></td>
                <td><input type="time" defaultValue={this.props.startTime} id="startTime"></input></td>
                <td><input type="time" defaultValue={this.props.endTime} id="endTime"></input></td>
                <td>   <select className="form-control" id="groupForm">
                    {this.renderGroupList()}
                </select>
                </td>
                <td>
                    <select className="form-control" id="teacherForm">
                        {this.renderTeachersList()}
                    </select>
                </td>
                <td><input type="submit" className="btn btn-success" id="closeEditStudent"
                           onClick={this.editStudentState}
                           value="Close Edit">
                </input>
                    <input type="submit" className="btn btn-success" id="applyChanges"
                           data-name={studentId}
                           onClick={this.updateStudent}
                           value="Apply Changes">
                    </input>
                    <input type="submit" className="btn btn-warning" id="deleteStudent"
                           data-name={studentId}
                           onClick={this.deleteStudent}
                           value="Delete Student">
                    </input>
                </td>
            </tr>
        )
    },
    nonEditingStudentList: function () {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td><input type="time" value={this.props.startTime}></input></td>
                <td><input type="time" value={this.props.endTime}></input></td>
                <td>{this.props.groupDB}</td>
                <td>{this.props.teacher}</td>
                <td>
                    <input type="submit" className="btn btn-success" id="editStudent" onClick={this.editStudentState}
                           value="Edit">
                    </input>
                </td>
            </tr>

        )
    },
    showAllStudents(){
        if (this.state.editing){
            return this.editingStudent(); }
        else {
            return this.nonEditingStudentList();
        }
    },
    updateStudent(){
            var addGroup = $("#groupForm").val();
            var addStartTime = $("#startTime").val();
            var addEndTime = $("#endTime").val();
            var studentName = $("#studentName").val();
            //  var days = $("#days").val();
            var teachers = $("#teacherForm").val();
            var studentId = $("#applyChanges").attr("data-name");

            StudentsList.update(
                {_id: studentId},
                {
                    $set: {
                        name: studentName,
                        startTime: addStartTime,
                        endTime: addEndTime,
                        groupDB: addGroup,
                        teacher: teachers
                    }
                });
    },
    deleteStudent(){
        var studentId = $("#applyChanges").attr("data-name");
        StudentsList.remove({_id: studentId});
    },
    render()
        {
            return (
                this.showAllStudents()
            )
        }

});
