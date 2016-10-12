// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);


scotchApp.factory('EMPData', function(){
    var data =
        {
            Ename: '', Job: '', Sal: ''
        };
    
    return {
        getEname: function () {
            return data.Ename;
        },
        setEname: function (x) {
            data.Ename = x;
        },
        getJob: function () {
            return data.Job;
        },
        setJob: function (x) {
            data.Job = x;
        },
        getSal: function () {
            return data.Sal;
        },
        setSal: function (x) {
            data.Sal = x;
        }
    };
});


    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about/1', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the about page
            .when('/test', {
                templateUrl : 'pages/test.html',
                controller  : 'testController'
            })

            // route for the about page
            .when('/employee/:id', {
                templateUrl : 'pages/emp.html',
                controller  : 'empController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I lookxx!';
    });

    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('xtestController', function($scope, $http) {
        $scope.message = 'Look! I am an test page.';
    });

    scotchApp.controller('empController', function($scope, $http, $routeParams, EMPData, $location, $route, $templateCache) {
	$templateCache.removeAll();
	if($routeParams.id==0) {
		//$routeParams.id=null;
		//alert(document.getElementsByName('ename')[0].value);
		//alert($scope.ename);
		//$scope.empForm.$setUntouched();
		//alert($scope.empForm);
		$routeParams.id=null;
		$scope.ename='';
		$scope.job='';
		$scope.sal='';
                //$scope.$apply();
		//$route.reload();	
		//$location.path('/employee/1');
		//alert($routeParams.id);
		//$scope.empForm.$setPristine();
		//alert($scope);
		//alert(document.getElementsByName('ename')[0].value);
	}
        $scope.message = 'Look! I am an emp pagex. ' + $routeParams.id;
        var key = $routeParams.id;
	//$scope.empForm.$setPristine();

        //alert("setCurrentUser: "+ $index);

	$scope.addRow = function(){		
		//$scope.companies.push({ 'name':$scope.ename, 'employees': $scope.job, 'headoffice':$scope.sal });

		var data = {
			EMPNO : $routeParams.id,
			ENAME : $scope.ename,			
			JOB : $scope.job,
			SAL : $scope.sal
		};
		//if ($routeParams.id==0
		$http.put("https://apex.oracle.com/pls/apex/rajeendra/demo/employees/0", data).
			success(function (data, status, headers, config) {
			//alert("success");
			$scope.ename='';
			$scope.job='';
			$scope.sal='';
			//document.getElementsByName('ename')[0].value='';
			//alert(document.getElementsByName('ename')[0].value);
			//$scope.empForm.$setPristine();
		}).
		error(function (data, status, headers, config) {
			alert("An error occurred during the AJAX request");
		});

		//$scope.ename='';
		//$scope.job='';
		//$scope.sal='';
		//$scope.empForm.$setPristine();
	};

	//$scope.ename = '';
	$scope.$watch(function () { return EMPData.getEname(); }, function (newValue, oldValue) {
		$scope.ename = newValue;
		$scope.job = EMPData.getJob();
		$scope.sal = EMPData.getSal();
		if (newValue !== oldValue) $scope.ename = newValue;
	});



	$scope.$on('$viewContentLoaded', function(event, viewConfig, $location)
	{
	  // code that will be executed ... 
	  // before the view begins loading

	  //alert('$viewContentLoading');
	  //alert(document.getElementsByName('ename')[0].value);
	  //document.getElementsByName('ename')[0].value='';
	  $scope.ename='';
	  //$scope.empForm.$setPristine();

	  //alert('$viewContentLoading end');
	  //$location.path('/employee/0');
	});

	$scope.$on('$routeChangeSuccess', function () {
	  //alert('$routeChangeSuccess');
	  //alert(document.getElementsByName('ename')[0].value);
	  // do something
	});


    });

    scotchApp.controller('testController', function($scope, $http, $rootScope, EMPData) {
	$scope.message = 'Look! I am an test page.';

        $http.get("https://apex.oracle.com/pls/apex/rajeendra/demo/employees/")
	.then(function (response) {$scope.names = response.data.items;});

	$scope.setCurrentUser= function(index){  
           EMPData.setEname($scope.names[index].ename); 
	   EMPData.setJob($scope.names[index].job);
           EMPData.setSal($scope.names[index].sal);       
	};

	$scope.$watch('ename', function (newValue, oldValue) {
		if (newValue !== oldValue) EMPData.setEname(newValue);
	});

    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

scotchApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
	//alert("run");
      $templateCache.removeAll();
   });
});




