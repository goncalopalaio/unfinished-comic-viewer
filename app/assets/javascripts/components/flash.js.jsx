

var Flash = React.createClass({
  getInitialState: function () {
    return ({flash:[]});
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <div>
        {this.state.flash}
      </div>
    );

  }
});
