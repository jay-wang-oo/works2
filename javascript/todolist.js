let data = []

const btn_add = document.querySelector('.btn_add')
const txt = document.querySelector('.txt')
const list = document.querySelector('.list')

// 新增
btn_add.addEventListener('click', (e) => {
  e.preventDefault()
  const obj  = {
    content: txt.value,
    id: new Date().getTime(),
    checked: '',
  }
  if(txt.value.trim() == '') {
    alert('請輸入代辦事項')
    return
  }
  txt.value = ''
  data.push(obj)
  uptabData(data)
})

// 渲染
function render (listData) {
  let str = ''
  listData.forEach(item => {
    str += `
      <li data-id="${item.id}">
        <label class="checkbox" for=""><input type="checkbox" ${item.checked}/><span>${item.content}</span></label>
        <a href="#" class="delete"></a>
      </li>
    `
  })
  list.innerHTML = str
}

// 刪除
list.addEventListener('click', (e) => {
  e.preventDefault()
  const targetId = e.target.closest('li').getAttribute('data-id')

  if (e.target.getAttribute('class') === 'delete') {
    const num = data.findIndex(item => item.id == targetId)
    data.splice(num, 1)
  } else {
    data.forEach(item => {
      if (item.id == targetId) {
        if (item.checked === 'checked') {
          item.checked = ''
        } else {
          item.checked = 'checked'
        }
      }
    })
  }

  uptabData(data)
})

// tab 按鈕
const tab = document.querySelector('.tab')
let tabName = 'all'

tab.addEventListener('click', (e) => {
  e.preventDefault()
  tabName = e.target.closest('li').getAttribute('data-tab')

  const tabs = document.querySelectorAll('.tab li')
  tabs.forEach(item => item.classList.remove('active'))

  e.target.setAttribute('class', 'active')

  uptabData(data)
})

// tab 切換
function uptabData() {
  let dataNew = []

  if(tabName == 'all') {
    dataNew = data
  } else if (tabName == 'reversoContext') {
    dataNew = data.filter(item => item.checked == '')
  } else if (tabName == 'Context') {
    dataNew = data.filter(item => item.checked == 'checked')
  }

  // 待完成項目
  const todoNum = document.querySelector('#todoNum')
  let todoLength = data.filter(item => item.checked == '')
  todoNum.textContent = todoLength.length

  render(dataNew)
}

// 清除已完成
const deleteAll = document.querySelector('#deleteAll')
deleteAll.addEventListener('click', (e) => {
  data = data.filter(item => item.checked !== 'checked')
  uptabData(data)
})