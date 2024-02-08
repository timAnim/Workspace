let Service = require('node-windows').Service;  

let svc = new Service({  
  name: 'ued_prd',
  description: 'ued正式服务器',  
  script: 'F:/database/bin/www'
});

svc.on('install', () => {  
  svc.start();
  console.log('install complete.');
});
 
// Listen for the "uninstall" event so we know when it's done. 
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});
 
svc.on('alreadyinstalled',()=>{
  console.log('The service is already installed.');
})

// Uninstall the service. 
if(svc.exists) return svc.uninstall()
  
svc.install();
  
