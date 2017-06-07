class UsersController < ApplicationController
  def index
    @user = User.all
    @rooms = Room.all
    render "/users/index", layout: false
  end

  def new

  end

  def create

  end

  def show
  
  end

  def edit

  end

  def update

  end

  def destroy

  end
end
