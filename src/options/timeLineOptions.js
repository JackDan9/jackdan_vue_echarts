export const timeLineOption = {
    timeline:{
        data:[],
        autoPlay : true,
        playInterval : 1000
    },
    options:[
        {
            /**options 1 */  
            title : {text: '2013'},
            tooltip : {trigger: 'axis'},
            xAxis:{data:['A1','B1','C1']},
            yAxis:{type : 'value'},
            series:[{name: '2013',type: 'bar',data:[11,12,14]}]
        },
        {
            /**options 2 */ 
            title:{text:'2014'},
            xAxis:{data:['A2','B2','C2','D2']},//length=4
            series :[{name: '2014',data:[14,5,56,25]}]
        },
        {
            /**options 3 */  
            title:{text:'2015'},
            xAxis:{data:['A3','B3','C3']},
            series :[{name: '2015',data:[12,45,26]}]
        }
    ]

}