class CreateJournals < ActiveRecord::Migration
  def change
    create_table :journals do |t|
      t.integer "user_id"
      t.string "permalink"
      t.string "position"
      t.boolean "visible", :default => true
      t.timestamps
    end
  end
end
