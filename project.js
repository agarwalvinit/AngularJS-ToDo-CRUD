angular.module('project', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ProjectListController',
                templateUrl: 'list.html'
            })
            .when('/edit/:id/:projectId', {
                controller: 'EditProjectController',
                templateUrl: 'detail.html'
            })
            .when('/new/:id', {
                controller: 'NewProjectController',
                templateUrl: 'detail.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .factory('GlobalVariable', function () {
        return {
            ToDoList: {
                "todoList1": [{
                    name: 'BATMAN VS SUPERMAN',
                    status: 'pending',
                    description: 'Have to watch it!'
                }, {
                    name: 'FAN',
                    status: 'progress',
                    description: 'Todays gonna watch it'
                }, {
                    name: 'JUNGLE BOOK',
                    status: 'completed',
                    description: 'Nana Patekar Rocked Again'
                }, {
                    name: 'KI AND KA',
                    status: 'pending',
                    description: 'kareena you master piece.'
                }],
                "todoList2": [
                    {
                        name: 'AAAAAAA',
                        status: 'completed',
                        description: 'Have to watch it!'
                    },
                    {
                        name: 'BBBBB',
                        status: 'progress',
                        description: 'Todays gonna watch it'
                    }
                ]
            }
        };
    })
    .controller('ProjectListController', function (GlobalVariable, $scope) {
        $scope.deleteButton = false;
        $scope.ToDoList = GlobalVariable.ToDoList;
        console.log(GlobalVariable.ToDoList);
        $scope.addNew = function () {
            var list = GlobalVariable.ToDoList;
            var arr = Object.keys(list);
            var newValue = "todoList"+(arr.length+1);
            GlobalVariable.ToDoList[newValue] = [
                {
                    name: 'Add New',
                    status: 'pending',
                    description: 'Edit this item!'
                }
            ];
            $scope.ToDoList = GlobalVariable.ToDoList;
        }

    })
    .controller('NewProjectController', function ($location, GlobalVariable, $scope, $routeParams) {
        $scope.deleteButton = false;
        $scope.editProject = {};
        var id = $routeParams.id;
        var list = GlobalVariable.ToDoList;
        $scope.save = function () {
            var add = $scope.editProject.project;
            var arr = Object.keys(list);
            list[arr[id]].push(add);
            $location.path('/');
        }
    })
    .controller('EditProjectController',
        function ($location, $routeParams, GlobalVariable, $scope) {
            $scope.deleteButton = true;
            $scope.editProject = {};
            var projectId = $routeParams.projectId;
            var id = $routeParams.id;
            var list = GlobalVariable.ToDoList;
            var arr = Object.keys(list);
            $scope.editProject.project = list[arr[id]][projectId];
            $scope.save = function () {
                var add = $scope.editProject.project;
                list[arr[id]][projectId] = add;;
                $location.path('/');
            };
            $scope.destroy = function () {
                list[arr[id]].splice(projectId, 1);
                $location.path('/');
            };
        });
