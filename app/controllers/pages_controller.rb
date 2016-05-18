class PagesController < ApplicationController
  def home
    @users = User.all
    @new_user = User.new
  end
end
