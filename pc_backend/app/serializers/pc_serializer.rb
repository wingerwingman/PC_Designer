class PcSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :parts, serializer: PartSerializer
end
