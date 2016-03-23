'use strict';

angular.module('hackathons')
	.controller('HackathonDesignController', ['$scope', '$log', 'HackathonsService', '$timeout', '$window', 'toastr', 'FileUploader',
		function($scope, $log, HackathonsService, $timeout, $window, toastr, FileUploader) {
			// Scheduler controller logic
			var vm = this;
			vm.hackathon = $scope.hackathon;
			vm.reset_hackathon = angular.copy(vm.hackathon);
			vm.form = {};
			vm.remove = remove;
			vm.hackathon.hackathonThumb = vm.hackathon.hackathonThumb || 'http://placehold.it/200x200';
			vm.hackathon.imageHeaderURL = vm.hackathon.imageHeaderURL || 'http://placehold.it/200x200';
			vm.hackathon.imageLogoURL = vm.hackathon.imageLogoURL || 'http://placehold.it/200x200';


			// Remove existing
			function remove() {
				vm.hackathon.remove().then(function() {

				});
			}

			/*Upload Main image*/
			vm.uploader = new FileUploader({
				url: '/api/hackathon/picture',
				alias: 'newThumbPicture'
			});

			vm.uploadProfilePicture = function() {
				// Clear messages
				vm.success = vm.error = null;

				// Start upload
				vm.uploader.uploadAll();
			};

			// Called after the user has successfully uploaded a new picture
			vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
				// Show success message
				vm.success = true;

				// Populate user object
				//$scope.user = Authentication.user = response;
				vm.hackathon.hackathonThumb = response.thumbImageURL;

				// Clear upload buttons
				vm.cancelUpload();
			};
			// Called after the user selected a new picture file
			vm.uploader.onAfterAddingFile = function(fileItem) {
				if ($window.FileReader) {
					var fileReader = new FileReader();
					fileReader.readAsDataURL(fileItem._file);

					fileReader.onload = function(fileReaderEvent) {
						$timeout(function() {
							vm.imageURL = fileReaderEvent.target.result;
						}, 0);
					};
				}
			};

			// Cancel the upload process
			vm.cancelUpload = function() {
				vm.uploader.clearQueue();
				//vm.imageURL = vm.user.profileImageURL;
			};



			/*Upload Header Image*/
			vm.uploaderHeaderImg = new FileUploader({
				url: '/api/hackathon/changeheaderimage',
				alias: 'newHeaderImage'
			});

			vm.uploadHeaderPicture = function() {
				// Clear messages
				vm.success = vm.error = null;

				// Start upload
				vm.uploaderHeaderImg.uploadAll();
			};

			// Called after the user has successfully uploaded a new picture
			vm.uploaderHeaderImg.onSuccessItem = function(fileItem, response, status, headers) {
				// Show success message
				vm.success = true;

				// Populate user object
				//$scope.user = Authentication.user = response;
				vm.hackathon.imageHeaderURL = response.imageHeaderURL;

				// Clear upload buttons
				vm.cancelHeaderUpload();
			};
			// Called after the user selected a new picture file
			vm.uploaderHeaderImg.onAfterAddingFile = function(fileItem) {
				if ($window.FileReader) {
					var fileReader = new FileReader();
					fileReader.readAsDataURL(fileItem._file);

					fileReader.onload = function(fileReaderEvent) {
						$timeout(function() {
							vm.hackathon.imageHeaderURL = fileReaderEvent.target.result;
						}, 0);
					};
				}
			};

			// Cancel the upload process
			vm.cancelHeaderUpload = function() {
				vm.uploaderHeaderImg.clearQueue();
				//vm.imageURL = vm.user.profileImageURL;
			};



			/*Upload Logo image*/
			vm.uploaderLogo = new FileUploader({
				url: '/api/hackathon/logo',
				alias: 'newLogoPicture'
			});

			vm.uploadLogoPicture = function() {
				// Clear messages
				vm.success = vm.error = null;

				// Start upload
				vm.uploaderLogo.uploadAll();
			};

			// Called after the user has successfully uploaded a new picture
			vm.uploaderLogo.onSuccessItem = function(fileItem, response, status, headers) {
				// Show success message
				vm.success = true;

				// Populate user object
				//$scope.user = Authentication.user = response;
				vm.hackathon.imageLogoURL = response.imageLogoURL;
				console.log('vm.hackathon.imageLogoURL ' + vm.hackathon.imageLogoURL);

				// Clear upload buttons
				vm.cancelUploadLogo();
			};
			// Called after the user selected a new picture file
			vm.uploaderLogo.onAfterAddingFile = function(fileItem) {
				if ($window.FileReader) {
					var fileReader = new FileReader();
					fileReader.readAsDataURL(fileItem._file);

					fileReader.onload = function(fileReaderEvent) {
						$timeout(function() {
							vm.hackathon.imageLogoURL = fileReaderEvent.target.result;
						}, 0);
					};
				}
			};

			// Cancel the upload process
			vm.cancelUploadLogo = function() {
				vm.uploaderLogo.clearQueue();
				//vm.imageURL = vm.user.profileImageURL;
			};

			/*Click Btn Add more FAQ in Tab 2*/
			vm.addMoreFAQ = function() {
				var empty_faq = {
					'question': '',
					'answer': '',
					'status': 0
				};

				vm.hackathon.faqs.push(empty_faq);
			};
			/*Click Remove FAQ*/
			vm.removeFAQ = function(item) {
				_.remove(vm.hackathon.faqs, function(n) {
					return n === item;
				});
			};

			/*Click Btn Add more Rule in Tab 2*/
			vm.addMoreRule = function() {
				var empty_rule = {
					'name': '',
					'description': '',
					'status': 0
				};

				vm.hackathon.rules.push(empty_rule);
			};

			/*Click Remove Rule Tab 2*/
			vm.removeRule = function(item) {
				_.remove(vm.hackathon.rules, function(n) {
					return n === item;
				});
			};

			vm.saveTab = function(isValid) {


				HackathonsService.update(vm.hackathon).then(doneCallbacks, failCallbacks);


				function doneCallbacks(res) {
					toastr.success('Save hackathon', 'Notification');
				}

				function failCallbacks(res) {
					toastr.error(res.data.message, 'Notification');
					vm.error = res.data.message;
				}
			};
		}
	]);