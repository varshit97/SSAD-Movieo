/**
 * Created by sanjay on 3/28/15.
 */

App.controller('DashboardController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state, responseCode) {
    $scope.stats={};
    $scope.stats.rides = 0;
    $scope.stats.users = 0;
    $scope.stats.revenue = 0;
    console.log("inside controller");
    var now = new Date();
    var yesterday = now.setDate(now.getDate() - 1);
    $.post(MY_CONSTANT.url + '/dashboard_report', {
        access_token: $cookieStore.get('obj').accesstoken,
        start_time: yesterday,
        end_time: now
    }, function (response) {
        response = JSON.parse(response);
        if (response.status = responseCode.SUCCESS) {
            var data=response.data;
            console.log(data);
            $scope.stats.revenue = data.total_data.earnings;
            $scope.stats.rides = data.total_data.rides;
            $scope.stats.users = data.total_users;
            $scope.$apply();
        }
    })
});
App.controller('AngularCarouselController', ["$scope", function($scope) {

    $scope.colors = ["#fc0003", "#f70008", "#f2000d", "#ed0012", "#e80017", "#e3001c", "#de0021", "#d90026", "#d4002b", "#cf0030", "#c90036", "#c4003b", "#bf0040", "#ba0045", "#b5004a", "#b0004f", "#ab0054", "#a60059", "#a1005e", "#9c0063", "#960069", "#91006e", "#8c0073", "#870078", "#82007d", "#7d0082", "#780087", "#73008c", "#6e0091", "#690096", "#63009c", "#5e00a1", "#5900a6", "#5400ab", "#4f00b0", "#4a00b5", "#4500ba", "#4000bf", "#3b00c4", "#3600c9", "#3000cf", "#2b00d4", "#2600d9", "#2100de", "#1c00e3", "#1700e8", "#1200ed", "#0d00f2", "#0800f7", "#0300fc"];

    function getSlide(target, style) {
        var i = target.length;
        return {
            id: (i + 1),
            label: 'slide #' + (i + 1),
            img: 'http://lorempixel.com/1200/500/' + style + '/' + ((i + 1) % 10) ,
            color: $scope.colors[ (i*10) % $scope.colors.length],
            odd: (i % 2 === 0)
        };
    }

    function addSlide(target, style) {
        target.push(getSlide(target, style));
    }

    $scope.carouselIndex3 = 5;

    function addSlides(target, style, qty) {
        for (var i=0; i < qty; i++) {
            addSlide(target, style);
        }
    }

    $scope.slides3 = [];

    addSlides($scope.slides3, 'people', 50);

}]);

App.controller('SearchController',['$scope','$http',function($scope, $http){

    $scope.searchString = '';

    $scope.search = function(){
        console.log($scope.searchString);
    };

    $scope.searchMovie = function () {
        if(!$scope.searchString) {
            $scope.movies = [];
            $scope.actors = [];
        }
        $http.get(baseURL + '/search-movies/?query=' + $scope.searchString)
            .then(function (data) {
                console.log(data);
                $scope.movies = data.data;
            });
    };

    $scope.searchActor= function () {
        if(!$scope.searchString) {
            $scope.movies = [];
            $scope.actors = [];
        }
        $http.get(baseURL + '/search-actors/?query=' + $scope.searchString)
            .then(function (data) {
                console.log(data);
                $scope.actors = data.data;
            });
    };

    $scope.empty = function () {
        $scope.searchString = '';
        $scope.movies = [];
        $scope.actors = [];
    };

    $(document).click(function() {
        $scope.empty();
        console.log("emptying");
    });

}]);
