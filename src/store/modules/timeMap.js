import axios from 'axios'
import qs from 'qs'

const state = {
    isLoading: true,
    isChoose: true,
    startDateTime: 0,
    endDateTime: parseInt((new Date().getTime())/1000),
    count: 0,
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
    typeIndex: 0,
    typePriceIndex: 0,
    smallStartTime: 0,
    // endTime: (new Date().getTime())/1000,
    isFlesh: false
}

const getters = {}

const actions = {
    fetchTimeLineData ({state, commit}, chartsObj) {
        axios.get('http://192.168.112.100:8080/static/time/time.json')
            .then(
                (res) => {
                    let data = res.data.data
                    let paleData = ((state, data) => {
                        let arr = []
                        arr = data
                        return arr
                    })(state, data)

                    if (state.isLoading) {
                        chartsObj.hideLoading()
                        commit('closeLoading')
                    }

                    if(state.endDateTime.length == 0) {
                        commit('updateEndDateTime', state.endDateTime)
                    } else if(state.endDateTime.length != 0) {
                        paleData.push(state.endDateTime)
                    }
                    
                    chartsObj.setOption({
                        timeline: {
                            data: paleData
                        }
                    }
                )
            }
        )
        .catch((error) => {
            console.log(error)
        })
    },

    fetchLineData ({state, commint}, chartsObj) {
        axios.get('http://192.168.112.100:8080/static/data/line/line.json')
            .then(
                (res) => {
                    let data = res.data.data;
                    let seriesData = ((state, data) => {
                        let arr = []
                        arr = data
                    })(state, data)
                    if (state.isLoading) {
                        chartsObj.hideLoading()
                        commit('closeLoading')
                    }
                    chartsObj.setOption({
                        series: seriesData
                    })
                }
            )
            .catch((error) => {
                console.log(error)   
            })
    },

    fetchColumnData ({state, commit}, chartsObj) {
        let random = parseInt(Math.random() * 10 + 1);
        if(state.typeIndex < 3) {
            axios.get('/orders_carrier?ver=' + random, {params: {from:state.startDateTime, to:state.endDateTime}})
                .then(
                    (res) => {
                        let indexObj = state.typeIndex;
                        let ret = res.data.data;
                        let numberData = ret.number;
                        let countData = ret.count;
                        let priceData = ret.price;
                        if (indexObj == 0) {
                            let showData = countData;
                            let nameData = [];
                            for(let i = 0; i < showData[0].length; i++) {
                                nameData.push(showData[0][i]);
                            }
                            let seriesData = ((state, showData) => {
                                let arr = [];
                                arr = showData.slice(1);
                                return arr
                            })(state, showData)
                            if (state.isLoading) {
                                chartsObj.hideLoading()
                                commit('closeLoading')
                            }
                            chartsObj.setOption({
                                dataset: {
                                    dimensions: nameData,
                                    source: seriesData
                                }
                            })
                        } else if (indexObj == 1) {
                            let showData = numberData;
                            let nameData = [];
                            for(let i = 0; i < showData[0].length; i++) {
                                nameData.push(showData[0][i]);
                            }
                            let seriesData = ((state, showData) => {
                                let arr = [];
                                arr = showData.slice(1);
                                return arr
                            })(state, showData)
                            if (state.isLoading) {
                                chartsObj.hideLoading()
                                commit('closeLoading')
                            }
                            chartsObj.setOption({
                                dataset: {
                                    dimensions: nameData,
                                    source: seriesData
                                }
                            })
                        } else if (indexObj == 2){
                            let showData = priceData;
                            let nameData = [];
                            for(let i = 0; i < showData[0].length; i++) {
                                nameData.push(showData[0][i]);
                            }
                            let seriesData = ((state, showData) => {
                                let arr = [];
                                arr = showData.slice(1);
                                return arr
                            })(state, showData)
                            if (state.isLoading) {
                                chartsObj.hideLoading()
                                commit('closeLoading')
                            }
                            chartsObj.setOption({
                                dataset: {
                                    dimensions: nameData,
                                    source: seriesData
                                }
                            })
                        }
                        
                    }
                )
                .catch((error) => {
                    console.log(error)
                })
            }
            else {
                axios.get('/verify_carrier?ver='+ random, {params: {from:state.startDateTime, to:state.endDateTime}})
                .then(
                    (res) => {
                        let ret = res.data.data;
                        let showData = ret.number;
                        let nameData = [];
                        for(let i = 0; i < showData[0].length; i++) {
                            nameData.push(showData[0][i]);
                        }
                        let seriesData = ((state, showData) => {
                            let arr = [];
                            arr = showData.slice(1);
                            return arr
                        })(state, showData)
                        if (state.isLoading) {
                            chartsObj.hideLoading() 
                            commit('closeLoading')
                        }
                        chartsObj.setOption({
                            dataset: {
                                dimensions: nameData,
                                source: seriesData
                            }
                        })
                    }
                )
                .catch((error) => {
                    console.log(error)
                })
            }

    },
    fetchLineFlightData({state, commit}, chartsObj) {
        /*
        let endTime = parseInt((new Date().getTime())/1000);
        if (state.isFlesh) {
            endTime = endTime + 15*60;
        } else if(!state.isFlesh) {
            endTime = endTime;
        }
        axios.get('/15mins_carrier', {params: {from:state.smallStartTime,to:endTime}})
            .then(
                (res) => {
                    let typePriceIndex = state.typePriceIndex;
                    let ret = res.data.data;
                    let time = [];
                    for (let i = 0; i < ret.ts.length; i++) {
                        let timeNew = new Date(parseInt(ret.ts[i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                        // time.push(timeNew.substring(12));
                        time.push(timeNew);
                    }
                    let seriesData = [];
                    let legendData = [];
                    let nameData = [];
                    let obj = {};
                    if (typePriceIndex == 0) {
                        // chartsObj.clear();
                        for(let key in ret['num15']) {
                            nameData.push(key);
                            if(state.isChoose) {
                                obj[key] = true;
                            } else {
                                obj[key] = false;
                            }
                            
                            legendData.push({
                                name: key,
                                icon: 'bar',
                                textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                            });
                            seriesData.push({
                                name: key,
                                type: 'line',
                                data: ret['num15'][key]
                            })          
                        }
                        if (state.isLoading) {
                            chartsObj.hideLoading()
                            commit('closeLoading')
                        }
                        chartsObj.setOption({
                            legend: {
                                data: legendData,
                                selected: obj
                            },
                            xAxis: {
                                data: time
                            },
                            series: seriesData
                        })
                    } else if (typePriceIndex == 1) {
                        let arr = [];
                        let seriesSumData = [];
                        let sum = 0;
                        for(let num = 0; num < ret['num15']['BE'].length; num ++) {
                            sum = 0;
                            for(let key in ret['num15']) {
                                if(ret['num15'][key][num] == undefined) {
                                    ret['num15'][key][num] = 0;
                                }
                                sum += ret['num15'][key][num] 
                            }
                            arr.push(sum);
                        }
                        seriesSumData.push({
                            // name: key,
                            // name: '',
                            type: 'line',
                            data: arr
                        })
                        // for(let key in ret['numany']) {
                            // nameData.push(key);
                            // if(state.isChoose) {
                            //     obj[key] = true;
                            // } else {
                            //     obj[key] = false;
                            // }
                            // legendData.push({
                            //     name: key,
                            //     icon: 'bar',
                            //     textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'}
                            // });                     
                        // }
                        if (state.isLoading) {
                            chartsObj.hideLoading()
                            commit('closeLoading')
                        }
                    
                        chartsObj.setOption({
                            legend: {       
                                show: false,
                                // data: legendData,
                                // selected: obj
                            },
                            xAxis: {
                                data: time
                            },
                            series: seriesSumData
                        })
                    } else if (typePriceIndex == 2) {
                        for(let key in ret['per']) {
                            nameData.push(key);
                            if(state.isChoose) {
                                obj[key] = true;
                            } else {
                                obj[key] = false;
                            }
                            legendData.push({
                                name: key,
                                icon: 'bar',
                                textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'}
                            });
                            seriesData.push({
                                name: key,
                                type: 'line',
                                data: ret['per'][key]
                            })          
                        }
                        if (state.isLoading) {
                            chartsObj.hideLoading()
                            commit('closeLoading')
                        }
                        chartsObj.setOption({
                            legend: {
                                data: legendData,
                                selected: obj
                            },
                            xAxis: {
                                data: time
                            },
                            series: seriesData
                        })
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            })
    */
    }
}



const mutations = {
    closeLoading (state) {
        state.isLoading = false
    },

    updateStartDateTime(state, timeObj) {
        state.startDateTime = timeObj;
    },

    updateEndDateTime(state, timeObj) {
        state.endDateTime = timeObj;
    },

    openLoading (state) {
        state.isLoading = true
    },

    updateTypeIndex(state, indexObj) {
        state.typeIndex = indexObj
    },

    updateChooseState(state, chooseObj) {
        state.isChoose = chooseObj
    },

    updateSmallStartTime(state, smallStartTimeObj) {
        state.smallStartTime = smallStartTimeObj
    },

    updateFleshTime(state) {
        state.isFlesh = true
    },

    updateTypePriceIndex(state, indexObj) {
        state.typePriceIndex = indexObj
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}