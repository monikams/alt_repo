var React = require('react');


var WebAPI = React.createClass({
  getInitialState: function() {
    return {
      has_favorite: '',
      id: '',
      name:''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      console.log(result);
      for(i=0; i<=result.length-1; i++)
      {
            console.log(result[i]);
            this.setState({
              id: result[i].id,
              name: result[i].name,
              has_favorite: result[i].has_favorite
            });
      }
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
         <p>Hello</p>
         {this.state.name} is your location!
      </div>
    );
  }
});

module.exports = WebAPI;


