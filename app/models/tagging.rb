class Tagging < ActiveRecord::Base
  belongs_to :series
  belongs_to :tag
end
