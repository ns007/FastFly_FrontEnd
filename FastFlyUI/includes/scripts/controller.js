﻿/// <reference path="C:\Users\yinonmanor\Source\Repos\FastFly_FrontEnd\FastFlyUI\Scripts/angular.min.js" />


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

    $routeProvider.when("/getHistory", {
        templateUrl: "template/getHistory.html",
        controller: "getHistoryController"
    })
    $routeProvider.when("/getUserHistory", {
        templateUrl: "template/getUserHistory.html",
        controller: "getUserHistoryController"
    })
    $routeProvider.when("/returnForm", {
        templateUrl: "template/returnForm.html",
        controller: "returnFormController"
    })

    //$routeProvider.when("/loginSubmit", {
    //    templateUrl: "index.html",
    //    controller: "index"
    //})
})
    .controller("getUserHistoryController", function ($scope, loginService, $http, $window) {
        var scope = $scope;
        scope.init = function () {
            console.log("get user history");
            scope.getUsersHistoryShow = true;
            var user = JSON.parse(localStorage.getItem(('user')));
            getCloseDocs(user, 0);
        }

        function getCloseDocs(user, isMyDoc) {
            var url;
            if (isMyDoc == 1) {
                url = 'http://localhost:8080/api/applydocuments/docs/' + user.Id;
            }
            else {
                if (user.ApplicationRoleId == 1 || user.ApplicationRoleId == 4 || user.ApplicationRoleId == 5) {
                    url = 'http://localhost:8080/api/applydocuments/docs/close';
                }
                else if (data.ApplicationRoleId == 2) {
                    url = 'http://localhost:8080/api/applydocuments/docs/' + user.Id;
                }
            }
            var index = 0;
            var res = loginService.getDocs(url);
            scope.formsFromDbToShow = [];
            res.then(function (val) {
                angular.forEach(val, function (obj) {
                    //console.log(obj);
                    var docId = obj.DocId;
                    var id = obj.UserId;
                    var name;
                    var thisUser = loginService.getUserById(obj.UserId);
                    thisUser.then(function (val) {
                        name = val.FirstName + ' ' + val.LastName;
                        scope.formsFromDbToShow.push({ "Id": id, "name": name, "DocId": docId });
                    })
                })
                scope.formsTablesShow = true;
            })
        }
    })
 .controller("returnFormController", function ($scope, loginService, $http, $window, $filter) {
     var scope = $scope;
     var user;
     var currentDocId;
     var countriesList = null;
     scope.init = function () {
         scope.rf_sendFormDisabled = true;
         scope.flights = [];
         scope.nights = [];
         scope.exps = [];
         var newItemNo = scope.flights.length + 1;
         scope.flights.push({});
         scope.returnFormsTables = false;
         scope.adminReturnFormButton = false;
         scope.rf_formShow = false;
         $http.get('http://localhost:8080/api/Countries/')
                         .success(function (response) {
                             //console.log(response);
                             debugger;
                             loginService.setCountries(response);
                             scope.countries = response;
                             countiesList = loginService.getCountries();
                         });
         //countries = loginService.countiesList
         console.log("return form");
         scope.returnFormsFromDbToShow = [];
         scope.returnFormShow = true;
         user = JSON.parse(localStorage.getItem(('user')));
         var res = loginService.getOpenReturnFormsDocs(user.Id);
         res.then(function (val) {
             angular.forEach(val, function (obj) {
                 //console.log(obj);
                 var docId = obj.DocId;
                 var id = obj.UserId;
                 var name;
                 var thisUser = loginService.getUserById(obj.UserId);
                 thisUser.then(function (val) {
                     name = val.FirstName + ' ' + val.LastName;
                     scope.returnFormsFromDbToShow.push({ "Id": id, "name": name, "DocId": docId });
                 })
             })
             scope.returnFormsTables = true;
         })
     }

     scope.addNewNight = function () {
         if (scope.nights.length == 3) {
             return;
         }
         var newItemNo = scope.nights.length + 1;
         scope.nights.push({});
     }



     scope.addNew = function () {
         console.log(scope.flights);
         if (scope.flights.length == 2) {
             return;
         }
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
         var newItemNo = scope.flights.length + 1;
         scope.flights.push({});
         //var newItemNo = $scope.choices.length + 1;
         //$scope.choices.push({ 'id': 'choice' + newItemNo });
     }



     $scope.removeNewFlight = function (flightIndex) {
         console.log(flightIndex);
         if (scope.flights.length == 1) {
             return;
         }
         var newItemNo = scope.flights.length - 1;
         var removeItem = scope.flights[flightIndex];
         console.log(removeItem);
         var allFlights = scope.flights;
         if (newItemNo !== -1) {
             $scope.flights.splice(flightIndex, 1);
         }
     };

     scope.removeNewNight = function (nightIndex) {
         console.log(nightIndex);
         var newItemNo = scope.nights.length - 1;
         var removeItem = scope.nights[nightIndex];
         console.log(removeItem);
         var allFlights = scope.nights;
         if (newItemNo !== -1) {
             $scope.nights.splice(nightIndex, 1);
         }
     };

     scope.removeNewNExp = function (expIndex) {
         console.log(expIndex);
         var newItemNo = scope.exps.length - 1;
         var removeItem = scope.exps[expIndex];
         console.log(removeItem);
         var allFlights = scope.exps;
         if (newItemNo !== -1) {
             $scope.exps.splice(expIndex, 1);
         }
     };

     scope.addNewExp = function () {
         debugger;
         if (scope.exps.length == 2) {
             return;
         }
         var newItemNo = scope.exps.length + 1;
         scope.exps.push({});
     }

     scope.openReturnForm = function (docId) {
         console.log(docId + ' hi');
         currentDocId = docId;
         scope.returnFormsTables = false;
         scope.rf_formShow = true;
     }

     scope.setCountrieCode = function (countrieCode) {
         console.log(countrieCode.CountryName);
         console.log(countrieCode.CountryCode);
     }

     scope.setCarTotalDays = function () {
         var startDate = scope.rf_FromDateCarRent;
         var endDate = scope.rf_ToDateCarRent;
         if (startDate > endDate) {
             swal('!שגיאה', 'תאריך ההתחלה גדול מתאריך הסיום', 'error');
             scope.rf_ToDateCarRent = startDate;
             scope.rf_daysCarRentTextBox = '';
             return;
         }
         var days = countDays(startDate, endDate)
         scope.rf_daysCarRentTextBox = days + 1;
     }

     scope.setExpTotalDays = function () {
         var startDate = scope.rf_FromDateStaingCost;
         var endDate = scope.rf_ToDateStaingCost;
         if (startDate > endDate) {
             swal('!שגיאה', 'תאריך ההתחלה גדול מתאריך הסיום', 'error');
             scope.rf_ToDateStaingCost = startDate;
             scope.rf_daysTextBox = '';
             return;
         }
         var days = countDays(startDate, endDate)
         scope.rf_daysTextBox = days + 1;
     }
     
     scope.setNightsNumber = function () {
         debugger;
         var startDate = scope.nights[scope.nights.length - 1].rf_FromDate;
         var endDate = scope.nights[scope.nights.length - 1].rf_ToDate;
         if (startDate > endDate) {
             swal('!שגיאה', 'תאריך ההתחלה גדול מתאריך הסיום', 'error');
             scope.nights[scope.nights.length - 1].rf_ToDate = startDate;
             scope.nights[scope.nights.length - 1].rf_nightsTextBox = '';
             return;
         }
         var nights = countDays(startDate, endDate)
         scope.nights[scope.nights.length - 1].rf_nightsTextBox = nights;
     }

     function countDays(startDate,endDate) {
         var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
         var firstDate = startDate;
         var secondDate = endDate;
         var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
         console.log(diffDays);
         //scope.conferenceDays = diffDays;
         return diffDays;
     }

     scope.checkAllFields = function () {
         debugger
         //console.log(scope.flights[0].rf_costTextBox != '' || scope.flights[0].rf_costTextBox != undefined);
         if((scope.flights[0].rf_costTextBox != '' && scope.flights[0].rf_costTextBox != undefined) &&
            (scope.flights[0].rf_date != '' && scope.flights[0].rf_date != undefined) &&
            (scope.flights[0].rf_destinationTextBox != '' && scope.flights[0].rf_destinationTextBox != undefined && scope.flights[0].rf_destinationTextBox != 'מדינת יעד') &&
            (scope.flights[0].rf_departmentTextBox != '' && scope.flights[0].rf_departmentTextBox != undefined)) {
             scope.rf_sendFormDisabled = false;
         }
         else {
             scope.rf_sendFormDisabled = true;
         }
         //if(scope.flights[0] !='')
     }

     scope.loadReturnForm = function () {
         debugger;
         var form = createMainReturnForn();
         console.log(form.StayExpense);
         var config = {
             headers: {
                 'Content-Type': 'application/json'
             }
         }
         $http.put('http://localhost:8080/api/ReckoningDocuments/' + currentDocId, form, config)
         .success(function (response) {
             //console.log(response);
             if (form.CarRent == 'Y') {
                 var carRentDoc = getCarRent();
                 $http.post('http://localhost:8080/api/CarRents', carRentDoc, config)
                 .success(function (response) {
                     if (form.AccommodationAbroad == 'Y') {
                         debugger;
                         var acmAbDoc = getAccommodationAbroadsDoc();
                         $http.post('http://localhost:8080/api/AccommodationAbroads/' + currentDocId, acmAbDoc, config)
                         .success(function (response) {
                             //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                             if (form.StayExpense == 'Y') {
                                 var stayExDoc = getStayExDoc();
                                 $http.post('http://localhost:8080/api/StayExpenses', stayExDoc, config)
                                    .success(function (response) {
                                        //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                        debugger;
                                        if (form.OtherOxpense == 'Y') {
                                            var othersDoc = getOthersDoc();
                                            $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                             .success(function (response) {
                                                 var flightsDoc = getFlightsDoc();
                                                 $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                                    .success(function (response) {
                                                        swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                                        $window.location.reload();
                                                    });
                                                 //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                             });
                                        }
                                        else {
                                            var flightsDoc = getFlightsDoc();
                                            $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                               .success(function (response) {
                                                   swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                                   $window.location.reload();
                                               });
                                        }
                                    });
                             }
                             else {
                                 if (form.OtherOxpense == 'Y') {
                                     var othersDoc = getOthersDoc();
                                     $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                      .success(function (response) {
                                          var flightsDoc = getFlightsDoc();
                                          $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                             .success(function (response) {
                                                 swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                                 $window.location.reload();
                                             });
                                          //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                      });
                                 }
                                 else {
                                     var flightsDoc = getFlightsDoc();
                                     $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                        .success(function (response) {
                                            swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                            $window.location.reload();
                                        });
                                 }
                             }
                         });
                     }
                     else {
                         if (form.StayExpense == 'Y') {
                             var stayExDoc = getStayExDoc();
                             $http.post('http://localhost:8080/api/StayExpenses', stayExDoc, config)
                                .success(function (response) {
                                    //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                    debugger;
                                    if (form.OtherOxpense == 'Y') {
                                        var othersDoc = getOthersDoc();
                                        $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                         .success(function (response) {
                                             var flightsDoc = getFlightsDoc();
                                             $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                                .success(function (response) {
                                                    swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                                    $window.location.reload();
                                                });
                                             //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                         });
                                    }
                                    else {
                                        var flightsDoc = getFlightsDoc();
                                        $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                           .success(function (response) {
                                               swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                               $window.location.reload();
                                           });
                                    }
                                });
                         }
                         else {
                             if (form.OtherOxpense == 'Y') {
                                 var othersDoc = getOthersDoc();
                                 $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                  .success(function (response) {
                                      var flightsDoc = getFlightsDoc();
                                      $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                         .success(function (response) {
                                             swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                             $window.location.reload();
                                         });
                                      //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                  });
                             }
                             else {
                                 var flightsDoc = getFlightsDoc();
                                 $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                    .success(function (response) {
                                        swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                        $window.location.reload();
                                    });
                             }
                         }
                     }
                     //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                 });
             }
             else {
                 if (form.AccommodationAbroad == 'Y') {
                     debugger;
                     var acmAbDoc = getAccommodationAbroadsDoc();
                     $http.post('http://localhost:8080/api/AccommodationAbroads/' + currentDocId, acmAbDoc, config)
                     .success(function (response) {
                         //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                         if (form.StayExpense == 'Y') {
                             var stayExDoc = getStayExDoc();
                             $http.post('http://localhost:8080/api/StayExpenses', stayExDoc, config)
                                .success(function (response) {
                                    //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                    debugger;
                                    if (form.OtherOxpense == 'Y') {
                                        var othersDoc = getOthersDoc();
                                        $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                         .success(function (response) {
                                             var flightsDoc = getFlightsDoc();
                                             $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                                .success(function (response) {
                                                    swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                                    $window.location.reload();
                                                });
                                             //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                         });
                                    }
                                    else {
                                        var flightsDoc = getFlightsDoc();
                                        $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                           .success(function (response) {
                                               swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                               $window.location.reload();
                                           });
                                    }
                                });
                         }
                         else {
                             if (form.OtherOxpense == 'Y') {
                                 var othersDoc = getOthersDoc();
                                 $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                  .success(function (response) {
                                      var flightsDoc = getFlightsDoc();
                                      $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                         .success(function (response) {
                                             swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                             $window.location.reload();
                                         });
                                      //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                  });
                             }
                             else {
                                 var flightsDoc = getFlightsDoc();
                                 $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                    .success(function (response) {
                                        swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                        $window.location.reload();
                                    });
                             }
                         }
                     });
                 }
                 else {
                     if (form.StayExpense == 'Y') {
                         var stayExDoc = getStayExDoc();
                         $http.post('http://localhost:8080/api/StayExpenses', stayExDoc, config)
                            .success(function (response) {
                                //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                debugger;
                                if (form.OtherOxpense == 'Y') {
                                    var othersDoc = getOthersDoc();
                                    $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                                     .success(function (response) {
                                         var flightsDoc = getFlightsDoc();
                                         $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                            .success(function (response) {
                                                swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                                $window.location.reload();
                                            });
                                         //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                     });
                                }
                                else {
                                    var flightsDoc = getFlightsDoc();
                                    $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                       .success(function (response) {
                                           swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                           $window.location.reload();
                                       });
                                }
                            });
                     }
                     else {
                         if (form.OtherOxpense == 'Y') {
                             var othersDoc = getOthersDoc();
                             $http.post('http://localhost:8080/api/OtherOxpenses', othersDoc, config)
                              .success(function (response) {
                                  var flightsDoc = getFlightsDoc();
                                  $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                     .success(function (response) {
                                         swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                         $window.location.reload();
                                     });
                                  //swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                              });
                         }
                         else {
                             var flightsDoc = getFlightsDoc();
                             $http.post('http://localhost:8080/api/Flights', flightsDoc, config)
                                .success(function (response) {
                                    swal('תודה', 'הטופס נשמר בהצלחה', 'success');
                                    $window.location.reload();
                                });
                         }
                     }
                 }
             }
         });

         
     }

     function getOthersDoc() {
         var doc = [];
         angular.forEach(scope.exps, function (item) {
             var tempDoc =
                 {
                     "DocId": currentDocId,
                     "ExpenseEssence": item.rf_others,
                     "Cost": parseInt(item.rf_othersCost)
                 }
             this.push(tempDoc);
         }, doc);
         return doc;
     }

     function getStayExDoc() {
         var doc =
             [{
                 "DocId": currentDocId,
                 "FromDate": convertDate(scope.rf_FromDateStaingCost),
                 "ToDate": convertDate(scope.rf_ToDateStaingCost),
                 "TotalDays": parseInt(scope.rf_daysTextBox),
                 "FeePerDay": parseInt(scope.rf_costPerDayTextBox)
             }]

         return doc;
     }


     function getAccommodationAbroadsDoc() {
         var doc = [];
         angular.forEach(scope.nights, function (item) {
             var tempDoc =
                 {
                     "DocId": currentDocId,
                     "FromDate": convertDate(item.rf_FromDate),
                     "ToDate": convertDate(item.rf_ToDate),
                     "TotalNights": parseInt(item.rf_nightsTextBox),
                     "Cost": parseInt(item.rf_costNightsTextBox),
                 }
             this.push(tempDoc);
             //console.log(item);
         }, doc);
         // console.log(doc);
         return doc;
     }

     function getCarRent() {
         var doc =
         {
             'DocId': currentDocId,
             'FromDate': convertDate(scope.rf_FromDateCarRent),
             'ToDate': convertDate(scope.rf_ToDateCarRent),
             'TotalDays': scope.rf_daysCarRentTextBox,
             'Cost': scope.rf_costPerDayCarRent
         }

         return doc;
     }

     function getFlightsDoc() {
         var doc = [];
         debugger;
         angular.forEach(scope.flights, function (item) {
             var tempDoc =
                 {
                     "DocId": currentDocId,
                     "FlightDate": convertDate(item.rf_date),
                     "Class": item.rf_departmentTextBox,
                     "Cost": parseInt(item.rf_costTextBox),
                     "CountryCodeDest": item.rf_destinationTextBox.CountryCode
                 }
             this.push(tempDoc);
         }, doc);
         return doc;
     }

     //function replaceTeachDocToJson(DocId) {
     //    //  console.log(DocId);
     //    //console.log(scope.courses);
     //    var doc = [];
     //    angular.forEach(scope.courses, function (item) {
     //        var tempDoc =
     //            {
     //                "DocId": DocId,
     //                "CourseName": item.courseNameTextBox,
     //                "Date": convertDate(item.courseDay),
     //                "FromHour": convertTime(item.courseReplaceFromTime),
     //                "ToHour": convertTime(item.courseReplaceToTime),
     //                "CompleteBy": item.courseReplaseComplete
     //            }
     //        this.push(tempDoc);
     //        //console.log(item);
     //    }, doc);
     //    // console.log(doc);
     //    return doc;
     //}

     function convertDate(dateToConvert) {
         var date = $filter('date')(dateToConvert, 'yyyy-MM-dd');
         return date;
     }

     function createMainReturnForn() {
         console.log(currentDocId);
         debugger;
         var flights = checkIfFill(scope.flights);
         var acoAb = checkIfFill(scope.nights);
         var sE = checkIfFill(scope.rf_FromDateStaingCost);
         var returnJson = {
             'DocId': currentDocId,
             'UserId': user.Id,
             'ConcentrationExpenses': flights,
             'AccommodationAbroad': acoAb,
             'StayExpense': sE,
             'CarRent': checkIfFill(scope.rf_FromDateCarRent),
             'OtherOxpense': checkIfFill(scope.exps)
         }
         return returnJson;
     }

     function checkIfFill(textkBox) {
         if (textkBox == '' || textkBox == undefined) {
             return 'N';
         }
         else {
             return 'Y';
         }
     }
 })
    .controller("getHistoryController", function ($scope, loginService, $http, $window) {
        var scope = $scope;
        scope.init = function () {
            console.log("get history");
            scope.getHistoryShow = true;
            var user = JSON.parse(localStorage.getItem(('user')));
            getCloseDocs(user, 1);
        }

        function getCloseDocs(user, isMyDoc) {
            var url;
            if (isMyDoc == 1) {
                url = 'http://localhost:8080/api/applydocuments/docs/' + user.Id + '/close';
            }
            else {
                if (user.ApplicationRoleId == 1 || user.ApplicationRoleId == 4 || user.ApplicationRoleId == 5) {
                    url = 'http://localhost:8080/api/applydocuments/docs/close';
                }
                else if (data.ApplicationRoleId == 2) {
                    url = 'http://localhost:8080/api/applydocuments/docs/' + user.Id + '/close';
                }
            }
            var index = 0;
            var res = loginService.getDocs(url);
            scope.formsFromDbToShow = [];
            res.then(function (val) {
                angular.forEach(val, function (obj) {
                    //console.log(obj);
                    var docId = obj.DocId;
                    var id = obj.UserId;
                    var name;
                    var thisUser = loginService.getUserById(obj.UserId);
                    thisUser.then(function (val) {
                        name = val.FirstName + ' ' + val.LastName;
                        scope.formsFromDbToShow.push({ "Id": id, "name": name, "DocId": docId });
                    })
                })
                scope.formsTablesShow = true;
            })
        }

        function getAllDocs(data) {
            console.log(data);
            var url;
            if (data.ApplicationRoleId == 1 || data.ApplicationRoleId == 4 || data.ApplicationRoleId == 5) {
                url = 'http://localhost:8080/api/applydocuments/docs/open';
            }
            else if (data.ApplicationRoleId == 2) {
                url = 'http://localhost:8080/api/applydocuments/docs/' + data.Id;
            }
            //url = 'http://localhost:8080/api/ApplyDocuments/docs/' + data.Id + '/close';
            //var myEl = angular.element(document.querySelector('#dashboardOpensFormsRequest'));
            //myEl.empty();
            var index = 0;
            var res = loginService.getDocs(url);
            scope.formsFromDbToShow = [];
            res.then(function (val) {
                //console.log(val);
                angular.forEach(val, function (obj) {
                    //console.log(obj);
                    var docId = obj.DocId;
                    var id = obj.UserId;
                    var name;
                    var thisUser = loginService.getUserById(obj.UserId);
                    thisUser.then(function (val) {
                        name = val.FirstName + ' ' + val.LastName;
                        scope.formsFromDbToShow.push({ "Id": id, "name": name, "DocId": docId });
                    })
                })
                scope.formsTablesShow = true;
                //scope.allDocsShow = true;
            })
        }
    })
    .controller("deleteUser", function ($scope, loginService, $http, $window) {
        var scope = $scope;
        var temp = null;
        scope.usersFromDbToShow = [];
        scope.init = function () {
            console.log("delete user init");
            $http.get('http://localhost:8080/api/users/')
                  .success(function (response) {
                      angular.forEach(response, function (val) {
                          //console.log(val);
                          scope.usersFromDbToShow.push(makeUserJson(val));
                      })
                  });
            scope.deleteUser = true;
            scope.deleteUsersTablesShow = true;



        }

        scope.changeUserStatus = function (user) {
            //console.log(user.UserEnable);
            if (user.UserEnable == 'פעיל') {
                lockUser(user);
            }
            else if (user.UserEnable == 'חסום') {
                unlockUser(user);
            }
        }

        function unlockUser(user) {
            swal({
                title: "אזהרה",
                text: "אתה עומד לאפשר ל - " + user.FirstName + " " + user.LastName + " כניסה למערכת",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonColor: '#d33',
                confirmButtonText: "הפעל",
                closeOnConfirm: false,
                cancelButtonText: 'ביטול',
            },
      function () {
          user.UserEnable = 1;
          console.log(user);
          var config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
          $http.put('http://localhost:8080/api/Users/' + user.Id, user, config)
                 .success(function (response) {
                     console.log(response);
                     swal("המשתמש שוחרר", "שיחררת משתמש זה בהצלחה", "success");
                     $window.location.reload();
                 })
      });
        }

        function lockUser(user) {
            swal({
                title: "אזהרה",
                text: "!אתה עומד לחסום את " + user.FirstName + " " + user.LastName + " מהמערכת",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonColor: '#d33',
                confirmButtonText: "חסום",
                closeOnConfirm: false,
                cancelButtonText: 'ביטול',
            },
       function () {
           $http.delete('http://localhost:8080/api/Users/' + user.Id)
                  .success(function (response) {
                      console.log(response);
                      swal("המשתמש נחסם", "חסמת משתמש זה בהצלחה", "success");
                      $window.location.reload();
                  })
       });
        }

        scope.updateUserStatusDynam = function (user) {
            if (user.UserEnable == 'פעיל') {
                //console.log('dd');
                return { updateUserStatusDynamLock: user };
            }
            else {
                return { updateUserStatusDynamUnlock: user };
            }
        }

        function makeUserJson(user) {
            var UserEnable;
            var UserChangeTo;
            if (user.UserEnable == true) {
                UserEnable = 'פעיל';
                UserChangeTo = 'חסום משתמש';
                //scope.updateUserStatusDynam = "updateUserStatusDynamLock";
            }
            else {
                UserEnable = 'חסום';
                UserChangeTo = 'הפעל משתמש';
                //scope.updateUserStatusDynam = "updateUserStatusDynamUnlock";
            }

            var jUser = {
                "FirstName": user.FirstName,
                "LastName": user.LastName,
                "Id": user.Id,
                "UserEnable": UserEnable,
                "UserChangeTo": UserChangeTo,
                "ApplicationRoleId": user.ApplicationRoleId,
                "CellNum": user.CellNum,
                "DepartmentId": user.DepartmentId,
                "EmailAddress": user.EmailAddress,
                "FacultyId": user.FacultyId,
                "Password": user.Password,
                "PercentageJob": user.PercentageJob,
                "Role": user.Role
            }
            return jUser;
        }

        scope.showTemp = function () {
            console.log(temp);
        }
    })
    .controller("newFormController", function ($scope, loginService, $window, $location, $http, $filter) {
        var scope = $scope;

        $scope.init = function () {
            console.log("new form init");
            scope.newFormShow = true;
            scope.destinationClass = 'otherPages';
            scope.privateDetailsClass = 'currentPage';
            // console.log($location.path().split(/[\s/]+/).pop());
            var user = loginService.getData();
            scope.title = "Open New Form";
            scope.flightsTableShow = false;
            scope.coursesTableShow = false;
            scope.testsTableShow = false;
            scope.allDocsShow = false;
            //scope.allDocsShow = false;
            if (user == null) {
                $window.location = "index.html";
            }
            else {
                if (loginService.getSignerFlag() == 1) {
                    //console.log(loginService.getSignerFlag());
                    var userDoc = loginService.getResponse();
                    //console.log(userDoc);

                    console.log(" ....");
                    userDoc.then(function (x) {
                        console.log(x);
                        loginService.setDocId(x.DocId);
                        scope.firstNameTextBox = x.User.FirstName;
                        scope.idTextBox = x.User.Id;
                        scope.lastNameTextBox = x.User.LastName;
                        var faculty = loginService.getFaculty(x.User.FacultyId);
                        faculty.then(function (val) {
                            //console.log(val);
                            scope.facultyTextBox = val.FacultyName;
                        })
                        //scope.facultyTextBox = x.User.Faculty1.FacultyName;
                        scope.departmentTextBox = x.User.Department1.DepartmentName;
                        scope.positionTextBox = x.User.Role;
                        scope.jogPercentTextBox = x.User.PercentageJob;
                        scope.phoneTextBox = x.User.CellNum;
                        scope.mailTextBox = x.User.EmailAddress;
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
                            scope.sumNoEshel = 1;
                            scope.sumDaysNoEshel = 1;
                            scope.sumDaysEshel = 1;
                            scope.lastFlightFromShenkar = new Date('07/10/2017');
                            //dest.data[0].FromDate = convertDate(dest.data[0].FromDate);
                            scope.flightsToShow = dest.data;
                            //console.log(scope.flightsToShow);
                            //scope.flightDetailsFromDate = returnToOriginalDateFormat(dest.data[0].FromDate);
                            scope.flightsTableShow = true;

                        })


                        var coursesFromDb = loginService.getCoursesByDocId(x.DocId);
                        coursesFromDb.then(function (courseReplace) {
                            //console.log(courseReplace.data);
                            angular.forEach(courseReplace.data, function (value) {
                                value.Date = convertDate(value.Date);
                            })
                            scope.coursesTableShow = true;
                            scope.coursesFromDbToShow = courseReplace.data;
                            scope.courses = [];
                        })

                        var testsFromDb = loginService.getTestsByDocId(x.DocId);
                        testsFromDb.then(function (testsReplase) {
                            //console.log(testsReplase.data);
                            angular.forEach(testsReplase.data, function (value) {
                                value.TestDate = convertDate(value.TestDate);
                            })
                            scope.testsTableShow = true;
                            scope.testsFromDbToShow = testsReplase.data;
                            scope.testsGroup = [];
                        })
                        scope.isTeaching = x.TeacheDuringTravel;
                        scope.tests = x.ReplacingInTests;
                        scope.travelDetailsDuration = x.AboveWeek;
                        scope.travelDetailsFlightNum = x.MoreThenOneTravel;
                        scope.travelDetailsFirstTestMissing = x.AbsenceTestA;
                        scope.travelDetailsConvention = x.ResearchTraining;
                        scope.travelDetailsExplainTextErea = x.ExceptionRequstExplain;
                        scope.userSignCheckBox = true;


                        //disabled all sign field exept the current signer
                        var signUsers = loginService.getAllSignUsers();
                        //console.log(signUsers);
                        scope.signs = [];
                        signUsers.then(function (signRes) {
                            // console.log(signRes.data);
                            var user = JSON.parse(localStorage.getItem(('user')));
                            var i = 1;
                            var dis;
                            angular.forEach(signRes.data, function (value) {
                                var name = value.FirstName + ' ' + value.LastName;
                                var id = value.Id;
                                if (id == user.Id) {
                                    dis = false;
                                }
                                else {
                                    dis = true;
                                }
                                //var temp = "Sign" + pars.toString();
                                var text = '';
                                var check = '';
                                scope.signs.push({ "name": name, "id": check, "dis": dis, "text": text, "DocId": x.DocId });
                            })
                            //angular.forEach(scope.signs, function (sign) {
                            //           console.log(sign);
                            //           if (sign.id == id) {

                            //               sign.dis = false;
                            //           }
                            //       })
                            //scope.signs[0].dis = false;
                            //console.log(scope.signs.length);

                        })
                        // console.log(scope.signs);
                        //checkHwoIsTheSigner(signUser);
                        //disabled all fields in the main form
                        disableFields(user);


                    })
                    console.log(userDoc);
                }
                else {
                    //fill form state
                    // console.log(loginService.getSignerFlag());
                    //console.log(user);
                    scope.firstNameTextBox = user.FirstName;
                    scope.lastNameTextBox = user.LastName;
                    scope.idTextBox = user.Id;
                    var faculty = loginService.getFaculty(user.FacultyId);
                    faculty.then(function (val) {
                        //console.log(val);
                        scope.facultyTextBox = val.FacultyName;
                    })
                    //scope.facultyTextBox = user.Faculty1.FacultyName;
                    scope.departmentTextBox = user.Department1.DepartmentName;
                    scope.positionTextBox = user.Role;
                    scope.jogPercentTextBox = user.PercentageJob;
                    scope.phoneTextBox = user.CellNum;
                    scope.mailTextBox = user.EmailAddress;
                    scope.signerButtonDisabled = true;
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

        //function checkHwoIsTheSigner(signUser) {
        //    var user = JSON.parse(localStorage.getItem(('user')));
        //    var id = user.Id;
        //    console.log(scope.signs.length);
        //    angular.forEach(scope.signs, function (sign) {
        //        console.log(sign);
        //        if (sign.id == id) {

        //            sign.dis = false;
        //        }
        //    })
        //    //signUser.then(function (su) {
        //    //    //console.log(su.data);
        //    //    angular.forEach(su.data, function (value) {
        //    //        if (value.Id == id) {
        //    //            angular.forEach(scope.signs,function(sign){
        //    //                if(sign.id ==id){
        //    //                    sign.dis=false;
        //    //                }
        //    //            })
        //    //            //console.log("@@@");
        //    //            //console.log(value);
        //    //            //console.log(value.dis);
        //    //            //console.log(scope.signs[0]);
        //    //           // scope.signs[1].dis=false;
        //    //        }
        //    //    })

        //    //})
        //}

        function disableFields(user) {
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
            scope.testsDisabled = true;
            scope.travelDetailsConventionDisabled = true;
            scope.travelDetailsDurationDisabled = true;
            scope.travelDetailsFlightNumDisabled = true;
            scope.travelDetailsFirstTestMissingDisabled = true;
            scope.travelDetailsExplainTextEreaDisabled = true;
            scope.submitFormButtonDisabled = true;
            scope.userSignCheckBoxDisabled = true;
            //scope.headOfDepartmentDisabled = true;
            // scope.addClassDisable = true;
            if (loginService.checkRoll(user) == 4 || loginService.checkRoll(user) == 5) {
                scope.signerButtonDisabled = false;
            }
            else {
                scope.signerButtonDisabled = true;
            }
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

        scope.sendSignerData = function () {
            var docId = loginService.getDocId();
            var doc = loginService.getDocByDocId(docId);
            var user = JSON.parse(localStorage.getItem(('user')));
            doc.then(function (value) {
                console.log(value.data);
                if (user.ApplicationRoleId == 5) {
                    if (scope.heads[0].id == null) {
                        value.data.DepartmentHeadSign = null;
                    }
                    else if (scope.heads[0].id * 1 == 0) {
                        value.data.DepartmentHeadSign = 0;
                    }
                    else if (scope.heads[0].id * 1 == 1) {
                        value.data.DepartmentHeadSign = 1;
                    }
                    else {
                        value.data.DepartmentHeadSign = parseInt(scope.heads[0].id);
                    }
                }
                var allSigners = loginService.getAllSignUsers(docId);
                allSigners.then(function (signer) {
                    var count = signer.data.length;
                    //console.log(scope.signs[2].id * 1);
                    //console.log(parseInt(scope.signs[2].id) * 1);
                    for (var i = 1; i <= count; i++) {
                        switch (i) {
                            case 1:
                                if (scope.signs[0].id == null) {
                                    break;
                                }
                                if (scope.signs[0].id * 1 == 0) {
                                    value.data.Sign1 = 0;
                                }
                                else if (scope.signs[0].id * 1 == 1) {
                                    value.data.Sign1 = 1;
                                }
                                else {
                                    value.data.Sign1 = parseInt(scope.signs[0].id);
                                }
                                //value.data.Sign1 = parseInt(scope.signs[0].id);
                                value.data.Reason1 = scope.signs[0].text;
                                break;
                            case 2:
                                if (scope.signs[1].id == null) {
                                    break;
                                }
                                if (scope.signs[1].id * 1 == 0) {
                                    value.data.Sign2 = 0;
                                }
                                else if (scope.signs[1].id * 1 == 1) {
                                    value.data.Sign2 = 1;
                                }
                                else {
                                    value.data.Sign2 = parseInt(scope.signs[1].id);
                                }
                                //value.data.Sign2 = parseInt(scope.signs[1].id);
                                value.data.Reason2 = scope.signs[1].text;
                                break;
                            case 3:
                                if (scope.signs[2].id == null) {
                                    break;
                                }
                                if (scope.signs[2].id * 1 == 0) {
                                    value.data.Sign3 = 0;
                                }
                                else if (scope.signs[2].id * 1 == 1) {
                                    value.data.Sign3 = 1;
                                }
                                else {
                                    value.data.Sign3 = parseInt(scope.signs[2].id);
                                }
                                //value.data.Sign3 = parseInt(scope.signs[2].id);
                                value.data.Reason3 = scope.signs[2].text;
                                break;
                            case 4:
                                if (scope.signs[3].id == null) {
                                    break;
                                }
                                if (scope.signs[3].id * 1 == 0) {
                                    value.data.Sign4 = 0;
                                }
                                else if (scope.signs[3].id * 1 == 1) {
                                    value.data.Sign4 = 1;
                                }
                                else {
                                    value.data.Sign4 = parseInt(scope.signs[3].id);
                                }
                                //value.data.Sign4 = parseInt(scope.signs[3].id);
                                value.data.Reason4 = scope.signs[3].text;
                            case 5:
                                if (scope.signs[4].id == null) {
                                    break;
                                }
                                if (scope.signs[4].id * 1 == 0) {
                                    value.data.Sign5 = 0;
                                }
                                else if (scope.signs[4].id * 1 == 1) {
                                    value.data.Sign5 = 1;
                                }
                                else {
                                    value.data.Sign5 = parseInt(scope.signs[4].id);
                                }
                                //value.data.Sign5 = parseInt(scope.signs[4].id);
                                value.data.Reason5 = scope.signs[4].text;
                                break;
                        }
                    }
                    var res = loginService.setSign(value.data, docId);
                    if (res != null) {
                        swal("!תודה", "חתימתך נקלטה במערכת", "success");
                        res.then(function (re) {
                            //console.log(re.data);
                            loginService.setResponse(re.data);
                        })
                        //backHome();
                    }
                    else {
                        swal("שגיאה", "הטופס לא נקלט במערכת", "error");
                    }
                    //angular.forEach(signer, function (sign) {

                    //})


                })
                //value.data.Sign1 =parseInt(scope.signs[1].id);
                //value.data.Reason1 = scope.signs[1].text;
                //var res = loginService.setSign(value.data, docId);
                //if (res != null) {
                //    swal("!תודה", "חתימתך נקלטה במערכת", "success");
                //    res.then(function (re) {
                //        console.log(re.data);
                //        loginService.setResponse(re.data);
                //    })
                //    backHome();
                //}
                //else {
                //    swal("שגיאה", "הטופס לא נקלט במערכת", "error");
                //}
            })
            // console.log(scope.signs);
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

        function backHome() {
            scope.allDocsShow = true;
            $window.location = '/#index';
            $window.location.reload();
        }

        function setConferenceDays() {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = scope.startDate;
            var secondDate = scope.endDate;
            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
            console.log(diffDays);
            scope.conferenceDays = diffDays +1;
        }

        scope.showDestinationForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = true;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.testForm = false;
            scope.signsForm = false;
            scope.destinationClass = 'currentPage';
            scope.privateDetailsClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.signsFormClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';

        }

        scope.showprivateDetailsForm = function () {
            scope.newFormShow = true;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.testForm = false;
            scope.signsForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'currentPage';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.signsFormClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
        }

        scope.showflightDetailsForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.userStatmentForm = false;
            scope.travelDetailsForm = false;
            scope.flightDetailsForm = true;
            scope.testForm = false;
            scope.signsForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'currentPage';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.signsFormClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
        }

        scope.showStatmentForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = true;
            scope.travelDetailsForm = false;
            scope.testForm = false;
            scope.signsForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'currentPage';
            scope.testReplaceClass = 'otherPages';
            scope.signsFormClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
            if (scope.isTeachingDisabled != true) {
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
            scope.signsForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
            scope.signsFormClass = 'otherPages';
            scope.testReplaceClass = 'currentPage';
            if (scope.testsDisabled != true) {
                if (!(checkIsTeaching(scope.tests))) {
                    scope.addTestDisable = true;
                    scope.testsGroup = [];
                }
                else {
                    if (scope.testsGroup.length == 7) {
                        scope.addTestDisable = true;
                    }
                    else {
                        scope.addTestDisable = false;
                    }
                }
            }

            else {
                scope.addTestDisable = true;
            }
        }

        scope.showtravelDetails = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.testForm = false;
            scope.travelDetailsForm = true;
            scope.signsForm = false;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.signsFormClass = 'otherPages';
            scope.travelDetailsClass = 'currentPage';
        }

        scope.showsignsForm = function () {
            scope.newFormShow = false;
            scope.destinationForm = false;
            scope.flightDetailsForm = false;
            scope.userStatmentForm = false;
            scope.testForm = false;
            scope.travelDetailsForm = false;
            scope.signsForm = true;
            scope.destinationClass = 'otherPages';
            scope.flightDetailsClass = 'otherPages';
            scope.privateDetailsClass = 'otherPages';
            scope.statmentClass = 'otherPages';
            scope.testReplaceClass = 'otherPages';
            scope.travelDetailsClass = 'otherPages';
            scope.signsFormClass = 'currentPage';
            scope.signs = [];
            scope.heads = [];
            //scope.signs.push({ "name": "ינון", "id": "1", "dis": false }, { "name": "נתי", "id": "2", "dis": false }, { "name": "יניב", "id": "3", "dis": false }, { "name": "גינדוס", "id": "4", "dis": false },{ "name": "ליאור", "id": "5", "dis": false });
            //console.log(scope.signs);
            var signUsers = loginService.getAllSignUsers();

            //console.log(signUsers);
            signUsers.then(function (signRes) {
                var user = JSON.parse(localStorage.getItem(('user')));


                var DocId = loginService.getDocId();
                if (DocId != null) {
                    var doc = loginService.getDocByDocId(DocId);
                    doc.then(function (value) {
                        var i = 1;
                        console.log(value);
                        //head of department
                        var headOfDep = loginService.getHeadOfDepartment(value.data.User.Id);
                        headOfDep.then(function (val) {
                            console.log(val);
                            var name = val.FirstName + ' ' + val.LastName;
                            if (val.Id == user.Id) {
                                var dis = false;
                            }
                            else {
                                var dis = true;
                            }
                            var id = value.data.DepartmentHeadSign;
                            var text = '';
                            scope.heads.push({ "name": name, "id": id, "dis": dis, "text": text, "DocId": DocId });
                        })
                        //signers
                        angular.forEach(signRes.data, function (val) {
                            var name = val.FirstName + ' ' + val.LastName;
                            var id;
                            var text;
                            if (val.Id == user.Id) {
                                var dis = false;
                            }
                            else {
                                var dis = true;
                            }
                            switch (i) {
                                case 1:
                                    id = value.data.Sign1;
                                    text = value.data.Reason1;
                                    i++;
                                    break;
                                case 2:
                                    id = value.data.Sign2;
                                    text = value.data.Reason2;
                                    i++;
                                    break;
                                case 3:
                                    id = value.data.Sign3;
                                    text = value.data.Reason3;
                                    i++;
                                    break;
                                case 4:
                                    id = value.data.Sign4;
                                    text = value.data.Reason4;
                                    i++;
                                    break;
                                case 5:
                                    id = value.data.Sign5;
                                    text = value.data.Reason5;
                                    i++;
                                    break;
                            }
                            scope.signs.push({ "name": name, "id": id, "dis": dis, "text": text, "DocId": DocId });
                        })
                    })
                }
                else {
                    var headOfDep = loginService.getHeadOfDepartment(user.Id);
                    headOfDep.then(function (val) {
                        var name = val.FirstName + ' ' + val.LastName;
                        if (val.Id == user.Id) {
                            var dis = false;
                        }
                        else {
                            var dis = true;
                        }
                        var id = val.Id;
                        var text = '';
                        scope.heads.push({ "name": name, "id": id, "dis": dis, "text": text, "DocId": DocId });
                    })

                    angular.forEach(signRes.data, function (value) {
                        var name = value.FirstName + ' ' + value.LastName;
                        var id = value.Id;
                        if (id == user.Id) {
                            var dis = false;
                        }
                        else {
                            var dis = true;
                        }
                        var text = '';
                        scope.signs.push({ "name": name, "id": id, "dis": dis, "text": text, "DocId": DocId });
                    })
                }


            })
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
            if (scope.testsGroup.length < 7) {
                scope.addTestDisable = false;
            }
        }

        scope.addNewTest = function () {
            console.log("add test");
            if (scope.testsGroup.length == 6) {
                scope.testsGroup.push({});
                scope.addTestDisable = true;
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
            if (mainFormValidCheck()) {
                return;
            }
            var ApplyDocument = apllyDocumentToJson();
            console.log(ApplyDocument);
            // scursor: wait;
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
                        else {
                            var flightDoc = flightDocToJson(response[0].DocId);
                            $http.post('http://localhost:8080/api/DestinationPeriods', flightDoc, config)
                                .success(function (response) {
                                    console.log(response);
                                    swal("!תודה", "הטופס נשמר בהצלחה", "success");
                                })
                        }

                    })
                }
                else {
                    if (scope.tests == "1") {
                        console.log("++" + response.DocId + "++");
                        var replaceTestDoc = replaceTestDocToJson(response.DocId);
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
                    else {
                        var flightDoc = flightDocToJson(response.DocId);
                        $http.post('http://localhost:8080/api/DestinationPeriods', flightDoc, config)
                            .success(function (response) {
                                console.log(response);
                                swal("!תודה", "הטופס נשמר בהצלחה", "success");
                            })
                    }
                }
            })


        }
        //*****************send new form*****************

        function mainFormValidCheck() {
            //if (scope.course.courseReplaseComplete == null || scope.course.courseReplaseComplete == '') {
            //    swal("נא למלא מחליף", "חסר מחליף", "error");
            //    return 1;
            //}
            if (scope.userSignCheckBox == null || scope.userSignCheckBox == false) {
                swal("דרושה חתימה", "נא אשר את הטופס בתיבה המתאימה", "error");
                return 1;
            }
        }

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
                    "ApplyDate": convertDate(scope.startDate),//לשנות לתאריך של היום
                    "DocStatus": 1
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

        var Rolse = loginService.getAppRoles();
        Rolse.then(function (val) {
            //console.log(val);
            scope.appRoles = val;
        })

        var departments = loginService.getAllDepartments();
        departments.then(function (val) {
            scope.deprtmentsList = val;
        })

        var faculties = loginService.getAllFaculty();
        faculties.then(function (val) {
            //console.log(val);
            scope.facultyList = val;
        })

        scope.showRole = function (role) {
            //console.log(role.Id);
        }

        scope.createUser = function () {
            createUserValidCheck();
            var user = createUserJson();
            console.log(user);
            var response = loginService.createUser(user);
            if (response != null) {
                //swal({
                //    title: 'יצרת משתמש חדש בהצלחה',
                //    text: 'המשתמש נוצר  ',
                //    type: 'success',
                //    timer: 2000
                //    //}).then(function (dismiss) {
                //    //          if (dismiss === 'timer') {
                //    //              console.log('I was closed by the timer')
                //    //          }
                //    //      }
                //}).then(function () {
                //    console.log("hhhi");
                //})


                swal("המשתמש נוצר", "יצרת משתמש חדש בהצלחה", "success");
                clearFields();

            }
            else {
                swal("השמירה נכשלה", "המשתמש לא נשמר במערכת", "error");
            }
            console.log(response);
        }

        function clearFields() {
            scope.createUserIdTextBox = null;
            scope.createUserPasswordTextBox = null;
            scope.createUserEmailTextBox = null;
            scope.createUserFirstNameTextBox = null;
            scope.createUserLastNameTextBox = null;
            //scope.roleOptions = null;
            scope.PercentageJob = null;
            scope.CellNumTextBox = null;
        }

        function createUserValidCheck() {
            if (createUserCheckId()) {
                return;
            }
            if (createUserCheckMail()) {
                return
            }
            if (createUserCheckPhone()) {
                return;
            }
            if (createUserCheckPercentageJob()) {
                return;
            }
        }

        function createUserCheckPercentageJob() {
            if (scope.PercentageJob > 0 || PercentageJob <= 100) {
                return 0;
            }
            swal("אחוז משרה לא חוקי", "יש להזין אחוז משרה חוקי ", "error");
            return 1
        }

        function createUserCheckPhone() {
            var validPhone = /^\[\+]\d{3}[0-9]{9}|05[0,2,4,8][0-9]{7}|077[0-9]{7}|0[2,3,4,8,9][0-9]{7}/;
            if (scope.CellNumTextBox.match(validPhone)) {
                return 0
            }
            swal("מספר טלפון לא חוקי", "יש להזין מספר טלפון חוקי ", "error");
            return 1

        }

        function createUserCheckId() {
            if ((isNaN(scope.createUserIdTextBox)) || (scope.createUserIdTextBox == null)) {
                console.log(scope.createUserIdTextBox);
                swal("תעודת זהות לא חוקית", "יש להזין מספרים בלבד ", "error");
                return 1;
            }
        }

        function createUserCheckMail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(scope.createUserEmailTextBox)) {
                return 0
            }
            swal("מייל לא חוקי", "יש להזין כתובת מייל חוקית ", "error");
            return 1
        }

        function createUserJson() {
            var user =
                    {
                        "Id": scope.createUserIdTextBox,
                        "Password": scope.createUserPasswordTextBox,
                        "EmailAddress": scope.createUserEmailTextBox,
                        "FirstName": scope.createUserFirstNameTextBox,
                        "LastName": scope.createUserLastNameTextBox,
                        "Role": scope.roleOptions.Description,
                        "PercentageJob": parseInt(scope.PercentageJob),
                        "CellNum": scope.CellNumTextBox,
                        "DepartmentId": scope.departmentsOptions.Id,
                        "FacultyId": scope.facultyOptions.Id,
                        "ApplicationRoleId": scope.roleOptions.Id,
                        "UserEnable": 1,
                    }
            return user;
        }
    })
    .controller("index", function ($scope, $http, $window, loginService, $location, $q) {
        var scope = $scope;
        scope.goHome = function () {

            var user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                scope.title = "Home";
                getAllDocs(user);
                if (scope.formsFromDbToShow.lengt == 0) {
                    scope.noDocMsgShow = true;
                }
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
                           scope.signOutButtonShow = true;
                           //$window.location.href = '/index.html';                    
                           // swal(json.stringify(response));
                       }
                       if (loginService.checkRoll(response) == 1) {
                           console.log("admin");
                           scope.adminGetHistoryButton = true;
                           scope.adminCreateUserButton = true;
                           scope.adminDeleteUserButton = true;
                           scope.openNewFormButtonShow = true;
                           scope.getHistoryButtonShow = true;
                           scope.adminReturnFormButton = false;
                       }

                       else if (loginService.checkRoll(response) == 4) {
                           scope.adminGetHistoryButton = false;
                           scope.adminCreateUserButton = false;
                           scope.adminDeleteUserButton = false;
                           scope.openNewFormButtonShow = false;
                           scope.getHistoryButtonShow = false;
                           scope.adminReturnFormButton = false;
                       }
                       else if (loginService.checkRoll(response) == 2) {
                           scope.adminGetHistoryButton = false;
                           scope.adminCreateUserButton = false;
                           scope.adminDeleteUserButton = false;
                           scope.openNewFormButtonShow = true;
                           scope.getHistoryButtonShow = true;
                           scope.adminReturnFormButton = true;
                       }
                       else if (loginService.checkRoll(response) == 5) {
                           scope.adminGetHistoryButton = false;
                           scope.adminCreateUserButton = false;
                           scope.adminDeleteUserButton = false;
                           scope.openNewFormButtonShow = true;
                           scope.getHistoryButtonShow = true;
                           scope.adminReturnFormButton = true;

                       }
                       //get all apply documents
                       getAllDocs(response);
                       if (scope.formsFromDbToShow.lengt == 0) {
                           scope.noDocMsgShow = true;
                       }
                       scope.allDocsShow = true;

                   })
                .error(function (response) {
                    swal("שגיאה", "שם משתמש או סיסמה שגויים", "error");
                });
        }

        function getAllDocs(data) {
            console.log(data);
            var url;
            if (data.ApplicationRoleId == 1 || data.ApplicationRoleId == 4 || data.ApplicationRoleId == 5) {
                url = 'http://localhost:8080/api/applydocuments/docs/open';
            }
            else if (data.ApplicationRoleId == 2) {
                url = 'http://localhost:8080/api/applydocuments/docs/' + data.Id + '/open';
            }
            //var myEl = angular.element(document.querySelector('#dashboardOpensFormsRequest'));
            //myEl.empty();
            var index = 0;
            var res = loginService.getDocs(url);
            console.log(res);
            scope.formsFromDbToShow = [];
            res.then(function (val) {
                console.log(val);
                angular.forEach(val, function (obj) {
                    //console.log(obj);
                    var docId = obj.DocId;
                    var id = obj.UserId;
                    var name;
                    var thisUser = loginService.getUserById(obj.UserId);
                    thisUser.then(function (val) {
                        name = val.FirstName + ' ' + val.LastName;
                        scope.formsFromDbToShow.push({ "Id": id, "name": name, "DocId": docId });
                    })
                })
                scope.formsTablesShow = true;
                scope.allDocsShow = true;
                scope.noDocMsgShow = false;

            })
            //$http.get(url)
            //.success(function (response) {
            //    //console.log(response);
            //    //scope.formsFromDbToShow = response;
            //    //scope.formsTablesShow = true;
            //    //scope.allDocsShow = true;
            ////    var length = response.length;
            //    //scope.noDocsShow = true;
            //    //loginService.setResponse(response);
            //    //angular.forEach(response, function (res) {
            //    //    //console.log(res.UserId);
            //    //    $http.get('http://localhost:8080/api/users/' + res.UserId)
            //    //    .success(function (userDetails) {
            //    //                       var para = document.createElement("a");
            //    //                       para.href = "#/newForm";
            //    //                       //console.log(index);
            //    //                       var node = document.createTextNode(userDetails.Id + ' ' + userDetails.FirstName + ' ' + userDetails.LastName + ' ' + res.DocId);
            //    //                       para.appendChild(node);
            //    //                       para.addEventListener("click", function () { getUserDetails(res.DocId) }, false);
            //    //                       var element = document.getElementById("dashboardOpensFormsRequest");
            //    //                       element.appendChild(para);
            //    //                       para = document.createElement("p");
            //    //                       element.appendChild(para);
            //    //                   })                   
            //    //})
            //})
        }

        scope.getUserDetails = function (id) {
            console.log(id);
            var doc = loginService.getUserDetailsFromService(id);
            loginService.setResponse(doc);
            openForm();
        }
        scope.init = function () {

            //if ($cookies.getObject('cookie') == null) {

            /**********clear local storage - start*********/
            //localStorage.clear();
            /**********clear local storage - end*********/
            if (localStorage.getItem('user') == null) {
                console.log("init");
                scope.title = "Login";
                scope.loginForm = true;
                scope.headerText = false;
                //scope.newForm = false;
                scope.adminGetHistoryButton = false;
                scope.aside = false;
                scope.createUserForm = false;
                scope.isDatePickerOpen = false;
                scope.adminCreateUserButton = false;
                scope.adminDeleteUserButton = false;
                scope.paging = false;
                scope.signOutButtonShow = false;
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
                scope.signOutButtonShow = true;
                if ($location.path().split(/[\s/]+/).pop() == 'newForm') {
                    if (loginService.checkRoll(user) == 4) {
                        $location.path('/#index');
                    }
                    console.log('ggff');
                    scope.paging = true;
                    scope.allDocsShow = false;
                    scope.formsTablesShow = false;
                    scope.title = "Open New Form";
                }
                else if ($location.path().split(/[\s/]+/).pop() == 'createUserForm') {
                    scope.title = "Create User";
                    scope.paging = false;
                }
                else if ($location.path().split(/[\s/]+/).pop() == 'index') {
                    // getAllDocs(user);
                    scope.allDocsShow = true;
                    scope.paging = false;
                    scope.formsTablesShow = true;
                    getAllDocs(user);
                    scope.allDocsShow = true;
                }

                else {
                    scope.paging = false;
                }

                if (loginService.checkRoll(user) == 1) {
                    console.log("admin");
                    scope.adminGetHistoryButton = true;
                    scope.adminCreateUserButton = true;
                    scope.adminDeleteUserButton = true;
                    scope.openNewFormButtonShow = true;
                    scope.getHistoryButtonShow = true;
                    scope.adminReturnFormButton = false;
                }
                else if (loginService.checkRoll(user) == 4) {
                    scope.adminGetHistoryButton = false;
                    scope.adminCreateUserButton = false;
                    scope.adminDeleteUserButton = false;
                    scope.openNewFormButtonShow = false;
                    scope.getHistoryButtonShow = false;
                    scope.adminReturnFormButton = false;

                }
                else if (loginService.checkRoll(user) == 2) {
                    scope.adminGetHistoryButton = false;
                    scope.adminCreateUserButton = false;
                    scope.adminDeleteUserButton = false;
                    scope.openNewFormButtonShow = true;
                    scope.getHistoryButtonShow = true;
                    scope.adminReturnFormButton = true;

                }
                else if (loginService.checkRoll(user) == 5) {
                    scope.adminGetHistoryButton = false;
                    scope.adminCreateUserButton = false;
                    scope.adminDeleteUserButton = false;
                    scope.openNewFormButtonShow = true;
                    scope.getHistoryButtonShow = true;
                    scope.adminReturnFormButton = true;

                }
                //scope.noDocsShow = false;
                //getAllDocs(user);
                //scope.allDocsShow = true;
            }
        }

        scope.openNewForm = function () {
            loginService.setSignerFlag(0);
            openForm();
        }

        scope.getHistory = function () {
            console.log("get history");
            scope.formsTablesShow = false;
            scope.newForm = false;
            scope.paging = false;
            scope.allDocsShow = false;

        }

        scope.getUserHistory = function () {
            console.log("get user history");
            scope.paging = false;
            scope.allDocsShow = false;
            scope.formsTablesShow = false;
        }

        scope.adminCreateUser = function () {
            scope.title = "Create User";
            scope.paging = false;
            scope.allDocsShow = false;
            scope.formsTablesShow = false;
        }

        function openForm() {
            scope.title = "Open New Form";
            scope.paging = true;
            scope.allDocsShow = false;
            scope.formsTablesShow = false;
        }

        scope.signOut = function () {
            //scope.createUserForm = false;
            localStorage.clear();

            $location.path("/#index");
            $window.location.reload();
        }

        scope.adminDeleteUser = function () {
            scope.title = "Delete User";
            scope.allDocsShow = false;
            scope.formsTablesShow = false;
        }

        scope.adminreturnForm = function () {
            scope.title = "Return Form";
            scope.allDocsShow = false;
            scope.formsTablesShow = false;
        }

    });
