class AddPrevNextToChapter < ActiveRecord::Migration
  def change
    add_column :chapters, :prev, :string
    add_column :chapters, :next, :string
  end
end
