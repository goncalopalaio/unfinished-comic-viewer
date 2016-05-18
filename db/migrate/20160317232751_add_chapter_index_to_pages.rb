class AddChapterIndexToPages < ActiveRecord::Migration
  def change
    add_reference :chapter_pages,:chapter
  end
end
