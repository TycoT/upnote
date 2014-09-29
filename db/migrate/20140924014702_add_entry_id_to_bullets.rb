class AddEntryIdToBullets < ActiveRecord::Migration
  def change
    add_column :bullets, :entry_id, :string
  end
end