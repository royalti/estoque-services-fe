angular.module("estoqueServices").controller("estoqueServicesCtrl", function ($scope, $interval, $http) {
    var hoje = new Date();
    var dia = hoje.getDate();
    var mes = hoje.getMonth()+1;
    var ano = hoje.getFullYear();
    ano = parseInt(ano.toString().substr(2,2));

    var senha = dia * mes * ano * 3;

    $scope.senha = senha;
    $scope.ordensDeServico = [];
    $scope.osEmExecucao = [];
    $scope.abertas = 0;
    $scope.fechadas = 0;
    var carregarOrdensDeServico = function () {
        $http.get("http://192.168.0.101:3000/api/ordemservico").success(function (data, status){
            $scope.ordensDeServico = data;
        }).error(function (data, status){
            $scope.message = "Aconteceu um erro: " + status;
        });
    };
    var carregarEmExecucao = function () {
        $http.get("http://192.168.0.101:3000/api/execucao").success(function (data, status){
            $scope.osEmExecucao = data;
        }).error(function (data, status){
            $scope.message = "Aconteceu um erro: " + status;
        });
    };
    var carregarAbertas = function () {
        $http.get("http://192.168.0.101:3000/api/abertas").success(function (data, status){
            $scope.abertas = data;
        }).error(function (data, status){
            $scope.message = "Aconteceu um erro: " + status;
        });
    };
    var carregarFechadas = function () {
        $http.get("http://192.168.0.101:3000/api/fechadas").success(function (data, status){
            $scope.fechadas = data;
        }).error(function (data, status){
            $scope.message = "Aconteceu um erro: " + status;
        });
    };
    var enviarParaLog = function () {
      console.log("Chamou !");
    };
    var chamarTodas = function () {
        carregarOrdensDeServico();
        carregarFechadas();
        carregarAbertas();
        carregarEmExecucao();
    };
    chamarTodas();
    $interval(chamarTodas, 3000);

});