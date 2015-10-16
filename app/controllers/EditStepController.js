export default function EditStepController($routeParams, $location, StepService) {

    StepService.getStep($routeParams.id)
		.then(function (step) {
			this.step = step
		}.bind(this))

	this.actions = ["go", "chest", "fight","buy"]
	this.params = ["step", "gold", "life","potion","battleTime","creatureName","usable"]

	this.resetAction = function () {
		this.actionAdd = "go"
		this.valueActionAdd = ""
	}

	this.resetParam = function () {
		this.paramAdd = "step"
		this.valueParamAdd = ""
	}

	this.resetAction()
	this.resetParam()	
	
	this.showAddAction = function () {
		this.showAddAct = !this.showAddAct
	}

	this.addAction = function () {
		if (this.valueActionAdd==="") {
			alert('Action name is empty !')
			return
		}
		
		this.step.actions.push(
			{
				"type": this.actionAdd,
				"name": this.valueActionAdd,
				"params": {}
			}
			)
		this.resetAction()
		this.showAddParam()
	}

	this.removeAction = function (index) {
		this.step.actions.splice(index, 1)
	}

	this.showAddParam = function () {
		this.showAddPara = !this.showAddPara
	}

	this.addParam = function (action) {
		if (this.valueParamAdd==="") {
			alert('Param value is empty !')
			return
		}
		action.params[this.paramAdd] = this.valueParamAdd
		this.resetParam()
		this.showAddParam()
	}
	
	this.deleteParam = function (action, key) {
		delete action.params[key]
	}
	
	this.saveForm = function () {
		if (this.stepForm.$invalid) {
			alert('erreur')
			return
		}

		StepService.saveStep(this.step)
			.then(function () {
				$location.path('/')
			})
	}

	this.delete = function () {
		StepService.deleteStep(this.step.id)
			.then(function () {
				$location.path('/')
			})
	}
}