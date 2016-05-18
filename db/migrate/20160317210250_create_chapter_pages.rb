class CreateChapterPages < ActiveRecord::Migration
  def change
    create_table :chapter_pages do |t|
      t.string :url
      t.integer :number

      t.timestamps null: false
    end
  end
end
