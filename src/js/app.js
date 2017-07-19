(function(){
angular
.module("challengeMe", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  "$locationProvider",
   Router
])
.factory("Contest", [
  "$resource",
  ContestFactory
])
.controller("IndexController", [
  "$state",
  "$stateParams",
  "Contest",
   IndexControllerFunction
])
.controller("ShowController", [
  "$state",
  "$stateParams",
  "Contest",
  ShowCtrlFun
])
.controller('HomeController', [
	"Contest",
	HomeCtrlFun
	])
function Router($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("Home", {
    url: "/",
	 controller: "HomeController",
	 controllerAs: "vmHome",
    templateUrl: 'assets/js/ng-views/home.html'
  })
  .state("index", {
    url: "/challenge/:type",
    templateUrl: 'assets/js/ng-views/listing.html',
    controller: "IndexController",
    controllerAs: "vmIdx"
  })
  .state("show", {
    url: "/challenge/:type/:id",
    templateUrl: 'assets/js/ng-views/show.html',
    controller: "ShowController",
    controllerAs: "vmShow"
  })
}

function ContestFactory ($resource) {
  return $resource('/api/challenge/:type/:id', {}, {
    update: {method: "PUT"}
  })
}
function HomeCtrlFun(Contest){
	this.contests = Contest.query()
}
function IndexControllerFunction($state, $stateParams, Contest ) {
  this.hide = false;
  this.stuff = $stateParams
  this.contests = Contest.query()

  this.newContest = new Contest()
  this.create = function() {
    this.newContest.submissions = []
    this.newContest.$save().then (function(contest) {
      $state.reload()
    })
  }
}

function ShowCtrlFun($state, $stateParams, Contest ) {
  this.hide = false
  this.contest = Contest.get({type: $stateParams.type, id: $stateParams.id})
  console.log(this.contest)
  this.update = function() {
    this.contest.$update({id: $stateParams.id}).then(function(contest) {
      $state.go("index")
    })
  }  

  this.destroy = function(){
    this.contest.$delete({id: $stateParams.id}).then(function() {
      $state.go("index")
    })
  }
}


})()
