var fs = require('fs')

//Write a pid file on startup, ansible will use this to kill your app.
console.log('This message brought to you by node.js, via Ansible')
fs.writeFile('./pid.txt', process.pid, function(){
    console.log('pid ' + process.pid);
})

//Busy Loop
function doStuff(times){
  setTimeout(function(){
      if(times){
        console.log('Iteration '+ times);
        doStuff(times -1);
      }
      else {
        fs.unlink('./pid.txt',function(err){
          if(err) throw err;
          console.log('End of process, shutting down')
          process.exit()
      })
    }
  }, 1000);
}

doStuff(100);

//Im using SIGINT here so you can kill the script via ctrl-c
process.on('SIGINT', function() {
    fs.unlink('./pid.txt', function(err){
        if(err) throw err;
        console.log('Recieved SIGINT, shutting down');
        process.exit();
    })
});

