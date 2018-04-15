import axios from 'axios'
import qs from 'qs'

const state = {
    isLoading: true,
    startDateTime: 0,
    endDateTime: 0,
    count: 0,
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
    typeIndex: 0,
    typePriceIndex: 0,
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
                    console.log(data);
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
        let data = qs.stringify({
            from: state.startDateTime,
            to: state.endDateTime
        });
        axios.post('http://dx.spider.jiaoan100.com/bigdata/orders_carrier?ver=1', data)
            .then(
                (res) => {
                    let indexObj = state.typeIndex;
                    let ret = res.data.data;
                    let numberData = ret.number;
                    let countData = ret.count;
                    let priceData = ret.price;
                    if (indexObj == 0) {
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
                    } else if (indexObj == 1) {
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
                    } else if (indexObj == 2){
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
                    }
                    
                }
            )
            .catch((error) => {
                console.log(error)
            })

    },
    fetchLineFlightData({state, commit}, chartsObj) {
        axios.get('http://dx.spider.jiaoan100.com/bigdata/15mins_carrier')
            .then(
                (res) => {
                    let typePriceIndex = state.typePriceIndex;
                    console.log(typePriceIndex);
                    let ret = res.data.data;
                    let seriesData = [];
                    let legendData = [];
                    let nameData = [];
                    let obj = {};
                    if (typePriceIndex == 0) {
                        for(let key in ret['num15']) {
                            nameData.push(key);
                            obj[key] = false;
                            legendData.push({
                                name: key,
                                icon: 'bar',
                                textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'}
                            });
                            seriesData.push({
                                name: key,
                                type: 'line',
                                data: ret['num15'][key]
                            })          
                        }
                        console.log(obj);
                        if (state.isLoading) {
                            chartsObj.hideLoading()
                            commit('closeLoading')
                        }
                        chartsObj.setOption({
                            legend: {
                                data: legendData,
                                selected: 'false'
                            },
                            xAxis: {
                                data: ret.ts
                            },
                            series: seriesData
                        })
                    } else if (typePriceIndex == 1) {
                        for(let key in ret['numany']) {
                            nameData.push(key);
                            legendData.push({
                                name: key,
                                icon: 'bar',
                                textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'}
                            });
                            seriesData.push({
                                name: key,
                                type: 'line',
                                data: ret['numany'][key]
                            })          
                        }
                        if (state.isLoading) {
                            chartsObj.hideLoading()
                            commit('closeLoading')
                        }
                        chartsObj.setOption({
                            legend: {
                                data: legendData
                            },
                            xAxis: {
                                data: ret.ts
                            },
                            series: seriesData
                        })
                    } else if (typePriceIndex == 2) {
                        for(let key in ret['per']) {
                            nameData.push(key);
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
                                data: legendData
                            },
                            xAxis: {
                                data: ret.ts
                            },
                            series: seriesData
                        })
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }
}



const mutations = {
    closeLoading (state) {
        state.isLoading = false
    },

    updateStateDateTime(state, timeObj) {
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