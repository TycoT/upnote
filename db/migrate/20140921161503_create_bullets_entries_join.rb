class CreateBulletsEntriesJoin < ActiveRecord::Migration
  def up
    create_table :bullets_entries, :id => false do |t|
    	t.integer "bullet_id"
    	t.integer "entry_id"
    end
    add_index :bullets_entries, ["bullet_id", "entry_id"]
  end

  def down
  	drop_table :bullets_entries
  end
end
