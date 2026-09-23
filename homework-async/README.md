# JavaScript Runtime and Async

This is a small JavaScript project created to practice:

- Closures
- Call Stack
- Promises
- async/await
- Event Loop
- Tasks
- Microtasks
- Sequential execution
- Concurrent execution

The project uses only HTML, CSS and vanilla JavaScript.


## Project Tasks

The application contains three simulated tasks:

- Load Users
- Load Posts
- Load Comments

Each task has:

- Name
- Status
- Execution count
- Loading time

The loading time is randomly generated between 500 and 2000 milliseconds.

Tasks can also randomly fail.


## Closure

I created tasks using the `createTask()` function.

Inside this function there is a variable called:

```javascript
let executionCount = 0;