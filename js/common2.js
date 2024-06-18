document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.body.classList.add('sidenav-pinned')
      document.body.classList.add('ready')
    }, 200)
  })
  


function tip(min){


    const sdjf = document.querySelector('.toast-body').innerHTML = min
    const tipdiv  = new bootstrap.Toast(document.querySelector('#myToast'),{
        delay:1500
    })

    tipdiv.show()

  
}

// 设置基地址
axios.defaults.baseURL='http://ajax-api.itheima.net'

