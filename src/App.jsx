var React = require('react');
var Locations = require('./components/Locations.jsx');
//var WebAPI = require('./components/WebAPI.jsx');

React.render(
  <Locations />,
  document.getElementById('ReactApp')
);

// React.render(
//   <WebAPI source="http://localhost:54730/api/locations" />,
//   document.getElementById('ReactApp')
// );
