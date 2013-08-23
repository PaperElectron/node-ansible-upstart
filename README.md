ansible-node-tmux
=================

Playbook to update and deploy node.js in a tmux session.

Demo Instructions
- Clone this repo on your local and remote machines.
- Edit hosts, user, and vars in ansible-node-tmux.yml
- Start a tmux session on the remote with `tmux new -s sessionName` 
	`tmuxsession: sessionName:1` if you have tmux setup to start counting from one
	otherwise `tmuxsession: sessionName:0`
	
- Run `ansible-playbook -verbose ansible-node-tmux.yml` from local.

Production and development instructions
- Clone this repo
