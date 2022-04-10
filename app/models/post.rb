class Post < ApplicationRecord
  has_and_belongs_to_many :labels

  validates :title, presence: true, uniqueness: true
  validates :content, presence: true, length: { minimum: 3 }

  def labels_content(need_blank = false)
    content = labels.collect { |label| label.name }.join(', ')
    content = I18n.t('none') if content.blank? and !need_blank
    content
  end
end
