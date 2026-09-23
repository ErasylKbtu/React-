function createTask(name, elementPrefix) {
    let executionCount = 0;

    const statusElement = document.getElementById(`${elementPrefix}-status`);
    const countElement = document.getElementById(`${elementPrefix}-count`);
    const timeElement = document.getElementById(`${elementPrefix}-time`);

    async function run() {
        executionCount++;
        countElement.textContent = executionCount;

        statusElement.textContent = "Loading...";
        statusElement.className = "status loading";
        timeElement.textContent = "-";

        const loadingTime = Math.floor(Math.random() * 1501) + 500;
        const startTime = performance.now();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const endTime = performance.now();
                const actualTime = Math.round(endTime - startTime);

                const failed = Math.random() < 0.25;

                timeElement.textContent = `${actualTime} ms`;

                if (failed) {
                    statusElement.textContent = "Failed";
                    statusElement.className = "status failed";

                    console.log(`${name} Failed`);

                    reject(new Error(`${name} Failed`));
                } else {
                    statusElement.textContent = "Completed";
                    statusElement.className = "status completed";

                    console.log(`${name} Completed`);

                    resolve({
                        name: name,
                        status: "Completed",
                        time: actualTime
                    });
                }
            }, loadingTime);
        });
    }

    function getCount() {
        return executionCount;
    }

    function reset() {
        executionCount = 0;

        countElement.textContent = 0;
        statusElement.textContent = "Waiting";
        statusElement.className = "status waiting";
        timeElement.textContent = "-";
    }

    return {
        run,
        getCount,
        reset
    };
}


const usersTask = createTask("Load Users", "users");
const postsTask = createTask("Load Posts", "posts");
const commentsTask = createTask("Load Comments", "comments");


document.getElementById("users-run").addEventListener("click", async () => {
    try {
        await usersTask.run();
    } catch (error) {
        console.log(error.message);
    }
});


document.getElementById("posts-run").addEventListener("click", async () => {
    try {
        await postsTask.run();
    } catch (error) {
        console.log(error.message);
    }
});


document.getElementById("comments-run").addEventListener("click", async () => {
    try {
        await commentsTask.run();
    } catch (error) {
        console.log(error.message);
    }
});


document.getElementById("users-reset").addEventListener("click", () => {
    usersTask.reset();
});


document.getElementById("posts-reset").addEventListener("click", () => {
    postsTask.reset();
});


document.getElementById("comments-reset").addEventListener("click", () => {
    commentsTask.reset();
});


document.getElementById("run-all").addEventListener("click", async () => {
    const resultElement = document.getElementById("all-result");

    resultElement.textContent = "Running all tasks...";

    const startTime = performance.now();

    await Promise.allSettled([
        usersTask.run(),
        postsTask.run(),
        commentsTask.run()
    ]);

    const endTime = performance.now();
    const totalTime = Math.round(endTime - startTime);

    resultElement.textContent = `All tasks finished in ${totalTime} ms`;
});


document.getElementById("reset-all").addEventListener("click", () => {
    usersTask.reset();
    postsTask.reset();
    commentsTask.reset();

    document.getElementById("all-result").textContent = "";
});


document.getElementById("run-sequential").addEventListener("click", async () => {
    const resultElement = document.getElementById("sequential-result");

    resultElement.textContent = "Running...";

    const startTime = performance.now();

    try {
        await usersTask.run();
    } catch (error) {
        console.log(error.message);
    }

    try {
        await postsTask.run();
    } catch (error) {
        console.log(error.message);
    }

    try {
        await commentsTask.run();
    } catch (error) {
        console.log(error.message);
    }

    const endTime = performance.now();
    const totalTime = Math.round(endTime - startTime);

    resultElement.textContent = `Finished in ${totalTime} ms`;
});


document.getElementById("run-concurrent").addEventListener("click", async () => {
    const resultElement = document.getElementById("concurrent-result");

    resultElement.textContent = "Running...";

    const startTime = performance.now();

    await Promise.allSettled([
        usersTask.run(),
        postsTask.run(),
        commentsTask.run()
    ]);

    const endTime = performance.now();
    const totalTime = Math.round(endTime - startTime);

    resultElement.textContent = `Finished in ${totalTime} ms`;
});


const expectedOutput = [
    "1. Synchronous start",
    "2. Async function start",
    "3. Synchronous end",
    "4. Promise callback 1",
    "5. Async/await continuation",
    "6. Promise callback 2",
    "7. Timer 1",
    "8. Timer 2"
];


document.getElementById("expected-output").textContent =
    expectedOutput.join("\n");


document.getElementById("event-loop-button").addEventListener("click", () => {
    const outputElement = document.getElementById("actual-output");

    outputElement.textContent = "";

    let number = 1;

    function showOutput(message) {
        const text = `${number}. ${message}`;

        console.log(text);

        outputElement.textContent += text + "\n";

        number++;
    }

    showOutput("Synchronous start");

    setTimeout(() => {
        showOutput("Timer 1");
    }, 0);

    Promise.resolve().then(() => {
        showOutput("Promise callback 1");
    });

    async function asyncDemo() {
        showOutput("Async function start");

        await Promise.resolve();

        showOutput("Async/await continuation");
    }

    asyncDemo();

    Promise.resolve().then(() => {
        showOutput("Promise callback 2");
    });

    setTimeout(() => {
        showOutput("Timer 2");
    }, 0);

    showOutput("Synchronous end");
});