require 'sidekiq/web'

Rails.application.routes.draw do
  resources :todos, except: :show
  resources :todo_list_positions, only: :update

  namespace :admin do
    resources :users
    resources :services
    resources :announcements
    resources :notifications

    root to: "users#index"
  end
  get '/privacy', to: 'home#privacy'
  get '/terms', to: 'home#terms'
    authenticate :user, lambda { |u| u.admin? } do
      mount Sidekiq::Web => '/sidekiq'
    end

  resources :notifications, only: [:index]
  resources :announcements, only: [:index]
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  root to: 'todos#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/service-worker.js' => "service_worker#service_worker"
  get '/manifest.json' => "service_worker#manifest"
  get '/offline.html' => "service_worker#offline"

  get '/:date', to: 'todos#index', as: :date
end
