// State Management

function createStore() {
    //Store should have four parts:

    // 1. The state
    let state
    let listeners = []

     // 2. Get the state
    const getState = () => state

    // 3. Listen to changes on the state
    const subscribe = (listener) => {
        listeners.push(listener)
        
        // Unsubscribes listener
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }

    }

    // 4. Update the state
    const dispatch = () => {

    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore()

const unsubscribe = store.subscribe(() => {
    // listener function
})