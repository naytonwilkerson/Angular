var app = angular.module('cadastradoModule',[]);
app.controller('cadastradoControl',function($scope,$http) {

    var url = 'http://localhost:8080/cadastrados';

    $scope.pesquisar = function() {
        $http.get(url).then(function (response) {
            $scope.cadastrados = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvarcada = function() {
       // $scope.empresas.push($scope.empresa);
        if (typeof $scope.cadastrado.codigo == 'undefined') {            
            $http.post(url,$scope.cadastrado).then(function (response) {
                $scope.cadastrados.push(response.data);
                $scope.novo();
            }, function (error) {
               // alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.cadastrado).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
               // alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluir = function() {
        if (typeof $scope.cadastrado.codigo == 'undefined') {
            alert('Escolha um cliente');
        } else {
            urlExcluir = url+"/"+$scope.cadastrado.codigo;
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
                $scope.cadastrado = {};
            }        
        
            $scope.seleciona = function(cadastrado) {
                $scope.cadastrado = cadastrado;
            }

            $scope.pesquisar();
             $scope.novo();
        
        });