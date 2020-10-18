// printYear();

let i = 1;
let students = [
    {
        id:'123',
        name: 'blossom',
        bdate: '10/11/1999',
        age:'20',
        gender: 'female',
        hobbies: ['reading', 'painting', 'eating']
    },
    {
        id:'234',
        name: 'bubble',
        bdate: '01/02/2001',
        age:'19',
        gender: 'female',
        hobbies: ['drawing', 'eating', 'sleeping']
    }
];

class Student {
    constructor (name, age, bdate, gender, id) {
        this.name = name;
        // this.lastName = lastName
        this.age = age;
        this.bdate = bdate;
        this.gender = gender;
        this.id = id;
        this.hobbies = [];

        Student._amount = Student._amount || 0;
        Student._amount++
    }

    set setName (studentName) {
        if (/^[A-Za-z]+$/.test(studentName)) {
            this.name = studentName;
        } else {
            throw Error('Bad Name');
        }
    }

    set setAge (studentAge) {
        if (!isNaN(studentAge) && studentAge > 0 && studentAge < 100) {
        // if (/^[0-9]+$/.test(studentAge)) {
            this.age = studentAge;
        } else {
            throw Error('Bad Age');
        }
    }

    set setGender (studentGender) {
        if (studentGender === 'female' || studentGender === 'male') {
            this.gender = studentGender;
        } else {
            throw Error('Bad Gender');
        }
    }

    addHobby (hobby) {
        return this.hobbies.push(hobby);
    }

    removeHobby (thehobby) {
        let findHobby = this.hobbies.find(hobby => hobby === thehobby)
        console.log(findHobby)
        if (findHobby) {
            // let index = this.hobbies.indexOf(findHobby)
            this.hobbies.splice(this.hobbies.indexOf(findHobby), 1)
        } else console.log('test')
    }

    get getData () {
        console.log(`
        Name = ${this.name}
        Age = ${this.age}
        Birthday = ${this.bdate}
        Gender = ${this.gender}
        ID = ${this.id}
        Hobbies = ${this.hobbies}`);
    }
  
}

// let Delin = new Student ('Delinda', '24', '20 Juni', 'female', 'id123');
// Delin.addHobby('reading')
// Delin.addHobby('eating')
// Delin.addHobby('sleeping')

// const addHobbyField = () => {
//     let hobbyList = document.querySelector('#hobbyList');
//     let hobbyItem = document.createElement('div');
//     hobbyItem.innerHTML = `<input type="text" class="form-control" id="hobbyItem${i}"></input>`;
//     hobbyList.appendChild(hobbyItem);
//     i++
// }

const dataSubmit = () => {
    console.log("data submit")

    let id = inputID();
    let name = inputName();
    let [bdate, age] = inputBdate();
    let gender = inputGender();
    
    // let hobby = document.querySelector('#hobbyItem').value;

    console.log(id, name, bdate, age, gender)

    if (id && name && bdate && gender) {
        let student = new Student(name, age, bdate, gender, id);
        // student.addHobby(hobby);
        students.push(student);
    }

}

const ageCount = (inputBdate) => {
    let bdate = inputBdate.split('/');
    let today = new Date;
    let age = today.getFullYear() - bdate[2];

    if (bdate[1] == (today.getMonth()+1)) {
        if (bdate[0] > (today.getDate())) age--;
    }
    else if (bdate[1] > (today.getMonth()+1)) age--;

    return age;
}

const inputID = () => {
    let id = document.querySelector('#inputID').value;
    let warning = document.querySelector('#id-warning');
    
    if (!id) {
        warning.innerText = `Must be filled.`;
    } else {
        warning.innerText = '';
        return id;
    }
}

const inputName = () => {
    let name = document.querySelector('#inputName').value;
    let warning = document.querySelector('#name-warning');

    if (!name) {
        warning.innerText = `Must be filled.`;
    } else if (/^[A-Za-z]+$/.test(name)) {
        warning.innerText = '';
        return name;
    } else {
        warning.innerText = `Must be consisted of alphabet only.`;
    }
}

const inputBdate = () => {
    let date = document.querySelector('#inputDate').value;
    let month = document.querySelector('#inputMonth').value;
    let year = document.querySelector('#inputYear').value;
    let warning = document.querySelector('#bdate-warning');
    

    if (!date || !month || !year) {
        warning.innerText = `Must be filled.`;
    } else {
        warning.innerText = '';
        let bdate = `${date}/${month}/${year}`;
        let age = ageCount(bdate);
        return [bdate, age];
    }
}

const inputGender = () => {
    let gender = document.querySelector('input[name="gender"]:checked').value
    return gender
}

const studentList = () => {
    students.map((student) => {
        const { id, name, bdate, age, gender, hobbies } = student
        let table = document.querySelector('#student-list');
        let row = table.insertRow(i)

        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)
        let cell5 = row.insertCell(4)
        let cell6 = row.insertCell(5)
        let cell7 = row.insertCell(6)

        cell1.innerText = id;
        cell2.innerText = name;
        cell3.innerText = gender;
        cell4.innerText = age;
        cell5.innerText = bdate
        cell6.innerText = hobbies;
        cell7.innerHTML = '<button class="btn btn-light" id="edit-' + id + '" onclick="">Add Hobby</button>';
    })
    
}