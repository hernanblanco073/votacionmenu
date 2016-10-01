angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('LoginFirebaseCtrl', function($scope, $stateParams, $timeout) {

  $scope.loginData = {};

  $scope.loginData.username = "hernanblanco.073@gmail.com";
  $scope.loginData.password = "passreset";
  $scope.logeado = "no";

  $scope.Logear = function(){
    $timeout(firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
        .catch(function(error){
          if(error.code == "auth/user-not-found")
          {
            alert("No existe el usuario");
          }
          else
            if(error.code == "auth/wrong-password")
            {
              alert("Contraseña incorrecta");
            }
            else
              alert(error.message);
        })
        .then(function(respuesta){
          console.info("respuesta",respuesta);
          $scope.verificado = respuesta.emailVerified;
          $scope.logeado = "ok";
      })
    )
  }

  $scope.Deslogear = function(){
    firebase.auth().signOut()
      .catch(function(error){
        console.info("error", error);
      })
      .then(function(respuesta){
        console.info("delogeado",respuesta);
        $scope.logeado = "no";
      })
  }

  $scope.Reset = function(){
    firebase.auth().sendPasswordResetEmail($scope.loginData.username)
      .then(function(respuesta){
        console.info(respuesta);
      })
      .catch(function(error){
        console.info(error);
      })
  }

  $scope.Verificar = function(){
    firebase.auth().currentUser.sendEmailVerification();
  }

  $scope.Registrar = function(){
    firebase.auth().createUserWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
      /*.catch(function(error){
          if(error.code == "auth/email-already-in-use")
          {
            alert("Email ya esta en uso");
          }
          else
            if(error.code == "auth/invalid-email")
            {
              alert("Email invalido");
            }
            else
              alert(error.message);
        })*/
        .then(function(respuesta){
          console.info("respuesta",respuesta);
          alert("se ha registrado");
      }, function(error){
          if(error.code == "auth/email-already-in-use")
          {
            alert("Email ya esta en uso");
          }
          else
            if(error.code == "auth/invalid-email")
            {
              alert("Email invalido");
            }
            else
              alert(error.message);
        })
  }
});


//hacer boton de resetear password
//verificar mail (mostrar cuando el token trae en false)
//registrar firebase.auth()register(mail,pass)