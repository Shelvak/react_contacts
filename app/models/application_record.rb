class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def json_errors
    errors.messages.transform_values(&:to_sentence)
  end
end
