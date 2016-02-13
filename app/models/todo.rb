class Todo < ActiveRecord::Base
  validates :user_id, :title, :pomodoros, presence: true
  validates :finished?, inclusion: {in: [true, false]}
  belongs_to :user
end
