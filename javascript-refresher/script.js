(function(){
 
  const escHtml = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 
  // small formatting helper used inside the task functions below,
  // so the code shown matches what actually runs
  function val(v){
    if (typeof v === "string") return `"${v}"`;
    if (v === undefined) return "undefined";
    try { return JSON.stringify(v, null, 2); } catch(e){ return String(v); }
  }
 
  function getSource(fn){
    let src = fn.toString();
    src = src.replace(/^function[^\{]*\{/, "").replace(/\}\s*$/, "");
    let lns = src.split("\n");
    while (lns.length && lns[0].trim() === "") lns.shift();
    while (lns.length && lns[lns.length - 1].trim() === "") lns.pop();
    const indented = lns.filter(l => l.trim());
    const min = indented.length ? Math.min(...indented.map(l => l.match(/^\s*/)[0].length)) : 0;
    return lns.map(l => l.slice(min)).join("\n");
  }
 
  function highlight(raw){
    let code = escHtml(raw);
    const stash = [];
    const put = (cls, m) => { stash.push(`<span class="${cls}">${m}</span>`); return `\u0000${stash.length - 1}\u0000`; };
    code = code.replace(/\/\/.*$/gm, m => put("cm", m));
    code = code.replace(/(`[^`]*`|"[^"]*"|'[^']*')/g, m => put("str", m));
    code = code.replace(/\b(const|let|var|function|return|if|else|for|while|typeof|new|true|false|null|undefined|delete|try|catch|finally|of|in)\b/g, '<span class="kw">$1</span>');
    code = code.replace(/\u0000(\d+)\u0000/g, (_, i) => stash[Number(i)]);
    return code;
  }
 
  function captureLog(fn){
    const logs = [];
    const original = console.log;
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === "string" ? a : val(a)).join(" "));
    };
    try { fn(); } finally { console.log = original; }
    return logs;
  }
 
  function render(id, fn){
    const codeEl = document.getElementById("code" + id);
    const outEl = document.getElementById("out" + id);
    codeEl.innerHTML = highlight(getSource(fn));
    const logs = captureLog(fn);
    outEl.innerHTML = logs.map(escHtml).join("\n");
  }
 
  // ---------- 1. Variables and data types ----------
  function task1(){
    const name = "Aigerim";
    const age = 21;
    const isActive = true;
    const courses = ["Web Dev", "React", "Databases"];
    const address = { city: "Almaty", street: "Abay Ave" };
    const middleName = null;      // known to be empty on purpose
    let nickname;                 // declared, not yet assigned
    const sentence = `${name} is ${age} years old and currently ${isActive ? "active" : "inactive"}.`;
 
    console.log(`name: ${val(name)}  (${typeof name})`);
    console.log(`age: ${val(age)}  (${typeof age})`);
    console.log(`isActive: ${val(isActive)}  (${typeof isActive})`);
    console.log(`courses: ${val(courses)}  (${typeof courses}, reference)`);
    console.log(`address: ${val(address)}  (${typeof address}, reference)`);
    console.log(`middleName: ${val(middleName)}  (${typeof middleName}) -> null, intentionally empty`);
    console.log(`nickname: ${val(nickname)}  (${typeof nickname}) -> undefined, not assigned yet`);
    console.log(sentence);
  }
 
  // ---------- 2. Arrays ----------
  function task2(){
    const nums = [3, 7, 2, 10, 5];
    const doubled = nums.map(n => n * 2);
    const above5 = nums.filter(n => n > 5);
    const firstAbove5 = nums.find(n => n > 5);
    const total = nums.reduce((sum, n) => sum + n, 0);
    const has10 = nums.includes(10);
 
    console.log("original:", val(nums));
    console.log("doubled:", val(doubled));
    console.log("above 5:", val(above5));
    console.log("first > 5:", val(firstAbove5));
    console.log("sum:", val(total));
    console.log("includes 10:", val(has10));
    console.log("original untouched:", val(nums));
  }
 
  // ---------- 3. Arrays of objects ----------
  function task3(){
    const students = [
      { id: 1, name: "Anna", grade: 85 },
      { id: 2, name: "John", grade: 62 },
      { id: 3, name: "Sara", grade: 91 },
      { id: 4, name: "Mike", grade: 55 },
    ];
 
    const passing = students.filter(s => s.grade >= 70);
    const names = students.map(s => s.name);
    const byId = students.find(s => s.id === 3);
    const top = students.reduce((best, s) => (s.grade > best.grade ? s : best), students[0]);
    const average = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
    const withPassed = students.map(s => ({ ...s, passed: s.grade >= 70 }));
 
    console.log("passing (>= 70):", val(passing));
    console.log("names:", val(names));
    console.log("id = 3:", val(byId));
    console.log("top student:", val(top));
    console.log("average grade:", average.toFixed(1));
    console.log("with passed flag:", val(withPassed));
    console.log("original objects untouched:", val(students));
  }
 
  // ---------- 4. Objects ----------
  function task4(){
    let user = {
      id: 1,
      name: "Dana",
      age: 24,
      address: { city: "Almaty", street: "Dostyk Ave" }
    };
 
    const readName = user.name;
    const readCity = user.address.city;
 
    user.age = 25;
    user.email = "dana@example.com";
    delete user.address.street;
 
    const { name, age } = user;
    const { address: { city } } = user;
    const { name: userName } = user;
 
    console.log("read name:", val(readName));
    console.log("read city:", val(readCity));
    console.log("after updates:", val(user));
    console.log(`{ name, age } -> name: ${val(name)}, age: ${val(age)}`);
    console.log("nested city:", val(city));
    console.log("renamed userName:", val(userName));
  }
 
  // ---------- 5. Values and references ----------
  function task5(){
    const original = { name: "Alice", score: 10 };
    const copy = original;
    copy.score = 99;
    console.log("plain assignment -> original.score after copy.score = 99:", val(original.score), "(changed too, same reference)");
 
    const original2 = { name: "Alice", score: 10 };
    const copy2 = { ...original2 };
    copy2.score = 55;
    console.log("spread copy -> original2.score:", val(original2.score), "/ copy2.score:", val(copy2.score));
 
    const user = { name: "Alice", address: { city: "Almaty" } };
    const shallowCopy = { ...user };
    shallowCopy.address.city = "Astana";
    console.log("shallow spread, nested object -> user.address.city:", val(user.address.city), "(leaked, nested object still shared)");
 
    const deepFixed = { ...user, address: { ...user.address } };
    deepFixed.address.city = "Shymkent";
    console.log("nested level copied too -> user.address.city:", val(user.address.city), "/ deepFixed.address.city:", val(deepFixed.address.city));
  }
 
  // ---------- 6. Functions ----------
  function task6(){
    function isEven(number) { return number % 2 === 0; }
    const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;
    function calculatePrice(price, quantity) { return price * quantity; }
    const calculateDiscount = (price, percent) => price - (price * percent) / 100;
    function getMax(a, b) { return a > b ? a : b; }
 
    console.log("isEven(4):", val(isEven(4)));
    console.log('getFullName("Ali", "Nur"):', val(getFullName("Ali", "Nur")));
    console.log("calculatePrice(2500, 3):", val(calculatePrice(2500, 3)));
    console.log("calculateDiscount(2000, 15):", val(calculateDiscount(2000, 15)));
    console.log("getMax(7, 12):", val(getMax(7, 12)));
  }
 
  // ---------- 7. Functions as values ----------
  function task7(){
    const add = (a, b) => a + b;
    const multiply = (a, b) => a * b;
    function calculate(a, b, operation) { return operation(a, b); }
 
    console.log("calculate(5, 3, add):", val(calculate(5, 3, add)));
    console.log("calculate(5, 3, multiply):", val(calculate(5, 3, multiply)));
    console.log("typeof add:", typeof add);
    console.log("typeof add(1, 1):", typeof add(1, 1));
  }
 
  // ---------- 8. Scope ----------
  function task8(){
    const message = "global";
    console.log("global message:", message);
 
    function showScopes() {
      let message = "function";
      console.log("  inside function, before block:", message);
      if (true) {
        let message = "block";
        console.log("    inside if-block:", message);
      }
      console.log("  inside function, after block:", message, "(block-scoped message did not leak out)");
    }
    showScopes();
    console.log("global message, unaffected:", message);
 
    {
      var leaked = "var leaks out of the block";
      let contained = "let stays inside the block";
    }
    console.log("var read outside its block:", val(leaked));
    try {
      console.log("let read outside its block:", contained);
    } catch (e) {
      console.log("let read outside its block: ReferenceError, 'contained' is not defined here");
    }
  }
 
  // ---------- 9. Closure ----------
  function task9(){
    function createCounter() {
      let count = 0;
      return function () {
        count += 1;
        return count;
      };
    }
 
    const counterA = createCounter();
    console.log("counterA():", counterA());
    console.log("counterA():", counterA());
    console.log("counterA():", counterA());
 
    const counterB = createCounter();
    console.log("counterB(), a fresh counter:", counterB(), "(own independent count)");
 
    function createAdder(value) {
      return function (n) { return n + value; };
    }
    const addFive = createAdder(5);
    console.log("addFive(10):", addFive(10));
    console.log("addFive(20):", addFive(20));
  }
 
  // ---------- 10. Destructuring, spread, rest ----------
  function task10(){
    const numbers = [10, 20, 30, 40];
    const [first, second] = numbers;
 
    const user = { id: 1, name: "Anna", age: 21 };
    const { name, age } = user;
 
    const withExtra = [...numbers, 50];
    const olderUser = { ...user, age: 22 };
    const userWithEmail = { ...user, email: "anna@example.com" };
    const combined = [...[1, 2, 3], ...[4, 5, 6]];
 
    function sum(...nums) { return nums.reduce((total, n) => total + n, 0); }
 
    console.log("[first, second]:", val(first), val(second));
    console.log("{ name, age }:", val(name), val(age));
    console.log("numbers + 50 (new array):", val(withExtra));
    console.log("user with age 22 (new object):", val(olderUser));
    console.log("user with email (new object):", val(userWithEmail));
    console.log("combined arrays:", val(combined));
    console.log("sum(1, 2):", sum(1, 2));
    console.log("sum(1, 2, 3, 4):", sum(1, 2, 3, 4));
    console.log("originals untouched:", val(numbers), val(user));
  }
 
  // ---------- 11. Optional chaining and defaults ----------
  function task11(){
    const userWithAddress = { name: "Bek", address: { city: "Almaty" } };
    const userWithoutAddress = { name: "Nurlan" };
 
    try {
      const c = userWithoutAddress.address.city;
      console.log("user.address.city without optional chaining:", c);
    } catch (e) {
      console.log("user.address.city without optional chaining: TypeError, cannot read city of undefined");
    }
 
    console.log("userWithAddress?.address?.city:", val(userWithAddress?.address?.city));
    console.log("userWithoutAddress?.address?.city:", val(userWithoutAddress?.address?.city));
    console.log("with ?? fallback:", val(userWithoutAddress?.address?.city ?? "City not specified"));
 
    [0, "", false, null, undefined].forEach(v => {
      console.log(`${val(v)} || "fallback" ->`, val(v || "fallback"));
    });
    [0, "", false, null, undefined].forEach(v => {
      console.log(`${val(v)} ?? "fallback" ->`, val(v ?? "fallback"));
    });
  }
 
  // ---------- Final task ----------
  function taskf(){
    const students = [
      { id: 1, name: "Anna", age: 20, grades: [85, 90, 78] },
      { id: 2, name: "John", age: 22, grades: [60, 65, 58] },
      { id: 3, name: "Sara", age: 21, grades: [91, 95, 89] },
      { id: 4, name: "Mike", age: 23, grades: [55, 48, 60] },
      { id: 5, name: "Dana", age: 20, grades: [72, 80, 76] },
    ];
 
    const getAverage = (grades) => grades.reduce((sum, g) => sum + g, 0) / grades.length;
    const getStudentAverage = (student) => getAverage(student.grades);
    const getPassedStudents = (list) => list.filter(s => getStudentAverage(s) >= 70);
    const getStudentNames = (list) => list.map(s => s.name);
    const findStudent = (list, id) => list.find(s => s.id === id);
    const getTopStudent = (list) => list.reduce((best, s) =>
      getStudentAverage(s) > getStudentAverage(best) ? s : best, list[0]);
 
    const summary = students.map(s => ({
      id: s.id,
      name: s.name,
      average: Math.round(getStudentAverage(s) * 10) / 10,
      passed: getStudentAverage(s) >= 70
    }));
 
    console.log("passed students:", val(getStudentNames(getPassedStudents(students))));
    console.log("all names:", val(getStudentNames(students)));
    console.log("findStudent(id=3):", val(findStudent(students, 3)));
    console.log("top student:", val(getTopStudent(students).name));
    console.log("summary:", val(summary));
    console.log("original students untouched:", val(getStudentNames(students)));
  }
 
  render("1", task1);
  render("2", task2);
  render("3", task3);
  render("4", task4);
  render("5", task5);
  render("6", task6);
  render("7", task7);
  render("8", task8);
  render("9", task9);
  render("10", task10);
  render("11", task11);
  render("f", taskf);
 
  // ---------- small human touches: tabs, copy button, accents, scroll UI ----------
 
  // build each editor tab: three dots + filename + a working copy button
  document.querySelectorAll(".tab-name-wrap").forEach((el) => {
    const file = el.getAttribute("data-file") || "code.js";
    el.innerHTML =
      '<span class="dots"><span></span><span></span><span></span></span>' +
      `<span class="tab-name">${file}</span>` +
      '<button type="button" class="copy-btn">copy</button>';
 
    const btn = el.querySelector(".copy-btn");
    btn.addEventListener("click", () => {
      const codeEl = el.closest(".editor").querySelector("pre.code");
      const text = codeEl ? codeEl.innerText : "";
      const done = () => {
        btn.textContent = "copied";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "copy"; btn.classList.remove("copied"); }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  });
 
  // cycle a subtle accent color per task section, purely cosmetic
  document.querySelectorAll("section.task").forEach((sec, i) => {
    sec.setAttribute("data-accent", String((i % 3) + 1));
  });
 
  // reading-progress bar at the top of the page
  const progressFill = document.getElementById("progressFill");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    if (progressFill) progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
 
  // highlight the current section's link in the table of contents
  const tocLinks = Array.from(document.querySelectorAll("nav.toc a"));
  const linkByHash = new Map(tocLinks.map(a => [a.getAttribute("href"), a]));
  if ("IntersectionObserver" in window && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = linkByHash.get("#" + entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll("section.task").forEach(sec => observer.observe(sec));
  }
 
})();