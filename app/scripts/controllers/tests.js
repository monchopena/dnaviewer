'use strict';

/**
 * @ngdoc function
 * @name dnaviewerApp.controller:TestsCtrl
 * @description
 * # TestsCtrl
 * Controller of the dnaviewerApp
 */
angular.module('dnaviewerApp')
  .controller('TestsCtrl', function ($scope, $http) {
    
    
	
	$scope.svgWidth=500;
	$scope.svgHigh=$scope.svgWidth; //It's a circle  
	
	$scope.svgViewBox='0 0 '+$scope.svgWidth+' '+$scope.svgHigh;
	
	$scope.svgCenterX=$scope.svgWidth/2;
	$scope.svgCenterY=$scope.svgHigh/2;
	    
    $scope.svgRatio=150;  
    $scope.svgStroke=30;
    
    $scope.ratio=$scope.svgRatio;
    $scope.angle=0;
    
    //if we want start from up
    $scope.adjust=90;
    
    //angle
    //ratio
    function  convertPolarToCartesian() {
	    $scope.realAngle=$scope.angle-$scope.adjust;
	    /*if ($scope.realAngle>360) {
		    $scope.realAngle=$scope.realAngle-360;
	    }*/
	    $scope.realAngle=-$scope.realAngle;
	    $scope.x1 = $scope.svgCenterX+$scope.ratio*Math.cos(Math.PI*($scope.realAngle)/180);
		$scope.y1 = $scope.svgCenterY-$scope.ratio*Math.sin(Math.PI*($scope.realAngle)/180);
    }
    
    convertPolarToCartesian();
    
    $scope.$watch('ratio', function() {
       convertPolarToCartesian();
    });
    
     $scope.$watch('angle', function() {
       convertPolarToCartesian();
    });

	/*
	$scope.x1 = ((180 + 180*Math.cos(Math.PI*startAngle/180)));
	$scope.y1 = ((180 + 180*Math.sin(Math.PI*startAngle/180)));
	$scope.x2 = ((180 + 180*Math.cos(Math.PI*endAngle/180)));
	$scope.y2 = ((180 + 180*Math.sin(Math.PI*endAngle/180))); 
    */
    
    $scope.test='pena';
    
  	$http.get('/fixtures/dnamolecule.json').
  		success(function(data) {
  		  //console.log(data);
  		  $scope.dnamolecule=data;
  		}).
  		error(function(data) {
    	  console.log(data);
        });  
        
        
        
        $scope.graph = {'width': 100, 'height': 100};
		  $scope.circles = [
		    {'x': 50, 'y': 50, 'r':20}
		  ];
    
    
    $scope.moveCircles = function moveCircles(dist) {
		 	
		 $scope.circles = [
		    {'x': $scope.circles[0].x+dist, 'y': $scope.circles[0].y+dist, 'r':20}
		  ];
    		
		 	          
        };
    
    $scope.testZone = function testZone() {
		 	
		 $scope.test='moncho';
    		
		 	          
        };
    
    
  });
  
  