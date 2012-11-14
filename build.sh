#!/bin/sh
printf '/*! jQuery JSON plugin %s | code.google.com/p/jquery-json */' "$(cat version.txt)" > build/jquery.json.min.js;
python libs/jsmin.py < src/jquery.json.js >> build/jquery.json.min.js;
