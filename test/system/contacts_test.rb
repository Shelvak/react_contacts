require 'application_system_test_case'

class ContactsTest < ApplicationSystemTestCase
  setup do
    @contact = contacts(:pepe)
    @user    = users(:nestor)

    login
  end

  test 'creating a Contact' do
    click_on 'Create New Contact'

    fill_in 'contact_first_name', with: 'test'
    fill_in 'contact_last_name', with: 'contact'
    fill_in 'contact_email', with: 'test@contact.com'
    fill_in 'contact_phone', with: '+55555'

    click_on 'Create'

    assert_selector 'h1', text: 'contact, test'
  end

  test 'creating a Contact with errors' do
    click_on 'Create New Contact'

    fill_in 'contact_first_name', with: 'test'
    fill_in 'contact_last_name', with: 'contact'
    fill_in 'contact_email', with: @contact.email
    fill_in 'contact_phone', with: '+55555'

    click_on 'Create'

    find('span.text-danger').has_content? 'has already been taken'

    fill_in 'contact_email', with: 'test@contact.com'
    click_on 'Create'

    assert_selector 'h1', text: 'contact, test'
  end

  test 'updating a Contact' do
    click_on 'Edit'

    original_email = @contact.email
    original_phone = @contact.phone

    fill_in 'contact_last_name', with: 'HONGO'

    click_on 'Update'

    find('h1').has_content? 'HONGO, Pepe'

    find('li.email').has_content? original_email
    find('li.phone').has_content? original_phone
  end

  test 'destroying a Contact' do
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    # destroy the only contact
    page.has_no_content?('Pepe')
    page.has_content?('No contacts yet')
  end
end
