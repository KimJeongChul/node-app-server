const http = require('http');
const os = require('os');

const port = 8080;

console.log("web server starting..." + port);

var ifaces = os.networkInterfaces();
console.log(ifaces);
var handler = function(request, response) {
    console.log("Received request from " + request.connection.remoteAddress);
    response.writeHead(200);
    response.write("Your host name is " +  os.hostname() + "\n");

    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            response.write("Your IP is " + ifname + " : "  +iface.address + "\n");
        });
    });
    response.write("Your OS is " + os.platform() + "\n");
};

var www = http.createServer(handler);
www.listen(port);
