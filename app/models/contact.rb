class Contact < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :unicode_search,
    against: { last_name: 'A', first_name: 'B', email: 'C' },
    ignoring: :accents,
    using: {
      tsearch: { prefix: true },
      trigram: { threshold: 0.4 }
    }

  validates :first_name, :last_name, :email, :phone, presence: true
  validates :email,
    format: { with: EMAIL_REGEX },
    uniqueness: true, if: :will_save_change_to_email?

  validates :phone, format: { with: PHONE_REGEX }

  def json_errors
    errors.messages.transform_values(&:to_sentence)
  end

  def self.filtered_list(query)
    query.present? ? unicode_search(query) : all
  end
end
