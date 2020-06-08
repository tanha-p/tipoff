#! /usr/bin/env bash
# test.sh

set -e


node_modules/.bin/nyc node_modules/.bin/mocha --require @babel/core --require babel-polyfill './api-server/**/*.test.js'  # leave off -s if you want to see partial results
#cp .nyc_output/* $COMBINED_OUTPUT
#cd react-app
#npm install
#node_modules/.bin/nyc npm test
#cp .nyc_output/* $COMBINED_OUTPUT
#node_modules/.bin/nyc report -t $COMBINED_OUTPUT