class ChangeMonthFormatInEntries < ActiveRecord::Migration
  def up
    change_column :entries, :month, :int
  end

  def down
    change_column :entries, :month, :string
  end
end
