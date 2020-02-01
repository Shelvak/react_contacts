class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :first_name, null: false, index: true
      t.string :last_name, null: false, index: true
      t.string :email, null: false, index: true, unique: true
      t.string :phone, null: false

      t.timestamps
    end
  end
end
