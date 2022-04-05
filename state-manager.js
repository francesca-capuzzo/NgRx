class StateManager {

    actions = {
        'ADD_ONE': (state) => {
            return state + 1;
        },

        'REMOVE_ONE': (state) => {
            return state - 1; 
        }
    }

    constructor(startingState){
        this.startingState = startingState;
        this.state = startingState; //lo stato attuale è uguale a quello iniziale finchè non faccio qualcosa
        this.actionsList = [];
        this.actionsIndex = 0;

        ////////////////// CON EVENTI //////////////////////////////////////

        window.addEventListener('plus-one', (e) => this.addOne());
        window.addEventListener('minus-one', (e) => this.removeOne());
        window.addEventListener('undo-action', (e) => this.undo());
        window.addEventListener('redo-action', (e) => this.redo());

        ////////////////////////////////////////////////////////////////////

    }

    addOne() {
        this.resetFuture();
        this.actionsList.push('ADD_ONE'); //non modifico lo state ma scrivo ciò che viene applicato per modificarlo
        this.actionsIndex++;
        this.limitActionsList();
        console.log(this.actionsList);
        this.reducer();
    }

    removeOne() {
        this.resetFuture();
        this.actionsList.push('REMOVE_ONE'); //non modifico lo state ma scrivo ciò che viene applicato per modificarlo
        this.actionsIndex++;
        this.limitActionsList();
        console.log(this.actionsList);
        this.reducer();
    }

    undo() {
        if (this.actionIndex > 0) {
            this.actionsIndex--;
            this.reducer();
        }
    }

    redo() {
        if (this.actionsIndex < this.actionsList.length) {
            this.actionsIndex++;
            this.reducer();
        }
    }

    resetFuture() {
        this.actionsList = this.actionsList.slice(0, this.actionsIndex);
    }

    reducer() {
        this.state = this.actionsList.reduce((state, action, index) => {
            return index < this.actionsIndex ? this.actions[action](state) : state;
        }, this.startingState);
        console.log(this.state);
        /*primo giro:
        state = 0;
        action = 'ADD_ONE' o 'REMOVE_ONE'
        => prende lo stato e applica ADD or REMOVE che sono a loro volta funzioni dell'oggetto actions che cambiano lo state aggiungendo o togliendo 1
        */
       dispatchEvent(new CustomEvent('state-update',  {detail: this.state}));
    }

    reset() {
        this.actionsList = [];
        this.actionsIndex = 0;
        this.startingState = this.state;
    }

    limitActionsList() {
        if (this.actionsList.length > 10) {
            this.lostAction = this.actionsList.slice(0, 1);
            this.actionsList = this.actionsList.slice(1, this.actionsList.length);
            const actionName = this.lostAction[0];
            this.startingState = this.actions[actionName](this.startingState);
            this.actionsIndex--;
        }
    }

}

