class AccessController < ApplicationController

  layout 'admin'

  #runs 'comfirm_logged_in' action, before any action is called, except those specified.
  before_action :comfirm_logged_in, :except => [:login, :attempt_login, :logout]

  def hello
    @hello = "Hello whats up!"

    respond_to do |format|
      format.js { render :layout=>false }
    end
  end

  def create_bullet
    puts "CREATE BULLET"
    puts params[:bullet_type]
    puts params[:position]
  end

  def index

    # to check current date and query database to find if any entry with the same date as current date
    # If no entry found, creates a new entry for current date. 

    # check current date
    current_date = Date.current
    # find the user
    user = User.where(:id => session[:user_id]).first
    # Query the entry table to see if theres an entry with todays date and month
    if(user.journal.entries.where(:day => current_date.strftime('%d'), :month => current_date.strftime('%B'), :year => current_date.strftime('%Y'))).empty?
      # create a new blank entry.
      new_entry = Entry.new(:day => current_date.strftime('%d'), :month => current_date.strftime('%B'), :year => current_date.strftime('%Y'))
      user.journal.entries << new_entry
      puts "added new entry"
    else
      # do nothing
      puts "did nothing"
    end

    # Lists entries from current day to the beggining of the week.
    first_day = current_date.at_beginning_of_week.day
    current_day = current_date.day
    current_month = current_date.strftime('%B')
    current_year = current_date.strftime('%Y')
    @entries = user.journal.entries.where("day >= #{first_day} AND day <= #{current_day} AND month = '#{current_month}' AND year = '#{current_year}'")
  end

  def login
    # login form
  end

  def attempt_login
  	# checks if user has entered a username and password
    if params[:username].present? && params[:password].present?
      # looks for the username in database and stores true or false
      found_user = User.where(:user_name => params[:username]).first
      # checks if database returned a username (True or false)
      if found_user
      	# authenticate the password provided from user, returns true or false
        authorized_user = found_user.authenticate(params[:password])
      end
    end
    if authorized_user
      # mark user as logged in
      session[:user_id] = authorized_user.id
      session[:username]  = authorized_user.user_name
      flash[:notice] = "You are now logged in."
      redirect_to(:action => 'index')
    else
      flash[:notice] = "Invalid username/password combination."
      redirect_to(:action => 'login')
    end
  end

  def logout
    # mark user as logged out
    session[:user_id] = nil
    session[:username] = nil
    flash[:notice] = "Logged out"
    redirect_to(:action => "login")
  end

end
