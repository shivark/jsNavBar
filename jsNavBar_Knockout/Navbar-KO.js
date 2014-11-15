var NavState = {
    collapsed: 'collapsed',
    ribbon: 'ribbon',
    expanded: 'expanded'
};

var ScreenSize = {
    extraSmall: 'extraSmall',
    small: 'small'
};

var transitionStatesForScreenSizes = {};
transitionStatesForScreenSizes[ScreenSize.extraSmall] = [NavState.collapsed, NavState.ribbon, NavState.expanded];
transitionStatesForScreenSizes[ScreenSize.small] = [NavState.ribbon, NavState.expanded];


function getScreenSize() {
    var smallScreenWidth = 767;
    return ($(window).width() > smallScreenWidth) ? ScreenSize.small : ScreenSize.extraSmall;
}

function NavBarModel(options){

    this.options = options || {
        screenSize: ScreenSize.small
    };
    this.transitionStates = transitionStatesForScreenSizes[this.options.screenSize];
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

function NavBarViewModel() {
    this.transitionModel = new  NavBarModel({ screenSize: getScreenSize()});
    this.navBarClass = ko.observable(this.transitionModel.state);
    this.getNextTransition = function(){
        this.navBarClass(this.transitionModel.nextState());
    }
}

ko.applyBindings(new NavBarViewModel());


