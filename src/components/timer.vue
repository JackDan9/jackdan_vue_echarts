<template lang="html">
  <div class="timer">
      <p class="time-title">{{this.title}}</p>
      <p class="time-clock">{{this.clock}}</p>
  </div>
</template>

<script>
/* eslint-disable*/
import * as dayjs from 'dayjs';
export default {
  name: 'Timer',
  /*
      beforeCreate () {
          import(`moment`).then(module => {
              this.moment = module;
          });
      },
      */
  data() {
    return {
      moment: null,
      title: "实时数据监控",
      timer: {},
      // clock: `${moment().format('HH')} : ${moment().format('mm')} : ${moment().format('ss')}`
      clock: dayjs(Date.now()).format("HH: mm: ss a"),
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      // this.clock = `${moment().format('HH')} : ${moment().format('mm')} : ${moment().format('ss')}`
      this.clock = dayjs(Date.now()).format("HH: mm: ss a");
    }, 1000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.timer {
  width: 100%;
  /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
  padding-top: 10px;
  padding-bottom: 10px;
}
.time-title {
  font-size: 22px;
  color: #0c9df7;
  text-align: center;
  letter-spacing: 1px;
}
.time-clock {
  font-size: 22px;
  color: #0c9df7;
  text-align: center;
  margin-top: 5px;
}
</style>