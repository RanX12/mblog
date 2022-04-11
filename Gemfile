source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.1'
gem 'rails', '~> 6.1.5'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'
gem 'bootsnap', '>= 1.4.4', require: false

gem 'carrierwave'
gem 'redcarpet'
gem 'rouge'
gem 'mini_magick'
gem 'html_truncator'

# view
gem 'active_link_to', '~> 1.0'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false
  gem 'listen', '~> 3.3'
  gem 'spring'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'webdrivers'
end
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'sprockets-rails', '~> 3.2.1'
gem 'sprockets', '~> 3.7.2'
gem 'pg', '>= 1.1'
gem 'figaro'
gem 'simple_form', '~> 4.1'
gem 'bootstrap_form', '>= 4.2.0'
gem 'slim-rails'
gem 'high_voltage', '~> 3.1'
gem 'browser_warrior', '>= 0.11.0'
gem 'sidekiq', '~> 5'
gem 'bcrypt'
gem 'kaminari', github: 'kaminari/kaminari'
gem 'rails-i18n', '~> 6.0.0'
gem 'mina', '~> 1.2.2', require: false
gem 'mina-ng-puma', '>= 1.4.0', require: false
gem 'mina-multistage', require: false
gem 'mina-sidekiq', require: false
gem 'mina-logs', require: false

group :development do
  gem 'rails_apps_testing'
end

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end

group :test do
  gem 'database_cleaner'
  gem 'launchy'
end
