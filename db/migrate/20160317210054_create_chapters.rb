class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.string :uri
      t.integer :number

      t.timestamps null: false
    end
  end
end
