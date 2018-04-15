const DEVELOPMENT = 1;
const DEV_API = 'http://192.168.112.133/bigdata';
const SER_API = 'http://127.0.0.1';

export default {
	api: DEVELOPMENT ? DEV_API: SER_API,
}