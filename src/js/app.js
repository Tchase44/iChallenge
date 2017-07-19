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
	//vaules to use in HTML
  this.hide = false;
  this.stuff = $stateParams

  // Querys and blank obj
  this.contests = Contest.query()
  this.newContest = new Contest()
  // add to db
  this.create = function() {
   	this.newContest.submissions = []
   	this.newContest.$save().then (function(contest) {
   		$state.reload()
   	})  	 			
  }
}

function ShowCtrlFun($state, $stateParams, Contest ) {
// super secret form hider
  this.hide = false
// gets single contest
  this.currentContest = Contest.get({type: $stateParams.type, id: $stateParams.id})
  this.currentType = $stateParams.type
// model for new entry
  this.entry = {title: null,author: null,content: null,desc: null,video_url: null,photo_url: null}

  this.update = ()=>{
  		// console.log('update fun exe')
    this.currentContest.$update({type: $stateParams.type,id: $stateParams.id}).then((contest) => {
      console.log(contest)
      $state.reload()
    })
  }

  this.destroy = ()=>{
    this.currentContest.$delete({type: $stateParams.type, id: $stateParams.id}).then(() => {
      $state.go("Home")
    })
  }

  this.addEntry=()=>{
  	this.currentContest.submissions.push(this.entry)
  	this.currentContest.$update({type: $stateParams.type,id: $stateParams.id}).then((contest)=>{
      console.log(contest)
      $state.reload()
    })
  }
  this.editEntry =()=>{

  }
  this.destroyEntry=(idx)=>{
  	 console.log('clicky')
  	 this.currentContest.submissions.splice(idx,1)
    this.currentContest.$update({type: $stateParams.type, id: $stateParams.id}).then(()=>{
      $state.reload()
    })
  }

}


})()
