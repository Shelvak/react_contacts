require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:nestor)
  end

  test 'create' do
    assert_difference 'User.count' do
      assert User.create(
        username: 'test', email: 'test@sample.com', password: 'test123'
      )
    end
  end

  test 'validates blank attributes' do
    @user.username = nil
    @user.email    = '  '

    assert @user.invalid?
    assert_error(@user, :username, :blank)
    assert_error(@user, :email, :blank)
  end

  test 'validates well formated attributes' do
    @user.username = 'a'
    @user.email    = 'incorrect@format'

    assert @user.invalid?
    assert_error @user, :username, :too_short, count: 3
    assert_error @user, :email, :invalid
  end

  test 'validates duplicated attributes' do
    new_user = @user.dup

    assert new_user.invalid?
    assert_error new_user, :username, :taken
    assert_error new_user, :email, :taken
  end
end
