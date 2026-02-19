#!/bin/bash
cd "$(dirname "$0")"
# Start a local server to avoid "secure connection" errors and handle file paths correctly
# This will start the server in the background and open the browser
(sleep 1 && open "http://localhost:8000") &
ruby -run -ehttpd . -p8000
