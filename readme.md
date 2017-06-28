Feel free to download this and have a wee play.

First things first, we need to clone this and make sure that the local host is working.

**INSTALLATION**

You need node.js installed globally:

`$ git clone https://github.com/SkinnyPigeon/money_tracker_test`  
`$ cd money_tracker_test`  
`$ npm install`  
`$ npm start`

Navigate to http://localhost:3000/ in your browser.

You should now be on the main page of the application.

Next comes the hard bit...

**SETTING UP THE RAILS**

You'll need Ruby on Rails, PostgreSQL, RackCORS and Bundler installed globally:

`$ rails new TestDB --database:postgresql`  
`$ cd TestDB`  
`$ rails g model Tran description:text  amount:float debit:boolean`  
`$ rake db:create`  
`$ rake db:migrate`  

**SETTING UP THE GEM FILE**

Open up the gem file and replace everything with this:

source 'https://rubygems.org'

gem 'rack-cors', :require => 'rack/cors'
group :production do
  gem 'pg', '~> 0.18' 
  gem 'unicorn' 
  gem 'rails_log_stdout',           github: 'heroku/rails_log_stdout'
  gem 'rails3_serve_static_assets', github: 'heroku/rails3_serve_static_assets'
end

gem 'rails', '~> 5.0.0', '>= 5.0.0.1'

gem 'puma', '~> 3.0'

gem 'sass-rails', '~> 5.0'

gem 'uglifier', '>= 1.3.0'

gem 'coffee-rails', '~> 4.2'

gem 'jquery-rails'

gem 'turbolinks', '~> 5'

gem 'jbuilder', '~> 2.5'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

`$ bundle`

**A COUPLE LITTLE EDITS**

`$ touch Procfile`

Open the Procfile and add:

web: bundle exec rails server -p $PORT

Open up the config/routes and replace everything with:

Rails.application.routes.draw do
root 'trans#index'
  post 'trans' => 'trans#create', defaults: {format: :json}
  get 'trans' => 'trans#index', defaults: {format: :json}
end

`$ rake routes`

**SETTING UP THE APPLICATION AND ITS CONTROLLER**

Open up the config/application.rb and replace everything with:

```ruby
require_relative 'boot'
require 'rails/all'
Bundler.require(*Rails.groups)

module BusDatabase
  class Application < Rails::Application
config.middleware.insert_before 0, "Rack::Cors" do
        allow do
            origins '*'
            resource '*', :headers => :any, :methods => [ :get, :post, :put, :options, :delete ]
        end
    end
    config.active_record.raise_in_transactional_callbacks = true
  end
end
```






