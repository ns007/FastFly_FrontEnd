app.service("loginService", function ($http,$q) {
    var loginData = null;
    var countries = null;
    var res = null;
    var signFlag = null;


    this.getData = function () {
        return loginData;
    }

    this.setData = function (data) {
        loginData = data;
    }

    this.checkRoll = function (data) {
        if (data.ApplicationRoleId == 2) {
            return 2;
        }
        else if(data.ApplicationRoleId == 2){
            return 4;
        }
        
    }

    this.setCountries = function(data){
        countries=data;
    }

    this.getCountries = function () {
        return countries;
    }

    this.getDataFromAPI = function () {
        var defer = $q.defer();
        $http( {method: 'GET',
            url: 'http://localhost:8080/api/users/'})
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
        console.log(id);
        $http.get('http://localhost:8080/api/applydocuments/' + id)
        .success(function (response) {
            defer.resolve(response);            
            //console.log(response);
            //this.setResponse(response);
            //return response;
        })
        return defer.promise;
    }

    
});