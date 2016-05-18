class LatestUpdatesController < ApplicationController
  def index
    @latest = Series.order("latest_update desc").first(50)
  end
end
