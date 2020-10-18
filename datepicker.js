const printMonth = () => {
    var x = document.querySelector('#inputMonth');
    x.innerHTML = '<option selected value="">Month</option>';

    for (let i=1; i<=12; i++) {
        var option = document.createElement('option');
        option.innerHTML = whichMonth(i);
        option.value = i;
        x.add(option);
    }
}

const whichMonth = (month) => {
    switch (month) {
        case 1: return 'January';
        case 2: return 'February';
        case 3: return 'March';
        case 4: return 'April';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'August';
        case 9: return 'September';
        case 10: return 'October';
        case 11: return 'November';
        case 12: return 'December';
        default: return 'yo';
    }
}


const printDate = () => {
    var x = document.querySelector('#inputDate');
    x.innerHTML = '<option selected value="">Date</option>';

    let thisMonth = Number(document.querySelector('#inputMonth').value);

    let monthGroup1 = [1, 3, 5, 7, 8, 10, 12];
    let monthGroup2 = [4, 6, 9, 11];

    const findGroup1 = monthGroup1.find(month => month === thisMonth);
    const findGroup2 = monthGroup2.find(month => month === thisMonth);
    
    if (findGroup1) var dateCounter = 31;
    else if (findGroup2) var dateCounter = 30;
    else { //February
        let thisYear = Number(document.querySelector('#inputYear').value);

        if (thisYear%4 === 0) var dateCounter = 29;
        else var dateCounter = 28;
    }
    
    for (let i=1; i<=dateCounter; i++) {
        var option = document.createElement('option');
        option.text = i;
        x.add(option);
     }
}

const printYear = () => {
    let date = new Date;
    let year = date.getFullYear();

    for (let i=year; i>=1980; i--) {
        var x = document.querySelector('#inputYear');
        var option = document.createElement('option');
        option.text = i;
        x.add(option);
    }
}