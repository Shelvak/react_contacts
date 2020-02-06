require "test_helper"
require 'minitest/hooks'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include Minitest::Hooks

  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]

  Capybara.server = :webrick

  def before_all
    # prevent capybara port cache
    ENV['SERVER_URL'] = "http://127.0.0.1:#{Capybara.current_session.server.port}"

    FileUtils.rm_rf(Rails.root.join('public', 'packs-test'))
  end
end
