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
    .controller("deleteUser", function ($scope, loginService, $http) {
        var scope = $scope;
        var temp = null;
        scope.init = function () {
            console.log("delete user init");
            //loginService.getDataFromAPI()
            //    .then(function (response) {
            //        console.log(response);
            //        temp = response;
            //    }, function (error) {
            //        console.log(error);
            //    });
            $http.get('http://localhost:8080/api/users/')
                  .success(function (response) {
                      console.log(response);
                  });
            scope.deleteUser = true;
        }
        scope.showTemp = function () {
            console.log(temp);
        }
        

        /*
        swal({
            title: "בטוח?",
            text: "אתה עומד למחוק משתמש זה מהמערכת!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "מחק",
            closeOnConfirm: false,
            cancelButtonText: 'ביטול',
        },
        function () {
            $http.delete('http://localhost:8080/api/users/' + '2')
                   .success(function (response) {
                     console.log(response);
                     swal("Deleted!", "מחקת משתמש זה בהצלחה", "success");
                 })
        });*/


    })
    .controller("newFormController", function ($scope, loginService, $window, $location, $http, $filter) {
        var scope = $scope;

        $scope.init = function () {
            console.log("new form init");
            scope.newFormShow = true;
            scope.destinationClass = 'otherPages';
            scope.privateDetailsClass = 'currentPage';
            console.log($location.path().split(/[\s/]+/).pop());
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
            setConferenceDays();
        }

        function setConferenceDays() {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = scope.startDate;
            var secondDate = scope.endDate;
            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
            console.log(diffDays);
            scope.conferenceDays = diffDays;
        }

        scope.showDestinationForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = true;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.testForm = false;
            scope.destinationClass = 'currentPage';
            scope.privateDetailsClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';

        }

        scope.showprivateDetailsForm = function () {
            scope.newFormShow = true;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.testForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'currentPage';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
        }

        scope.showflightDetailsForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.flightDetailsForm = true;
            scope.testForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'currentPage';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
        }

        scope.showStatmentForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = true;
            scope.travelDetailsForm = false;
            scope.testForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'currentPage';
            scope.testReplaceClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
            if (!(checkIsTeaching(scope.isTeaching))) {
                scope.addClassDisable = true;
                scope.courses = [];
            }
            else {
                scope.addClassDisable = false;
            }
        }

        scope.showTestReplaceForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.testForm = true;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
            scope.testReplaceClass = 'currentPage';
            if (!(checkIsTeaching(scope.tests))) {
                scope.addTestDisable = true;
                 scope.testsGroup = [];
            }
            else {
                scope.addTestDisable = false;
            }
        }

        scope.showtravelDetails = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.testForm = false;
            scope.travelDetailsForm = true;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.travelDetailsClass = 'currentPage';
        }
        scope.choices = [];
        scope.addNewFlight = function () {        
            console.log("add new flight");
            //console.log(scope.browse);
            var countriesList = null;
            countiesList = loginService.getCountries()
            if (countiesList == null) {
                $http.get('http://localhost:8080/api/Countries/')
                         .success(function (response) {
                             //console.log(response);
                             loginService.setCountries(response);
                             scope.countries = response;
                             countiesList = loginService.getCountries();
                         })
            }           
            scope.countries = countiesList;
            scope.selectedCountries = countiesList;
           // form.contacts.push({});
            var newItemNo = scope.choices.length + 1;
            scope.choices.push({});
            //var newItemNo = $scope.choices.length + 1;
            //$scope.choices.push({ 'id': 'choice' + newItemNo });
        }

        scope.showSelectedCountrie = function (selectedCountrie) {
            //console.log(scope.choices);           
        }

        scope.checkDate = function (endDate, index) {
           // console.log(endDtae);
           // console.log(scope.choices[index].flightDetailsFromDate);
            var startDate = scope.choices[index].flightDetailsFromDate;
            //var endDate = choices.flightDetailsToDate;
            if (endDate < startDate) {
                swal("שגיאה", "תאריך החזרה נמוך מתאריך היציאה", "error");
                scope.choices[index].flightDetailsToDate = startDate;
                //scope.endDate = scope.startDate;
            }
        }

        scope.onFileSelect = function ($file) {
            console.log($file);
        }

        //***********************************************//***********************************************
       

        //$scope.addNewChoice = function () {
        //    var newItemNo = $scope.choices.length + 1;
        //    $scope.choices.push({ 'id': 'choice' + newItemNo, 'name': 'choice' + newItemNo });
        //};

        $scope.removeNewChoice = function (choiseIndex) {
            console.log(choiseIndex);
            var newItemNo = scope.choices.length - 1;
            var removeItem = scope.choices[choiseIndex];
            console.log(removeItem);
            var allChoises = scope.choices;
            //console.log(allChoises);
            if (newItemNo !== -1) {
               // scope.choices.pop(choiseIndex,1);
                $scope.choices.splice(choiseIndex, 1);
            }
        };

        scope.showAddChoice = function (choice) {
            return choice.id === scope.choices[scope.choices.length - 1].id;
        };
        //***********************************************//***********************************************
        scope.courseDay = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
        scope.appointedTime = ["מועד א", "מועד ב", "מועד מיוחד"];
        scope.showTeacingReplace = function () {
            if (!(checkIsTeaching(scope.isTeaching))) {
                    scope.addClassDisable = true;
                    scope.courses = [];
            }
            else {
                scope.addClassDisable = false;
            }
        }

        function checkIsTeaching(radio) {
            if (radio == "1") {
                console.log("yes");
                return true;
                //scope.addClassDisable = false;
            }
            else {
                console.log("no");
                return false;
            }
        }
        //scope.courses = [];
        scope.addNewCourse = function () {
            console.log("add course");
            if (scope.courses.length == 8) {
                return;
            }
            var newItemNo = scope.courses.length + 1;
            scope.courses.push({});
        }

        $scope.removeCourse = function (courseIndex) {
            //console.log(choiseIndex);
            var newItemNo = scope.courses.length - 1;
            var removeItem = scope.courses[courseIndex];
            console.log(removeItem);
            var allChoises = scope.courses;
            //console.log(allChoises);
            if (newItemNo !== -1) {
                // scope.choices.pop(choiseIndex,1);
                $scope.courses.splice(courseIndex, 1);
            }
        };

        scope.showTestReplace = function () {
            if (!(checkIsTeaching(scope.tests))) {
                scope.addTestDisable = true;
                 scope.testsGroup = [];
            }
            else {
                scope.addTestDisable = false;
            }
        }

        $scope.removeTest = function (testIndex) {
            //console.log(choiseIndex);
            var newItemNo = scope.testsGroup.length - 1;
            var removeItem = scope.testsGroup[testIndex];
            console.log(removeItem);
            var allChoises = scope.testsGroup;
            //console.log(allChoises);
            if (newItemNo !== -1) {
                // scope.choices.pop(choiseIndex,1);
                $scope.testsGroup.splice(testIndex, 1);
            }
        }

        scope.addNewTest = function () {
            console.log("add test");
            if (scope.testsGroup.length == 7) {
                return;
            }
            var newItemNo = scope.testsGroup.length + 1;
            scope.testsGroup.push({});
        }

        scope.checkValidDate = function () {
            //var today = new Date;
            //var now = today
            //console.log(now);
            //console.log(scope.testsGroup[0].testDate);
            //if (scope.testDate < today) {
            //    swal("תאריך לא חוקי", "התאריך קטן מהיום", "error");
            //}                
        }

        //*****************send new form*****************
        scope.sendNewForm = function () {
       
            //alert(JSON.stringify(scope.testsGroup));
            var ApplyDocument = apllyDocumentToJson();
            console.log(ApplyDocument);
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http.post('http://localhost:8080/api/ApplyDocuments', ApplyDocument, config)
            .success(function (response){
                console.log(response);
            })


        }
        //*****************send new form*****************

        function apllyDocumentToJson() {
            var user = loginService.getData();
            var budget = checkBudgetField();           
            if (budget == null) {
                return;
            }
           
            var doc = 
                {
                    "UserId": user.Id,
                    "ColleagueType": budget,
                    "DepartureDate": convertDate(scope.startDate),
                    "ReturnDate": convertDate(scope.endDate),
                    "TotalDays": parseInt(scope.conferenceDays),
                    "TravelPurpose": scope.destinationTextBox,
                    //"TotalRequsetAmount": להשלים
                    //"TotalEselDays":להשלים
                    "LastReturnDate": convertDate(scope.lastFlightFromShenkar),
                    "TeacheDuringTravel": parseInt(scope.isTeaching),
                    "ReplacingInTests": parseInt(scope.tests),
                    "ResearchTraining": parseInt(scope.travelDetailsConvention),
                    "AboveWeek": parseInt(scope.travelDetailsDuration),
                    "MoreThenOneTravel": parseInt(scope.travelDetailsFlightNum),
                    "AbsenceTestA": parseInt(scope.travelDetailsFirstTestMissing),
                    "ExceptionRequstExplain": scope.travelDetailsExplainTextErea,
                    "PlusOne": parseInt(scope.family),
                    //"ApplicantSign":לשנות בבסיס נתונים את הטיפוס לבוליאן
                    //"ApplyDate"://להכניס את התאריך של אישור הטופס עי הממלא
                    //ApplicantSign להוריד - לא רלוונטי
                    "ApplyDate": convertDate(scope.startDate)//לשנות לתאריך של היום
                }        
            return doc;
        }

        function checkBudgetField() {
            var budget;
            if (scope.budgetTextBoxShow) {
                budget = scope.budgetTextBox;
            }
            else {
                budget = scope.selectedName;
            }
            if (budget == "" || budget==null) {
                swal("שדה ריק", "שדה מקור תקציבי אינו מלא", "error");
                return
            }
            return budget;
        }

        function convertDate(dateToConvert) {
            var date = $filter('date')(dateToConvert, 'yyyy-MM-dd');
            return date;
        }


    })
    .controller("login", function ($scope, $http, loginService, $window) {
        var scope = $scope;
        scope.init = function () {
            console.log("login init");
        }
    })
    .controller("createUser", function ($scope, $http, loginService) {
        var scope = $scope;
        scope.init = function () {
            console.log("create user init");
        }
    })
    .controller("index", function ($scope, $http, $window, loginService, $cookies, $location) {
        var scope = $scope;
        scope.goHome = function () {
            scope.title = "Home";
        }
        //*********************************dont save cookeis*********************************//
        //$cookies.remove('cookie');
        $scope.submit = function () {
            // alert($scope.password);
            $http.get('http://localhost:8080/api/users/' + scope.id + '/' + scope.password)
            //$http.get('http://localhost:8080/api/users/')
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
                if ($location.path().split(/[\s/]+/).pop() == 'newForm') {
                    scope.paging = true;
                    scope.title = "Open New Form";
                }
                else if ($location.path().split(/[\s/]+/).pop() == 'createUserForm') {
                    scope.title = "Create User";
                }

                else {
                    scope.paging = false;
                }

                if (loginService.checkRoll($cookies.getObject('cookie'))) {
                    console.log("admin");
                    scope.adminGetHistoryButton = true;
                    scope.adminCreateUserButton = true;
                    scope.adminDeleteUserButton = true;
                }
            }
        }

        scope.openNewForm = function () {
            scope.title = "Open New Form";
            scope.paging = true;
        }

        scope.getHistory = function () {
            console.log("get history");
            scope.newForm = false;
            scope.paging = false;
        }

        scope.getUserHistory = function () {
            console.log("get user history");
            scope.paging = false;
        }

        scope.adminCreateUser = function () {
            scope.title = "Create User";
            scope.paging = false;
        }

    });
