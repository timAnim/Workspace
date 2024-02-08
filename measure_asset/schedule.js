/* 
  模块名:'schedule'
  描述:'每晚4点, 清除空的id'
  入参:'false'
  返回:'false'
  作者: Timothy CHEN
  创建时间: 2022/10/17
 */


const timmer = '计时器';
console.time(timmer);

const schedule = require('node-schedule');
const fs = require('fs');


/** 
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
 */


const job = schedule.scheduleJob('0 * * * * *', function() {
    console.timeLog(timmer, '定时任务启动');
    let annos = fs.readFileSync('./db.json', 'utf8');
    annos = JSON.parse(annos);
    console.timeLog(timmer, annos.measures[0]);
})