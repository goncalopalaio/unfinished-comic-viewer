class ChapterPagesController < ApplicationController
  def index
    #receives chapter id
    @chapter = Chapter.find(params[:id])
    @pages = @chapter.chapter_pages.order("number asc")
  end
end
