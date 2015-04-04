class Bullet < ActiveRecord::Base
	belongs_to :entries
	has_many :bullets
	belongs_to :bullet

	#default_scope order("#{self.table_name}.position ASC")
end
