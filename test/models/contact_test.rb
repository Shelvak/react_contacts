require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  setup do
    @contact = contacts(:pepe)
  end

  test 'create' do
    assert_difference 'Contact.count' do
      Contact.create!(
        first_name: 'Test',
        last_name:  'Test',
        email:      'test@sample.com',
        phone:      '+44332211'
      )
    end
  end

  test 'validates blank attributes' do
    attrs = %w[first_name last_name email phone]
    attrs.each do |attr|
      @contact.send("#{attr}=", '')
    end

    assert @contact.invalid?
    attrs.each do |attr|
      assert_error(@contact, attr, :blank)
    end
  end

  test 'validates email format' do
    invalid_emails = %w[
      invalid invalid.com @invalid.com invalid@ invalid:@test.com
      invalid@:test.com invalid@test@com
    ]

    invalid_emails.each do |email|
      @contact.email = email
      assert @contact.invalid?
      assert_error @contact, :email, :invalid
    end
  end

  test 'validates phone format' do
    invalid_phones = [
      '+123', '1234', '+123 1', '12 345 6'
    ]

    invalid_phones.each do |phone|
      @contact.phone = phone
      assert @contact.invalid?
      assert_error @contact, :phone, :invalid
    end
  end

  test 'validates email uniqueness' do
    new_contact = @contact.dup

    assert new_contact.invalid?
    assert_error new_contact, :email, :taken
  end
end
