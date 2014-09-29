class Entry < ActiveRecord::Base
	belongs_to :journal
	has_many :bullets


	
end


