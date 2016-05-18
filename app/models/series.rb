class Series < ActiveRecord::Base
  has_many :taggings
  has_many :tags, through: :taggings
  has_many :chapters
  has_attached_file :cover_image,  :styles => { :large => "300x", :thumb => "50x" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :cover_image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  before_save :default_values
  validates :title, uniqueness: {case_sensitive: false}
  validates :eden_id, uniqueness: true

  def default_values
    self.cover_image ||= 'assets/covernotfound.png'
  end

  def to_param #instead of using id on url use eden_id
    id
  end

end
