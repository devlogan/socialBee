app.controller('NotificationCtrl',function($scope,NotificationService,$location,$rootScope){

	console.log("Im inside Notification Controller");

	$scope.getMyNotifications=function(){

		NotificationService.getMyNotifications().
		then(function(response){

			console.log("fetched all the notifications");
			$rootScope.notifications=response.data;
			$rootScope.notificationCount=$rootScope.notifications.length;
			$cookieStore.put('notificationDetails',response.data);
			$cookieStore.put('notificationCounts',$rootScope.notifications.length);

		},function(response){

			console.log(response.status)
			if(response.status==401)
				$location.path('/login')
		}
		)}

	$scope.updateNotification=function(notId){

		NotificationService.updateNotification(notId).
		then(function(response){

			console.log('updated notification');
			$scope.getMyNotifications();

		},function(response){

			$scope.getMyNotifications();

		}
		)}

})
