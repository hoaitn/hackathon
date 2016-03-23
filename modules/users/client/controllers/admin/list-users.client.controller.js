(function() {
	'use strict';

	angular.module('users.admin')
		.controller('UserListController', ['$scope', '$filter', 'Admin', 'UsersService', 'users', 'uiGridConstants',
			function($scope, $filter, Admin, UsersService, listUser, uiGridConstants) {

				$scope.gridOptions = {
					data: listUser,
					enableFiltering: false,
					enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
					enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
					flatEntityAccess: true,
					showGridFooter: true,
					rowHeight: 40,
					columnDefs: [{
						displayName: 'Name',
						field: 'displayName',
						cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="admin.user({userId: row.entity._id})" ng-bind="row.entity.displayName"></a></div>'
					}, {
						name: 'email',
						field: 'email'
					}, {
						name: 'accountType',
						field: 'account_type',
						cellTemplate: '<div class="ui-grid-cell-contents" ng-switch="row.entity.account_type"><span ng-switch-when="company" class="label"><i class="fa fa-graduation-cap"></i> Company</span><span ng-switch-default><i class="fa fa-user"></i> User</span></div>'
					}, {
						displayName: 'Active',
						field: 'active',
						cellTemplate: '<div class="ui-grid-cell-contents"><span ng-if="row.entity.active" class="info label"><i class="fa fa-check"></i> Success</span></div>'
					}, {
						displayName: 'Verify',
						field: 'isVerify',
						cellTemplate: '<div class="ui-grid-cell-contents"><span ng-if="row.entity.isVerify" class="info label"><i class="fa fa-check"></i> Success</span></div>'
					}, {
						displayName: 'Date',
						field: 'created',
						cellTemplate: '<div class="ui-grid-cell-contents"><span>{{row.entity.created | amDateFormat:"MM/DD/YY, HH:mm:ss"}}</span></div>'
					}, {
						displayName: 'Role',
						field: 'roles',
						cellTemplate: '<div class="ui-grid-cell-contents"><span ng-bind="row.entity.roles"></span></div>'
					}]
				};
				/*Admin.query(function(data) {
					$scope.users = data;
					$scope.buildPager();
				});

				$scope.buildPager = function() {
					$scope.pagedItems = [];
					$scope.itemsPerPage = 15;
					$scope.currentPage = 1;
					$scope.figureOutItemsToDisplay();
				};

				$scope.figureOutItemsToDisplay = function() {
					$scope.filteredItems = $filter('filter')($scope.users, {
						$: $scope.search
					});
					$scope.filterLength = $scope.filteredItems.length;
					var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
					var end = begin + $scope.itemsPerPage;
					$scope.gridOptions.data = $scope.filteredItems.slice(begin, end);
					$scope.pagedItems = $scope.filteredItems.slice(begin, end);
				};

				$scope.pageChanged = function() {
					$scope.figureOutItemsToDisplay();
				};*/
			}
		]);
})();