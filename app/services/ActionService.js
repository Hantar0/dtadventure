export default function ActionService($location) {

    return {
        go: function (user, params) {
            $location.path('/play/' + params.step)
            return true
        },

        fight: function (user, params) {
            console.log(params)
            if (params.battleTime == 0) {
                user.gold += params.gold * 1
                alert('Vous gagner le combat contre' + ' ' + params.creatureName)
            }
            var dmg = Math.trunc(params.life * ((Math.random() * 4 + 1))/3)
            console.log(dmg)
            user.life += dmg
            params.battleTime = params.battleTime * 1 - 1
            return user.life > 0
        },

        chest: function (user, params) {
            if (params.usable == 0) {
                alert('Le coffre est vide !')
            }
            else {
                user.gold += params.gold * 1
                user.life += params.life * 1
                params.usable = params.usable*1 -1
            }
            return user.life > 0
        },

        reset: function (user, params) {
            user.gold = 0
            user.life = 100
            user.potion = 0
            return user.life > 0
        },

        buy: function (user, params) {
            if (parseInt(user.gold) + parseInt(params.gold) < 0) {
                alert('Tu es trop pauvre pour te le permettre !')
            }
            else {
                user.gold += params.gold * 1
                user.life += params.life * 1
                user.potion += params.potion * 1
            }
            return user.life > 0
        },

        drinkPotion: function (user, params) {
            if (parseInt(user.life) >= 100) {
                alert('Ta santé est au maximum !')
            }
            else {
                if (user.life + params.life * 1 > 100) {
                    user.life = 100
                }
                else {
                    user.life += params.life * 1
                }
                user.potion += params.potion * 1
            }
            return user.life > 0
        }
    }
}
