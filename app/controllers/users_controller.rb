class UsersController < ApplicationController
  def index
    @user = User.all
    render "/users/index", layout: false
  end
end
