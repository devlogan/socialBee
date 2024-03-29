app.controller('JobCtrl',function($scope,JobService,$location)
		{
	$scope.show=false;


	console.log("I am Job Controller");
	$scope.show=false;
	$scope.addJob=function(){
		JobService.addJob($scope.job).then(
				function(response)
				{ 
					alert('Job details inserted successfully...')		
					$scope.job={}
					$location.path('/getalljobs')
				},function(response)
				{
					console.log(response.status)
					if(response.status==400)
						$scope.message=" ERROR... BAD REQUEST"
							else
								$scope.error=response.data
				})
	}

	JobService.getAllJobs().then(
			function(response){
				$scope.jobs=response.data;
				console.log($scope.jobs);
				console.log(response.status);
			},function(response){
				console.log(response.status)
				if(response.status==401)
					$location.path('/login')
			})

			$scope.showDetails=function(jobId)
			{
		console.log(jobId);
		$scope.show=!$scope.show
		$scope.jobId=jobId
			}
		})