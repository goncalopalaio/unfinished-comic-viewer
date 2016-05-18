
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
window.onpopstate = function(event) {
    window.location.reload();
};
var appState = (function () {
  return {
    buildLatestReleasesUrl: function (that,success_fn,error_fn) {
      return "/latest.json";
    },
    buildChaptersUrl: function (id) {
      return "/chapters/".concat(id).concat(".json");
    },
    buildSeriesDetailsUrl: function (id) {
      return "/series/".concat(id).concat(".json");
    },
    buildPagesUrl: function (id) {
      return "/pages/".concat(id).concat(".json");
    }
  };
})();


var Navigation = React.createClass({
  render: function () {
    return (
      <nav className="navbar">
        <p className="navbar-item is-text-centered">
          <a className="link is-info">Home</a>
        </p>
        <p className="navbar-item is-text-centered">
          <a className="link is-info">Series</a>
        </p>
        <p className="navbar-item is-text-centered title">
          Viewer
        </p>
        <p className="navbar-item is-text-centered">
          <a className="link is-info">Tags</a>
        </p>
        <p className="navbar-item is-text-centered">
          <a className="link is-info">Conta Pessoal</a>
        </p>
      </nav>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <footer className="footer">
      <div className="container">
        <div className="content is-text-centered">
          Isto é o footer
        </div>
      </div>
    </footer>
    );
  }
});
var LatestReleases = React.createClass({
  getInitialState: function () {
    return ({latest:[]});
  },
  componentDidMount: function () {
    $.ajax({
      url:appState.buildLatestReleasesUrl(),
      dataType:'json',type:'GET',
      success: function (data) {this.setState({latest:data});}.bind(this),
      error: function (xhr, status, err) {console.log(xhr,status,err);}.bind(this)
    });
  },

  render: function () {
    var nodes=this.state.latest.map(function (series,index) {
      return (<SeriesCard data={series} key={index}/>);
    });
    return (
      <div className="columns is-multiline">{nodes}</div>
    );
  }
});
var PageList = React.createClass({
  getInitialState: function () {
      return ({pages:[]})
  },
  render: function () {
    var nodes = this.state.page_info.pages.map(function (page,index) {
      return (
        <img  className="image is-128x128" src={page.url} key={id+index}/>
      );
    });
    return (
      <div>LIST OF PAGES</div>
    );
  }
});
var ChapterMovementHandler = React.createClass({
  render: function () {
    if(this.props.id == ""){
      return (
        <Link to={`/i/series/${this.props.series}`}>Back to Series description {this.props.series}</Link>
      );
    }else{
      return (
          <a onClick={this.props.behavior}>NEXT {this.props.text} {this.props.id}</a>
      );
    }
  }
});
var ChapterViewer = React.createClass({
  getInitialState: function () {
    return ({series:1,current_page:"",nex: "/",prev: "/",pages:[]});
  },
  updateData: function (id) {
    $.ajax({
      url:appState.buildPagesUrl(id),
      dataType:'json',type:'GET',
      success: function (data) {
        nex_url = data["chapter_info"]["next"];
        prev_url = data["chapter_info"]["prev"];
        chapter_number = data["chapter_info"]["number"];
        this.setState({number:chapter_number,series: data["series"],current_page:id,pages:data["pages"],nex: nex_url,prev: prev_url});

    }.bind(this),
      error: function (xhr, status, err) {console.log(xhr,status,err);}.bind(this)
    });
  },
  componentWillMount: function () {
    if(this.props.params.id){
      this.updateData(this.props.params.id);
    }
  },
  componentDidMount: function () {
    $(document.body).on('keydown', this.handleKeyDown);
  },
  componentWillUnMount: function () {
    $(document.body).off('keydown', this.handleKeyDown);
  },
  handleKeyDown: function (event) {
    if(event.keyCode == 37){ //left key pressed
      if(this.state.prev != ""){
          this.moveToPrevPage();
      }
    }
    if(event.keyCode == 39){ //right key pressed
      if(this.state.nex != ""){
          this.moveToNextPage();
      }
    }
  },
  moveToNextPage: function () {
    this.updateData(this.state.nex);
    browserHistory.push("/i/view/".concat(this.state.nex));
  },
  moveToPrevPage: function () {
    this.updateData(this.state.prev);
    browserHistory.push("/i/view/".concat(this.state.prev));

  },
  render: function () {
    var nodes=this.state.pages.map(function (page,index) {
        return (
          <li key={index}>
            <img className="" src={page.url}/>
          </li>
          );
    });

      return (
        <div>
          <h1 className="title">Chapter {this.state.number}</h1>

          <ChapterMovementHandler series={this.state.series} behavior={this.moveToNextPage} text="Next" id={this.state.nex}/>
          <ChapterMovementHandler series={this.state.series} behavior={this.moveToPrevPage} text="Previous" id={this.state.prev}/>
            <ol className="container page-list">{nodes}</ol>
        </div>
      );
  }
});
var ChapterList  = React.createClass({
  getInitialState: function () {
    return {chapters:[]}
  },

  componentDidMount: function () {
    var id =this.props.id;
    $.ajax({
      url:appState.buildChaptersUrl(id),
      dataType:'json',type:'GET',
      success: function (data) {
        this.setState({chapters:data});
    }.bind(this),
      error: function (xhr, status, err) {console.log(xhr,status,err);}.bind(this)
    });

  },
  render: function () {

    var chapter_list_nodes = this.state.chapters.map(function (chap,index) {
      return (
        <tr>
          <td className="table-icon">
            <i className="fa fa-android"></i>
          </td>
          <td className="table-link">
            <Link to={`/i/view/${chap.id}`}>Go to Chapter {chap.number}</Link>
          </td>
          <td>
            2003
          </td>
          <td className="table-link table-icon">
            <a href="#">
              <i className="fa fa-github"></i>
            </a>
          </td>
          <td className="table-link table-icon">
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <div className="title sub-title">Chapter List</div>
          <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Number</th>
                  <th>Last Update</th>
                  <th colspan="3">Links</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Number</th>
                  <th>Last Update</th>
                  <th colspan="3">Links</th>
                </tr>
              </tfoot>
              <tbody>
                {chapter_list_nodes}
              </tbody>
            </table>


      </div>


    );
  }

});
var SeriesDetail = React.createClass({
  getInitialState: function () {
    return {series:{tags:[{name:"no tags"}]}};
  },
  componentDidMount: function () {
    var id = this.props.params.id;
    $.ajax({
      url:appState.buildSeriesDetailsUrl(id),
      dataType:'json',type:'GET',
      success: function (data) {
        this.setState({series:data});
    }.bind(this),
      error: function (xhr, status, err) {console.log(xhr,status,err);}.bind(this)
    });
  },
  render: function () {
    var tag_nodes = this.state.series.tags.map(function (tag,index) {
      return (<span key={index}>{tag.name} </span>);
    });
    return (
      <div>
        <Navigation/>

        <div className="title">{this.state.series.title}</div>
        <img src={this.state.series.cover_image_large}/>
        <ChapterList id={this.props.params.id}/>

        <Footer/>
      </div>



    );
  }
});
var SeriesCard = React.createClass({
  componentDidMount: function () {

  },
  render: function () {

    return (

      <div className="series-detail column is-quarter">
        <Link to={`/i/series/${this.props.data.id}`}>
        <p className="image is-1by1">
          <img className="cover" src={this.props.data.cover_image_large}/>
        </p>
        <div className="title">{this.props.data.title}</div>
      </Link>
      </div>

    );

  }
});

var Hero = React.createClass({
  render: function () {
    return (
    <section className="hero">
      <div className="hero-content">
      <div className="section">
        <h1 className="title">Em destaque</h1>
        <h1 className="sub-title">Esta semana</h1>
      </div>
      </div>
    </section>
    );
  }
});

var Home = React.createClass({
  getInitialState: function () {
    return ({latest_releases:[{title:"title1",latest:"12",lastupdate:"Yesterday",finished:"no"},{title:"title1",latest:"12",lastupdate:"Yesterday",finished:"no"},{title:"title1",latest:"12",lastupdate:"Yesterday",finished:"no"},{title:"title1",latest:"12",lastupdate:"Yesterday",finished:"no"},{title:"title1",latest:"12",lastupdate:"Yesterday",finished:"no"}]});
  },
  render: function () {
    return (
      <div>
      <Navigation/>
      <Hero/>
      <section className="latest-releases section">
        <h1 className="title">Últimas atualizações</h1>
        <LatestReleases/>

      </section>
      <Footer/>
      </div>
    );
  }
});

var Signin = React.createClass({
  render: function () {
    return (
      <div>
      <Navigation/>

      <div>Sign in!</div>
      </div>
    );
  }
});

var NoMatch = React.createClass({
  render: function () {
    return (
      <div>
      <div>NO MATCH</div>
      </div>
    );
  }
});



var Signup = React.createClass({
  test: function () {
    ReactRouter.HistoryLocation.push("/login");
    return false;
  },
  render: function () {
    return (
      <div>
      <Navigation/>
      <div>Signup</div>
        <Link to="home">home</Link>
        <a href="#" onClick={this.test}>TEST</a>
      </div>
    );
  }
});
