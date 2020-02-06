class AddUserIdToContacts < ActiveRecord::Migration[6.0]
  def change
    add_column :contacts, :user_id, :bigint, null: false
    add_index :contacts, [:user_id, :email], unique: true
  end
end
