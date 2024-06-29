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


 // 渲染名字
 const span = document.querySelector('.media>div>span')

 console.log(span)


 // 判断是否获取到在执行 方法1

 span&&(span.innerHTML=localStorage.getItem('username'))
 
  // 方法2 获取到就更改
  // if(span){
  //   span.innerHTML=localStorage.getItem('username')
  // }



  // 点击 退出
  const logoutdl = document.querySelector('#logout')
  logoutdl&&logoutdl.addEventListener('click',()=>{
     
    localStorage.clear() // 扩展删除本网站所有存储

    location.href='./login.html'
  })


  // 添加请求拦截器   拦截所有请求
  // config 代表 发送请求的相关全部信息
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么  
  // 如果给拦截加请求头 那么所有请求就会有这个请求头
  if(localStorage.getItem('token')){ // 新用户一来没token 所以做个判断
  config.headers.Authorizsation = localStorage.getItem('token') // 因为是一个对象那么既可以点

  }
  return config;   // 如果拦截后不反回，代表发送请求失败
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});  // 避免以后每次发请求都要写请求头



// 响应拦截
axios.interceptors.response.use(function (response) {
  
  return response.data;   // 返回里写什么就返回什么   response 代表响应的数据
}, function (error) {
 // 判断错误是不是401 代表token错误
 if(error.response.status === 401){

  localStorage.clear()
  // 返回登录页并清空token
  location.href = '.login.html'

}
  return Promise.reject(error)
});
 