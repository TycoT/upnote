class EntriesController < ApplicationController
	def create
		# to check current date and query database to find if any entry with the same date as current date
		# If no entry found, creates a new entry for current date. 
		
		# check current date
		current_time = Time.new

		# check user's current day entries
		user = User.where(:id => session[:user_id]).first

		# Query the entry table to see if theres an entry with todays date and month
		if(user.journal.entries.find(:created_at.day => current_time.day && :created_at.month => current_time.month && :created_at.year => current_time.year))
			# do nothing

		else
			# create a new blank entry.
			new_entry = Entry.new(:day => current_time.day, :month => current_time.month, :year => current_time.year)
			user.journal << new_entry
		end
	end

	def index
		# listing all entries found from current day to previous monday
		current_time = Time.new
		current_time.

		user = User.where(:id => session[:user_id]).first

	end
end
