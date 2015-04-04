class JournalController < ApplicationController
  
  layout 'admin'

  before_action :comfirm_logged_in, :except => [:login, :attempt_login, :logout]

  def index
  	user = User.where(:id => session[:user_id]).first
  	@entries = user.journal.entries.where(:month_name => params[:month])
    @month = params[:month]


    ############
    ### MENU ###
    ############
    #TO FIND how many months are between the first and last entry created.
    #first and last entries
    first = user.journal.entries.first
    last = user.journal.entries.last
    #creating into date objects
    first_date = Date.new(first.year, first.month, first.day)
    last_date = Date.new(last.year, last.month, last.day)

    puts "hEYYYYYYYYYY"
    puts first_date
    puts last_date

    #store the months between first and last entry, to ouput to html
    ary = Array.new
    until first_date.month == last_date.next_month.month
      puts first_date.strftime('%B')
      ary.push(first_date.strftime('%B'))
      first_date = first_date.next_month
    end
    @ary = ary
  	
    
  end

  def next_month
    month = @@current_month.next_month
    @@current_month = month
    @today = Date.current
    @month_name = @@current_month.strftime('%B')
    year = month.year
    start_month = month.beginning_of_week.prev_day

    #get entries from beggining to end of month
    user = User.where(:id => session[:user_id]).first
    #check if entries are created yet.
    current_day = start_month
    @all_entries = Array.new(42)
    for i in 0...42
      if(en = user.journal.entries.where(:day => current_day.day,:month => current_day.month, :year => current_day.year).first)
        @all_entries[i] = en
      #create a new entries and push into array
      else
        en = Entry.new(:day => current_day.strftime('%d'),:day_name => current_day.strftime('%A'),:month => current_day.month, :month_name => current_day.strftime('%B'), :year => current_day.strftime('%Y'))
        user.journal.entries << en
        @all_entries[i] = en
      end
      current_day = current_day.next_day
    end

    respond_to do |format|
      format.js { render :layout=>false }
    end

  end

  def last_month
    month = @@current_month.prev_month
    @@current_month = month
    @today = Date.current
    @month_name = @@current_month.strftime('%B')
    year = month.year
    start_month = month.beginning_of_week.prev_day

    #get entries from beggining to end of month
    user = User.where(:id => session[:user_id]).first
    #check if entries are created yet.
    current_day = start_month
    @all_entries = Array.new(42)
    for i in 0...42
      if(en = user.journal.entries.where(:day => current_day.day,:month => current_day.month, :year => current_day.year).first)
        @all_entries[i] = en
      #create a new entries and push into array
      else
        en = Entry.new(:day => current_day.strftime('%d'),:day_name => current_day.strftime('%A'),:month => current_day.month, :month_name => current_day.strftime('%B'), :year => current_day.strftime('%Y'))
        user.journal.entries << en
        @all_entries[i] = en
      end
      current_day = current_day.next_day
    end

    respond_to do |format|
      format.js { render :layout=>false }
    end

  end

  def month_calender
    #getting month number from month name(string)
    month = Date::MONTHNAMES.index(params[:month])
    year = params[:year]
    puts month
    puts year
    start_month = Date.new(year.to_i,month.to_i,1).beginning_of_week.prev_day
    @@current_month = Date.new(year.to_i,month.to_i,1)
    @month_name = @@current_month.strftime('%B')
    
    #get entries from beggining to end of month
    user = User.where(:id => session[:user_id]).first
    #check if entries are created yet.
    current_day = start_month
    @all_entries = Array.new(42)
    for i in 0...42
      if(en = user.journal.entries.where(:day => current_day.day,:month => current_day.month, :year => current_day.year).first)
        @all_entries[i] = en
      #create a new entries and push into array
      else
        en = Entry.new(:day => current_day.strftime('%d'),:day_name => current_day.strftime('%A'),:month => current_day.month, :month_name => current_day.strftime('%B'), :year => current_day.strftime('%Y'))
        user.journal.entries << en
        @all_entries[i] = en
      end
      current_day = current_day.next_day
    end

    @today = Date.current


    # @first_week = Array.new(7)
    # current_day = start_month
    # for i in 0..6
    #   @first_week.push(current_day.day)
    #   current_day = current_day.next_day
    # end
    # puts @first_week
    # @second_week = Array.new(7)
    # for i in 0..6
    #   @second_week.push(current_day.day)
    #   current_day = current_day.next_day
    # end
    # puts @second_week
    # @third_week = Array.new(7)
    # for i in 0..6
    #   @third_week.push(current_day.day)
    #   current_day = current_day.next_day
    # end
    # puts @third_week
    # @fourth_week = Array.new(7)
    # for i in 0..6
    #   @fourth_week.push(current_day.day)
    #   current_day = current_day.next_day
    # end
    # puts @fourth_week
    # @fifth_week = Array.new(7)
    # for i in 0..6
    #   @fifth_week.push(current_day.day)
    #   current_day = current_day.next_day
    # end
    # puts @fifth_week
    # @sixth_week = Array.new(7)
    # for i in 0..6
    #   @sixth_week.push(current_day.day)
    #   current_day = current_day.next_day
    # end
    # puts @sixth_week

    respond_to do |format|
      format.js { render :layout=>false }
    end

  end


  def about
  end

  def contact
  end
end
