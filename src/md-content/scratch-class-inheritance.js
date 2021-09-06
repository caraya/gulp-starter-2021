/* eslint no-console: 0, no-unused-vars: 0*/
class Employee {
  // default constructor
  constructor(first, last, dept) {
    this.name = {
      first,
      last
    };
    this._dept = dept;
  }

  // Getters and setters

  get dept() {
    return this._dept;
  }

  set dept(newDept) {
    this._dept = newDept;
  }

  // class methods

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  }

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  }
}

let han = new Employee('Han', 'Solo');
han._dept = 'smuggling';
console.log(han.dept);
han.greeting();
// Hi! I'm Han

let leia = new Employee('Leia', 'Organa');
leia._dept = 'politics';
console.log(leia.dept);
leia.farewell();
// Leia has left the building. Bye for now

class SalesPerson extends Employee {
  constructor(first, last, dept, quota) {
    // calls the parent class constructor
    // with only the items we want to
    super(first, last);
    // override the dept item that we didn't
    // take from the constructor
    this.dept = 'sales';
    // set the quota
    this.quota = 100;
  }

  deptWork() {
    console.log(`${this.name.last} works in the ${this.dept}`);
  }
}

let snape = new SalesPerson('Severus', 'Snape');
snape.greeting();
snape.deptWork();
snape.farewell();

class WorkerBee extends Employee {
  constructor(first, last, dept, projects) {
    super(first, last, dept);
    this.projects = [];
  }
}

let newbee = new WorkerBee('buble', 'bee', 'working', 'cleanup')

newbee.greeting();
console.log(newbee.dept);
newbee.farewell();

class Engineer extends WorkerBee {
  constructor(first, last, dept, projects, language) {
    super(first, last, dept, projects);
    this._language = language;
  }

  get language() {
    return this._language;
  }

  set language(newLanguage) {
    this._language = newLanguage;
  }

  programIn() {
    console.log(`${this.name.last} programs in ${this._language}`)
  }
}

let pip = new Engineer('engineer', 'dude', 'SRE', 'DEVOPS');

pip.greeting();
pip._language = 'Go';
pip.programIn();
pip.farewell();
