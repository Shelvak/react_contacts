Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :contacts, except: [:new, :edit]
      resources :users, only: [:create, :show, :index]
    end
  end

  root 'homepage#index'

  # In case of page refresh redirect to react-home
  match '*_', to: 'homepage#index', via: :get
end
