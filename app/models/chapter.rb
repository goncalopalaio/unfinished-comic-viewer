class Chapter < ActiveRecord::Base
  belongs_to :series
  has_many :chapter_pages
  validates :eden_id, uniqueness: true


end
