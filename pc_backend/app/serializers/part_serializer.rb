class PartSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :pc_id
  belongs_to :pc
end
