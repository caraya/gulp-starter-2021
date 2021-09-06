class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    alert(`Hi! I'm ${this.name.first}`);
  };

  farewell() {
    alert(`${this.name.first} has left the building. Bye for now!`);
  };

}

class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);
    // subject and grade are specific to Teacher
    this._subject = subject;
    this.grade = grade;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    this._subject = newSubject;
  }
}


let snape = new Teacher('Severus', 'Snape', 58, 'male', ['potions'], 'dark arts', 5);
snape.greeting();
snape.farewell();
