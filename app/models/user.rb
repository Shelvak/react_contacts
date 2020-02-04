class User < ApplicationRecord
  has_secure_password

  validates :username, :email, presence: true
  validates :username, uniqueness: true, if: :will_save_change_to_username?
  validates :username, length: { minimum: 3 }, allow_blank: true, allow_nil: true
  validates :email, uniqueness: true, if: :will_save_change_to_username?
  validates :email, format: { with: EMAIL_REGEX }, allow_blank: true, allow_nil: true
end
