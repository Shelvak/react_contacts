Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :contacts, except: [:new, :edit]
      resources :users, only: [:create, :show, :index]


      post '/signin', to: 'sessions#create'
      delete '/signout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#show'
    end
  end

  root 'homepage#index'

  # In case of page refresh redirect to react-home
  match '*_', to: 'homepage#index', via: :get
end
