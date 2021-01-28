// LIBRARY CODE
function createStore(reducer) {
  //Store should have four parts:

  // 1. The state
  let state;

  // 2. Get the state
  const getState = () => state;

  // 3. Listen to changes on the state
  let listeners = [];
  const subscribe = (listener) => {
    listeners.push(listener);

    // Unsubscribes listener when called
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 4. Updates the state
  const dispatch = (action) => {
    state = reducer(state, action);

    // loop over listeners and invoke them
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// APP CODE
// Use action type constants to avoid typos
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// Rule #1 Actions - coordinate state changes through a 'playbook' of actions

// Action Creators
const addTodoAction = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

const removeTodoAction = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

const toggleTodoAction = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

const addGoalAction = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  };
};

const removeGoalAction = (id) => {
  return {
    type: REMOVE_GOAL,
    id,
  };
};

//Rule #2 Pure Functions - has 3 characteristics:
/*
    1. They always return the same result if the same arguments are passed in.
    2.  Depend only on arguments passed into them --> do not access values outside of their scope
    3.  Never produce side effects (e.g. Ajax requests, mutate, etc.)
*/

// Reducer function - a pure function
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]); // concat() makes copy of array --> does not mutate as opposed to push()

    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );

    default:
      return state;
  }
}

// Reducer function - a pure function
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);

    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);

    default:
      return state;
  }
}

// Root reducer
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = createStore(app);

const unsubscribe = store.subscribe(() => {
  // listener function
  console.log("The new state is ", store.getState());
});
// unsubscribe();  --> Unsubscribes listener fxn

// Updating the store
store.dispatch(
  addTodoAction({
    id: 0,
    name: "Walk the dog",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 1,
    name: "Wash the car",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 2,
    name: "Go to the gym",
    complete: true,
  })
);

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({ id: 0, name: "Learn Redux" }));

store.dispatch(
  addGoalAction({
    id: 1,
    name: "Lose 20 pounds",
  })
);

store.dispatch(removeGoalAction(0));
