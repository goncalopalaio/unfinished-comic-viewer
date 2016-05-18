class RemoveUriFromChapter < ActiveRecord::Migration
  def change
    remove_column :chapters, :uri
  end
end
