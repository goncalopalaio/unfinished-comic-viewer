

var SignupForm = React.createClass({
  getInitialState: function () {
    return ({user_data:localStorage.getItem("userdata")}); //yeah, i know
  },
  render: function () {
      return (
      <div>
        <div>Token: <span>{this.state.user_data.token}</span></div>
        <div>uid: <span>{this.state.user_data.uid}</span></div>
        <div>client: <span>{this.state.user_data.client}</span></div>
        <form onSubmit={this.handleSignup}>
          <input type="email" placeholder="email" ref="email"/>
          <input type="password" placeholder="password" ref="password"/>
          <input type="password" placeholder="password confirmation" ref="password_confirmation"/>
          <input type="submit"/>
        </form>
        <form onSubmit={this.handleSignin}>
          <input type="email" placeholder="email" ref="signin_email"/>
          <input type="password" placeholder="password" ref="signin_password"/>
          <input type="submit"/>
        </form>
      </div>
      );
  },

  handleSignup: function (signup_data) {
    var email=this.refs.email.value.trim();
    var password=this.refs.password.value;
    var password_confirmation=this.refs.password_confirmation.value;
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: {email:email,password:password,password_confirmation:password_confirmation},
        success: function (data,textStatus,request) {
          var user_data={token: request.getResponseHeader('Access-Token'), uid: request.getResponseHeader('Uid'),client:request.getResponseHeader('Client')};
          this.setState({user_data:user_data});
        }.bind(this),
        error: function (xhr,data,err) {
          console.log(this.props.url,status,err.toString(),data);
        }.bind(this),

    });
  }
});
