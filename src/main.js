/* global prompt alert */

/**
 * @type {HTMLTextAreaElement}
 */
const script = document.getElementById('script')

/**
 * @type {HTMLButtonElement}
 */
const runBtn = document.getElementsByClassName('runbtn')[0]

/**
 * @type {HTMLButtonElement}
 */
const clsBtn = document.getElementsByClassName('clsbtn')[0]

/**
 * @type {HTMLTableElement}
 */
const mTable = document.getElementsByClassName('table')[0]

const memory = []

clsBtn.addEventListener('click', () => {
  script.value = ''
  mTable.innerHTML =
    '<thead>' +
      '<tr>' +
        '<th>memory</th>' +
      '</tr>' +
    '</thead>'

  memory.length = 0
})

runBtn.addEventListener('click', () => {
  let point = 0
  const src = script.value
  memory.length = 0

  const blocks =
    src
      .split('\n').join(' ')
      .split(' ').join('')
      .split('>')

  blocks.forEach((block) => {
    block = block.trim()
    switch (block) {
      case '~': {
        const ptd = prompt()
        if (isNaN(parseFloat(ptd))) {
          memory[point] = ptd
        } else {
          memory[point] = parseFloat(ptd)
        }
        break
      }

      case '^~': {
        let ptr = point
        if (point > 0) ptr = point - 1

        const ptd = prompt()
        if (isNaN(parseFloat(ptd))) {
          memory[ptr] = ptd
        } else {
          memory[ptr] = parseFloat(ptd)
        }
        break
      }

      case '_~': {
        const ptd = prompt()
        if (isNaN(parseFloat(ptd))) {
          memory[point + 1] = ptd
        } else {
          memory[point + 1] = parseFloat(ptd)
        }
        break
      }

      case '+': {
        memory[point]++
        break
      }

      case '-': {
        memory[point]--
        break
      }

      case '_': {
        point++
        break
      }

      case '^': {
        if (point > 0) point--
        break
      }

      case '^+_': {
        memory[point] = memory[point > 0 ? point - 1 : point] + memory[point + 1]
        break
      }

      case '=': {
        alert(memory[point] || 'null')
        break
      }
    }

    renderTable(point)
  })
})

function renderTable (p) {
  mTable.innerHTML =
    '<thead>' +
      '<tr>' +
        '<th>memory</th>' +
      '</tr>' +
    '</thead><tbody></tbody>'
  for (let i = 0; i < memory.length; i++) {
    const m = memory[i] || 'null'
    mTable.insertRow()
      .innerHTML = '<td>' + m + (i === p ? '*' : '') + '</td>'
  }
}
