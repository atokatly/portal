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

  def tomb
    p 'This is the Tomb of the Gods route'
    render "/rooms/tomb"
  end

  def book
    p 'This is the collective booking route'
    render "/rooms/book"
  end
end
