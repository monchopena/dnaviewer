'use strict';

/**
 * @ngdoc function
 * @name dnaviewerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dnaviewerApp
 */
angular.module('dnaviewerApp')
    .controller('MainCtrl', function($scope, dnaviewerService, $location, $q, $filter, orderByFilter) {

        // init dnamolecule
        $scope.dnamolecule = null;
		
		$scope.idSelectedFeature = null;
		
		//I tried use this for svg but it's impossible TODO
		$scope.svgWidth=500;
		$scope.svgHigh=$scope.svgWidth; //It's a circle  
		
		$scope.svgViewBox='0 0 '+$scope.svgWidth+' '+$scope.svgHigh;
		
		$scope.svgCenterX=$scope.svgWidth/2;
		$scope.svgCenterY=$scope.svgHigh/2;
		    
	    $scope.svgRatio=150;  
	    $scope.svgStroke=30;
	    
	    //if we want start from up
	    $scope.adjustAngle=90;
	    
	    //turnMolecule
	    $scope.turnMolecule = function turnMolecule(angle) {
		    if (angle===0) {
			    $scope.adjustAngle=90;
		    } else {
			    $scope.adjustAngle=$scope.adjustAngle+angle;
		    }
	    };
	    
	    $scope.adjustText=40;
	    
	    //select base color
	    $scope.baseColor='#eee'; //grey
  	    
  	    //assgign colors to 
  	    
  	    $scope.setSelected = function(idSelectedFeature) {
	       $scope.idSelectedFeature = idSelectedFeature;
	       $scope.dnaFeature(idSelectedFeature);
	       //console.log(idSelectedFeature);
	    };
	    
	    
	     $scope.getDNAMolecule = function() {
				dnaviewerService.getDNAmolecule()
				.then(function(data) {
					// console.log(data);
					$scope.dnamolecule = data;
					$scope.moleculeLenght=data.length;
					
					$scope.sortedDnamoleculefeatures = orderByFilter($scope.dnamolecule.dnafeatures, '+start');
					
					var drawMarkers=[];
					var record='';
					
					angular.forEach($scope.sortedDnamoleculefeatures, function(dnafeature) {
							  
							  //console.log(value.dnafeatureId);
							  //hack! we will need all types and make a settings page
							  var chooseColor='';
							  var chooseImage='../images/sbol/'+dnafeature.dnafeature.category.name+'.png';
							  
							  switch (dnafeature.dnafeature.category.name) {
							    case 'misc_feature':
							    	chooseColor='#1f77b4';
							    break;
								case 'primer_bind':
									chooseColor='#ff7f0e';
								break;
								case 'Promoter':
									chooseColor='#2ca02c';
								break;
								case 'CDS':
									chooseColor='#d62728';
								break;
								case 'Other':
									chooseColor='#9467bd';
								break;
								case 'Terminator':
									chooseColor='#8c564b';
								break;
								case 'rep_origin':
									chooseColor='#d627ff';
								break;
							 }
							  
							  record=dnaviewerService.drawArc($scope.svgCenterX, $scope.svgCenterY, $scope.svgRatio, $scope.adjustAngle, $scope.adjustText, dnafeature.start, dnafeature.end, $scope.moleculeLenght, dnafeature.dnafeature.name, chooseColor, chooseImage, dnafeature.dnafeatureId);
							  
							  //console.log(JSON.stringify(record, null, ' '));
							  drawMarkers.push(record);
							  
							  //console.log('$scope.drawMarkers: '+$scope.drawMarkers);
							  
					});
					
					$q.all(drawMarkers).then(function(){
						// This callback function will be called when all the promises are resolved. 
						//console.log(drawMarkers);
						$scope.dnaMarkers=drawMarkers;
        			});
					
				},
				function(dataError) {
					console.log(dataError);
                    $location.url('/404');
				});
			};

         $scope.dnaFeature = function getDNAMoleculeFeature(id) {
	         //console.log(id);
	         $scope.selectedDNAFeature = $filter('filter')($scope.dnamolecule.dnafeatures, {dnafeatureId: id})[0];
	         //console.log($scope.selectedDNAFeature.dnafeature.pattern.bases);
         };
         
         
         
		 $scope.$watchGroup(['adjustAngle'], function() {
			$scope.getDNAMolecule();
		  });
		  
		  /*
		  $scope.$watchGroup(['dnaFeature'], function() {
			console.log('Al loro');
		  });
		  */

    });