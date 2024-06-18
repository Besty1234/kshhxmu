// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可

function tip(mis){

  // 利用参数 随时改变提示文字
 document.querySelector('.toast-body').innerHTML = mis
  
  const myToast = document.querySelector('#myToast')

  const toast = new bootstrap.Toast(myToast, {
    // 1.5秒消失
    delay: 1500
  })

  toast.show()

 }

 // 设置基地址
 axios.defaults.baseURL='http://ajax-api.itheima.net'