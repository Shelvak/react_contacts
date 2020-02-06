require 'application_system_test_case'

class SessionTest < ApplicationSystemTestCase
  setup do
    @user = users(:nestor)
  end

  test 'SignIn' do
    visit root_url

    assert_selector 'h1', text: 'Log In'

    fill_in 'Username', with: @user.username
    fill_in 'Password', with: 'nestor123'

    click_on 'Log In'

    first('table tbody td').has_content? 'Pepe'
  end

  test 'Failed SignIn' do
    visit root_url

    assert_selector 'h1', text: 'Log In'

    fill_in 'Username', with: @user.username
    fill_in 'Password', with: 'nestor123123'

    click_on 'Log In'

    find('.alert.alert-danger').has_content? 'Invalid credentials'
  end

  test 'creating a User' do
    visit root_url
    click_on 'sign up'

    fill_in 'Username', with: 'testing'
    fill_in 'Email', with: 'test@sample.com'
    fill_in 'user_password', with: 'testtest'
    fill_in 'user_password_confirmation', with: 'testtest'

    click_on 'Sign Up'

    page.has_no_css?('.alert.alert-danger')
    page.has_content?('No contacts yet')
  end

  test 'creating a repeated user' do
    visit root_url
    click_on 'sign up'

    fill_in 'Username', with: @user.username
    fill_in 'Email', with: 'test@sample.com'
    fill_in 'user_password', with: 'testtest'
    fill_in 'user_password_confirmation', with: 'testtest'

    click_on 'Sign Up'

    find('span.text-danger').has_content?('has already been taken')
  end

  test 'LogOut' do
    visit root_url

    assert_selector 'h1', text: 'Log In'

    fill_in 'Username', with: @user.username
    fill_in 'Password', with: 'nestor123'

    click_on 'Log In'

    first('table tbody td').has_content? 'Pepe'

    click_on 'SignOut'
    accept_alert

    assert_selector 'h1', text: 'Log In'
  end
end
