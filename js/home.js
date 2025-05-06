const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sAtividade = document.querySelector('#m-atividade')
const sPrazo = document.querySelector('#m-prazo')
const sProgresso = document.querySelector('#m-progresso')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sAtividade.value = itens[index].atividade
    sPrazo.value = itens[index].prazo
    sProgresso.value = itens[index].progresso
    id = index
  } else {
    sAtividade.value = ''
    sPrazo.value = ''
    sProgresso.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.atividade}</td>
    <td>${item.prazo}</td>
    <td>${item.progresso}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sAtividade.value == '' || sPrazo.value == '' || sProgresso.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].atividade = sAtividade.value
    itens[id].prazo = sPrazo.value
    itens[id].progresso = sProgresso.value
  } else {
    itens.push({'atividade': sAtividade.value, 'prazo': sPrazo.value, 'progresso': sProgresso.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()