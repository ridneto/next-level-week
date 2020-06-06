function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( response => response.json() )
        .then( states => {
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`;
            }
        });
}

populateUF()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.disabled = false;
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";

    fetch(url)
        .then( response => response.json() )
        .then( cities => {
            
            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`;
            }
        });
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

// itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectItems = document.querySelector("[name=items]")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = itemLi.dataset.id;
    
    itemLi.classList.toggle("selected")

    const indexItem = selectedItems.findIndex(item => item == itemId)

    if(indexItem != -1){
        selectedItems.pop(indexItem)
    }else{
        selectedItems.push(itemId)
    }

    collectItems.value = selectedItems
}