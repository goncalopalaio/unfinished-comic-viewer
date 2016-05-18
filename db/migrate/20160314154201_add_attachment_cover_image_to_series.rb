class AddAttachmentCoverImageToSeries < ActiveRecord::Migration
  def self.up
    change_table :series do |t|
      t.attachment :cover_image
    end
  end

  def self.down
    remove_attachment :series, :cover_image
  end
end
