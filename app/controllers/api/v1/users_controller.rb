class Api::V1::UsersController < Api::V1::ApiController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user
    else
      render json: { errors: @user.json_errors }
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username, :email, :password, :password_confirmation
    )
  end
end
