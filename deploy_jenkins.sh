#!/usr/bin/env bash
set -e # halt script on error


echo "Ready to reploy updated version of voot to openvoot.org"

. ~/cf-login.sh
cf target -o system -s prod

gem install jekyll
gem install rouge

npm install
node_modules/bower/bin/bower install --config.interactive=false -p
node_modules/grunt-cli/bin/grunt publish

cf map-route voot openvoot.org

echo "Done."

