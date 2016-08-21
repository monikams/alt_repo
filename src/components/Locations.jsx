var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');

var Favorites = React.createClass({
  render() {
    return (
      <ul>
        {this.props.locations.map((location, i) => {
          return (
            <li key={i}>{location.name}</li>
          );
        })}
      </ul>
    );
  }
});

var AllLocations = React.createClass({

  addFave(ev) {
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    LocationActions.favoriteLocation(location);
  },
  notFave(ev) {
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    LocationActions.notfavoriteLocation(location);
  },
  deleteLocation(ev) {
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    LocationActions.deleteLocation(location);
  },
 
   updateLocation(ev){  
      var data_id = ev.target.getAttribute('data-id');
      var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
      );
       this.setState({editLocation: location.name, updateFlag: data_id, id: location.id}); //Ves change name to editLocation
  },

    getInitialState:function(){
        return{
            location: ""
        }
    },

    addLocation:function(ev){
        ev.preventDefault();
        LocationActions.addLocation(this.state);
    },

    editLocation:function(ev){
        ev.preventDefault();
        LocationActions.editLocation(this.state);

    },

    handleInputChange:function(ev){
        ev.preventDefault();
        var location = ev.target.name;
        // console.log(location);  => location
        var state = this.state;
        //console.log(state); => Object {location: "Dupnits"}
        state[location] = ev.target.value; // neobhodimo e, za da se izpishe imeto
        //console.log(state[location]);  => Dupnitsa
        this.setState(state);      
  
    },

     handleInputEditChange:function(ev){
        ev.preventDefault();
        this.setState({editLocation: ev.target.value}); //Ves change name to editLocation
    },

  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }

    if (LocationStore.isLoading()) {
      return (
        <div>
          <img src="ajax-loader.gif" />
        </div>
      )
    }

    return (
       <div>
       <form className="form" >      
          <label  htmlFor="location">Add location</label>
          <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.handleInputChange} />                        
          <button className="btn" type="submit" onClick={this.addLocation}>Add</button>      
        </form> 
          <ul>
          {this.props.locations.map((location, i) => {
            var faveButton = (
              <button onClick={this.addFave} data-id={location.id}>
                Favorite
              </button>
              );
              var notFaveButton = (
              <button onClick={this.notFave} data-id={location.id}>
                Not favorite
              </button>
              );
              var deleteButton = (
                <button onClick={this.deleteLocation} data-id={location.id}>
                  Delete
                </button>
              );
                var updateButton = (
                <button onClick={this.updateLocation} data-id={location.id}>
                  Update
                </button>
              );
                var updateForm = (
                  <form>
                        <label  htmlFor="editLocation">Update location:</label>
                        <input type="text" className="form-control" id="editLocation" name="editLocation" 
                         value={this.state.editLocation} 
                         onChange={this.handleInputEditChange}                      
                          />                           
                        <button className="btn" type="submit" onClick={this.editLocation}>Edit</button>
                  </form>
             );
            return (
              <li key={i}>
                {location.name} {location.has_favorite ? notFaveButton : faveButton} {deleteButton} {updateButton}
                {(this.state.updateFlag == location.id)  ? updateForm : ''}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

var Locations = React.createClass({
  componentDidMount() {
    LocationStore.fetchLocations();
  },

  render() {
    return (
      <div>
        <h1>Locations</h1>
        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer>

        <h1>Favorites</h1>
        <AltContainer store={FavoritesStore}>
          <Favorites />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Locations;