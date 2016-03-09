module.exports = function(RED) {
    function NetbeastNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        	if (msg.topic === 'lights') {
        		if (msg.payload === 'on')
            		msg.payload = 'Turning lights on';
            	else if (msg.payload === 'off')
            		msg.payload = 'Turning lights off';
            	else
            		msg.payload = 'Payload must be on or off';
            }
            
            else if (msg.topic === 'music') {
            	if (msg.payload === 'on')
            		msg.payload = 'Turning music on';
            	else if (msg.payload === 'off')
            		msg.payload = 'Turning music off';
            	else
            		msg.payload = 'Payload must be on or off'
            }

            else
            	msg.payload = 'Topic must be lights or music';
            
            node.send(msg);
        });
    }
    RED.nodes.registerType("netbeast",NetbeastNode);
}