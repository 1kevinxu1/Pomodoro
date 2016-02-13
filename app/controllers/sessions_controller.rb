class SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(*login_params)
    if @user
      sign_in!(@user)
      redirect_to todos_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end

  private

  def login_params
    [params[:user][:username], params[:user][:password]]
  end
end
