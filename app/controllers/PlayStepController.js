export default function StepController($routeParams, StepService, UserService, $location) {

    StepService.getStep($routeParams.id)
        .then(function (step) {
            this.step = step
        }.bind(this))

    this.user = UserService
    console.log('je passe dans le step : ' + $routeParams.id)
    if ($routeParams.id == 1) {
        StepService.action({
            "type": "reset",
            "params": {
            }
        }, this.user)
    }

    this.drinkPotion = {
            "type": "drinkPotion",
            "name": "Boire potion",
            "params": {
                "life": 30,
                "potion": -1
            }
    }



    this.selectAction = function (action) {
        console.log("action" + action)
        var alive = StepService.action(action, this.user)
        if (!alive) {
            console.log('vous etes mort')
            $location.path('/death')
        }
    }
    console.log(this.selectAction)

}
