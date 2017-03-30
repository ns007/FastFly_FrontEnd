app.service("loginService", function () {
    var loginData = null;

    this.getData = function () {
        return loginData;
    }

    this.setData = function (data) {
        loginData = data;
    }

    this.checkRoll = function (data) {
        if (data.ApplicationRole1.Id == 1) {
            return true;
        }
    }
});