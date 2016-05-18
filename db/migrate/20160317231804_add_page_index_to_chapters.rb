class AddPageIndexToChapters < ActiveRecord::Migration
  def change
    add_reference :chapters, :chapter_pages, index: true
  end
end
