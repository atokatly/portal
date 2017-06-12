class RoomController < ApplicationController
  def index
  @room = Room.all
  end

  def tokyo
    p 'This is the Tokyo route'
    render "/rooms/tokyo"
  end

  def western
    p 'This is the Western route'
    render "/rooms/western"
  end
end
