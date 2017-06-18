/// <reference path="C:\Users\yinonmanor\Source\Repos\FastFly_FrontEnd\FastFlyUI\Scripts/angular.min.js" />


var app = angular.module("fastFly", ['ngRoute'])
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
                      scope.users = response;
                      scope.usersToDelete = response;
                  });
            scope.deleteUser = true;
           


        }

        scope.deleteUserFunction = function (user) {
            console.log(user);
            swal({
                title: "אזהרה",
                text: "!אתה עומד למחוק את " + user.FirstName + " " + user.LastName + " מהמערכת",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonColor: '#d33',
                confirmButtonText: "מחק",
                closeOnConfirm: false,
                cancelButtonText: 'ביטול',
            },
        function () {
            $http.delete('http://localhost:8080/api/Users/' + user.Id)
                   .success(function (response) {
                       console.log(response);
                       swal("המשתמש נמחק", "מחקת משתמש זה בהצלחה", "success");
                   })
        });
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
            //scope.flightsToShow = [{ "CountryCode": "AVA" }];
            scope.newFormShow = true;
            scope.destinationClass = 'otherPages';
            scope.privateDetailsClass = 'currentPage';
           // console.log($location.path().split(/[\s/]+/).pop());
            var user = loginService.getData();
            scope.title = "Open New Form";
            scope.flightsTableShow = false;
            scope.coursesTableShow = false;
            scope.allDocsShow = false;
            //scope.allDocsShow = false;
            if (user == null) {
                $window.location = "index.html";
            }
            else {
                if (loginService.getSignerFlag() == 1) {
                    console.log(loginService.getSignerFlag());
                    
                    var userDoc = loginService.getResponse();
                    console.log(userDoc);
                   
                    console.log(" ....");
                    userDoc.then(function (x) {
                        //var apllyDocs = x.User.ApplyDocuments;
                        // console.log(apllyDocs);
                        //var currentApplyDoc = [];
                        //angular.forEach(apllyDocs, function (value) {
                        //    //console.log(value);
                        //})
                        console.log(x);
                        scope.firstNameTextBox = x.User.FirstName;
                        scope.idTextBox = x.User.Id;
                        scope.lastNameTextBox = x.User.LastName;
                        scope.facultyTextBox = x.User.Faculty1.FacultyName;
                        scope.departmentTextBox = x.User.Department1.DepartmentName;
                        scope.positionTextBox = x.User.Role;
                        scope.jogPercentTextBox = x.User.PercentageJob;
                        scope.phoneTextBox = x.User.CellNum;
                        scope.mailTextBox = x.User.EmailAddress;
                        //scope.selectedName = x.ColleagueType; 
                        checkIfTypeExist(x);
                        scope.startDate = returnToOriginalDateFormat(x.DepartureDate);
                        scope.endDate = returnToOriginalDateFormat(x.ReturnDate);
                        scope.conferenceDays = x.TotalDays;
                        scope.family = x.PlusOne;
                        scope.destinationTextBox = x.TravelPurpose;
                        
                        var flights = loginService.getFlightByDocId(x.DocId);
                        flights.then(function (dest) {
                            //console.log(dest.data);
                            angular.forEach(dest.data, function (value) {
                                value.FromDate = convertDate(value.FromDate);
                                value.ToDate = convertDate(value.ToDate);
                            })
                            //dest.data[0].FromDate = convertDate(dest.data[0].FromDate);
                            scope.flightsToShow = dest.data;
                            console.log(scope.flightsToShow);
                            //scope.flightDetailsFromDate = returnToOriginalDateFormat(dest.data[0].FromDate);
                            scope.flightsTableShow = true;

                        })


                        var coursesFromDb = loginService.getCoursesByDocId(x.DocId);
                        coursesFromDb.then(function (courseReplace) {
                            console.log(courseReplace.data);
                            angular.forEach(courseReplace.data, function (value) {
                                value.Date = convertDate(value.Date);                             
                            })
                            scope.coursesTableShow = true;
                            scope.coursesFromDbToShow = courseReplace.data;
                            scope.courses = [];
                        })
                        scope.isTeaching = x.TeacheDuringTravel;
                        
                        //scope.courses = 
                       // console.log(destination);

                        disableFields();
                    })
                    console.log(userDoc);

                    //console.log(userDoc.UserId);
                    //console.log(userDoc[0].User.FirstName);
                    //scope.idTextBox = userDoc.UserId;
                    //scope.firstNameTextBox = userDoc[0].User.FirstName;
                }
                else {
                    // console.log(loginService.getSignerFlag());
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
                    //scope.type = ["קק\"מ אישי", "קק\"מ קבוצתי", "סגל עמית", "מקור תקציבי"];
                    //this.myDate = new Date();
                    //scope.isDatePickerOpen = true;
                    //scope.newForm = true;
                    //scope.paging = true;
                    //scope.allDocsShow = false;
                    //scope.budgetTextBoxShow = false;
                }
                scope.type = ["קק\"מ אישי", "קק\"מ קבוצתי", "סגל עמית", "מקור תקציבי"];
                this.myDate = new Date();
                scope.isDatePickerOpen = true;
                scope.newForm = true;
                scope.paging = true;
                scope.allDocsShow = false;
                scope.budgetTextBoxShow = false;
            }
            
            
        }

        function returnToOriginalDateFormat(date) {
            return new Date(date);
        }

        function disableFields() {
            scope.destinationTextBoxDisabled = true;
            scope.familyDisabled = true;
            scope.selectedNameDiabled = true;
            scope.startDateDisabled = true;
            scope.endDateDisabled = true;
            scope.conferenceDaysDisabled = true;
            scope.browseButtonDisabled = true;
            scope.addNewFlightButtomDisabled = true;
            scope.lastFlightFromShenkarDisabled = true;
            scope.sumDaysEshelDisabled = true;
            scope.sumDaysNoEshelDisabled = true;
            scope.sumNoEshelDisabled = true;
            scope.isTeachingDisabled = true;
           // scope.addClassDisable = true;
        }

        function checkIfTypeExist(data) {
            var typeFlag = 0;
            angular.forEach(scope.type, function (type) {
                if (data.ColleagueType == type) {
                    scope.selectedName = type;
                    typeFlag = 1;
                }
            })
            if (typeFlag == 0) {
                scope.budgetTextBoxDisabled = true;
                scope.budgetTextBoxShow = true;
                scope.budgetTextBox = data.ColleagueType;
                scope.selectedName = scope.type[3];
            }            
        }

        //function getDataFromResponse(res) {
        //    res.then(function (data) {
        //        return data;
        //    })
        //}

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
            if (scope.isTeachingDisabled!=true) {
                if (!(checkIsTeaching(scope.isTeaching))) {
                    scope.addClassDisable = true;
                    scope.courses = [];
                }
                else {
                    if (scope.courses.length == 7) {
                        scope.addClassDisable = true;
                    }
                    else {
                        scope.addClassDisable = false;
                    }
                }
            }
            else {
                scope.addClassDisable = true;
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
            console.log(selectedCountrie.CountryCode);
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
                //console.log("yes");
                return true;
                //scope.addClassDisable = false;
            }
            else {
                //console.log("no");
                return false;
            }
        }
        //scope.courses = [];
        scope.addNewCourse = function () {
            console.log("add course");
            if (scope.courses.length == 6) {
                var newItemNo = scope.courses.length + 1;
                scope.courses.push({});
                scope.addClassDisable = true;
                return;
            }
            else {
                scope.addClassDisable = false;
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
            if (scope.courses.length < 7) {
                scope.addClassDisable = false;
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
            .success(function (response) {
                console.log(response);
                if (scope.isTeaching == "1") {
                    var replaceTeachDoc = replaceTeachDocToJson(response.DocId);
                    $http.post('http://localhost:8080/api/LectureReplacements', replaceTeachDoc, config)
                    .success(function (response) {
                        console.log(response);
                        if (scope.tests == "1") {
                            console.log("++" + response[0].DocId + "++");
                            var replaceTestDoc = replaceTestDocToJson(response[0].DocId);
                            $http.post('http://localhost:8080/api/TestReplacements', replaceTestDoc, config)
                            .success(function (response) {
                                console.log(response);
                                var flightDoc = flightDocToJson(response[0].DocId);
                                $http.post('http://localhost:8080/api/DestinationPeriods', flightDoc, config)
                                .success(function (response) {
                                    console.log(response);
                                    swal("!תודה", "הטופס נשמר בהצלחה", "success");
                                })
                            })
                        }

                    })
                }
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

        function replaceTeachDocToJson(DocId) {
            //  console.log(DocId);
            //console.log(scope.courses);
            var doc = [];
            angular.forEach(scope.courses, function (item) {
                var tempDoc =
                    {
                        "DocId": DocId,
                        "CourseName": item.courseNameTextBox,
                        "Date": convertDate(item.courseDay),
                        "FromHour": convertTime(item.courseReplaceFromTime),
                        "ToHour": convertTime(item.courseReplaceToTime),
                        "CompleteBy": item.courseReplaseComplete
                    }
                this.push(tempDoc);
                //console.log(item);
            }, doc);
            // console.log(doc);
            return doc;
        }

        function replaceTestDocToJson(DocId) {
            var doc = [];
            angular.forEach(scope.testsGroup, function (item) {
                var tempDoc =
                    {
                        "DocId": DocId,
                        "CourseName": item.TestCourseNameTextBox,
                        "TestDate": convertDate(item.testDate),
                        "SubstituteLucterer": item.profesorName,
                        "ToHour": convertTime(item.courseReplaceToTime),
                        "ExamPeriod": item.appointedTime
                    }
                this.push(tempDoc);
                //console.log(item);
            }, doc);
            // console.log(doc);
            return doc;
        }

        function flightDocToJson(DocId) {
            var doc = [];
            angular.forEach(scope.choices, function (item) {
                var tempDoc =
                    {
                        "DocId": DocId,
                        "CountryCode": item.countrie.CountryCode,
                        "FromDate": convertDate(item.flightDetailsFromDate),
                        "ToDate": convertDate(item.flightDetailsToDate),
                        "Flight": item.flightDollars,
                        "Hotel": item.hotelsDollars,
                        "RideBy": item.carRentDollars,
                        "ParticipationFee": item.conferenceDollars,
                        "TotalAmountRequested": scope.sumNoEshel
                    }
                this.push(tempDoc);
                //console.log(item);
            }, doc);
            // console.log(doc);
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
            if (budget == "" || budget == null) {
                swal("שדה ריק", "שדה מקור תקציבי אינו מלא", "error");
                return
            }
            return budget;
        }

        function convertDate(dateToConvert) {
            var date = $filter('date')(dateToConvert, 'yyyy-MM-dd');
            return date;
        }

        function convertTime(dateToConvert) {
            //var time = dateToConvert.toLocaleTimeString();
            var time = $filter('date')(dateToConvert, 'HH:mm');
            //console.log(time);
            return time;
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
            scope.createUserForm = true;
        }
    })
    .controller("index", function ($scope, $http, $window, loginService, $location,$q) {
        var scope = $scope;
        scope.goHome = function () {
            
            var user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                scope.title = "Home";
                getAllDocs(user);
                scope.allDocsShow = true;
            }
        }
        //*********************************dont save cookeis*********************************//
        //$cookies.remove('cookie');
        $scope.submit = function () {
            $http.get('http://localhost:8080/api/users/' + scope.id + '/' + scope.password)
                   .success(function (response) {
                       console.log(response);
                       if (response == null) {
                           swal("שגיאה", "שם משתמש או סיסמה שגויים", "error");
                       }
                       else {
                           localStorage.setItem('user', JSON.stringify(response));
                           //var cookieval = $cookies.getObject('cookie');
                           //console.log("cookie: " + json.stringify(cookieval));
                           //console.log(cookieval);
                           console.log(JSON.parse(localStorage.getItem(('user'))));
                           scope.title = "home";
                           loginService.setData(response);
                           scope.loginForm = false;
                           scope.paging = false;
                           scope.userName = response.FirstName;
                           scope.headerText = true;
                           scope.dashboardPage = true;
                           scope.aside = true;
                           //$window.location.href = '/index.html';                    
                           // swal(json.stringify(response));
                       }
                       if (loginService.checkRoll(response) == 2) {
                           console.log("admin");
                           scope.adminGetHistoryButton = true;
                           scope.adminCreateUserButton = true;
                           scope.adminDeleteUserButton = true;
                           scope.openNewFormButtonShow = true;
                           scope.getHistoryButtonShow = true;
                       }

                       else if (loginService.checkRoll(response) == 4) {
                           scope.adminGetHistoryButton = false;
                           scope.adminCreateUserButton = false;
                           scope.adminDeleteUserButton = false;
                           scope.openNewFormButtonShow = false;
                           scope.getHistoryButtonShow = false;
                       }
                       //get all apply documents
                       getAllDocs(response);
                       scope.allDocsShow = true;

                   })
                .error(function (response) {
                    swal("שגיאה", "שם משתמש או סיסמה שגויים", "error");
                });
        }

        function getAllDocs(data) {
            var myEl = angular.element(document.querySelector('#dashboardOpensFormsRequest'));
            myEl.empty();
            var index = 0;
            $http.get('http://localhost:8080/api/applydocuments/')
            .success(function (response) {
                //console.log(response);
                var length = response.length;
                //loginService.setResponse(response);
                angular.forEach(response, function (res) {
                    //console.log(res.UserId);
                    $http.get('http://localhost:8080/api/users/' + res.UserId)
                    .success(function (userDetails) {
                                       var para = document.createElement("a");
                                       para.href = "#/newForm";
                                       //console.log(index);
                                       var node = document.createTextNode(userDetails.Id + ' ' + userDetails.FirstName + ' ' + userDetails.LastName + ' ' + res.DocId);
                                       para.appendChild(node);
                                       para.addEventListener("click", function () { getUserDetails(res.DocId) }, false);
                                       var element = document.getElementById("dashboardOpensFormsRequest");
                                       element.appendChild(para);
                                       para = document.createElement("p");
                                       element.appendChild(para);
                                   })                   
                })
            })
        }


        function getUserDetails(id) {
            console.log(id);
            var doc = loginService.getUserDetailsFromService(id);
            //.then(function(data){
            //    console.log(data.data);
            //});
            //loginService.setSignerFlag(1);
            //console.log(id);
            //$http.get('http://localhost:8080/api/applydocuments/' + id)
            //.success(function (response) {
            //    console.log(response);
            //    loginService.setResponse(response);              
            //});
            //openForm();
            //console.log(doc.$$state);
           // var userDoc = [];
           
            //-------------------------
            //angular.forEach(doc.$$state, function (demoContent, index) {
            //    angular.forEach(demoContent, function (newsGroup, index) {
            //        userDoc.push(newsGroup)
            //    });
            //});
            //------------------------
            //console.log(doc);
            // console.log(userDoc);           
            //doc.then(function (x) {
            //    console.log(x.User)
            //})
            //console.log(doc);
            loginService.setResponse(doc);
            openForm();
        }
        scope.init = function () {

            //if ($cookies.getObject('cookie') == null) {

            /**********clear local storage*********/
            //localStorage.clear();
            if (localStorage.getItem('user') == null) {
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
                //var user = $cookies.getObject('cookie')
                var user = JSON.parse(localStorage.getItem('user'));
                console.log(user);
                scope.title = "home";
                loginService.setData(user);
                scope.loginForm = false;
                scope.userName = user.FirstName;
                scope.headerText = true;
                scope.dashboardPage = true;
                scope.aside = true;
                scope.paging = false;
                if ($location.path().split(/[\s/]+/).pop() == 'newForm') {
                    scope.paging = true;
                    scope.allDocsShow = false;
                    scope.title = "Open New Form";
                }
                else if ($location.path().split(/[\s/]+/).pop() == 'createUserForm') {
                    scope.title = "Create User";
                    scope.paging = false;
                }
                else if ($location.path().split(/[\s/]+/).pop() == 'index') {
                    scope.allDocsShow = true;
                    scope.paging = false;
                }

                else {
                    scope.paging = false;
                }

                if (loginService.checkRoll(user) == 2) {
                    console.log("admin");
                    scope.adminGetHistoryButton = true;
                    scope.adminCreateUserButton = true;
                    scope.adminDeleteUserButton = true;
                    scope.openNewFormButtonShow = true;
                    scope.getHistoryButtonShow = true;
                }
                else if (loginService.checkRoll(user) == 4) {
                    scope.adminGetHistoryButton = false;
                    scope.adminCreateUserButton = false;
                    scope.adminDeleteUserButton = false;
                    scope.openNewFormButtonShow = true;
                    scope.getHistory = false;

                }
                getAllDocs(user);
               // scope.allDocsShow = true;
            }
        }

        scope.openNewForm = function () {
            loginService.setSignerFlag(0);
            openForm();
        }

        scope.getHistory = function () {
            console.log("get history");
            scope.newForm = false;
            scope.paging = false;
            scope.allDocsShow = false;
        }

        scope.getUserHistory = function () {
            console.log("get user history");
            scope.paging = false;
            scope.allDocsShow = false;
        }

        scope.adminCreateUser = function () {
            scope.title = "Create User";
            scope.paging = false;
            scope.allDocsShow = false;
        }

        function openForm() {
            scope.title = "Open New Form";
            scope.paging = true;
            scope.allDocsShow = false;
        }

    });
