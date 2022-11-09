const NavigationStackManager = {
    stack: [],
    init: function(routeId) {
        const existingStack = this.getStack();
        if(existingStack.length > 0) {
            this.stack = existingStack;
            this.print()
        } else {
            this.stack = [routeId];
            this.updateStackInSession(this.stack);
        }
        return this.stack;
    },
    updateStackInSession: function() {
        sessionStorage.setItem('NavigationStack',this.stack);
        this.print();
    },
    getStack: function() {
        const navigationStack = sessionStorage.getItem("NavigationStack");
        return Array.from(navigationStack ? navigationStack.split(",") : []);
    },
    push: function(routeId) {
        this.stack.push(routeId);
        this.updateStackInSession();
    },
    pop: function() {
        const lastPopped = this.stack.pop();
        this.updateStackInSession();
        return lastPopped;
    },
    print: function() {
        setTimeout(() => {
            document.getElementById("stack-viewer").innerText = `[ ${this.stack.join(", ")} ]`;
        }, 10)
    }
}
export default NavigationStackManager; 