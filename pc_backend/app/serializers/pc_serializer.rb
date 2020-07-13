class PcSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_many :parts
end
