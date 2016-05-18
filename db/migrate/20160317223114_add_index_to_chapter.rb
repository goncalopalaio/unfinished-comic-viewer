class AddIndexToChapter < ActiveRecord::Migration
  def change
    add_reference :chapters, :series, index: true
  end
end
