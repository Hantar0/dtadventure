export default function HomeController (StepService) {

    StepService.getSteps()
    .then(function (steps) {
        this.steps = steps
    }.bind(this))

    this.sortBy = function (value) {
    if (this.predicate === value) {
      this.reverse = !this.reverse
    } else {
      this.predicate = value;
      this.reverse = false
    }
  }
}
