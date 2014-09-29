class CreateBullets < ActiveRecord::Migration
  def up
    create_table :bullets do |t|
  	  t.string "bullet_type"
  	  t.string "description"
  	  t.integer "checked", :default => 0
      t.timestamps
    end
  end

  def down
  	drop_table :bullets
  end
end
