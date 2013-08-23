ansible-node-tmux
=================

####Playbook to update and deploy node.js in remote tmux session.
Currently it will

- Checkout the latest branch from whatever repo specified.
- Install the latest dependancies from package.json
- Check if the server is running, if so stop it.
- Restart the server in the running tmux session.

Single developers and small teams often dont have time to maintain several different configurations
for dev servers, production servers and local installs. This playbook is an easy way to update and deploy node.js
applications without having to write and maintain several different upstart jobs on different servers.



---

###Demo Instructions

- Clone this repo on your local and remote machines.
- Edit hosts, user, and vars in ansible-node-tmux.yml
- Start a tmux session on the remote with `tmux new -s sessionName`
- Set variable `tmuxsession: sessionName:1` if you have tmux setup to start counting windows from one -- otherwise `tmuxsession: sessionName:0`	
- Run `ansible-playbook -verbose ansible-node-tmux.yml` from local.

---

###Production and development instructions

- Clone this repo on the local 
- Clone your remote repo into whatever location it needs to run from.
- Edit hosts, user, and vars in ansible-node-tmux.yml
- Start a tmux session on the remote with `tmux new -s sessionName`
- Set variable `tmuxsession: sessionName:1` if you have tmux setup to start counting windows from one -- otherwise `tmuxsession: sessionName:0`
- ansible-playbook -verbose ansible-node-tmux.yml` from local.

#Important node.js considerations
 This playbook requires a tiny bit of boilerplate.

```javascript
var fs = require("fs")

//Write the current pid so ansible can send it a SIGINT later
fs.writeFile('./pid.txt', process.pid, function(){
    console.log('pid ' + process.pid);
})

//Catch SIGINT, remove pid.txt, as well as whatever other cleanup you want.
process.on('SIGINT', function() {
    fs.unlink('./pid.txt', function(err){
        if(err) throw err;
        console.log('Recieved SIGINT, shutting down');
        process.exit();
    })
});

```