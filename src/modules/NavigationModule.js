import { willClose } from "../components/InfoComponent";
import RenderModule from "./RenderModule";
import NavigationStackManager from "./NavigationStackManager";


let dummyPop = false;

const popStateHandler = (event) => {
    if(dummyPop) {
        dummyPop = false;
        NavigationModule.dummyPush(NavigationModule.getCurrentScreen());
        return;
    }

    
    const shouldClose = microfrontendWillClose();
    if(shouldClose) {
        // RenderModule.activateScreen(window.history.state.routeId);
        NavigationModule.setCurrentScreen(event.state.routeId);
        // TODO - figure out the screen to be removed
        const lastScreenId = NavigationStackManager.pop();
        RenderModule.removeScreen(lastScreenId);
        RenderModule.activateScreen(event.state.routeId);
        // // this approach depends on the order of the screens
        
        
        // disable forward
        
        // pop and forward
        dummyPop = true;
        NavigationModule.pop();
    } else {

        // TODO push the original screen back into the frame
        // figure out back kaha se hua tha
        NavigationModule.dummyPush(NavigationModule.getCurrentScreen());
    }
};

const getCurrentScreenFromRoute = () => {
    const path = window.location.pathname;
    let screen;
    if(path)  {
        screen = path.substring(1);
        screen = parseInt(screen);
    }
    return screen || 672;
}

const NavigationModule = {
    currentScreen: 1,
    init: function () {
        
        const initialScreen = getCurrentScreenFromRoute();

        const stack = NavigationStackManager.init(initialScreen);
        
        // first render
        if(stack.length === 1) {
            window.history.replaceState({
                routeId: 0,
            }, '');
            window.history.pushState({
                routeId: initialScreen
            }, '', initialScreen);
        }
        this.currentScreen = initialScreen;
        
        setTimeout(() => {
            RenderModule.init(NavigationStackManager.getStack());
        }, 10)
    },
    getCurrentScreen: function() {
        return this.currentScreen;
    },
    setCurrentScreen: function(currentScreen) {
        this.currentScreen = currentScreen;
    },
    push: function (routeId) {
        console.log('push', routeId);
        NavigationStackManager.push(routeId);
        window.history.pushState({
            routeId
        }, '', routeId);
        RenderModule.renderScreen(routeId);
        RenderModule.hideScreen(this.currentScreen);
        this.currentScreen = routeId;
    },
    dummyPush: function(routeId) {
        window.history.pushState({
            routeId
        }, '', routeId);
    },
    pop: function () {
        window.history.go(-1);
    },
    disableBack: function() {
        this.isBackDisabled = !this.isBackDisabled;
    }
};

window.addEventListener('popstate', popStateHandler);

export const microfrontendWillClose = () => {
    return willClose;
}

NavigationModule.init();

export default NavigationModule;