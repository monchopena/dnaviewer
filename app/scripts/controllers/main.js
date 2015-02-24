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

        // Init dnamolecule
        $scope.dnamolecule = null;
		
		// Is selectted feature?
		$scope.idSelectedFeature = null;
		
		// SVG Chars
		$scope.svgWidth=500;
		$scope.svgHigh=$scope.svgWidth; //It's a circle!! 
		
		//I could not use this variable
		//$scope.svgViewBox='0 0 '+$scope.svgWidth+' '+$scope.svgHigh;
		
		//Where is center of circle?
		$scope.svgCenterX=$scope.svgWidth/2;
		$scope.svgCenterY=$scope.svgHigh/2;
		    
		//Init ratios and strokes
	    $scope.svgRatio=150;  
	    $scope.svgStroke=30;
	    
	    //If we want start from 12 o' clock
	    $scope.adjustAngle=90;
	    
	    //turnMolecule
	    //a simple function to rotate dnamolecule
	    $scope.turnMolecule = function turnMolecule(angle) {
		    if (angle===0) {
			    $scope.adjustAngle=90;
		    } else {
			    $scope.adjustAngle=$scope.adjustAngle+angle;
		    }
	    };
	    
	    //TODO: improve text positions
	    $scope.adjustText=40;
	    
	    //Select base color
	    //TODO: a page with settings?
	    $scope.baseColor='#eee'; //grey
  	    
  	    //assgign colors to ...
  	    $scope.setSelected = function(idSelectedFeature) {
	       $scope.idSelectedFeature = idSelectedFeature;
	       $scope.dnaFeature(idSelectedFeature);
	       //console.log(idSelectedFeature);
	    };
	    
	    
	    /*
		    This is the most important function in this controller
		    
	    */
	    $scope.getDNAMolecule = function() {
				dnaviewerService.getDNAmolecule()
				.then(function(data) {
					// console.log(data);
					$scope.dnamolecule = data;
					
					//DNA molecule Lenght
					$scope.moleculeLenght=data.length;
					
					//Features ordered by occurrence
					$scope.sortedDnamoleculefeatures = orderByFilter($scope.dnamolecule.dnafeatures, '+start');
					
					//A new var with all Coords and Data
					var drawMarkers=[];
					
					//Auxiliar var
					var record='';
					
					angular.forEach($scope.sortedDnamoleculefeatures, function(dnafeature) {
							  
							  //console.log(value.dnafeatureId);
							  //hack! we will need all types and may be make a settings page
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
							
							//We call drawArc Service  
							record=dnaviewerService.drawArc($scope.svgCenterX, $scope.svgCenterY, $scope.svgRatio, $scope.adjustAngle, $scope.adjustText, dnafeature.start, dnafeature.end, $scope.moleculeLenght, dnafeature.dnafeature.name, chooseColor, chooseImage, dnafeature.dnafeatureId);
							//console.log(JSON.stringify(record, null, ' '));
							
							//Pushing records in drawMarkers
							drawMarkers.push(record);
							  
					});
					
					//Using a defer it's very important here!
					$q.all(drawMarkers).then(function(){
						// This callback function will be called when all the promises are resolved. 
						//console.log(drawMarkers);
						$scope.dnaMarkers=drawMarkers;
        			});
					
				},
				function(dataError) {
					console.log(dataError);
					//If the data is not accessible
                    $location.url('/404');
				});
			};

         $scope.dnaFeature = function getDNAMoleculeFeature(id) {
		 	//Using a simple Angular filter for obtain DNA Feature 
	        $scope.selectedDNAFeature = $filter('filter')($scope.dnamolecule.dnafeatures, {dnafeatureId: id})[0];
	        //console.log($scope.selectedDNAFeature.dnafeature.pattern.bases);
         };
         
         
         //When angle changes ...
		 $scope.$watchGroup(['adjustAngle'], function() {
			$scope.getDNAMolecule();
		 });
		  

    });