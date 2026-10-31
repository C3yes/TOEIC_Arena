services:
  - type: web
    name: toeic-arena
    runtime: node
    plan: free
    buildCommand: "true"
    startCommand: node server.js
