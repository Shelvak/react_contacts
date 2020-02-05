class AddTrgmToContactColumns < ActiveRecord::Migration[6.0]
  def change
    add_index :contacts, :first_name, using: :gist, opclass: :gist_trgm_ops
    add_index :contacts, :last_name, using: :gist, opclass: :gist_trgm_ops
    add_index :contacts, :email, using: :gist, opclass: :gist_trgm_ops
  end
end
