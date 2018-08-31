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

  def voyager
    p 'This is the Project Voyager route'
    render "/rooms/voyager"
  end

  def book
    p 'This is the collective booking route'
    render "/rooms/book"
  end

  def voucher
    p 'This is the voucher purchase route'
    render "/rooms/voucher"
  end

  def redeem
    # p 'This is the voucher redemption route'
    redirect_to "/voucher"
    # render "/rooms/voucher"
  end

  def gallery
    p 'This is the gallery route'
    render "/rooms/gallery"
  end

  def teams 
    p 'This is the teams route'
    render "/rooms/teams"
  end
end
