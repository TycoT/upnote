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

  def index
    journal = Journal.where(:user_id => session[:user_id]).first
    @entries = journal.entries.order("created_at ASC")

    redirect_to(:controller => '' :action => )
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
