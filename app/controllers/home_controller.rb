require 'ip_locator_cn'
class HomeController < ApplicationController
  def index
    if params[:label_id].present?
      @posts = Label.find(params[:label_id]).posts
    else
      @posts = Post.order(created_at: :desc).page(params[:page]).per(25)
    end
  rescue
    @posts = Post.order(created_at: :desc).page(params[:page]).per(25)
  end
end
