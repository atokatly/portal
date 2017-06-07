Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   root to: 'users#index'

   resources :users

   get '/tokyo' => 'room#tokyo'
   get '/western' => 'room#western'
   get '/rooms' => 'room#index'
end
