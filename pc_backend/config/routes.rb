Rails.application.routes.draw do
  resources :pcs, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  resources :parts
  resources :pcs do 
    resources :parts, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  end
  # resources :pc, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  # resources :part, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
