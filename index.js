class Wildlife {
    constructor(animal, type) {
        this.animal = animal;
        this.type = type;
    }
}

class Reserve {
    constructor(id, animal) {
        this.id = id;
        this.animal = animal;
        this.wildlifes = [];
    }

    addWildlife(wildlife) {
        this.wildlifes.push(wildlife);
    }

    deleteWildlife(wildlife) {
        let index = this.wildlifes.indexOf(wildlife);
        this.wildlifes.splice(index, 1);
    }
}

let reserves = [];
let reserveId = 0;

onClick('new-reserve', () => {
    reserves.push(new Reserve(reserveId++, getValue('new-reserve-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let reserveDiv = document.getElementById('reserve');
    clearElement(reserveDiv);
    for (let reserve of reserves) {
        let table = createReserveTable(reserve);
        let title = document.createElement('h2');
        title.innerHTML = reserve.animal;
        title.appendChild(createDeleteReserveButton(reserve));
        reserveDiv.appendChild(title);
        reserveDiv.appendChild(table);
        for (let wildlife of reserve.wildlifes) {
            createWildlifeRow(reserve, table, wildlife);
        }
    }
}

function createWildlifeRow(reserve, table, wildlife) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = wildlife.animal;
    row.insertCell(1).innerHTML = wildlife.type;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(reserve, wildlife));
}

function createDeleteRowButton(reserve, wildlife) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        reserve.deleteWildlife(wildlife);
        drawDOM();
    };
    return btn;
}

function createDeleteReserveButton(reserve) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Reserve';
    btn.onclick = () => {
        let index = reserves.indexOf(reserve);
        if (index !== -1) {
            reserves.splice(index, 1);
            drawDOM();
        }
    };
    return btn;
}

function createNewWildlifeButton(reserve) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.onclick = () => {
        reserve.addWildlife(new Wildlife(getValue(`animal-input-${reserve.id}`), getValue(`type-input-${reserve.id}`)));
        drawDOM();
    };
    btn.innerHTML = 'Add Wildlife';
    return btn;
}

function createReserveTable(reserve) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let animalColumn = document.createElement('th');
    let typeColumn = document.createElement('th');
    animalColumn.innerHTML = 'Name';
    typeColumn.innerHTML = 'Type';
    row.appendChild(animalColumn);
    row.appendChild(typeColumn);
    let formRow = table.insertRow(1);
    let animalTh = document.createElement('th');
    let typeTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `animal-input-${reserve.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let typeInput = document.createElement('input');
    typeInput.setAttribute('id', `type-input-${reserve.id}`);
    typeInput.setAttribute('type', 'text');
    typeInput.setAttribute('class', 'form-control');
    let newWildlifeButton = createNewWildlifeButton(reserve);
    animalTh.appendChild(nameInput);
    typeTh.appendChild(typeInput);
    createTh.appendChild(newWildlifeButton);
    formRow.appendChild(animalTh);
    formRow.appendChild(typeTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

let id = 0;

document.getElementById('add').addEventListener('click', () => {
    let createDate = new Date();
    let table = document.getElementById('list');
    let row = table.insertRow(1);
    row.setAttribute('id', `item-${id}`);
    row.insertCell(0).innerHTML = document.getElementById('new-task').value;
    row.insertCell(1).innerHTML = `${createDate.getFullYear()} - ${createDate.getMonth() + 1} - ${createDate.getDate()}`
    row.insertCell(2).innerHTML = document.getElementById('new-start-date').value;
    row.insertCell(3).innerHTML = document.getElementById('new-end-date').value;
    let actions = row.insertCell(4);
    actions.appendChild(createDeleteButton(id++));
    document.getElementById('new-task').value = '';
});

function createDeleteButton(id) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.id = id;
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        console.log(`Deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
    }
    return btn;
}
