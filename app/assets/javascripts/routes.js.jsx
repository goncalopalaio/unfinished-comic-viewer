
 $(function(){
   var Router = ReactRouter.Router;
   var Route = ReactRouter.Route;
   var IndexRoute = ReactRouter.IndexRoute;
   var browserHistory = ReactRouter.browserHistory;

   ReactDOM.render(
    (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/i/series/:id" component={SeriesDetail}/>
        <Route path="/i/view/:id" component={ChapterViewer}/>

      </Router>
    )
   ,$("#react-container").get(0));
   /*ReactRouter.render(MyRoutes,ReactRouter.HistoryLocation, function (Handler) {
        ReactDOM.render(<Handler/>, $("#react-container").get(0)); // use this, <%= react_router 'MyRoutes', 'HistoryLocation' %> uses deprecated React.render
      });*/
 });
