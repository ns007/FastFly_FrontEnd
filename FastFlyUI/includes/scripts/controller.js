/// <reference path="C:\Users\yinonmanor\Source\Repos\FastFly_FrontEnd\FastFlyUI\Scripts/angular.min.js" />


var app = angular.module("fastFly", ['ngRoute', 'ngCookies'])
.config(function ($routeProvider) {
    $routeProvider.when("/newForm", {
        templateUrl: "template/openNewForm.html",
        controller: "newFormController"
    })

    $routeProvider.when("/createUserForm", {
        templateUrl: "template/createUser.html",
        controller: "createUser"
    })

    $routeProvider.when("/deleteUser", {
        templateUrl: "template/deleteUser.html",
        controller: "deleteUser"
    })

    //$routeProvider.when("/loginSubmit", {
    //    templateUrl: "index.html",
    //    controller: "index"
    //})
})
    .controller("deleteUser", function ($scope, loginService,$http) {
        var scope = $scope;
        scope.init = function () {
            console.log("delete user init");
            $http.delete('http://localhost:8080/api/users/' + '4')
            .success(function (response) {
                console.log(response);
            })
            
        }

    })
    .controller("newFormController", function ($scope, loginService, $window) {
        var scope = $scope;
        $scope.init = function () {
            console.log("new form init");
            console.log(templateUrl);
            var user = loginService.getData();
         
            if (user == null) {
                $window.location = "index.html";
            }
            console.log(user);
            scope.title = "Open New Form";
            scope.firstNameTextBox = user.FirstName;
            scope.lastNameTextBox = user.LastName;
            scope.idTextBox = user.Id;
            scope.facultyTextBox = user.Faculty1.FacultyName;
            scope.departmentTextBox = user.Department1.DepartmentName;
            scope.positionTextBox = user.Role;
            scope.jogPercentTextBox = user.PercentageJob;
            scope.phoneTextBox = user.CellNum;
            scope.mailTextBox = user.EmailAddress;
            scope.type = ["קק\"מ אישי", "קק\"מ קבוצתי", "סגל עמית", "מקור תקציבי"];
            this.myDate = new Date();
            scope.isDatePickerOpen = true;
            scope.newForm = true;
            scope.paging = true;
            scope.budgetTextBoxShow = false;
        }
        scope.checkBudjet = function (selectedItem) {
            console.log(selectedItem);
            if (selectedItem == "מקור תקציבי") {
                console.log("budjet");
                scope.budgetTextBoxShow = true;
            }
            else {
                scope.budgetTextBoxShow = false;
            }
        }

        scope.setEndDate = function () {
            console.log(scope.startDate);
            scope.endDate = scope.startDate;
        }

        scope.checkDateRange = function () {
            var startDate = scope.startDate;
            var endDate = scope.endDate;
            if (endDate < startDate) {
                swal("שגיאה", "תאריך החזרה נמוך מתאריך היציאה", "error");
                scope.endDate = scope.startDate;
            }
        }
       

        
    })
    .controller("login", function ($scope, $http, loginService, $window) {
        var scope = $scope;
        scope.init = function () {
            console.log("login init");
        }

        //$scope.submit = function () {
        //    // alert($scope.password);
        //    $http.get('http://localhost:8080/api/users/' + $scope.id + '/' + $scope.password)
        //           .success(function (response) {
        //               if (response == null) {
        //                   swal("שגיאה", "שם משתמש או סיסמה שגויים", "error");
        //               }
        //               else {
        //                   $cookies.putObject('cookie', response);
        //                   var cookieVal = $cookies.getObject('cookie');
        //                   //console.log("cookie: " + JSON.stringify(cookieVal));
        //                   console.log(response);
        //                   scope.title = "Home";
        //                   loginService.setData(response);
        //                   scope.loginForm = false;
        //                   scope.userName = response;
        //                   scope.headerText = true;
        //                   scope.dashboardPage = true;
        //                   scope.aside = true;
        //                   $window.location.href = '/index.html';                    
        //                   // swal(JSON.stringify(response));
        //               }
        //               if (loginService.checkRoll(response)) {
        //                   console.log("admin");
        //                   scope.adminGetHistoryButton = true;
        //                   scope.adminCreateUserButton = true;
        //                   scope.adminDeleteUserButton = true;
        //               }

        //           });
        //}
    })
    .controller("createUser", function ($scope, $http, loginService) {
        var scope = $scope;
        scope.init = function () {
            console.log("create user init");
        }
    })
    .controller("index", function ($scope, $http, $window, loginService, $cookies) {
        var scope = $scope;
        scope.goHome = function () {
            scope.title = "Home";
        }
        //dont save cookeis
        //$cookies.remove('cookie');
        $scope.submit = function () {
            // alert($scope.password);
            $http.get('http://localhost:8080/api/users/' + $scope.id + '/' + $scope.password)
                   .success(function (response) { 
                       if (response == null) {
                           swal("שגיאה", "שם משתמש או סיסמה שגויים", "error");
                       }
                       else {
                           $cookies.putObject('cookie', response);
                           var cookieval = $cookies.getObject('cookie');
                           //console.log("cookie: " + json.stringify(cookieval));
                           console.log(response);
                           scope.title = "home";
                           loginService.setData(response);
                           scope.loginForm = false;
                           scope.paging = false;
                           scope.userName = response;
                           scope.headerText = true;
                           scope.dashboardPage = true;
                           scope.aside = true;
                           //$window.location.href = '/index.html';                    
                           // swal(json.stringify(response));
                       }
                       if (loginService.checkRoll(response)) {
                           console.log("admin");
                           scope.adminGetHistoryButton = true;
                           scope.adminCreateUserButton = true;
                           scope.adminDeleteUserButton = true;
                       }

                   });
        }

        scope.init = function () {
           
            if ($cookies.getObject('cookie') == null) {
                console.log("init");
                scope.title = "Login";
                scope.loginForm = true;
                scope.headerText = false;
                //scope.newForm = false;
                scope.adminGetHistoryButton = false;
                scope.aside = false;
                scope.isDatePickerOpen = false;
                scope.adminCreateUserButton = false;
                scope.adminDeleteUserButton = false;
                scope.paging = false;
            }
            else {
                var user = $cookies.getObject('cookie')
                loginService.setData(user);
                console.log(user);
                scope.title = "home";
                //loginService.setData(response);
                scope.loginForm = false;
                scope.userName = user;
                scope.headerText = true;
                scope.dashboardPage = true;
                scope.aside = true;
                scope.paging = false;

                if (loginService.checkRoll($cookies.getObject('cookie'))) {
                    console.log("admin");
                    scope.adminGetHistoryButton = true;
                    scope.adminCreateUserButton = true;
                    scope.adminDeleteUserButton = true;
                }
            }
 
            //console.log("init");
            //scope.title = "Login";
            //scope.loginForm = true;
            //scope.headerText = false;
            ////scope.newForm = false;
            //scope.adminGetHistoryButton = false;
            //scope.aside = false;
            //scope.isDatePickerOpen = false;
            //scope.adminCreateUserButton = false;
            //scope.adminDeleteUserButton = false;
        }

        scope.openNewForm = function () {
            scope.title = "Open New Form";
            scope.paging = true;
        }

        scope.getHistory = function () {
            console.log("get history");
            scope.newForm = false;
        }

        scope.getUserHistory = function () {
            console.log("get user history");
        }

        scope.adminCreateUser = function () {
            scope.title = "Create User";
        }

    });
