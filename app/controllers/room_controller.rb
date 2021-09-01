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

  def scare
    p 'This is the Project Voyager route'
    render "/rooms/scare"
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

  def mansion
    p 'This is the mansion route'
    render "/rooms/mansion"
  end

  def westernhint1
    p 'This is the Outlaw Hint 1 route'
    render "/rooms/westernhint1"
  end 

end
