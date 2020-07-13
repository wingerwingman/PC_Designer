class CreateParts < ActiveRecord::Migration[6.0]
  def change
    create_table :parts do |t|
      t.string :name
      t.integer :price
      t.integer :pc_id

      t.timestamps
    end
  end
end
