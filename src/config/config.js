const DEVELOPMENT = 1;
const DEV_API = 'http://dx.spider2.jiaoan100.com/bigdata';
const SER_API = 'http://127.0.0.1';

export default {
    api: DEVELOPMENT ? DEV_API: SER_API,
}