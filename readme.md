# Test on local

### Install Graphite on local:
	
	for mac user:

	https://gist.github.com/relaxdiego/7539911

	after installed Graphite, run it on local

### Prepare database

	before the test, need to run following SQL in sqlite3 first

	$ sqlite3 ocp.db < ocp-test-sql.sql

### Test for graphite-updater

	$ ruby app.rb

	then use following script to test put api with curl, 
	 
	$ ./curl-put-test.sh

### Test for dashboard:

	after run the curl test, we can check the dashboard through following urls:

 	http://localhost:4567/status/api/v1/apps/id/app001/graphite_dashboard

 	http://localhost:4567/status/api/v1/apps/id/app002/graphite_dashboard

# How to use

The example api are implemented in app.rb

The dashboard configure are in public/dashboards.js

required gems:

	json
	sinatra
	sinatra-config-file
	active_record
	gon-sinatra


