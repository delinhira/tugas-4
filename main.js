printYear();

let editID

class Student {
    constructor (id, name, bdate, age, gender) {
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
        if (/^[A-Za-z]+$/.test(studentName)) {
            this.name = studentName;
        } else {
            throw Error('Bad Name');
        }
    }

    set setAge (studentAge) {
        if (!isNaN(studentAge) && studentAge > 0 && studentAge < 100) {
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
        if (findHobby) {
            let index = this.hobbies.indexOf(findHobby)
            this.hobbies.splice(index, 1)
        } else return 'denied';
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

let students = [
    new Student ('123','blossom','10/11/1999','20','female'),
    new Student ('234','bubble','01/02/2001','19', 'female')
];

students[0].addHobby('reading')
students[0].addHobby('painting')
students[0].addHobby('eating')
students[1].addHobby('drawing')
students[1].addHobby('eating')
students[1].addHobby('sleeping')

let Delin = new Student ('Delinda', '24', '20 Juni', 'female', 'id123');
Delin.addHobby('reading')
Delin.addHobby('eating')
Delin.addHobby('sleeping')

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
    let hobbies = inputHobby();

    console.log(id, name, bdate, age, gender)

    if (id && name && bdate && gender) {
        let student = new Student(name, age, bdate, gender, id);
        // student.addHobby(hobby);
        students.push(student);
        printData(id, name, bdate, age, gender, hobbies);
        $('#new-student').modal('hide')
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
    let warning = document.getElementById('warningID');
    
    if (!id) {
        warning.classList.remove('d-none');
        warning.innerText = 'Must be Filled.'
    } else {
        let findID = students.find( student => student.id == id)
        if (findID) {
            warning.classList.remove('d-none');
            warning.innerText = 'ID must be unique.'
        } else {
            warning.classList.add('d-none');
            return id;
        }
    }
}

const inputName = () => {
    let name = document.querySelector('#inputName').value;
    let warning = document.getElementById('warningName');

    if (!name) {
        warning.classList.remove('d-none');
        warning.innerText = 'Must be Filled.'
    } else if (/^[A-Za-z]+$/.test(name)) {
        warning.classList.add('d-none');
        return name;
    } else {
        warning.classList.remove('d-none');
        warning.innerText = 'Must be consisted of alphabet only.'
    }
}

const inputBdate = () => {
    let date = document.querySelector('#inputDate').value;
    let month = document.querySelector('#inputMonth').value;
    let year = document.querySelector('#inputYear').value;
    let warning = document.getElementById('warningBdate');
    
    if (!date || !month || !year) {
        warning.classList.remove('d-none');
    } else {
        warning.classList.add('d-none');
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
        printData(id, name, bdate, age, gender, hobbies);
    })
}

const inputHobby = () => {
    let hobby = document.querySelector('#hobbyItem').value;

    if (!hobby) {
        return null;
    } else {
        return hobby;
    }
}

const printData = (id, name, bdate, age, gender, hobbies) => {
        let table = document.querySelector('#student-list');
        let row = table.insertRow(1)

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
        cell7.innerHTML = `<button class="btn btn-success" id="${id}" data-toggle="modal" data-target="#edit-menu" onclick="editButton(this.id)">Edit</button>`;
}

const editButton = (buttonID) => {
    editID = buttonID
}

const findID = () => {
    let findID = students.find( student => student.id == editID)
    let index = students.indexOf(findID)
    return index;
}

const hideMenu = () => {
    $('#edit-menu').modal('hide')
}

const changeName = () => {
    let inputName = document.querySelector('#inputNewName').value
    let warning = document.getElementById('warningNewName')

    if (!inputName) {
        warning.classList.remove('d-none');
    } else {
        let index = findID();
        students[index].setName = inputName;

        warning.classList.add('d-none');
        $('#set-name').modal('hide')
        document.getElementById('changeSuccess').classList.remove('d-none')
    }
}

const changeAge = () => {
    let inputAge = document.querySelector('#inputNewAge').value
    let warning = document.getElementById('warningNewAge')

    if (!inputAge) {
        warning.classList.remove('d-none');
    } else {
        let index = findID();
        students[index].setAge = inputAge;

        warning.classList.add('d-none');
        $('#set-age').modal('hide')
        document.getElementById('changeSuccess').classList.remove('d-none')
    }
}

const changeGender = () => {
    let gender = document.querySelector('input[name="newGender"]:checked').value

    let index = findID();
    students[index].setGender = gender;

    $('#set-gender').modal('hide')
    document.getElementById('changeSuccess').classList.remove('d-none')
}

const addHobby = () => {
    let inputHobby = document.querySelector('#inputNewHobby').value
    let warning = document.getElementById('warningNewHobby')

    if (!inputHobby) {
        warning.classList.remove('d-none');
    } else {
        let index = findID();
        students[index].addHobby(inputHobby);

        warning.classList.add('d-none');
        $('#add-hobby').modal('hide')
        document.getElementById('changeSuccess').classList.remove('d-none')
    }
}

const removeHobby = () => {
    let inputHobby = document.querySelector('#inputRemoveHobby').value
    let warning = document.getElementById('warningRemoveHobby1')

    if (!inputHobby) {
        warning.classList.remove('d-none');
        warning.innerText = 'Must be Filled.'
    } else {
        let index = findID();
        let check = students[index].removeHobby(inputHobby);

        if (!check) {
            warning.classList.add('d-none');
            $('#remove-hobby').modal('hide')
            document.getElementById('changeSuccess').classList.remove('d-none')
        } else {
            warning.classList.remove('d-none');
            warning.innerText = 'Data does not exist.'
        }
    }
}

const showHobbies = () => {
    let findID = students.find( student => student.id == editID)
    let index = students.indexOf(findID)
    let hobby = document.querySelector('#hobbiesDisplay')
    hobby.innerText = 'Hobbies: ' + students[index].hobbies
}

studentList();