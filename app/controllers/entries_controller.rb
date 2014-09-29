class EntriesController < ApplicationController

	def create
		# to check current date and query database to find if any entry with the same date as current date
		# If no entry found, creates a new entry for current date. 
		
		# check current date
		current_date = Date.current

		# find the user
		user = User.where(:id => session[:user_id]).first

		# Query the entry table to see if theres an entry with todays date and month
		if(user.journal.entries.where(:day => current_date.day, :month => current_date.month, :year => current_date.year))
			# do nothing

		else
			# create a new blank entry.
			new_entry = Entry.new(:day => current_date.day, :month => current_date.month, :year => current_date.year)
			user.journal << new_entry
		end

		render :layout => false
	end

	def index
		# listing all entries found from current day to previous monday
		current_date = Date.current

		#user = User.where(:id => session[:user_id]).first

	end
end
