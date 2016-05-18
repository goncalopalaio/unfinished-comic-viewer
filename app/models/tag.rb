class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :series, through: :taggings
  validates :name, uniqueness: {case_sensitive: false}

  before_save :downcase_fields
  def downcase_fields
    self.name.downcase!
  end
end
