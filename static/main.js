const modal_Q = document.getElementById('Q')
const modal_A = document.getElementById('A')
const modal_submit = document.getElementById('modal_submit')

function check() {

  if (modal_Q.value.trim() !== "" && modal_A.value.trim() !== "") {
    modal_submit.disabled = false
  }
  else {
    modal_submit.disabled = true
  }

}

modal_Q.addEventListener('input', check)
modal_A.addEventListener('input', check)


const btn_toggle = document.querySelectorAll('.toggle')
btn_toggle.forEach(button => {

  let isCheck = false

  button.addEventListener('click', () => {

    const card = button.closest('.card');
    isCheck = !isCheck
    const answer = card.querySelector('.answer')

    if (isCheck) {
      answer.style.display = 'inline-block'
    }
    else {
      answer.style.display = 'none'
    }

  })

})




const edit_btn = document.querySelectorAll('.icon_edit')
edit_btn.forEach(button => {

  const card = button.closest('.card');

  const Q_edit = card.querySelector('.question').innerText.trim()
  const A_edit = card.querySelector('.answer').innerText.trim()
  const ID = card.querySelector('.ID').value

  button.addEventListener('click', () => {

    let fill_Q = document.getElementById('Q_edit')
    let fill_A = document.getElementById('A_edit')
    let fill_ID = document.getElementById('ID_edit')

    fill_ID.value = ID
    fill_Q.value = Q_edit
    fill_A.value = A_edit

    const modal_edit_Q = document.getElementById('Q_edit')
    const modal_edit_A = document.getElementById('A_edit')
    const modal_edit_submit = document.getElementById('modal_edit_submit')

    function checkEdit() {


      if ((fill_Q.value.trim() !== "" && fill_A.value.trim() !== "") &&
        (fill_Q.value.trim() !== Q_edit || fill_A.value.trim() !== A_edit)) {
        modal_edit_submit.disabled = false;
      }

      else {
        modal_edit_submit.disabled = true
      }

    }

    modal_edit_Q.addEventListener('input', checkEdit)
    modal_edit_A.addEventListener('input', checkEdit)

  })


})

