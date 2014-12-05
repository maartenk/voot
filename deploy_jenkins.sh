#! /bin/sh

echo "Ready to reploy updated version of voot to openvoot.org"

. ~/cf-login.sh
cf target -o system -s prod

npm install
node_modules/grunt-cli/bin/grunt publish

echo "Done."

