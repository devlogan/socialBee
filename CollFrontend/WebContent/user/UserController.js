app.controller("userCtrl",function($scope,$http,$rootScope,$cookieStore,$location,$route,NotificationService){

	console.log('I m User Controller');

	$scope.user={"email":"","password":"","username":"","firstName":"","lastName":"","mobileNo":"","role":"","online":""};
	//$scope.userProfile={"email":"","username":"","firstName":"","lastName":"","mobileNo":"","role":"","online":""};

	$scope.registerUser=function(){
		console.log("I m Registering User");
		console.log($scope.user);

		$http.post("http://localhost:8574/CollMiddleware/register",$scope.user)
		.then(
				function(response){
					alert('Registered Successfully..');
					$location.path("login");

				},function(response){
					$scope.error=response.data;
					console.log($scope.error);
					console.log($scope.error.message);
				});
	};

	$scope.loginUser=function(){
		console.log("I m login User function"+$scope.user.email+" "+$scope.user.password);
		$http.post("http://localhost:8574/CollMiddleware/login",$scope.user)
		.then(
				function(response){

					$scope.user=response.data;

					$rootScope.currentUser=response.data;

					$cookieStore.put('userDetails',response.data);
					console.log($scope.user);
					console.log($scope.user.role);
					console.log($scope.user.username);

					NotificationService.getMyNotifications().
					then(function(response){

						console.log("fetched all the notifications");
						$rootScope.notifications=response.data;
						$rootScope.notificationCount=$rootScope.notifications.length;
						$cookieStore.put('notificationDetails',response.data);
						$cookieStore.put('notificationCounts',$rootScope.notifications.length);
						console.log($rootScope.notifications);
						console.log($rootScope.notificationCount);

					},function(response){

						console.log(response.status)
						if(response.status==401)
							$location.path('/login')
					}
					)

					//$window.location.reload();
					$location.path("userHome");
				},function(response){

					alert("could not connect to the server");
					$scope.error=response.data;
				}).catch(function(e){
					console.log("service is not completed error: ", e );
					alert("not available");
				}).finally()	


	};

	$scope.logout=function(){
		delete $rootScope.currentUser;
		$cookieStore.remove('userDetails');
		$location.path("logout");
	}

	/*$scope.viewProfile=function(email){

		console.log("I m in view Profile function"+email);
		alert("hello");
		$http.get("http://localhost:8574/CollMiddleware/viewProfile", {params:{"param1": email}})
		.then(
				function(response){

					$scope.userProfile= response.data;
					$rootScope.profile=response.data;
					console.log("data is here")
					console.log($scope.userProfile);
					console.log($scope.userProfile.firstName);
					console.log($scope.userProfile.lastName);
					console.log($scope.userProfile.password);
					alert("successful")
					$location.path("viewProfile")
					//$window.location.reload();
				},function(response){

					alert("cannot fetch the user");
					$scope.error=response.data;
				}).catch(function(e){
					console.log("service is not completed error: ", e );
					alert("not available");
				}).finally()
	};
	 */	
	$scope.updateUser=function(){
		console.log("I m Updating User");
		console.log($rootScope.currentUser);


		$http.post("http://localhost:8574/CollMiddleware/editProfile",$rootScope.currentUser)
		.then(
				function(response){
					$rootScope.currentUser=response.data;

					$cookieStore.put('userDetails',response.data);

					alert('Updated Successfully..');
					$route.reload();
					// $window.location.reload();				

				},function(response){
					$scope.error=response.data;
					console.log($scope.error);
				});
	};




});