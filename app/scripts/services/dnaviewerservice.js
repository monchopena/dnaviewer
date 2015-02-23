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
    // In this example we have only one DNA molecule and one JSON file.
	
	return {

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
				}

			};
	    
  });
