'use strict';

/**
 * @ngdoc function
 * @name dnaviewerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dnaviewerApp
 */
angular.module('dnaviewerApp')
    .controller('MainCtrl', function($scope, dnaviewerService, $location, orderByFilter) {

        // init dnamolecule
        $scope.dnamolecule = null;


        dnaviewerService.getDNAmolecule()
            .then(
                function(dnamolecule) {
                    $scope.dnamolecule = dnamolecule;
                    $scope.sortedDnamoleculefeature = orderByFilter($scope.dnamolecule.dnafeatures, '+start');

                    // squence
                    // convert to array
                    $scope.bases = [];
                    $scope.basesColour = [];

					//var max=dnamolecule.sequence.bases.length;
					var max=200;
					var chooseClass='';
                    for (var i = 0; i < max; i++) {
                        var baseName=dnamolecule.sequence.bases.charAt(i);
                        $scope.bases.push(baseName);
                        switch (baseName) {
						    case 'A':
						        chooseClass = 'adenine';
						        break; 
						    case 'T':
						        chooseClass = 'thymine';
						        break;
						    case 'C':
						        chooseClass = 'cytosine';
						        break;     
						    default: 
						        chooseClass = 'guanine';
						}
						$scope.basesColour.push(chooseClass);
                    }
                    //console.log($scope.bases);
                    
                    $scope.dnamoleculeParts=[];
                    
                    var normalDna='DNA Normal Chain';
                    var normalColor='#F7464A';
                    var normalHighlightColor='#FF5A5E';
                    
                    
                    for (var j=0; j<$scope.sortedDnamoleculefeature.length; j++) {
	                
	                	if (j===0 && $scope.sortedDnamoleculefeature[j].start>0) {
							  
							$scope.dnamoleculeParts.push({
						        value: $scope.sortedDnamoleculefeature[j].start-1,
						        color:normalColor,
						        highlight: normalHighlightColor,
						        label: normalDna
						    });
								      
	                	} else {
		                	
		                	//dna feature
		                	
		                	var long=$scope.sortedDnamoleculefeature[j].end-$scope.sortedDnamoleculefeature[j].start;
		                	
		                	if (long<$scope.minLenght) {
			                	long=200;
		                	}
		                	
		                	$scope.dnamoleculeParts.push({
						        value: long,
						        color: '#FDB45C',
								highlight: '#FFC870',
						        label: $scope.sortedDnamoleculefeature[j].dnafeature.name
						    });
		                	
		                   if (j===($scope.sortedDnamoleculefeature.length-1))	{
			                   console.log('the last: '+dnamolecule.length);
			                   if (dnamolecule.length!==$scope.sortedDnamoleculefeature[j].end) {
				                $scope.dnamoleculeParts.push({
						          value: dnamolecule.length-$scope.sortedDnamoleculefeature[j].end,
						          color:normalColor,
						          highlight: normalHighlightColor,
						          label: normalDna
						       });
			                   }
		                   } else {
							   $scope.dnamoleculeParts.push({
						        value: $scope.sortedDnamoleculefeature[j+1].start-$scope.sortedDnamoleculefeature[j].end,
						        color:normalColor,
						        highlight: normalHighlightColor,
						        label: normalDna
						       });
		                   }
		                	
		            		       

	                	}
	                	
	                	 /*
	                	 $scope.dnamoleculeParts.push({
						     value: $scope.sortedDnamoleculefeature[j].start-1,
						        color:normalColor,
						        highlight: normalHighlightColor,
						        label: normalDna
						      });
	                	*/
	                    
	                    //console.log($scope.sortedDnamoleculefeature[j]);
	                    console.log($scope.sortedDnamoleculefeature[j].start);
	                    console.log($scope.sortedDnamoleculefeature[j].end);
	                    console.log($scope.sortedDnamoleculefeature[j].dnafeature.length);
	                    console.log($scope.sortedDnamoleculefeature[j].end-$scope.sortedDnamoleculefeature[j].start);
	                    console.log('----');
                    }
                    
                    console.log('###################');
                    console.log($scope.dnamoleculeParts);
                    console.log($scope.data2);
                    $scope.data=$scope.dnamoleculeParts;
                    

                },
                function(dataError) {
                    console.log(dataError);
                    $location.url('/404');
                }
            );
    });