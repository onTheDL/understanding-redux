// STATE MANAGEMENT

// Rule #1 Actions - coordinate state changes through a 'playbook' of actions
let addTodo = {
  type: "ADD_TODO",
  todo: { id: 0, name: "Learn Redux", complete: false },
};

let removeTodo = {
  type: "REMOVE_TODO",
  id: 0,
};

let toggleTodo = {
  type: "TOGGLE_TODO",
  id: 0,
};

let addGoal = {
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: "Run a Marathon",
  },
};

let removeGoal = {
  type: "REMOVE_GOAL",
  id: 0,
};

//Rule #2 Pure Functions - has 3 characteristics:
/*
    1. They always return the same result if the same arguments are passed in.
    2.  Depend only on arguments passed into them --> do not access values outside of their scope
    3.  Never produce side effects (e.g. Ajax requests, mutate, etc.)
*/

function todos(state, action) {

}



// Creating store
function createStore() {
  //Store should have four parts:

  // 1. The state
  let state;
  let listeners = [];

  // 2. Get the state
  const getState = () => state;

  // 3. Listen to changes on the state
  const subscribe = (listener) => {
    listeners.push(listener);

    // Unsubscribes listener when called
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 4. Update the state
  const dispatch = () => {};

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore();

const unsubscribe = store.subscribe(() => {
  // listener function
});

// unsubscribe();  --> Unsubscribes listener fxn
