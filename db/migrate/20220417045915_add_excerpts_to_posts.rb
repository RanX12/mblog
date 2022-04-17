class AddExcerptsToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :excerpts, :text, comment: '文章摘录'
  end
end
