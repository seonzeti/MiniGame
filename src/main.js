
//JSON File에 들어있는 items를 받아올 것 
function loadItems(){ 
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

//Update the list with the given items
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

//Create HTML list item from the given data item 
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__descripton">${item.gender},${item.size}</span>
    </li> 
    `;
}

function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    //해당하지 않는 경우에는 함수를 끝냄 
    if (key == null || value == null){
        return; 
    }

    const filtered = items.filter(item => item[key] === value)
    console.log(filtered);
    displayItems(filtered);
}

function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event,items));
}

//Main (아이템들을 동적으로 받아와서 성공적으로 값을 전달받으면, display 하고 set함)
loadItems()
.then(items => {

    displayItems(items);
    setEventListeners(items);
    
})
.catch(console.log);