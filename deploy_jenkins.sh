#!/usr/bin/env bash
set -e # halt script on error


echo "Ready to reploy updated version of voot to openvoot.org"

. ~/cf-login.sh
cf target -o system -s prod

gem install jekyll

npm install
node_modules/grunt-cli/bin/grunt publish

echo "Done."

