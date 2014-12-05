#! /bin/sh

echo "Ready to reploy updated version of voot to openvoot.org"

. ~/cf-login.sh

npm install
node_modules/grunt-cli/bin/grunt deploy

echo "Done."

