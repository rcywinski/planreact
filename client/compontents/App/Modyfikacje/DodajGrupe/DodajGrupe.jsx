DodajGrupe = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            groups: GroupsList.find({groupDB: {$exists: true}}, {sort: {startTime: 1}}).fetch()
        }
    },
    renderGroupList(){

        var groups = this.data.groups;
        var groupDBvar = groups.map((group) => {
            return (<GroupList key={group._id} id={group._id} name={group.groupDB}/>);
        });
        return groupDBvar;
    },

    render(){
        return (
            <div>
                {this.props.nav}
                <h4>Grupy dostępne w bazie:</h4>
                <ul>{this.renderGroupList()} </ul>


                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-4">
                            <label>Podaj nazwę nowej grupy:</label>
                            <input type="text" className="form-control" id="groupName">
                            </input>

                        </div>
                        <br/>
                    </div>
                </div>

                <AddGroupToGroups />


            </div>
        )
    }
});

AddGroupToGroups = React.createClass({

    addGroup(e){
        e.preventDefault;
        var GroupNameForm = $("#groupName").val();
        GroupsList.insert ({
            groupDB: GroupNameForm,
            isMarked: false
        });
    },

    deleteGroup(){
        var markedGroups = GroupsList.find({isMarked: true}).fetch();
        _.each(markedGroups, (markedGroup) => {
            GroupsList.remove({_id: markedGroup._id});
        });
    },


    render(){
        return (

            <div>
                <input type="submit" className="btn btn-success" id="submitGroup" onClick={this.addGroup}
                       value="Dodaj grupę">
                </input>
                <input type="submit" className="btn btn-warning" id="deleteGroup" onClick={this.deleteGroup}
                       value="Usuń zaznaczone grupy">
                </input>
            </div>
        )
    }

});


GroupList = React.createClass({

    handleClick(e){
        e.preventDefault;
        var GroupIsMarkedStatus = GroupsList.findOne({_id: this.props.id});
        GroupsList.update ({_id: this.props.id}, {$set: {isMarked: !GroupIsMarkedStatus.isMarked}});
        console.log(this.props.id)
    },

    render(){
        console.log (this.props.id);
        console.log (this.props.name);
        return (

                <div className="checkbox">
                    <label><input type="checkbox" onClick={this.handleClick} value="">{this.props.name}</input></label>
                </div>

        )
    }
});



//="/ModyfikujGrupe/"
//onClick={this.handleClick}
// <EdycjaGrupy idGrupy={this.props.id} nazwaGrupy={this.props.name} />
//var ModifyGroup = React.createClass({
//
//    getInitialState() {
//        return {liked: false};
//    },
//    render() {
//        return (
//            <p onClick={this.handleClick}>
//                You {text} this. Click to toggle.
//            </p>
//
//        );
//    }
//});


//SessionClickOnGroup = React.createClass({
//
//    sessionGroup(){
//
//        Session.set ('SelectedGroup', 'test test');
//        var selectedGroup = Session.get ('SelectedGroup');
//        console.log(selectedGroup);
//    },
//    render(){
//
//        return <div onClick={this.sessionGroup}></div>
//
//    }
//});
//
//onItemClicked = React.createClass({
//        onItemClick: function (event) {
//
//            event.currentTarget.style.backgroundColor = '#ccc';
//
//        },
//
//        render: function () {
//            return (
//                <div>
//                    <ul>
//                        <li onClick={this.onItemClick}>Component 1</li>
//                    </ul>
//                </div>
//            );
//        }
//    }
//);

//TestApp = React.createClass({
//    getComponent: function(index) {
//        $(this.getDOMNode()).find('li:nth-child(' + index + ')').css({
//            'background-color': '#ccc'
//        });
//    },
//    render: function() {
//        return (
//            <div>
//                <ul>
//                    <li onClick={this.getComponent.bind(this, 1)}>Component 1</li>
//                    <li onClick={this.getComponent.bind(this, 2)}>Component 2</li>
//                    <li onClick={this.getComponent.bind(this, 3)}>Component 3</li>
//                </ul>
//            </div>
//        );
//    }
//});
//React.renderComponent(<TestApp /> , document.getElementById('soln1'));