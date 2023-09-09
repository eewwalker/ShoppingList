
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const addBtn = document.querySelector('.btn');
const filterInput = document.querySelector('#filter');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
let isEditMode = false;


function displayItems() {
    //when page loads I want to see on page the li items that 
    //are in storage
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemsToDOM(item));
    checkUI();
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (!items.length) {
       clearBtn.style.display = 'none';
       filterInput.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
       filterInput.style.display = 'block';
    }
    isEditMode = false;
    addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`
    addBtn.style.backgroundColor = '#333';
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please add an item');
        return;
    } 
    if (isEditMode) {
        const editTag = itemList.querySelector('.edit-mode');
        removeItemFromStorage(editTag.textContent);
        editTag.remove();
        isEditMode = false;
    } else {
        if (checkForDuplicates(newItem)) {
            alert("Item already in list!");
            itemInput.value = '';
            return;
        }
    }
        addItemsToDOM(newItem);
        addItemToStorage(newItem);
        checkUI();
        itemInput.value = '';   
    
        
      
    }
 
function addItemsToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)
    itemList.appendChild(li);
}
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    
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

function getItemsFromStorage(item) {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null ) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function onClickItem(event) {
    if (event.target.tagName === "I") {
        removeListItem(event.target.parentElement.parentElement)
    }
    if (event.target.tagName === "LI") {
        editMode(event.target);
    }
    // else {
    //     editMode(event.target);
    // }
}

function removeListItem(item) {
//if (event.target.parentElement.classList.contains('remove-item'))
        if (confirm('Are you sure?')) {
            item.remove();
            removeItemFromStorage(item.textContent);
            checkUI();
        } else {
            return;
        }
        
            
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function clearItems() {
[...itemList.children].map(ele => ele.remove());
    checkUI();
    // while(itemList.firstChild){
    //     itemList.removeChild(itemList.firstChild);
    // }
    localStorage.removeItem('items');
}

function filterItems(e) {
    const value = e.target.value.toLowerCase();
    const liItems = itemList.querySelectorAll('li');
    liItems.forEach((item)=> {
        //let text = item.textContent.toLowerCase();
        let text = item.firstChild.textContent.toLowerCase();
        if (text.indexOf(value) === -1) {
                item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
        
    })
}

function checkForDuplicates(item) {
    // const liItems = itemList.querySelectorAll('li');
    // for (let i of liItems) {
    //     if (i.textContent === item) {
    //         return true;
    //     }
    // }
    const itemsInStorage = getItemsFromStorage();
    return itemsInStorage.includes(item);
}

function editMode(item) {
    isEditMode = true;
    itemList.querySelectorAll('li')
            .forEach((i) => i.classList.remove('edit-mode'));
    itemInput.value = item.textContent;
    item.classList.add('edit-mode');
    addBtn.innerHTML = `<i class= 'fa-solid fa-pen'></i> Update Item`;
    addBtn.style.backgroundColor = '#228B22';
    return item;
}


function init() {
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    filterInput.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)
    
    checkUI();
}

init();




// target the icon and when the icon is clicked remove the
// li with btn and icon inside of 