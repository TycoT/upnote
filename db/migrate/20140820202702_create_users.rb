class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
  	  t.column "user_name", :string, :limit => 25
  	  t.string "email", :default => '', :null => false
  	  t.string "password_digest", :string
      t.timestamps
    end
  end

  def down
  	drop_table :users
  end
end
