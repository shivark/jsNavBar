var NavState = {
    collapsed: 'collapsed',
    ribbon: 'ribbon',
    expanded: 'expanded'
};

	var ScreenSize = {
		extraSmall: 'extraSmall',
		small: 'small'
	};
	
  function getScreenSize() {
      var smallScreenWidth = 767;
      return ($(window).width() > smallScreenWidth) ? ScreenSize.small : ScreenSize.extraSmall;
  }
	
function TransitionModel(options){
	  options = options || {
        screenSize: ScreenSize.small
	};

	var statesForScreenSizes = {};
	statesForScreenSizes[ScreenSize.extraSmall] = [NavState.collapsed, NavState.ribbon, NavState.expanded];
	statesForScreenSizes[ScreenSize.small] = [NavState.ribbon, NavState.expanded];

    this.transitionStates = statesForScreenSizes[options.screenSize]
	this.state = this.transitionStates[0];	
	this.nextState = function(){
		 var nextState, stateCount, currentStateIndex, nextStateIndex;

			stateCount = this.transitionStates.length;
			currentStateIndex = this.transitionStates.indexOf(this.state);

			if (currentStateIndex === stateCount - 1) {
				nextStateIndex = 0;
			} else {
				nextStateIndex = ++currentStateIndex;
			}
			this.state = this.transitionStates[nextStateIndex];
			return this.state;
	}
	
}

function AppViewModel() {
	this.transitionModel = new  TransitionModel({ screenSize: getScreenSize()});
	this.className = ko.observable(this.transitionModel.state);
	this.getNextTransition = function(){	
		this.className(this.transitionModel.nextState());
	}	
}

 	 
ko.applyBindings(new AppViewModel());


