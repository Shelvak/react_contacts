ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: 1)

  fixtures :all

  def error_message_from_model(model, attribute, message, extra = {})
    full_message = extra.delete(:full_message)

    model_error = ::ActiveModel::Errors.new(model)
    msg         = model_error.generate_message(attribute, message, extra)

    full_message ? model_error.full_message(attribute, msg) : msg
  end

  def assert_error(model, attribute, error, **extras)
    assert_includes(
      model.errors[attribute],
      error_message_from_model(
        model,
        attribute,
        error,
        **extras
      )
    )
  end
end
