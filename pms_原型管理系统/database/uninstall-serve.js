let Service = require('node-windows').Service;

let svc = new Service({
  name: 'ued_prd',
  description: 'ued正式服务器',
  script: 'F:/database/bin/www'
});

svc.uninstall()