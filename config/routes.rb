Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :subscriptions, only: [:create, :index, :show, :destroy, :update]
    resources :feeds, only: [:index, :show]
    get '/feeds/search', to: 'feeds#search'
  end

end
