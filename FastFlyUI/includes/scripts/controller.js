/// <reference path="\\Mac\Home\Documents\Visual Studio 2015\Projects\FastFlyUI\FastFlyUI\Scripts/angular.min.js" />

var app = angular.module("fastFly", []);
app.controller("index", function ($scope, $http, $window, loginService) {
    var scope = $scope;
    
    $scope.submit = function () {
        // alert($scope.password);
        $http.get('http://localhost:8080/api/users/' + $scope.id + '/' + $scope.password)
               .success(function (response) {
                   if (response == null) {
                       swal("שגיאה", "שם משתמש או סיסמה שגויים", "error");
                   }
                   else {
                       console.log(response);
                       loginService.setData(response);
                       scope.loginForm = false;
                       scope.userName = response;
                       scope.headerText = true;
                       scope.dashboardPage = true;
                       scope.aside = true;
                       //$window.location.href = '/index.html';                    
                       // swal(JSON.stringify(response));
                   }
                   if (loginService.checkRoll(response)) {
                       console.log("admin");
                       scope.admenGetHistoryButton = true;
                   }

               });
    }

    scope.init = function () {
        console.log("init");
        scope.loginForm = true;
        scope.headerText = false;
        scope.newForm = false;
        scope.admenGetHistoryButton = false;
        scope.aside = false;
    }
    
    scope.openNewForm = function () {
        console.log("open form");
        var user = loginService.getData();
        console.log(user);
        scope.firstNameTextBox = user.FirstName;
        scope.lastNameTextBox = user.LastName;
        scope.idTextBox = user.Id;
        scope.facultyTextBox = user.Faculty1.FacultyName;
        scope.departmentTextBox = user.Department1.DepartmentName;
        scope.positionTextBox = user.Role;
        scope.jogPercentTextBox = user.PercentageJob;
        scope.phoneTextBox = user.CellNum;
        scope.mailTextBox = user.EmailAddress;
        scope.type = ["קק\"מ אישי", "קק\"מ קבוצתי", "סגל עמית", "אחר"];
        this.myDate = new Date();
        this.isOpen = true;
        scope.newForm = true;
    }

    scope.getHistory = function(){
        console.log("get history");
        scope.newForm = false;
    }

    scope.getUserHistory = function () {
        console.log("get user history");
    }

});