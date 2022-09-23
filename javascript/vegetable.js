
// JSON 檔案網址
const url = "https://shannon945.github.io/farm_produce/data.json";

const productsList = document.querySelector(".showList");

const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".search-group");
const sortAdvanced = document.querySelector(".js-sort-advanced");

let data = [];
let filterData = []

function getData () {
  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(getData => {
      data = getData
      console.log(data)
      renderData(data)
    })
}
getData()

// 畫面渲染
function renderData (listData) {
  let str = ''
  listData.forEach(item => {
    str += `
      <tr>
        <td>${item.作物名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
      </tr>
    `
  })
  productsList.innerHTML = str
}

// 蔬菜.水果.花卉 3按鈕
buttonGroup.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.nodeName === 'BUTTON') {
    const type = e.target.closest('button').getAttribute('data-type')

    const btnRemove = document.querySelectorAll('.button-group button')
    btnRemove.forEach(item => item.classList.remove('active'))
    e.target.classList.add('active')

    if (type === 'N04') {
      filterData = data.filter(item =>  item.種類代碼 === 'N04' )
    } else if (type === 'N05') {
      filterData = data.filter(item =>  item.種類代碼 === 'N05' )
    } else if (type === 'N06') {
      filterData = data.filter(item =>  item.種類代碼 === 'N06' )
    }
    renderData(filterData)
  }
})

// 作物名稱 搜尋
search.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.nodeName === 'BUTTON') {
    const input = document.querySelector('input')

    if (input.value.trim() == '') {
      alert('請輸入作物名稱！')
      return
    }

    filterData = data.filter(item => item.作物名稱.match(input.value))

    if (filterData.length <= 0) {
      productsList.innerHTML = `<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>`
    } else {
      renderData(filterData)
    }
  }
})

// 作物名稱 排序
sortAdvanced.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.nodeName === 'I') {
    const dataPrice = e.target.closest('i').getAttribute('data-price')
    const dataSort = e.target.closest('i').getAttribute('data-sort')

    if (dataSort == 'up') {
      console.log('1111')
      filterData = data.sort((a, b) => {
        return b[dataPrice] - a[dataPrice]
      })
    } else {
      console.log('2222')
      filterData = data.sort((a, b) => {
        return a[dataPrice] - b[dataPrice]
      })
    }
    renderData(filterData)
  }
})
