app.service("loginService", function ($http, $q) {
    var loginData = null;
    var countries = null;
    var res = null;
    var signFlag = null;
    var DocId = null;


    this.getData = function () {
        return loginData;
    }

    this.setData = function (data) {
        loginData = data;
    }

    this.checkRoll = function (data) {
        console.log(data.ApplicationRoleId);
        if (data.ApplicationRoleId == 1) {
            return 1;
        }
        else if (data.ApplicationRoleId == 2) {
            return 2;
        }
        else if (data.ApplicationRoleId == 4) {
            return 4;
        }
        else if (data.ApplicationRoleId == 5) {
            return 5;
        }
    }

    this.setCountries = function (data) {
        countries = data;
    }

    this.getCountries = function () {
        return countries;
    }

    this.setDocId = function (id) {
        DocId = id;
    }

    this.getDocId = function () {
        return DocId;
    }

    this.getDataFromAPI = function () {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/users/'
        })
            .success(function (result) {
                defer.resolve(result);
            });
        return defer.promise;
    };

    this.setResponse = function (data) {
        res = data;
    }

    this.getResponse = function () {
        return res;
    }

    this.setSignerFlag = function (flag) {
        signFlag = flag;
    }

    this.getSignerFlag = function () {
        return signFlag;
    }

    this.getUserDetailsFromService = function (id) {
        var defer = $q.defer();
        this.setSignerFlag(1);
        //console.log(id);
        $http.get('http://localhost:8080/api/applydocuments/' + id)
        .success(function (response) {
            defer.resolve(response);
            //console.log(response);
            //this.setResponse(response);
            //return response;
        })
        return defer.promise;
    }

    this.getFlightByDocId = function (docId) {
        return $http.get('http://localhost:8080/api/DestinationPeriods/' + docId)
         .then(function (response) {
             return response;
         })
    }

    this.getCoursesByDocId = function (docId) {
        return $http.get('http://localhost:8080/api/LectureReplacements/' + docId)
         .then(function (response) {
             return response;
         })
    }

    this.getTestsByDocId = function (docId) {
        return $http.get('http://localhost:8080/api/TestReplacements/' + docId)
         .then(function (response) {
             return response;
         })
    }

    this.getDocByDocId = function (docId) {
        return $http.get('http://localhost:8080/api/ApplyDocuments/' + docId)
         .then(function (response) {
             return response;
         })
    }

    this.getAllSignUsers = function (docId) {
        return $http.get('http://localhost:8080/api/Users/signers')
         .then(function (response) {
             return response;
         })
    }

    this.setSign = function (doc, docId) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return $http.put('http://localhost:8080/api/ApplyDocuments/' + docId, doc, config)
        .then(function (response) {
            return response;
        })
        
    }

    this.getAppRoles = function () {
        var defer = $q.defer();
        $http.get('http://localhost:8080/api/ApplicationRoles/')
        .success(function (response) {
            defer.resolve(response);
        })
        return defer.promise;
    }

    this.getAllDepartments = function () {
        var defer = $q.defer();
        $http.get('http://localhost:8080/api/Departments/')
        .success(function (response) {
            defer.resolve(response);
        })
        return defer.promise;
    }

    this.getAllFaculty = function () {
        var defer = $q.defer();
        $http.get('http://localhost:8080/api/Faculties/')
        .success(function (response) {
            defer.resolve(response);
        })
        return defer.promise;
    }

    this.createUser = function (user) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return $http.post('http://localhost:8080/api/Users/',user, config)
        .then(function (response) {
            return response;
        })
    }

});