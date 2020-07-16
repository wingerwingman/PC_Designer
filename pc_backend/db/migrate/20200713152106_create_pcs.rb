class CreatePcs < ActiveRecord::Migration[6.0]
  def change
    create_table :pcs do |t|
      t.string :name
      t.string :description
      t.integer :part_id

      t.timestamps
    end
  end
end
