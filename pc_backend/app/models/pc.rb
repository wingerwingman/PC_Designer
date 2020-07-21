class Pc < ApplicationRecord
    has_many :parts, dependent: :destroy
    validates :name, presence: true
end
