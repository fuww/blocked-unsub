# Blocked Unsub

This project is for reproducing the blocking of
the event loop when unsubscribing in meteor.

## Usage

Run
```sh
meteor
```

Open http://localhost:3000/

Wait till the subscription is ready, it might take a while, but it never
blocks the event loop, the data comes gradually.
Once it is ready, click on Unsubscribe.

Check the console

```
I20180420-12:27:19.629(2)? 1524220039629
I20180420-12:27:19.932(2)? [BLOCKED] Blocked for 226.95668499946595ms, operation started here:
I20180420-12:27:19.932(2)?     at Zlib.emitInitNative (internal/async_hooks.js:133:43),    at InflateRaw.Zlib (zlib.js:231:18),    at new InflateRaw (zlib.js:576:8),    at Object.InflateRaw (zlib.js:575:12),    at ServerSession.Session._getInflate (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/permessage-deflate/lib/session.js:130:31),    at ServerSession.Session.processIncomingMessage (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/permessage-deflate/lib/session.js:26:22),    at Functor.call (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/pipeline/functor.js:46:32),    at Cell._exec (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/pipeline/cell.js:36:29),    at Cell.incoming (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/pipeline/cell.js:22:8),    at pipe (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/pipeline/index.js:39:28),    at Pipeline._loop (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/pipeline/index.js:44:3),    at Pipeline.processIncomingMessage (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/pipeline/index.js:13:8),    at Extensions.processIncomingMessage (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-extensions/lib/websocket_extensions.js:133:20),    at Hybi._emitMessage (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-driver/lib/websocket/driver/hybi.js:445:22),    at Hybi._emitFrame (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-driver/lib/websocket/driver/hybi.js:405:19),    at Hybi.parse (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-driver/lib/websocket/driver/hybi.js:141:18),    at IO.write (/Users/peterpalkoszta/.meteor/packages/ddp-server/.2.1.2.1xtgy5z.fui7++os+web.browser+web.cordova/npm/node_modules/websocket-driver/lib/websocket/streams.js:80:16),    at Socket.ondata (_stream_readable.js:639:20),    at emitOne (events.js:121:20),    at Socket.emit (events.js:211:7),    at addChunk (_stream_readable.js:263:12),    at readableAddChunk (_stream_readable.js:250:11),    at Socket.Readable.push (_stream_readable.js:208:10),    at TCP.onread (net.js:607:20)
I20180420-12:27:19.933(2)? 1524220039932
```

You can see the error above, for 2000 small documents, it's already blocking
the event loop for 200ms+ on a decent computer.

Just to make sure it's not false positive, I also print the current timestamp
every 100ms, but as you can see there is nothing printed between
1524220039629 and 1524220039932 (=303ms), so indeed the even loop was really
blocked for 200ms+.
