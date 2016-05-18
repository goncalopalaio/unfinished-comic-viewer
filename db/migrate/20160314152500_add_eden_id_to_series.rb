class AddEdenIdToSeries < ActiveRecord::Migration
  def change
    add_column :series, :eden_id, :string
    add_index :series, :eden_id, :unique=>true
  end
end
