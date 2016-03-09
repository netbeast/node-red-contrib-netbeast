# Node-RED

http://nodered.org

Node-RED is a tool for wiring together hardware devices, APIs and online services in new and interesting ways.

![Node-RED: A visual tool for wiring the Internet of Things](http://nodered.org/images/node-red-screenshot.png)

Netbeast has included this tool as an application. So you can install that tool in the **Netbeast dashboard**. Also, you are able to install this tool in you device locally and create modules for it. 

If you want to know more about Node-red visit its [website](http://nodered.org) where you will find all the documentation available.

* [Install on the Netbeast Dashboard](#Dashboard)
* [Install Locally](#Local)

<a name="Dashboard">
## Netbeast Dashboard

Netbeast has included the [node-red tool](http://nodered.org) as an application for its dashboard. So, if you want to get it, you only need to access to the [market](http://market.netbeast.co/#/), download the application and install it on the **Dashboard**

If you want to know how to do this, go to this useful guide [netbeast docs](http://docs.netbeast.co)

I have added a new module to control your wemo plug. The Wemo module has been developed by Netbeast Team. 

<a name="Local">
## Local Installation

The purpose of the local installation is allow developers to create modules which will be on the node-red app for the **Netbeast dashboard**

### Download

Access to the [MarketPlace](https://market.netbeast.co/#/)

If you don't have an account, request an access. After that, log in and download the Netbeast-Red App.

Once you have downloaded the application, uncompress it.

Go to the source files directory through your terminal. Then type 
```
node red.js --port 3000
```

Node red will start running on port 3000. If you want to select another port change the --port Number

### Creating an example application.

In this application, we will show how to create a new module for node-red that controls the wemo plug.

* First of all, you need to locate your node-red folder where nodes are saved.

* Then, access to the nodes folder and create a new folder named "hardware"
```
$ cd directory/to/node-red/nodes
mkdir hardware
```

* Now, copy this two files in that folder

60-wemo.html
```
<!--
  Copyright 2015 Netbeast.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->

<script type="text/x-red" data-template-name="wemo out">
    <div class="form-row">
    <p>TEST</p>
    </div>
</script>
<script type="text/x-red" data-help-name="wemo out">
    <p>Wemo output node. Expects a <b>msg.payload</b> with either 1/0, on/off or true/false.</p>
</script>

<script type="text/javascript">
    RED.nodes.registerType('wemo out',{
        category: 'advanced-output',
        color:"GoldenRod",
        inputs:1,
        outputs:1,
        icon: "light.png",
        align: "right",
        label: function() {
            return this.name||"wemo";
        },
        labelStyle: function() {
            return this.name?"node_label_italic":"";
        }
    });
</script>
```

60-wemo.js
```
/**
 * Copyright 2015 Netbeast.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var Wemo = require('wemo-client');
    var wemo = new Wemo()
    var client
    wemo.discover(function(deviceInfo) {
      client=wemo.client(deviceInfo)
    });

    function WemoOut(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        this.on("input", function(msg) {
            if (msg != null) {
                  if (msg.payload === 'on'){
                  // Turn the switch on
                  client.setBinaryState(1)
                  node.send({payload:"Your Plug is ON"})
                }
                  else if (msg.payload === 'off') {
                  client.setBinaryState(0)
                  node.send({payload:"Your Plug is OFF"})
                }
                  else {
                    client.setBinaryState(0)
                    console.log('Option On/Off')
                  }
            }
        });
    }
    RED.nodes.registerType("wemo out",WemoOut);
  }
```

* Finally, start node-red and go to the browser. If all went fine, you will have a new module called "wemo" and you will be able to configure node-red to control your wemo plug. 

##CONTACT

Netbeast: http://netbeast.co / staff@netbeast.co

##REFERENCES

- [Netbeast](http://netbeast.co)
- [Node-Red](http://nodered.org)
