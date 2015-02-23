'use strict';

/**
 * @ngdoc function
 * @name dnaviewerApp.controller:TestsCtrl
 * @description
 * # TestsCtrl
 * Controller of the dnaviewerApp
 */
angular.module('dnaviewerApp')
  .controller('TestsCtrl', function ($scope, $http, dnaviewerService) {
    
    
	
	$scope.svgWidth=500;
	$scope.svgHigh=$scope.svgWidth; //It's a circle  
	
	$scope.svgViewBox='0 0 '+$scope.svgWidth+' '+$scope.svgHigh;
	
	$scope.svgCenterX=$scope.svgWidth/2;
	$scope.svgCenterY=$scope.svgHigh/2;
	    
    $scope.svgRatio=150;  
    $scope.svgStroke=30;
    
    $scope.radius=$scope.svgRatio;
    $scope.angle=0;
    
    //if we want start from up
    $scope.adjustAngle=90;
    $scope.adjustText=40;
    
    //angle
    //ratio
    function  convertPolarToCartesian() {
	    /*
		$scope.realAngle=$scope.angle-$scope.adjustAngle;
	    $scope.realAngle=-$scope.realAngle;
	    $scope.x1 = $scope.svgCenterX+$scope.radius*Math.cos(Math.PI*($scope.realAngle)/180);
		$scope.y1 = $scope.svgCenterY-$scope.radius*Math.sin(Math.PI*($scope.realAngle)/180);
		*/
		
		var convert=dnaviewerService.polarToCartesian($scope.svgCenterX, $scope.svgCenterY, $scope.radius, $scope.angle, $scope.adjustAngle);
		//console.log(convert);
		$scope.x1=convert.x;
		$scope.y1=convert.y;
    }
   
    
    
    convertPolarToCartesian();
    
    
    //so let's do it!!!!!!!!!
    
    $scope.featureMarkers = [
        {start : 482, end : 567, text : 'LEUII'},
        {start : 585, end : 645, text : 'AMPR'},
        {start : 661, end : 692, text : 'ADHI'}
    ];
    
    $scope.moleculeLenght=800;
    
    //
    $scope.testMarker={start : 500, end :615 , text : 'LEUII'};
    
    //
    var test2=dnaviewerService.convertPositionToAngle($scope.testMarker.start, $scope.moleculeLenght);
    console.log(test2);
    
    var test3=dnaviewerService.drawArc($scope.svgCenterX, $scope.svgCenterY, $scope.radius, $scope.adjustAngle, $scope.adjustText, $scope.testMarker.start, $scope.testMarker.end, $scope.moleculeLenght);
    console.log(JSON.stringify(test3, null, ' '));
    $scope.w1=test3.A.x;
    $scope.z1=test3.A.y;
    
    $scope.w2=test3.B.x;
    $scope.z2=test3.B.y;
    
    $scope.largeArcFlag=test3.largeArcFlag;
    
    $scope.circleTestX=test3.middlePoint.x-20;
    $scope.circleTestY=test3.middlePoint.y-20;
    
    $scope.$watch('radius', function() {
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
  
  