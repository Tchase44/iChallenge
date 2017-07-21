
(function(){
angular
.module("challengeMe", [
  "ui.router",
  "ngResource"
  // "ngSanitize"
])
.config([
  "$stateProvider",
  "$locationProvider",
  "$sceProvider",
   Router
])
.factory("Contest", [
  "$resource",
  ContestFactory
])
.controller("IndexController", [
  "$state",
  "$stateParams",
  // "$sce",
  "Contest",
   IndexControllerFunction
])
.controller("ShowController", [
  "$state",
  "$stateParams",
  // "$sce",
  "Contest",
  ShowCtrlFun
])
.controller('HomeController', [
	"Contest",
	HomeCtrlFun
	])
// .directive("iframeDirective",["$src","url",iFrameDirFun])
// .directive('iframeDirective', ['$sce', function($sce) {
//   return {
//     restrict: 'E',
//     template: '<iframe src="{{ trustedUrl }}" frameborder="0" allowfullscreen></iframe>',
//     link: function(scope) {
//       scope.trustedUrl = $sce.trustAsResourceUrl();
//     }
//   }
// }])
function Router($stateProvider, $locationProvider,$sceProvider) {
	$sceProvider.enabled(false);
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

function ShowCtrlFun($state, $stateParams, Contest) {
// super secret form hider
  this.hide = false
// gets single contest
  this.currentContest = Contest.get({type: $stateParams.type, id: $stateParams.id})
  this.currentType = $stateParams.type
// model for new entry
  this.entry = {title: null,author: null,content: null,desc: "no description needed",video_url: null,photo_url: null,votes: 0}

  //
  this.clickedEntry = null;

  this.update = ()=>{
  		// console.log('update fun exe')
    this.currentContest.$update({type: $stateParams.type,id: $stateParams.id}).then((contest) => {

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
  	this.update()
  }
  // this.editEntry =()=>{

  // }
  this.destroyEntry=(idx)=>{
  	 console.log('clicky')
  	 this.currentContest.submissions.splice(idx,1)
    this.update()
  }
  this.featMe=(idx)=>{
  	 switch (this.currentContest.type){
  	 	case "photo":
  	 		this.clickedEntry = this.currentContest.submissions[idx].photo_url
  	 		break;
  	 	case "text":
  	 		this.clickedEntry = this.currentContest.submissions[idx].content
  	 		break;
  	 	case "video":
  	 		this.clickedEntry = this.currentContest.submissions[idx].video_url
  	 		break;
  	 	default:
  	 		console.log('error')
  	 }
  }
   this.upVote=(idx)=>{
   	console.log('up')
   	this.currentContest.submissions[idx].votes += 1
   	this.update()
   }
   this.downVote=(idx)=>{
   	console.log('down')
   	this.currentContest.submissions[idx].votes -= 1
   	this.update()
   }
}



})()


