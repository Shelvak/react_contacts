class Api::V1::SessionsController < Api::V1::ApiController

  def create
    @user = User.find_by(username: session_params[:username])

    if @user && @user.authenticate(session_params[:password])
      login!(@user)

      render json: @user
    else
      render json: { errors: 'Invalid credentials'  }
    end
  end

  def show
    render json: current_user
  end

  def destroy
    logout!

    render json: {}
  end

  private

  def session_params
    params.require(:user).permit(:username, :password)
  end
end
