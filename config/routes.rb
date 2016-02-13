Rails.application.routes.draw do
  root to: 'todos#index'
  resources :todos, only: [:index, :create, :update, :destroy]
  resources :users, only: [:new, :create]
  resource  :session, only: [:new, :create, :destroy]
end
