async function loadData () {
    const res = await axios({
      url: '/dashboard'
    })
    console.log(res)
  
    // 渲染到概览
    initOverView(res.data.overview)
  }
  
  loadData()
  
  // 渲染概览数据
  function initOverView (obj) {
    for (const key in obj) {
      document.querySelector(`[name=${key}]`).innerHTML = obj[key]
    }
  }


