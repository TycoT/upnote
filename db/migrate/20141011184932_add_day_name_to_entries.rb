class AddDayNameToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :day_name, :string
  end
end
