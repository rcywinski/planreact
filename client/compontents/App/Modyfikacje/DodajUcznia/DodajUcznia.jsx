DodajUcznia = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){

        return { // do the sort
            groups: GroupsList.find({groupDB: {$exists: true}}, {sort: {startTime: 1}}).fetch(),
            teachers: TeachersList.find({name: {$exists: true}}, {sort: {name: 1}}).fetch()

        };
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


    addToPlan(){

    },

//renderGroupList()
//{
//    var _groups;
//    if (this.data.groups) {
//        _groups = this.data.groups;
//    }
//    if ((_groups) && (_groups.length > 0)) {
//        var _groupDBvar = _groups.map((group) => {
//            return <Group key={group._id} groupDB={group.groupDB}/>;
//        });
//        return (
//
//           // console.log(_groupDBvar)
//                {_groupDBvar}
//
//
//        )
//    }
//    else {
//        return (
//            <select className="form-control" id="groupForm">
//
//                <option>Nie ma grup</option>
//            </select>
//        )
//    }
//},

    render(){
        return (
            <div>
                {this.props.nav}
                <h4>Dodaj nowego ucznia:</h4>

                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-4">
                            <label>Imię i nazwisko:</label>
                            <input type="text" className="form-control" id="studentName">
                            </input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2">
                            <label>Początek zajęć:</label>
                            <input type="time" className="form-control" id="startTime">
                            </input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2">
                            <label>Koniec zajęć:</label>
                            <input type="time" className="form-control" id="endTime">
                            </input>
                        </div>
                    </div>
                </div>

                <div>
                    <div><label>Dzień tygodnia:</label>
                    </div>
                    <div className="row">
                        <div className="col-xs-2">

                            <select className="form-control" id="days">
                                <option value="1">Poniedziałek</option>
                                <option value="2">Wtorek</option>
                                <option value="3">Środa</option>
                                <option value="4">Czwartek</option>
                                <option value="5">Piątek</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">

                    <div><label>Grupa:</label></div>

                    <div className="row">
                        <div className="col-xs-4">
                            <select className="form-control" id="groupForm">
                                {this.renderGroupList()}
                            </select>

                        </div>


                    </div>
                </div>
                <div className="form-group">

                    <div><label>Nauczyciel:</label></div>

                    <div className="row">
                        <div className="col-xs-4">
                            <select className="form-control" id="teacherForm">
                                {this.renderTeachersList()}
                            </select>

                        </div>


                    </div>
                </div>

                <div>
                    <form>
                        <div>
                            <AddToPlanClass />
                        </div>
                    </form>
                </div>
                <br/>

            </div>

        )
    }
});

//
//function submitform(event, template) {
//    event.preventDefault();

/**************************ZMIENNE*******************************/


//var studentNameVar = template.find('#studentName').value;
//var startTimeVar = template.find('#startTime').value;
//var endTimeVar = template.find('#endTime').value;
//var days = template.find("#days").value;
//var allVar = StudentsList.find().fetch();
//var allEndTab = _.pluck(allVar, 'endTime');
//var allStartTab = _.pluck(allVar, 'startTime');
//var sortedStartTab = allStartTab.sort(compare);
//var sortedEndTab = allEndTab.sort(compare);
//var group2 = template.find('#groupForm').value;
//var group = template.find("#groupForm").value;
//var group3 = group.value;
// console.log(group2);
/******************************FUNKCJE****************************/
    //function insertowanie() {
    //    StudentsList.insert({
    //        name: studentNameVar, startTime: startTimeVar, endTime: endTimeVar,
    //        days: days, groupDB: group2
    //    });
    //}

    //  console.log(group);
    //function compare(a, b) {
    //    var ax = [], bx = [];
    //
    //    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
    //        ax.push([$1 || Infinity, $2 || ""])
    //    });
    //    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
    //        bx.push([$1 || Infinity, $2 || ""])
    //    });
    //
    //    while (ax.length && bx.length) {
    //        var an = ax.shift();
    //        var bn = bx.shift();
    //        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    //        if (nn) return nn;
    //    }
    //
    //    return ax.length - bx.length;
    //}
    //
    ///******************************PROGRAM****************************/
    //
    //
    //if (this.props.addEndTime < this.props.addStartTime) {
    //    alert("Czas poczatkowy musi byc wiekszy niz czas koncowy")
    //}
    //else {
    //    this.props.addToPlan()
    //}
    //else if (StudentsList.find().count() === 0){
    //    insertowanie();
    //}
    //else {
    //  console.log(sortedStartTab, sortedEndTab);
    //  for (var x = 0; x < StudentsList.find().count(); x++) {
    //
    //    if (startTimeVar <= sortedStartTab[x] && endTimeVar <= sortedStartTab[x]) {
    //     insertowanie();
    //    }
    //    else if (startTimeVar <= sortedStartTab[x] && startTimeVar >= sortedEndTab[x - 1] &&
    //        endTimeVar <= sortedStartTab[x] && endTimeVar >= sortedEndTab[x - 1]) {
    //      insertowanie();
    //    }
    //    else if (startTimeVar >= sortedEndTab[StudentsList.find().count() - 1]) {
    //      insertowanie();
    //    }
    //    else {
    //      alert("Ta godzina jest juz zajęta!");
    //    }
    //    break;
    //  } //for
    //}//else


//} //submit form


Group = React.createClass({
    render(){

        return (
            <option value={this.props.groupDB}>
                {this.props.groupDB}
            </option>
        )
    }
});
TeacherList = React.createClass({

    render(){
        //console.log (this.props.teacherName, this.props.id);
        return (

            <option value={this.props.teacherName}>
                {this.props.teacherName}
            </option>


        )
    }
});

AddToPlanClass = React.createClass({


    addToPlan(e){
        e.preventDefault;

        var addGroup = $("#groupForm").val();
        var addStartTime = $("#startTime").val();
        var addEndTime = $("#endTime").val();
        var studentName = $("#studentName").val();
        var days = $("#days").val();
        var teachers = $("#teacherForm").val();

        //console.log($("#groupForm").val);
        StudentsList.insert({
            name: studentName, startTime: addStartTime, endTime: addEndTime,
            days: days, groupDB: addGroup, teacher: teachers
        });
    },

    render(){
        return (
            <input type="submit" className="btn btn-success" id="submitName" onClick={this.addToPlan}
                   value="Dodaj do planu">
            </input>
        )
    }
});


