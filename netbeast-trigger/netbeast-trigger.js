/**
* Copyright 2016 Netbeast.
*
* Licensed under the Apache License, Version 2.0 (the 'License')
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

var beast = require('netbeast')

module.exports = function (RED) {
  function TriggerNode (config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.topic = config.topic
    node.log(node.topic, 'topic')
    beast.find().then(function () {
      return beast(node.topic).on(function (msg) {
        node.send({ payload: msg })
      })
    }).catch(function (err) {
      node.error(err)
      node.send({ payload: err.text || err.message })
      node.status({fill: 'red', shape: 'ring', text: err.text || err.message})
    })
  }
  RED.nodes.registerType('netbeast-trigger', TriggerNode)
}
