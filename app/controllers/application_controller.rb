class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :require_user, :signed_in?

  private

  def current_user
    return nil unless session[:token]
    @current_user ||= User.find_by_session_digest(session[:token])
  end

  def sign_in!(user)
    @current_user = user
    session[:token] = user.session_digest
  end

  def signed_in?
    !!current_user
  end

  def sign_out!
    current_user.reset_session_digest
    session[:token] = nil
  end

  def require_user
    redirect_to new_session_url unless current_user
  end
end
