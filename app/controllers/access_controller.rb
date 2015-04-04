class AccessController < ApplicationController

  layout 'admin'

  #runs 'comfirm_logged_in' action, before any action is called, except those specified.
  before_action :comfirm_logged_in, :except => [:login, :attempt_login, :logout, :sign_up]

  

  def home
    
    redirect_to(:action => index)

  end



  def next_week
    first_date_of_next_week = @@current.next_day(7).at_beginning_of_week

    @next_week_entries = Array.new(7)
    user = User.where(:id => session[:user_id]).first

    # check database for each day/entry exist, and if so, push into array, if not, create it and push
    temp_date = first_date_of_next_week
    for i in 0...7
      if(en = user.journal.entries.where(:day => temp_date.day, :month => temp_date.month, :year => temp_date.year).first)
      else
        en = Entry.new(:day => temp_date.strftime('%d'),:day_name => temp_date.strftime('%A'),:month => temp_date.month, :month_name => temp_date.strftime('%B'), :year => temp_date.strftime('%Y'))
      end
      @next_week_entries[i] = en
      temp_date = temp_date.next_day
    end
    @@current = first_date_of_next_week


    # # might be a bug - instead of using @@curent, use sesssions to store date object
    # #figure out 1st and last day of next week
    # first_date_of_next_week = @@current.next_day(7).at_beginning_of_week
    # puts first_date_of_next_week
    # last_date_of_next_week = first_date_of_next_week.at_end_of_week
    # user = User.where(:id => session[:user_id]).first
    # if first_date_of_next_week.month == last_date_of_next_week.month 
    #   @next_week_entries = user.journal.entries.where("day >= #{first_date_of_next_week.day}").where("day <= #{last_date_of_next_week.day}").where(:month => last_date_of_next_week.month).where(:year => last_date_of_next_week.year)
    # else
    #   puts last_date_of_next_week.day
    #   puts last_date_of_next_week.month
    #   @next_week_entries = user.journal.entries.where("day >= #{first_date_of_next_week.day}").where(:month => first_date_of_next_week.month).where(:year => first_date_of_next_week.year)
    #   #setting flag to delete if end of month and there is no entries next month
    #   @remove_next_button = false
    #   #check if next month is empty
    #   if next_month_entries = user.journal.entries.where("day <= #{last_date_of_next_week.day}").where(:month => last_date_of_next_week.month).where(:year => last_date_of_next_week.year).empty?
    #     @remove_next_button = true
    #   else
    #     @next_week_entries.merge(next_month_entries)
    #     @remove_next_button = false
    #   end
    # end
    # @@current = first_date_of_next_week

    respond_to do |format|
      format.js { render :layout=>false }
    end
  end

  def last_week
    first_date_of_last_week = @@current.prev_day(7).at_beginning_of_week

    @last_week_entries = Array.new(7)
    user = User.where(:id => session[:user_id]).first

    # check database for each day/entry exist, and if so, push into array, if not, create it and push
    temp_date = first_date_of_last_week
    for i in 0...7
      if(en = user.journal.entries.where(:day => temp_date.day, :month => temp_date.month, :year => temp_date.year).first)
      else
        en = Entry.new(:day => temp_date.strftime('%d'),:day_name => temp_date.strftime('%A'),:month => temp_date.month, :month_name => temp_date.strftime('%B'), :year => temp_date.strftime('%Y'))
      end
      @last_week_entries[i] = en
      temp_date = temp_date.next_day
    end
    @@current = first_date_of_last_week


    # # might be a bug - instead of using @@curent, use sesssions to store date object
    # #figure out 1st and last day of last week
    # first_date_of_last_week = @@current.prev_day(7).at_beginning_of_week
    # puts first_date_of_last_week
    # last_date_of_last_week = first_date_of_last_week.at_end_of_week
    # user = User.where(:id => session[:user_id]).first
    # if first_date_of_last_week.month == last_date_of_last_week.month 
    #   @last_week_entries = user.journal.entries.where("day >= #{first_date_of_last_week.day}").where("day <= #{last_date_of_last_week.day}").where(:month => last_date_of_last_week.month).where(:year => last_date_of_last_week.year)
    #   if user.journal.entries.where(:day => first_date_of_last_week.prev_day.day).where(:month => first_date_of_last_week.prev_day.month).where(:year => first_date_of_last_week.prev_day.year).empty?
    #     @remove_back_button = true;
    #   end
    # else
    #   puts last_date_of_last_week.day
    #   puts last_date_of_last_week.month
    #   @last_week_entries = user.journal.entries.where("day >= #{first_date_of_last_week.day}").where(:month => first_date_of_last_week.month).where(:year => first_date_of_last_week.year)
    #   #setting flag to delete if end of month and there is no entries next month
    #   @remove_back_button = false
    #   #check if last week is empty
    #   if user.journal.entries.where(:day => first_date_of_last_week.prev_day.day).where(:month => first_date_of_last_week.prev_day.month).where(:year => first_date_of_last_week.prev_day.year).empty?
    #     @remove_back_button = true;
    #     puts "REMOVE"
    #   else
    #     @last_week_entries.merge(last_month_entries)
    #     @remove_back_button = false
    #   end
    # end
    # @@current = first_date_of_last_week

    respond_to do |format|
      format.js { render :layout=>false }
    end
  end

  def create_new_month
    user = User.where(:id => session[:user_id]).first
    last_entry = user.journal.entries.last
    date = Date.new(last_entry.year, last_entry.month, last_entry.day)
    date = date.next_day
    date_end = date.end_of_month
    @m = date.strftime('%B')

    until date == date_end.next_day
      # create a new blank entry.
      new_entry = Entry.new(:day => date.strftime('%d'),:day_name => date.strftime('%A'),:month => date.month, :month_name => date.strftime('%B'), :year => date.strftime('%Y'))
      user.journal.entries << new_entry
      puts "added new entry"
      date = date.next_day
    end

    
    respond_to do |format|
      format.js { render :layout=>false }
    end

  end


  def create_bullet
    puts "CREATE BULLET"
    puts params[:bt]
    puts params[:p]
    puts params[:eid]

    pos = params[:p].to_i - 1

    #find user
    user = User.where(:id => session[:user_id]).first
    #define new bullet entity with param values
    new_bullet = Bullet.new(:bullet_type => params[:bt], :position => pos, :description => params[:d])
    #insert into bullet's target entry via using entry id
    if(user.journal.entries.find(params[:eid]).bullets << new_bullet)
      @bullet_ID = new_bullet.id
      puts "Created new bullet"
    else
      puts "Bullet creation failed"
    end
    puts @bullet_ID
    respond_to do |format|
      format.js { render :layout=>false }
    end
  end

  def update_bullet

    # find user
    user = User.where(:id => session[:user_id]).first
    # find the bullet to be updated, using param values for bullet id and entry id
    bullet = user.journal.entries.find(params[:eid]).bullets.find(params[:bid])
    # update the description from description passed in from params
    if(bullet.update_attributes(:description => params[:d]))
      puts "BULLET DESCRIPTION"+bullet.description
      puts "Bullet update - SUCCESSFUL"
    else
      puts "Bullet update - FAILED"
    end

    respond_to do |format|
      format.js { render :layout=>false }
    end
  end

  def update_bullet_position

    user = User.where(:id => session[:user_id]).first
    # find the bullet to be updated, using param values for bullet id and entry id
    bullet = user.journal.entries.find(params[:eid]).bullets.find(params[:bid])
    bullets = user.journal.entries.find(params[:eid]).bullets
    # update the description from description passed in from params
    if(params[:iP] < params[:eP]) 
      #QUERY IS NOT RIGHT
      rangedBullets = user.journal.entries.find(params[:eid]).bullets.where("position > #{params[:iP]} AND position <= #{params[:eP]}")
      rangedBullets.each do |b|
        puts "count up"
        puts b.position
        b.update_attributes(:position => b.position-1)
      end
    else
      rangedBullets = user.journal.entries.find(params[:eid]).bullets.where("position < #{params[:iP]} AND position >= #{params[:eP]}")
      rangedBullets.each do |b|
        puts "count down"
        puts b.position
        b.update_attributes(:position => b.position+1)
      end
    end

    if(bullet.update_attributes(:position => params[:eP].to_i, :checked => params[:c]))
      #change affected bullets
      
      puts "Bullet Position update - SUCCESSFUL"
    else
      puts "Bullet Position update - FAILED"
    end

    respond_to do |format|
      format.js { render :layout=>false }
    end

  end

  def update_bullet_task
    user = User.where(:id => session[:user_id]).first
    bullet = user.journal.entries.find(params[:eid]).bullets.find(params[:bid])
    bullet.update_attributes(:checked => params[:c])

    respond_to do |format|
      format.js { render :layout=>false }
    end
  end

  def destroy_bullet
    # find user
    user = User.where(:id => session[:user_id]).first
    # find the bullet to be updated, using param values for bullet id and entry id
    bullet = user.journal.entries.find(params[:eid]).bullets.find(params[:bid])
    puts bullet.position
    #update the position of all bullets with position > than current bullet
    bullets = user.journal.entries.find(params[:eid]).bullets.where("position > #{bullet.position}")
    bullets.each do |b|
      puts "update position"
      puts b.position
      b.update_attributes(:position => b.position-1)
    end
    #destroy bullet
    bullet.destroy

    respond_to do |format|
      format.js { render :layout=>false }
    end

  end


  def index

    # to check current date and query database to find if any entry with the same date as current date
    # If no entry found, creates a whole month of entries from that date. e.g. if sept 15, creates sept 16 to sept31 

    # check current date
    current_date = Date.current
    @@current = current_date
    # find the user
    user = User.where(:id => session[:user_id]).first
    
    # creating array to store all entries from beggining to end of week
    first_day_of_week = current_date.at_beginning_of_week
    @entries = Array.new(7)

    # check database for each day/entry exist, and if so, push into array, if not, create it and push
    temp_date = first_day_of_week
    for i in 0...7
      if(en = user.journal.entries.where(:day => temp_date.day, :month => temp_date.month, :year => temp_date.year).first)
      else
        en = Entry.new(:day => temp_date.strftime('%d'),:day_name => temp_date.strftime('%A'),:month => temp_date.month, :month_name => temp_date.strftime('%B'), :year => temp_date.strftime('%Y'))
      end
      @entries[i] = en
      user.journal.entries << en
      temp_date = temp_date.next_day
    end

    # if(user.journal.entries.where(:day => current_date.strftime('%d'), :month_name => current_date.strftime('%B'), :year => current_date.strftime('%Y'))).empty?
    #   #Checks how many days from current day to 1st day of NEXT month
    #   first_day = current_date.next_month.beginning_of_month
    #   date_holder = current_date
    #   until date_holder == first_day
    #     # create a new blank entry.
    #     new_entry = Entry.new(:day => date_holder.strftime('%d'),:day_name => date_holder.strftime('%A'),:month => date_holder.month, :month_name => date_holder.strftime('%B'), :year => date_holder.strftime('%Y'))
    #     user.journal.entries << new_entry
    #     puts "added new entry"
    #     date_holder = date_holder.next_day
    #   end

    # else
    #   # do nothing
    #   puts "did nothing"
    # end

    # # Lists entries from end to the beggining of the week.
    # first_day = current_date.at_beginning_of_week.day
    # last_day = current_date.at_end_of_week.day
    @current_day = current_date.strftime('%d')
    @current_month = current_date.strftime('%B')
    # @current_year = current_date.strftime('%Y')
    # @entries = user.journal.entries.where("day >= #{first_day}").where("day <= #{last_day}").where(:month_name => @current_month).where(:year => @current_year)
    
    #figure out current week number
    week_num = (current_date.day.to_f/7).ceil
    
    @week_num = week_num
     
    # ############
    # ### MENU ###
    # ############
    # #TO FIND how many months are between the first and last entry created.
    # #first and last entries
    # first = user.journal.entries.first
    # last = user.journal.entries.last
    # #creating into date objects
    # first_date = Date.new(first.year, first.month, first.day)
    # last_date = Date.new(last.year, last.month, last.day)

    # puts "hEYYYYYYYYYY"
    # puts first_date
    # puts last_date

    # #store the months between first and last entry, to ouput to html
    # ary = Array.new
    # until first_date.month == last_date.next_month.month
    #   puts first_date.strftime('%B')
    #   ary.push(first_date.strftime('%B'))
    #   first_date = first_date.next_month
    # end
    # @ary = ary

    # ############
    # ## Button ##
    # ############
    # ##checks next and last week if there are any entries to determine if we need those buttons on index page
    # if user.journal.entries.where(:day => current_date.at_beginning_of_week.prev_day.day).where(:month => current_date.at_beginning_of_week.prev_day.month).where(:year => current_date.at_beginning_of_week.prev_day.year).empty?
    #   @remove_back_button = true;
    # end
    # if user.journal.entries.where(:day => current_date.at_end_of_week.next_day.day).where(:month => current_date.at_end_of_week.next_day.month).where(:year => current_date.at_end_of_week.next_day.year).empty?
    #   @remove_next_button = true;
    # end



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
      #flash[:notice] = "Please sign in"
      redirect_to(:action => 'index')
    else
      flash[:notice] = "Invalid username/password combination."
      redirect_to(:action => 'login')
    end
  end

  def sign_up

    if params[:username].present? && params[:email].present? && params[:password].present? && params[:confirm_password].present?
      if params[:password] == params[:confirm_password]
        user = User.new(:user_name => params[:username], :email => params[:email], :password => params[:password], :password_confirmation => params[:confirm_password])
        if(User.where(:user_name => user.user_name).first)
          flash[:notice] = "Username already taken."
          redirect_to(:action => 'login')
        elsif(user.save)
          user.journal = Journal.new()
          flash[:notice] = "Successful! Please log in."
          redirect_to(:action => 'login')
        else
          flash[:notice] = "Something went horrible wrong..."
          redirect_to(:action => 'login')
        end
      else
        flash[:notice] = "Password and Comfirmation password not matching."
        redirect_to(:action => 'login')
      end
    else
      flash[:notice] = "One or more of your fields are missing."
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
