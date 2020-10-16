class Student {
    constructor (name, age, bdate, gender, id) {
        this.name = name;
        this.age = age;
        this.bdate = bdate;
        this.gender = gender;
        this.id = id;
        this.hobbies = [];

        Student._amount = Student._amount || 0;
        Student._amount++
    }

    set setName (studentName) {
        if (/[A-Za-z]/.test(studentName)) {
            [this.name] = studentName;
        } else {
            throw Error('Bad Name');
        }
    }

    set setAge (studentAge) {
        if (!isNaN(studentAge) && studentAge > 0 && studentAge < 100) {
            [this.age] = studentAge;
        } else {
            throw Error('Bad Age');
        }
    }

    set setGender (studentGender) {
        if (studentGender) {
            [this.gender] = studentGender;
        } else {
            throw Error('Bad Gender');
        }
    }

    addHobby (hobby) {
        return this.hobbies.push(hobby);
    }

    removeHobby (hobby) {

    }

    get getData () {
        return `Name = ${this.name}
                Age = ${this.age}
                Birthday = ${this.bdate}
                Gender = ${this.gender}
                ID = ${this.id}
                Hobbies = ${this.hobbies}`;
    }
  
}

let Delin = new Student ('Delin', '24', '20 Juni', 'female', 'id123');
