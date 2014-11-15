var NavState = {
    collapsed: 'collapsed',
    ribbon: 'ribbon',
    expanded: 'expanded'
};

var ScreenSize = {
    extraSmall: 'extraSmall',
    small: 'small'
};

function NavView(model) {
    this._model = model;
    this.$_el = $(this._el);

    this.render(); //Ensure the DOM is initialized OK.
}

NavView.prototype._el = 'body';

NavView.prototype.render = function () {
    this.$_el.attr('data-nav-mode', this._model.state);
}

var statesForScreenSizes = {};
statesForScreenSizes[ScreenSize.extraSmall] = [NavState.collapsed, NavState.ribbon, NavState.expanded];
statesForScreenSizes[ScreenSize.small] = [NavState.ribbon, NavState.expanded];

function NavModel(options) {
    options = options || {
        screenSize: ScreenSize.small,
        onTransition: function () {
        } };

    this._states = statesForScreenSizes[options.screenSize]
    this.state = this._states[0];
    this._onTransition = options.onTransition;
}

NavModel.prototype.transition = function () {
    var nextState, stateCount, currentStateIndex, nextStateIndex;

    stateCount = this._states.length;
    currentStateIndex = this._states.indexOf(this.state);

    if (currentStateIndex === stateCount - 1) {
        nextStateIndex = 0;
    } else {
        nextStateIndex = ++currentStateIndex;
    }

    this.state = this._states[nextStateIndex];
    this._onTransition();
}

function NavController() {
    var burgerEl, screenSize, model, view;

    burgerEl = '#MobileMainNavLink';
    model = new NavModel({ screenSize: getScreenSize(), onTransition: onModelTransition });
    view = new NavView(model);

    $(burgerEl).on('click', onBurgerClick);

    function onBurgerClick() {
        model.transition()
    }

    function onModelTransition() {
        view.render();
    }

    function getScreenSize() {
        var smallScreenWidth = 767;

        return ($(window).width() > smallScreenWidth) ? ScreenSize.small : ScreenSize.extraSmall;
    }
}

$(document).ready(function () {
    new NavController();
});

//
//NavView.prototype._states = {
//    collapsed: {
//        set: function () {
//            disableRibbonToggle();
//            disableExpandedToggle();
//        }
//    },
//    ribbon: {
//        set: function () {
//            enableRibbonToggle();
//        }
//    },
//    expanded: {
//        set: function () {
//            enableExpandedToggle();
//        }
//    }
//};
//
//var extraSmallScreenStates = [states.collapsed, states.ribbon, states.expanded];
//var smallScreenStates = [states.ribbon, states.expanded];
//
//
//$(document).ready(function () {
//    var smallScreenWidth = 767,
//        $body = $("body"),
//        expandedToggleClass = "expanded-toggle",
//        ribbonToggleClass = "ribbon-toggle",
//        fullWidthToggleClass = "full-width-toggle",
//        $menuButton = $("#MobileMainNavLink");
//
//    var collapseSubNavigation = function () {
//        $('#accordion .panel-collapse').collapse('toggle');
//    }
//
//    var enableRibbonToggle = function () {
//        $body.removeClass(expandedToggleClass, fullWidthToggleClass);
//        $body.addClass(ribbonToggleClass);
//    }
//
//    var enableExpandedToggle = function () {
//        $body.removeClass(ribbonToggleClass, fullWidthToggleClass);
//        $body.addClass(expandedToggleClass);
//        collapseSubNavigation();
//    }
//    var disableRibbonToggle = function () {
//        $body.removeClass(ribbonToggleClass);
//    }
//    var disableExpandedToggle = function () {
//        $body.removeClass(expandedToggleClass);
//        collapseSubNavigation();
//    }
//
//    //
//    var isSmallScreen = function () {
//        return $(window).width() > smallScreenWidth;
//    }
////
////    if (isSmallScreen()) {
////        enableRibbonToggle();
////    }
////
////    $menuButton.click(function (e) {
////
////        e.preventDefault();
////
////        if ($body.hasClass(ribbonToggleClass)) {
////            disableRibbonToggle();
////            enableExpandedToggle();
////            collapseSubNavigation();
////        }
////
////        else if ($body.hasClass(expandedToggleClass)) {
////            disableExpandedToggle();
////            collapseSubNavigation();
////
////            if (isSmallScreen()) {
////                enableRibbonToggle();
////            }
////
////        } else {
////            if (isSmallScreen()) {
////                enableExpandedToggle();
////                collapseSubNavigation();
////            } else {
////                enableRibbonToggle();
////            }
////        }
////
//    //    });
//
//    var states = {
//        collapsed: {
//            set: function () {
//                disableRibbonToggle();
//                disableExpandedToggle();
//            }
//        },
//        ribbon: {
//            set: function () {
//                enableRibbonToggle();
//            }
//        },
//        expanded: {
//            set: function () {
//                enableExpandedToggle();
//            }
//        }
//    }
//
//    var extraSmallScreenStates = [states.collapsed, states.ribbon, states.expanded];
//    var smallScreenStates = [states.ribbon, states.expanded];
//
//
//    $(".navigation").click(function () {
//        $body.toggleClass(fullWidthToggleClass);
//    });
//    $("#CloseNav3").click(function () {
//        $body.toggleClass(fullWidthToggleClass);
//    });
//});
