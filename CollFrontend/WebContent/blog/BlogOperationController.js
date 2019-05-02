app.controller("blogOperCtrl",function($scope,$http,$rootScope,$cookieStore,$location,BlogService,$route,$routeParams){



	console.log('I m Blog Operation Controller');

	var blogId=$routeParams.blogsId; 
	console.log("blog ID is"+blogId);




	$scope.addComment=function(blogId,commentTxt){


		$scope.blogComment={}
		$scope.blogComment.comment=commentTxt;
		document.getElementById("blogComment").value="";
		console.log($scope.blogComment);
		console.log($scope.blogComment.comment);
		BlogService.addComment(blogId,$scope.blogComment)
		.then(
				function(response)
				{
					commentTxt="";
					$scope.blogComment=response.data;
					$scope.getAllBlogComments(blogId);


				},
				function(response)
				{
					if(response.status==401)
						alert("U need to login first before adding comment");
					$location.path('/login')
				});

	};

	$scope.getAllBlogComments=function(blogId){
		BlogService.getAllBlogComments(blogId).then(
				function(response){
					console.log("comments retrieved");

					$scope.blogComments=response.data ;

					console.log($scope.blogComments);
				},
				function(response){
					alert(response.error);
					if(response.status==401)
						$location.path('/login')
				})
	}

	$scope.deleteBlogComment=function(blogComment){
		BlogService.deleteBlogComment(blogComment).then(
				function(response){
					alert('comment deleted');
					console.log(blogComment);
					$scope.getAllBlogComments(blogId);
				},function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}



	if(blogId!=undefined){
		BlogService.blogDetails(blogId)
		.then(
				function(response)
				{
					$scope.blog=response.data;

				},
				function(response)
				{
					if(response.status==401)
						$location('/login')
				})
	}


	$scope.getBlogsApproved=function(){
		console.log("fetching approved blogs");
		BlogService.getBlogsApproved()
		.then(
				function(response){
					console.log("retrieved");
					$scope.approvedBlogs=response.data;
					//$location.path("Blogs");
					console.log($scope.approvedBlogs);

				},function(response){

					alert("Cannot be showed");
					$rootScope.error=response.data;
				}

		)}


	//if($rootScope.currentUser.role=='Admin')
	BlogService.getBlogsPending()
	.then(
			function(response){

				console.log("pending blogs retrieved");
				$scope.pendingBlogs=response.data;
				$rootScope.pendingBlogss=response.data;
				//$location.path("Blogs");
				console.log($rootScope.pendingBlogss);

			},function(response){

				alert("Cannot be showed");
				$scope.error=response.data;
			}

	);

	$scope.approveBlog=function(blogId){
		console.log(typeof blogId);
		console.log(blogId);
		BlogService.approveBlog(blogId).then(
				function(response){
					alert("Blog approved");
					console.log("approved successfully");
					$route.reload();
					//$location.path('/allBlogs')
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}

	$scope.rejectBlog=function(blogId){
		console.log(typeof blogId);
		console.log(blogId);
		BlogService.rejectBlog(blogId).then(
				function(response){
					alert("Blog rejected");
					console.log("rejected successfully");
					$route.reload();	
					//$location.path('/allBlogs')
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}

	$scope.blogDetails=function(blogId){
		console.log("fetching blog Details");
		console.log(blogId);
		BlogService.blogDetails(blogId).then(
				function(response){

					$scope.blogDetails=response.data;
					$rootScope.blogDetailss=response.data;
					alert("blog details fetched");
					console.log("fetched successfully");
					console.log($scope.blogDetails);
					console.log($rootScope.blogDetailss);
					$location.path('/blogDetails');
				},
				function(response){

					alert("Cannot be fetched");
					$scope.error=response.data;
				}

		)

	}

	$scope.getMyblogs=function(){
		console.log("fetching your blogs");


		BlogService.getMyBlogs().then(
				function(response){

					$scope.myBlogs=response.data;
					$rootScope.myBlogss=response.data;
					alert("my blogs fetched");
					console.log($scope.myBlogs);
					console.log($rootScope.myBlogss);
					$location.path('/myBlogs')


				},function(response){

					alert("Cannot be fetched");
					$scope.error=response.data;

				})
	}
	$scope.likeBlog=function(blogId){
		console.log(blogId);
		BlogService.likeBlog(blogId)
		.then(
				function(response){
					$scope.message=response.data;
					console.log($scope.message);

					//$location.path('/allBlogs')
				},
				function(response){
					console.log("Blog Liked Successfully");
					$route.reload();
					if(response.status==401)
						$location.path('/login')
				})
	}
	$scope.dislikeBlog=function(blogId){
		console.log(blogId);
		BlogService.dislikeBlog(blogId)
		.then(
				function(response){
					$scope.message=response.data;
					console.log($scope.message);


				},
				function(response){
					console.log("blog disliked successfully");
					$route.reload();
					if(response.status==401)
						$location.path('/login')
				})
	}

	$scope.likesForBlog=function(blogId){
		console.log(blogId);
		BlogService.likesForBlog(blogId).
		then(
				function(response){
					console.log("fetched user who liked the post");
					$scope.likes=response.data;
					$route.reload();	
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}

	$scope.dislikeForBlog=function(blogId){
		console.log(blogId);
		BlogService.dislikeForBlog(blogId).then(
				function(response){
					console.log("fetched users who disliked the post");
					$scope.dislikes=response.data;
					$route.reload();	
					//$location.path('/allBlogs')
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}







});