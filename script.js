// let counter = 0;

// function plusOne() {
//     counter++;
//     updateCounter();
// }

// function minusOne() {
//     counter--;
//     updateCounter();
// }

// function updateCounter() {
//     const counterLabel = document.getElementById('counter');
//     counterLabel.innerHTML = counter;
// }

// function undo() {
    
// }

// function redo() {

// }

////////////////////////// UTILIZZO LO STATE MANAGER ////////////////////////////////////////////

// let counter = 0;

// const manager = new StateManager(counter);  //passo counter come starting state = 0

// function plusOne() {
//     manager.addOne()
//     updateCounter();
// }

// function minusOne() {
//     manager.removeOne();
//     updateCounter();
// }

// function undo() {
//     manager.undo();
//     updateCounter();
// }

// function redo() {
//     manager.redo();
//     updateCounter();
// }

// function updateCounter() {
//     const counterLabel = document.getElementById('counter');
//     counterLabel.innerHTML = manager.state;
// }

// function reset() {
//     manager.reset();
//     updateCounter(); //non serve 
// }l

////////////////////////// UTILIZZO LO STATE MANAGER CON EVENTI ////////////////////////////////////////////

window.addEventListener('state-update', (e) => updateCounter(e.detail))

let counter = 0;

const manager = new StateManager(counter);  //passo counter come starting state = 0

function plusOne() {
    dispatchEvent(new CustomEvent('plus-one'));
}

function minusOne() {
    dispatchEvent(new CustomEvent('minus-one'));
}

function undo() {
    dispatchEvent(new CustomEvent('undo-action'));

}

function redo() {
    dispatchEvent(new CustomEvent('redo-action'));

}

function updateCounter(state) {
    const counterLabel = document.getElementById('counter');
    counterLabel.innerHTML = state
}

function reset() {
    manager.reset();
    updateCounter(); //non serve 
}