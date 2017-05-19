class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.date :day, null: false
      t.integer :time, null: false
      t.integer :party_size, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
