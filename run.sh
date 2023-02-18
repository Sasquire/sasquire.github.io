#!/bin/bash

for var in "$@"; do
	if [ "$var" = "scripts" ]; then
		# https://stackoverflow.com/questions/4321456/find-exec-a-shell-function-in-linux
		echo "Running scripts"
		find ./blogs/ -type f -name "main.mjs" | while read file; do
			echo "Running $file"
			node "$file"
		done
	elif [ "$var" = "serve" ]; then
		echo "Serving pages"
		bundle exec jekyll serve --incremental
	elif [ "$var" = "servew" ]; then
		echo "Serving pages without incremental"
		bundle exec jekyll serve
	elif [ "$var" = "download_database" ]; then
		# TODO
		# E621 database file expected to be in the `_ignore` folder
		# with name `e621.database.sqlite3`
		# https://github.com/Sasquire/E621-DB-Export-Sqlite

		echo "Downloading database and moving into place"
	elif [ "$var" = "build_everything" ]; then
		echo "Doing everything!"
		bash -c "$0 download_database scripts"
		echo "You must add and commit changes and then push!"
	else 
		echo "Unrecognized command"
	fi
done
