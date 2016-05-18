class AddEdenIdToChapter < ActiveRecord::Migration
  def change
    add_column :chapters, :eden_id, :string 
  end
end
