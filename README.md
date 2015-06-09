node-ansible-upstart
=================

####Install and run a node application with upstart.

---

#### Requirements

- Ansible v1.9.1+
- npm and node on remote host.

---

## Configuration and setup

#### Download
```shell
	git clone https://github.com/PaperElectron/node-ansible-upstart.git
```

### Edit variables.yml

This file is pretty self explanitory, it contains the user names, groups and variables needed to create the upstart job. 

```yml
---
npm_app: 'coolApp' ### application to run
service: 'my-service' ### service name
description: 'Cool app' ### description 
authbind: false ### setup authbind for port 80 and 443?
service_user: coolapp ### will create /var/www/coolapp
service_group: www-data ### group, also used for authbind
env_vars: ### Env variables to add to export on service start
    - env: HOME
      value: /var/www/coolapp
    - env: NODE_ENV
      value: production  
### Command to execute      
start_stanza: start-stop-daemon --start -u coolapp --exec /usr/bin/authbind coolapp start
```

### Add files to ./files directory

Any files needed by your application can be uploaded to the services home directory by placing them in `./files`. This is useful for config files, or anything else that your application needs to run.

## Run

This playbook is single host safe, you must include a user and host with the --extra-vars option. 

```shell
# ansible-playbook node-upstart.yml --ask-sudo-pass --extra-vars "host=some.hosname user=bob"
```

## Roadmap

- Install specified Nodejs version.
- Add additional granularity to upstart .conf creation

## Example Application

This playbook contains files and configuration to setup and run PaperElectron/Sundry with authbind. 