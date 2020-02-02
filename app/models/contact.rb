class Contact < ApplicationRecord
  validates :first_name, :last_name, :email, :phone, presence: true
  validates :email,
    format: { with: EMAIL_REGEX },
    uniqueness: true, if: :will_save_change_to_email?

  validates :phone, format: { with: PHONE_REGEX }

  def json_errors
    errors.messages.transform_values(&:to_sentence)
  end
end
