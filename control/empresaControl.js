var app = angular.module('empresaModule',[]);
app.controller('empresaControl',function($scope,$http) {

    var url = 'http://localhost:8080/empresas';

    $scope.pesquisar = function() {
        $http.get(url).then(function (response) {
            $scope.empresas = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvaremp = function() {
       // $scope.empresas.push($scope.empresa);
        if (typeof $scope.empresa.codigo == 'undefined') {            
            $http.post(url,$scope.empresa).then(function (response) {
                $scope.empresas.push(response.data);
                $scope.novo();
            }, function (error) {
               // alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.empresa).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
               // alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluir = function() {
        if (typeof $scope.cliente.codigo == 'undefined') {
            alert('Escolha um cliente');
        } else {
            urlExcluir = url+"/"+$scope.cliente.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
               // alert(error);
                console.log(error);
            }); 
        }
    }

     $scope.cliente = [
                {'codigo':'1',
                 'nome':'Narlos',
                 'cargo':'Professor',
                 'endereco':'Rua teste, 65, Jardim das Palmeiras',
                'cidade':'Uberlandia',
                'pais':'Brasil',
                'telefone':'34944423402'},
                {'codigo':'2',
                 'nome':'Martin Fowler',
                 'cargo':'CEO',
                 'endereco':'40, street view, google',
                'cidade':'Miami',
                'pais':'USA',
                'telefone':'55100912333'
                },            
            ]
      
            $scope.novo = function() {
                $scope.empresa = {};
            }        
        
            $scope.seleciona = function(empresa) {
                $scope.empresa = empresa;
            }

            $scope.pesquisar();
             $scope.novo();
        
        });