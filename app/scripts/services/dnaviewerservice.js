'use strict';

/**
 * @ngdoc service
 * @name dnaviewerApp.Dnaviewerservice
 * @description
 * # Dnaviewerservice
 * Service in the dnaviewerApp.
 */
angular.module('dnaviewerApp')
  .service('dnaviewerService', function ($http, $q) {
    
    /* 
	    In this example we have only one DNA molecule and one JSON file.
	*/
	
	return {

				/*
					Getting DNA Molecule with promises
				*/
				getDNAmolecule: function(){
					var defer = $q.defer();

					$http.get('/fixtures/dnamolecule.json')
						.success(function(data) {
							defer.resolve(data);
						})
						.error(function(data) {
							defer.reject('Error: No DNA molecule! - '+data);
						});

					return defer.promise;
				},
			
			   /*
					Converting Polar To Cartesian
					SVG works with Cartesian Coords.
			   */
			   polarToCartesian: function polarToCartesian(centerX, centerY, radius, angleInDegrees, adjustAngle) {
                var angleInRadians = (angleInDegrees - adjustAngle) * Math.PI / 180.0;
                return {
                    x: centerX + (radius * Math.cos(angleInRadians)),
                    y: centerY + (radius * Math.sin(angleInRadians))
                };
               },
			
			   /*
					This function convert one positon in an angle.
			   */
			   convertPositionToAngle: function convertPositionToAngle(position, totalPositions) {
                  return position*360/totalPositions;
               },
               
               /*
	               This is the most important function
	               //documentation
	               //http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
               */
               drawArc: function convertCoordsToArc(centerX, centerY, radius, adjustAngle, adjustText, start, end, moleculeLenght, text, color, image, dnaFeatureID) {
	               
	               
	               /*
		               If angle > 180 then choose Large Arc
		               To understand this visit path documentation in svg
	               */
	               var largeArcFlag=0;
	               
	               var longTotal=end-start;
	               
	               if (longTotal>(moleculeLenght/2)){
		               largeArcFlag=1;
	               }
	               
	               var startAngle =this.convertPositionToAngle(start, moleculeLenght);
	               var endAngle=this.convertPositionToAngle(end, moleculeLenght);
	               var startPoint=this.polarToCartesian(centerX, centerY, radius, startAngle, adjustAngle);
	               var endPoint=this.polarToCartesian(centerX, centerY, radius, endAngle, adjustAngle);
	               
	               //start image
	               var middle=start+((end-start)/2);
	               var middleAngle =this.convertPositionToAngle(middle, moleculeLenght);
	               
	               //Adjust Text
	               var adjustRadius=radius+adjustText;
	               var middlePoint=this.polarToCartesian(centerX, centerY, adjustRadius, middleAngle, adjustAngle);
	               
	               //With this we have all the necessary vars
	               return {
                    A: startPoint,
                    B: endPoint,
                    largeArcFlag: largeArcFlag,
                    middlePoint: middlePoint,
                    text: text,
                    color: color,
                    image: image,
                    dnaFeatureID: dnaFeatureID
                   };
               }

			};
	    
  });
