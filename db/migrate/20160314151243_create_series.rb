class CreateSeries < ActiveRecord::Migration
  def change
    create_table :series do |t|
      t.string :title
      t.string :cover_image
      t.datetime :latest_update
      t.boolean :finished

      t.timestamps null: false
    end
  end
end
