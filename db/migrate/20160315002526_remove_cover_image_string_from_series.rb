class RemoveCoverImageStringFromSeries < ActiveRecord::Migration
  def change
    remove_column :series, :cover_image, :string
  end
end
