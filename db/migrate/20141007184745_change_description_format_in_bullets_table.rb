class ChangeDescriptionFormatInBulletsTable < ActiveRecord::Migration
	def up
      change_column :bullets, :description, :text
  	end

    def down
      change_column :bullets, :description, :string
    end
end
