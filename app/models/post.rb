require 'markdown'
class Post < ApplicationRecord
  has_and_belongs_to_many :labels

  validates :title, presence: true, uniqueness: true
  validates :content, presence: true, length: { minimum: 3 }

  def labels_content(need_blank = false)
    content = labels.collect { |label| label.name }.join(', ')
    content = I18n.t('none') if content.blank? and !need_blank
    content
  end

  def content_html
    self.class.render_html(content)
  end

  def self.render_html(content)
    rd = CodeHTML.new
    md = Redcarpet::Markdown.new(rd, autolink: true, fenced_code_blocks: true)
    md.render(content)
  end

  def sub_content
    HTML_Truncator.truncate(content_html, 300, length_in_chars: true)
  end
end
