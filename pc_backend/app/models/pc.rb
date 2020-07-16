class Pc < ApplicationRecord
    has_many :parts
    validates :name, presence: true
end
