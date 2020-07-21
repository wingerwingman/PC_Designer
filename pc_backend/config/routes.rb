Rails.application.routes.draw do
  resources :pcs, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  resources :parts
  resources :pcs do 
    resources :parts, only: [:show, :new, :edit, :update, :destroy, :patch, :post, :create]
  end
end
