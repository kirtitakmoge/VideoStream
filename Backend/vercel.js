{
    "version": 2,
    "builds": [
      { "src": "server.js", "use": "@vercel/node" }
    ],
    "routes": [
      { "src": "/api/(.*)", "dest": "app.js" },
      { "src": "/(.*)", "dest": "app.js" }
    ]
  }
  