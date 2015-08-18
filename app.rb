require 'json'
require 'sinatra'
require "sinatra/config_file"
config_file 'config/graphite.yml'

require_relative './lib/graphite-updater'
gu = GraphiteUpdater.new(settings) 

require 'active_record'
ActiveRecord::Base.establish_connection(adapter: 'sqlite3', database: 'ocp.db')
class AppOfferings < ActiveRecord::Base
end 
class UrlChecks < ActiveRecord::Base
end


put '/status/api/v1/checks/id/update' do
	# back-end validatoin of key and values
	puts params
	if !params.key? 'id' 
		result = "{ 'error' : 'Please provide check ID.'}"
	elsif !params.key? 'status'  
		result = "{ 'error' : 'Please provide check's status.'}"
	else
		check_id = params['id']
		check = UrlChecks.find_by check_id: check_id
		app_sys_id = check.app_sys_id
	    app = AppOfferings.find_by app_sys_id: app_sys_id
        app_name = app.app_name

		metrics_data2 = { 
			"intuit.#{app_name}.check-#{check_id}.response" => params['response'],
			"intuit.#{app_name}.check-#{check_id}.status" => params['status']
		}  
		gu.update_with_hash(metrics_data2)
	end
end

get '/status/api/v1/apps/id/:id/graphite_dashboard' do
	
	erb :graphite_dashboard

end