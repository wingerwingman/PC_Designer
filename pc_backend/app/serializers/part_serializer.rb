class PartSerializer < ActiveModel::Serializer
  attributes :id, :name, :price
  belongs_to :pc
end
