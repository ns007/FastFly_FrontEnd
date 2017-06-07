app.service("loginService", function ($http,$q) {
    var loginData = null;
    var countries = null;

    this.getData = function () {
        return loginData;
    }

    this.setData = function (data) {
        loginData = data;
    }

    this.checkRoll = function (data) {
        if (data.ApplicationRoleId == 2) {
            return true;
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

    
});