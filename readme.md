**MONEY TRACKER**

Feel free to download this and have a wee play.

First things first, we need to clone this and make sure that the local host is working.

**INSTALLATION**

You need [node.js](https://nodejs.org/en/) installed globally:

`$ git clone https://github.com/SkinnyPigeon/money_tracker`  
`$ cd money_tracker_test`  
`$ npm install`  
`$ npm start`

Navigate to http://localhost:3000/ in your browser.

You should now be on the main page of the application.

Next comes the hard bit...

**SETTING UP RAILS**

You'll need [Ruby on Rails](https://www.youtube.com/watch?v=3Lp5XP8pWkU), [PostgreSQL](https://postgresapp.com/), [RackCORS](https://rubygems.org/gems/rack-cors/versions/0.4.0) and [Bundler](http://bundler.io/) installed globally:

`$ rails new TestDB --database:postgresql`  
`$ cd TestDB`  
`$ rails g model Tran description:text  amount:float debit:boolean`  
`$ rake db:create`  
`$ rake db:migrate`  

**SETTING UP THE GEM FILE**

Open up the gem file and replace everything with this:

```ruby
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
```

`$ bundle`

**A COUPLE LITTLE EDITS**

`$ touch Procfile`

Open the Procfile and add:

```
web: bundle exec rails server -p $PORT
```

Open up the config/routes.rb and replace everything with:

```ruby
Rails.application.routes.draw do
root 'trans#index'
  post 'trans' => 'trans#create', defaults: {format: :json}
  get 'trans' => 'trans#index', defaults: {format: :json}
end
```

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

**ADDING THE CONTROLLERS FOR THE TRANSACTIONS**

Almost there. Just need to create the controllers that'll let us use the routes we created earlier.

`$ cd app/controllers`  
`$ touch trans_controller.rb`

Open up this file then paste the following in:

```ruby
class ClientsController < ApplicationController

  def index
    clients = Client.all()
    render :json => clients.to_json()
  end

  def create
    client = Client.create!( client_params )
    client.save()
    clients = Client.all()
    render :json => clients.to_json()
  end

  private
  def client_params
    params.require(:client).permit([ :name, :email, :number ])
  end

end
```

**ADD A SEED TO CHECK IT ALL WORKS**

Before the final step we are going to double check that PostgreSQL is running and RackCors is turned on in Chrome ( I always forget these ).

Open up db/seeds.rb and replace everything there with:

```ruby
Tran.destroy_all

Tran.create!( description:"Pay day!!!", amount:1533.29, debit:false )
```

`$ rake db:seed`  
`$ rails s -p 5000`


Navigate to http://localhost:5000/ in your browser.

Hopfully you should see the seed we just created.

**RUN OUR WEBAPP**

Navigate to http://localhost:3000/ in your browser if you haven't already, refresh if you have.

Hopefully now when you click on Totals and Graphs you should see your seeded data already there. Now all you need to do is add your own transactions. If you want to start with no seeded data then simply change the db/seed.rb file to:

```ruby
Tran.destroy_all
```

`$ rake db:seed`

Enjoy 😁





