This subtree is added from:
https://github.com/toedter/typescript-contacts-demo

Commands:

```git remote add -f typescript-contacts-demo https://github.com/toedter/typescript-contacts-demo.git```

```git subtree add --prefix typescript-contacts-demo typescript-contacts-demo master```

```git subtree pull --prefix typescript-contacts-demo typescript-contacts-demo master```


typescript-contacts-demo
========================

This is my test project for developing a demo with typescript, javascript, jasmine, grunt, bower, etc.

Instructions
------------

To run it:
- Install node.js
- Install grunt-cli (run "npm install -g grunt-gli" in a command shell)
- Install bower (run "npm install -g bower" in a command shell)
- Run "npm install" (installs all dev dependencies)
- Run "bower install" (installs all dev dependencies)
- Run "grunt" (compiles the typescript, runs the tests und creates an uglified distribution)
- Open "demo/contacts-demo.html" in a web browser

