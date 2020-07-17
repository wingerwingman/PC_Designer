class PcSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :part_id
  has_many :parts
end
