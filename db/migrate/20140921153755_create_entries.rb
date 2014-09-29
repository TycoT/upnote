class CreateEntries < ActiveRecord::Migration
  def up
    create_table :entries do |t|
  	  t.integer "journal_id"
  	  t.string "day"
  	  t.string "month"
  	  t.integer "year"
      t.timestamps
    end
  end

  def down
  	drop_table :entries
  end
end
