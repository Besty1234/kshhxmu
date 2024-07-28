
async function loadData () {
    const res = await axios({
      url: '/dashboard',
    //   headers: {
    //     Authorization: localStorage.getItem('token')
    // }
    
    })
    console.log(res)
  
    // 渲染到概览
    initOverView(res.data.overview)
    year(res.data.year)
    salary(res.data.salaryData)
    lined(res.data.groupData)
    initMapChart(res.data.provinceData)
    gender(res.data.salaryData)
  }
  
  loadData()
  
  // 渲染概览数据
  function initOverView (obj) {
    for (const key in obj) {
      document.querySelector(`[name=${key}]`).innerHTML = obj[key]
    }
  }


  // 图标数据

  function year(arr){

    var myChart = echarts.init(document.querySelector('#line'));


    const  option = {
      title:{
        text:'2025流水',
        textStyle:{
          fontSize:16
        },

        top:10,
        left:10,
      },
      xAxis: {
        // 主轴线 类型
        axisLine:{
          
          lineStyle:{
            type:'dashed',
            // color:'red'  颜色 
          }
        },

        type: 'category',
        data: arr.map(elm=> elm.month)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: arr.map(elm=> elm.salary),
          type: 'line',
           lineStyle: {
            color: '#5470C6',
            width: 5
          },
          smooth: 0.6,
          symbolSize: 15,
             areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4a9cee'
              },
              {
                offset: 1,
                color: 'rgba(250,250,250,0)'
              }
            ])
          },
          
          
          
          
        }
      ]
    };
    
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    

  }

  // 饼图
  function salary(salaryData){

    var myChart = echarts.init(document.querySelector('#salary'));

   const option = {
      title:{
        // 标题位置
        top:10,
        left:10,
        text:'班级薪资亲狂',

        textStyle:{
          // 标题大小
          fontSize:15
        },

      },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom:'0',
      left: 'center'
    },
    // 颜色
    color:['#fda224','#5097ff','#3abcfa','#34d39a'],
    
    series: [
      {
        name: '班级薪资',
        type: 'pie',
        // 园空心
        radius: ['55%', '70%'],
        
        center:['50%','45%'],   //圆的位置
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
      
        labelLine: {
          show: false
        },
        
        // 因为他本身返回的就是一个数组所以没不要加[]
        data: salaryData.map(eml=>{
            return {
              name:eml.label,
              value: eml.b_count +eml.g_count
            }
          }),
        
        // data: [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ]
      }
    ]
  };
  myChart.setOption(option);

  }

  function lined(groupData){

    // 点击
    const btns = document.querySelector('#btns')
    btns.addEventListener('click',(e)=>{
      if(e.target.classList.contains('btn')){
        document.querySelector('.btn-blue').classList.remove('btn-blue')
        e.target.classList.add('btn-blue')
        const index = e.target.dataset.index

  
    /*
        var myChart = echarts.init(document.querySelector('#lines'));


        const option = {
          xAxis: {
            type: 'category',
            data: groupData[index].map(v=> v.name),
            //  x轴 类型 颜色
               axisLine:{
                  lineStyle:{
                    type:'dashed',
                    color:'#a5a5a5'
                  }
                },
          },
          yAxis: {
            type: 'value',
            
            // y 轴类型
             splitLine:{
               lineStyle:{
                 type:'dashed'
               }
             }
          },
          series: [
          
             {
              data:groupData[index].map(v=> v.hope_salary),
              type: 'bar',
              //渐变背景
                   itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#34d39a' },
                  { offset: 1, color: 'rgba(56,212,156,.3)' },
               
                ])
              },
            },
              {
              data: groupData[index].map(v=> v.salary),
              type: 'bar',
                  itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#50a3ee' },
                  { offset: 1, color: 'rgba(76,160,238,.3)' },
               
                ])
              },
            },
          ]
        };
    
        myChart.setOption(option);
        */

        // 方法2.
        option.xAxis.data=groupData[index].map(v=> v.name)
        option.series[0].data=groupData[index].map(v=> v.hope_salary)
        option.series[1].data=groupData[index].map(v=> v.salary)


        myChart.setOption(option);  


      }
    })

    var myChart = echarts.init(document.querySelector('#lines'));


    const option = {
      xAxis: {
        type: 'category',
        data: groupData[1].map(v=> v.name),
        //  x轴 类型 颜色
           axisLine:{
              lineStyle:{
                type:'dashed',
                color:'#a5a5a5'
              }
            },
      },
      yAxis: {
        type: 'value',
        
        // y 轴类型
         splitLine:{
           lineStyle:{
             type:'dashed'
           }
         }
      },
      series: [
      
         {
          data:groupData[1].map(v=> v.hope_salary),
          type: 'bar',
          //渐变背景
               itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#34d39a' },
              { offset: 1, color: 'rgba(56,212,156,.3)' },
           
            ])
          },
        },
          {
          data: groupData[1].map(v=> v.salary),
          type: 'bar',
              itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#50a3ee' },
              { offset: 1, color: 'rgba(76,160,238,.3)' },
           
            ])
          },
        },
      ]
    };

    myChart.setOption(option);

  }


  function initMapChart(provinceData){
    
    const myEchart = echarts.init(document.querySelector('#map'))
    const dataList = [
      { name: '南海诸岛', value: 0 },
      { name: '北京', value: 0 },
      { name: '天津', value: 0 },
      { name: '上海', value: 0 },
      { name: '重庆', value: 0 },
      { name: '河北', value: 0 },
      { name: '河南', value: 0 },
      { name: '云南', value: 0 },
      { name: '辽宁', value: 0 },
      { name: '黑龙江', value: 0 },
      { name: '湖南', value: 0 },
      { name: '安徽', value: 0 },
      { name: '山东', value: 0 },
      { name: '新疆', value: 0 },
      { name: '江苏', value: 0 },
      { name: '浙江', value: 0 },
      { name: '江西', value: 0 },
      { name: '湖北', value: 0 },
      { name: '广西', value: 0 },
      { name: '甘肃', value: 0 },
      { name: '山西', value: 0 },
      { name: '内蒙古', value: 0 },
      { name: '陕西', value: 0 },
      { name: '吉林', value: 0 },
      { name: '福建', value: 0 },
      { name: '贵州', value: 0 },
      { name: '广东', value: 0 },
      { name: '青海', value: 0 },
      { name: '西藏', value: 0 },
      { name: '四川', value: 0 },
      { name: '宁夏', value: 0 },
      { name: '海南', value: 0 },
      { name: '台湾', value: 0 },
      { name: '香港', value: 0 },
      { name: '澳门', value: 0 },
    ]
    // 替换数据
    dataList.forEach(v=>{

      // find 拥有返回本身 没有就undfei
     const res = provinceData.find(k=>{
      // indexOf 判断是否包含这个数据 ，包返下标，不包反-1
      // console.log(k.name.indexOf(v.name) !==-1); 判断语句 表达式
      return  k.name.indexOf(v.name) !==-1

      })

      //相同才进来

      if(res){
        v.value = res.value
      }
       
    })

    let option = {
      title: {
        text: '籍贯分布',
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} 位学员',
        borderColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0.5)',
        textStyle: {
          color: '#fff',
        },
      },
      visualMap: {
        min: 0,
        max: 6,
        left: 'left',
        bottom: '20',
        text: ['6', '0'],
        inRange: {
          color: ['#ffffff', '#0075F0'],
        },
        show: true,
        left: 40,
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.0,
        label: {
          normal: {
            show: true,
            fontSize: '10',
            color: 'rgba(0,0,0,0.7)',
          },
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            color: '#e0ffff',
          },
          emphasis: {
            areaColor: '#34D39A',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      series: [
        {
          name: '籍贯分布',
          type: 'map',
          geoIndex: 0,
          data: dataList,
        },
      ],
    }
    myEchart.setOption(option)
  }

  function gender(salaryData){

    const myEchart = echarts.init(document.querySelector('#gender'))
    option = {
      title: [
       
        {
           left:'center',
          top:205,
          text:'男'
        },
        {
           left:'center',
           bottom:10,
          subtext:'女',
          
          subtextStyle:{
            color:'#000',
            fontSize:18,
            
          }
        },
       
        
        ],
      tooltip: {
        trigger: 'item'
      },
     
      series: [
        {
          type: 'pie',
          radius: ['40%','30%'],
          center:['50%','20%'],
          data: salaryData.map(v=>{
            return {
              value:v.g_count,
              name:v.label
            }
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          type: 'pie',
          radius: ['40%','30%'],
          center:['50%','71%'],
          data: salaryData.map(v=>{
            return {
              value:v.b_count,
              name:v.label
            }
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myEchart.setOption(option)

  }

