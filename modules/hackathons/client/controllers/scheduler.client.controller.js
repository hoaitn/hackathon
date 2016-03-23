'use strict';

angular.module('hackathons')
	.controller('HackathonSchedulerController', ['$scope', '$log', 'uiCalendarConfig', '$compile', 'listScheduler', 'SchedulerService', 'HackathonsService', '$uibModal', '$timeout', '$window', 'toastr',
		function($scope, $log, uiCalendarConfig, $compile, listScheduler, SchedulerService, HackathonsService, $uibModal, $timeout, $window, toastr) {
			// Scheduler controller logic
			var vm = this;
			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			vm.events = listScheduler;
			vm.hackathon = $scope.hackathon;
			if (!_.isEmpty(vm.hackathon)) {
				vm.socials = $scope.hackathon.socials;
				vm.events = _.map(vm.events, function(n) {
					n.start = convertISODate(n.start);
					n.end = convertISODate(n.end);
					return n;
				});
				/*console.log(vm.events);*/
				vm.renderCalendar = renderCalendar;


				/* config object */
				vm.dateOptions = {
					formatYear: 'yyyy',
					maxDate: new Date(2020, 5, 22),
					minDate: new Date(),
					startingDay: 1
				};
			}


			vm.addEvent = function(size) {

				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'modules/hackathons/client/views/modal/event.client.view.html',
					controller: 'HackathonSchedulerModalController',
					controllerAs: 'vm',
					size: 'lg',
					openedClass: 'make-scheduler',
					windowClass: 'scheduler-window-class',
					windowTopClass: 'scheduler-window-top-class',
					resolve: {
						hackathon: $scope.hackathon
					}
				});

				modalInstance.result.then(function(res) {
					res.start = convertISODate(res.start);
					res.end = convertISODate(res.end);
					vm.events.push(res);
				}, function() {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};

			vm.removeEvent = function(evt) {
				SchedulerService.remove($scope.hackathon, evt).then(function(res) {
					_.remove(vm.events, {
						_id: res._id
					});
				}, function(err) {
					console.log(err);
				});
			};

			vm.saveChange = function() {
				console.log(1);
				HackathonsService.saveSocial($scope.hackathon, vm.socials).then(function(res) {
					toastr.success('Update social link success', 'Notification!');
				}, function(err) {
					toastr.error('Something wrong', 'Opp!');
				});
			};

			function convertISODate(date) {
				if (date) {
					return $window.moment(date, $window.moment.ISO_8601).toDate();
				}
			}

			vm.eventSource = {
				url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
				className: 'gcal-event', // an option!
				currentTimezone: 'America/Chicago' // an option!
			};

			vm.eventsF = function(start, end, timezone, callback) {
				var s = new Date(start).getTime() / 1000;
				var e = new Date(end).getTime() / 1000;
				var m = new Date(start).getMonth();
				var events = [{
					title: 'Feed Me ' + m,
					start: s + (50000),
					end: s + (100000),
					allDay: false,
					className: ['customFeed']
				}];
				callback(events);
			};

			vm.calEventsExt = {
				color: '#f00',
				textColor: 'yellow',
				events: [{
					type: 'party',
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false
				}, {
					type: 'party',
					title: 'Lunch 2',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false
				}, {
					type: 'party',
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				}]
			};

			/* alert on eventClick */
			vm.alertOnEventClick = function(date, jsEvent, view) {
				console.log(date);
				/*_.map(vm.events, function(evt) {
					if (evt._id === date._id) {
						_.assignIn(evt, date);
					}
					return evt;
				});*/
			};

			vm.eventDragStop = function(event, jsEvent, ui, view) {

				/*_.map(vm.events, function(evt) {
					if (evt._id === event._id) {
						_.assignIn(evt, event);
					}
					return evt;
				});*/
			};

			/* alert on Drop */
			vm.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
				vm.alertMessage = ('Event Droped to make dayDelta ' + delta);
			};
			/* alert on Resize */
			vm.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
				vm.alertMessage = ('Event Resized to make dayDelta ' + delta);
			};
			/* add and removes an event source of choice */
			vm.addRemoveEventSource = function(sources, source) {
				var canAdd = 0;
				angular.forEach(sources, function(value, key) {
					if (sources[key] === source) {
						sources.splice(key, 1);
						canAdd = 1;
					}
				});
				if (canAdd === 0) {
					sources.push(source);
				}
			};

			/* remove event */
			vm.remove = function(index) {
				vm.events.splice(index, 1);
			};
			/* Change View */
			vm.changeView = function(view, calendar) {
				if (uiCalendarConfig.calendars.calendar) {
					uiCalendarConfig.calendars.calendar.fullCalendar('changeView', view);
				}

			};
			/* Change View */
			function renderCalendar(calendar) {

				$timeout(function() {
					if (uiCalendarConfig.calendars.calendar) {
						uiCalendarConfig.calendars.calendar.fullCalendar('render');
					}
				});
			}
			/* Render Tooltip */
			vm.eventRender = function(event, element, view) {
				element.attr({
					'tooltip': event.title,
					'tooltip-append-to-body': true
				});
				$compile(element)($scope);
			};



			vm.onViewRender = function(view, element) {
				$log.debug('View Changed: ', view);
			};

			vm.watchCalendar = function(event) {
				return ' ' + event.price;
			};

			vm.changeLang = function() {
				vm.uiConfig.calendar.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				vm.uiConfig.calendar.dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			};
			/* event sources array*/
			//vm.eventSources = [];
			vm.eventSources = [vm.events, vm.eventSource, vm.eventsF];

			$scope.$on('render-scheduler', function() {
				$timeout(function() {
					if (uiCalendarConfig.calendars.full_scheduler) {
						uiCalendarConfig.calendars.full_scheduler.fullCalendar('render');
					}

					if (uiCalendarConfig.calendars.scheduler) {
						uiCalendarConfig.calendars.scheduler.fullCalendar('today');
					}
				});

			});
			vm.gotoDate = function(date, jsEvent, view) {
				if (uiCalendarConfig.calendars.scheduler) {
					uiCalendarConfig.calendars.scheduler.fullCalendar('gotoDate', date.start.format());
				} else {
					toastr.warning('Scheduler calendar not init');
				}
			};

			vm.uiConfig = {
				month: {
					schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
					height: 'auto',
					lang: 'en',
					aspectRatio: 2,
					editable: true,
					defaultView: 'month',
					header: {
						left: 'title',
						center: '',
						right: 'prev,next'
					},
					eventClick: vm.gotoDate,
					viewRender: vm.onViewRender,
					eventDrop: vm.alertOnDrop,
					eventResize: vm.alertOnResize,
					eventRender: vm.eventRender,
					eventDragStop: vm.eventDragStop
				},
				calendar: {
					schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
					nowIndicator: true,
					header: {
						left: 'title',
						center: 'agendaDay,agendaWeek',
						right: ''
					},
					height: 'auto',
					lang: 'en',
					aspectRatio: 2,
					editable: true,
					defaultView: 'agendaWeek'
				}
			};
		}
	]);