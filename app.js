var app = angular.module('PriceCalculatorApp', []);

app.controller('UserController', [ '$scope', function($scope) {
    $scope.users = [{name: 'name1', age: 11, notes: [{text: 'asdasdad'}] }, {name: 'Tom', age: 5, notes: [] }, {name: 'name3', age: 11, notes: [] }, {name: 'Tom2', age: 5, notes: [] }];

    $scope.editUser = function(user){
        $scope.currentUser = user;
    };
    $scope.deleteUser = function(user){
      $scope.users = _.without($scope.users, user)
    };
    $scope.saveNew  = function(){
      $scope.currentUser = null;
    };
    $scope.newUsers = [];
    $scope.createNewUser = function(){
        newUser = {
            name: '', age: ''
        };
        $scope.newUsers.push(newUser);
    };
    $scope.save = function(newUser){
        $scope.users.push(newUser);
        $scope.newUsers = _.without($scope.newUsers, newUser)
    };

}]);

app.controller('CalculateController', ['$scope', function($scope){
    $scope.taxRates = [
        {name: 'UT', rate: 6.6},{name: 'T', rate: 2.6},{name: 'UTAS', rate: 12.6},{name: 'UFGS', rate: 62.6}
    ];
    $scope.item = {price: 0, quantity: 0, taxRate: $scope.taxRates[0].rate};

    $scope.price = function(){
        return $scope.item.price * $scope.item.quantity * $scope.item.taxRate
    };
    $scope.discounts =[{price: 10000, discountRate: 2 },{price: 20000, discountRate: 3 },{price: 30000, discountRate: 4 },{price: 40000, discountRate: 5 }];
    $scope.getDiscount = function(){
        return _.find(_.sortBy($scope.discounts, function(disc) {
            return -1 * disc.price}), function(discount){
              return discount.price < $scope.price()
        })
    }

}]);


app.controller('NotesController', ['$scope', function($scope){
    $scope.toggleNotes = function(user){user.isNotesDisplaying = !user.isNotesDisplaying};
    $scope.toggleEdit = function(note){
        note.showEditNote = !note.showEditNote
    };
    $scope.saveEditNote= function(note){
      note.showEditNote = null;
    };
    $scope.deleteNote = function(note, user){
        user.notes = _.without(user.notes, note)
    };

    $scope.toggleAddNote = function(user){
        user.toggleAddNewNote = !user.toggleAddNewNote;
        $scope.newNote = {text: ''};
    };

    $scope.createNewNote = function(user){
        user.notes.push($scope.newNote);
        user.toggleAddNewNote = null;
    }
}]);
