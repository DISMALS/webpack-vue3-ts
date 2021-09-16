import { uniq } from 'lodash-es';
import VueRouter from 'vue-router';
// import config from '../enviroment/enviroment'
if (process.env.NODE_ENV === 'development') { require('./index.html');}
const d: number = 0;
const arr: any[] = [24,343,234,5345,566,24];
console.log('dd', uniq(arr));
const routr = new VueRouter({
    mode: 'hash'
});

// console.log('api地址：', config.serverUrl);