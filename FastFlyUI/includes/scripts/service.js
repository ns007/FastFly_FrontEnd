app.service("loginService", function () {
    var loginData = null;
    var countries = null;

    this.getData = function () {
        return loginData;
    }

    this.setData = function (data) {
        loginData = data;
    }

    this.checkRoll = function (data) {
        if (data.ApplicationRole1.Id == 2) {
            return true;
        }
    }

    this.setCountries = function(data){
        countries=data;
    }

    this.getCountries = function () {
        return countries;
    }
});