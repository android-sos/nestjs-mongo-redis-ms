var redis = require('redis');
var client = redis.createClient({
    port: 6379, // replace with your port
    host: '127.0.0.1',
});

client.on('connect', function() {
    console.log('connected');
    client.set('some-key', '42', function(err) {
        if (err) {
            throw err; /* in production, handle errors more gracefully */
        } else {
            client.get('some-key', function(err, value) {
                if (err) {
                    throw err;
                } else {
                    console.log('>' + value);
                }
            });
        }
    });

});