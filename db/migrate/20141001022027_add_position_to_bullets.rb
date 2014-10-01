class AddPositionToBullets < ActiveRecord::Migration
  def change
    add_column :bullets, :position, :integer
  end
end
