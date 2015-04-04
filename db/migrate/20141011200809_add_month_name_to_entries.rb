class AddMonthNameToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :month_name, :string
  end
end
