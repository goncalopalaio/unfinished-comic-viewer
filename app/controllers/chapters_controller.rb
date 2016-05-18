class ChaptersController < ApplicationController
  def index
    @chapters=Series.find(params[:id]).chapters.order("number asc")
  end
end
