class Bullet < ActiveRecord::Base
	belongs_to :entries
	has_many :bullets
	belongs_to :bullet
end
