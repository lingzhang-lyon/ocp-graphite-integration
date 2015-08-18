# Test on local

## Install Graphite on local:
	
	for mac user:

	https://gist.github.com/relaxdiego/7539911

## Prepare database

	before the test, need to run following SQL in sqlite3 first

	$ sqlite3 ocp.db < ocp-test-sql.sql

## Test for graphite-updater

	then use following script to test put api with curl, 
	 
	$ ./curl-put-test.sh

## Test for dashboard:

 	http://localhost:4567/status/api/v1/apps/id/app001/graphite_dashboard
 	http://localhost:4567/status/api/v1/apps/id/app002/graphite_dashboard