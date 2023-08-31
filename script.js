
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const addBtn = document.querySelector('.btn');
const filterInput = document.querySelector('#filter');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');



function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please add an item');
        return;
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(newItem));
        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button)
        itemList.appendChild(li);
        itemInput.value = '';
    }

}

function createButton(classes) {
    const newBtn = document.createElement('button');
    newBtn.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    newBtn.appendChild(icon);
    return newBtn;
}

function createIcon(classes) {
    const newIcon = document.createElement('i');
    newIcon.className = classes;
    return newIcon;
}



itemForm.addEventListener('submit', addItem);





// when submit happens we take the value in the itemInput field
// and create a new li appended to the ul element  