class RoomController < ApplicationController
  def index
  @room = Room.all
  end

  def tokyo
    p 'This is the Tokyo route'
  end

  def western
    p 'This is the Western route'
  end
end
