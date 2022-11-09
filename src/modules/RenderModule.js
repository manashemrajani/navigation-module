const RenderModule = {
    init: function(routes) {
        for(let i = routes.length - 1; i >= 0; i--){
            const screenEl = this.createScreen(routes[i], i === routes.length -1 ? true : false);
            const container = document.getElementById("carn-screens");
            container.prepend(screenEl);
        }
    },
    activateScreen: function (routeId) {
        const screenEl = document.getElementById(routeId);
        if(screenEl) {
            screenEl.classList.remove("hidden")
        }
        // const screens = document.getElementById("carn-screens").children;
        // for (let i = 0; i < screens.length; i++) {
        //     if(parseInt(screens[i].id) < routeId) {
        //         screens[i].style.display = "none";
        //     } else if (parseInt(screens[i].id) === routeId) {
        //         screens[i].style.display = "flex";
        //     } else if(parseInt(screens[i].id) > routeId) {
        //         this.removeScreen(screens[i].id)
        //     }
        // }
    },
    createScreen: function(routeId, isVisible = true) {
        const el = document.createElement("div");
        el.id = routeId;
        el.className = `carn-route ${ isVisible ? "" : "hidden"}`;
        el.innerHTML = routeId;
        return el;
    },
    renderScreen: function (routeId) {
        const screenEl = this.createScreen(routeId)
        const container = document.getElementById("carn-screens");
        container.appendChild(screenEl);
    },
    showScreen: function(routeId) {
        document.getElementById(routeId).classList.remove("hidden");
    },
    hideScreen: function(routeId) {
        document.getElementById(routeId).classList.add("hidden");
    },
    closeModal: () => {

    },
    removeScreen: function (routeId) {
        document.getElementById(routeId).remove();
    }
}


export default RenderModule;