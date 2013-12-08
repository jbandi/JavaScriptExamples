var MyCtrl = function($scope) {
    $scope.ratings = [
        {name: 'Will Hunting', rating: 3.50, entered: "2013-08-05"}
        ];

    $scope.pluralizer = {
        0: "No rating!",
        1: "Only one rating!",
        other: "{} ratings."
    }

    $scope.addRating = function(){
        $scope.ratings.push({name: $scope.name, rating: $scope.rating, entered: new Date()});
    }

    $scope.removeRating = function(item){
        if(confirm("Remove this rating. Sure?")){
            $scope.ratings.splice($scope.ratings.indexOf(item), 1);
        }
    }
}
