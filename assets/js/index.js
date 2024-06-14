class Tarefa{
    textTarefa
    status
    id
    constructor(textTarefa, status, id){
        this.textTarefa = textTarefa;
        this.status = status;
        this.id = id;
    }
}
function renderCards() {
    let tarefas = JSON.parse(localStorage.getItem('Tarefas'));
    let cardList = document.getElementById('card-list'); 
    
    cardList.innerHTML = '';

    tarefas?.forEach(b => {
        cardList.innerHTML += `
                <div class="card">
                <div class="w50">
                    <input type="checkbox" id="checkbox" onclick="AlterarStatus('${b.id}')">
                    <label>${b.textTarefa}</label>
                </div>
                <div class="w50">
                    <button class="edit" onclick="EditTarefa('${b.id}')"><i class='bx bxs-edit'></i></button>
                    <button class="trash" onclick="deleteTarefa('${b.id}')"><i class='bx bxs-trash'></i></button>
                </div>
            </div>
        `
    });
}
function EditTarefa(id) {
    CloseModal()

    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML += `
        <div class="modal" id="modal">
            <div class="box-edit" id="box-edit">
                <div class="btn-exit">
                    <button type="button" id="sair">X</button>
                </div>
                <form action="#">
                    <input type="text" id="newEdit" placeholder="Digite sua Tarefa">
                    <div class="w100">
                        <div class="w50">
                            <button type="button" id="cancelar">Cancelar</button>
                        </div>
                        <div class="w50">
                            <button type="button" onclick="Confirmar('${id}')">Confirmar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `

    let modal = document.getElementById('modal');
    let boxEdit = document.getElementById('box-edit');

    modal.style.display = 'flex';
    boxEdit.style.display = 'block';
    setTimeout(() => { document.addEventListener('click', handleClickOutside, false) }, 200);

    document.getElementById('sair').addEventListener('click', CloseModal);
    document.getElementById('cancelar').addEventListener('click', CloseModal);

}
function AddTarefa() {
    const inputTarefa = document.getElementById('inputTarefa').value;
    let id = Math.random().toFixed(2).slice(2);
    
    const newTarefa = new Tarefa(inputTarefa, false, id);

    let listaTarefa = JSON.parse(localStorage.getItem('Tarefas') ||'[]');

    listaTarefa.push(newTarefa);

    localStorage.setItem('Tarefas', JSON.stringify(listaTarefa))
    renderCards()
}
function Confirmar(id){
    let tarefas = JSON.parse(localStorage.getItem('Tarefas'));
    let tarefa = tarefas.find(b => b.id == id);

    let newEditValue = document.getElementById('newEdit').value;
    tarefa.textTarefa = newEditValue;

    localStorage.setItem('Tarefas', JSON.stringify(tarefas));
    CloseModal();
    renderCards();
}
const handleClickOutside = (event) => {
    let modal = document.getElementById('modal');
    let boxEdit = document.getElementById('box-edit');

    if (!boxEdit.contains(event.target)) {
        modal.style.display = 'none';
        boxEdit.style.display = 'none'
        document.removeEventListener('click', handleClickOutside, false);
    }
}
function CloseModal() {
    let modal = document.getElementById('modal');
    if (modal) {
        modal.remove();
        document.removeEventListener('click', handleClickOutside, false);
    }
}

function AlterarStatus(id) {
    let tarefas = JSON.parse(localStorage.getItem('Tarefas'));
   
    let tarefa = tarefas ? tarefas.find(b => b.id == id) : undefined;
    
    if (tarefa.status === false) {
        tarefa.status = true;
    } else if (tarefa.status === true) {
        tarefa.status = false;
    }

    localStorage.setItem('Tarefas', JSON.stringify(tarefas));
}
function deleteTarefa(id) {
    let tarefas = JSON.parse(localStorage.getItem('Tarefas'));
   
    tarefas = tarefas.filter(b => b.id !== id);


    localStorage.setItem('Tarefas', JSON.stringify(tarefas));

    renderCards()
}    
renderCards()