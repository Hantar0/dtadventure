export default function StepService($http, ActionService, $q) {

    function handleResponse(response) {
        return response.data
    }

    var url = 'http://localhost:3000/steps'

    return {
        getSteps: function () {
            return $http.get(url)
                .then(handleResponse)
        },
     
        getStep: function (id) {
            if(!id) {
                // Utilisation d'une promesse automatiquement validée
                return $q.resolve( {
                    "name": '',
                    "description": '',
                    "start": false,
                    "actions": []
                })
            }
            return $http.get(url + '/' + id)
                .then(handleResponse)
        },

        saveStep: function (step) {
            console.log("saveStep")
            if (step.id) {
                return $http.put(url + '/' + step.id, step)
                    .then(handleResponse)
            } else {
                return $http.post(url + '/', step)
                    .then(handleResponse)
            }
        },

        deleteStep: function (id) {
            return $http.delete(url + '/' + id)
                .then(handleResponse)
        },

        action: function (action, user) {
            return ActionService[action.type](user, action.params)
        }
    }
}
