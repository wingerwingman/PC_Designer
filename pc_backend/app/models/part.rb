class Part < ApplicationRecord
    belongs_to :pc
    validates :name, presence: true
end
