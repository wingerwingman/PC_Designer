Rails.application.routes.draw do
  resources :pcs, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  resources :parts, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  resources :pcs do 
    resources :parts, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
