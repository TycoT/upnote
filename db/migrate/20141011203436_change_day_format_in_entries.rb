class ChangeDayFormatInEntries < ActiveRecord::Migration
  def up
    change_column :entries, :day, :int
  end

  def down
    change_column :entries, :day, :string
  end
end
