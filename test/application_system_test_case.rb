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

  def login
    visit root_url

    assert_selector 'h1', text: 'Log In'

    fill_in 'Username', with: @user.username
    fill_in 'Password', with: 'nestor123'

    click_on 'Log In'

    page.has_no_css?('.alert.alert-danger')
  end
end
