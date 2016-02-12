class Todo < ActiveRecord::Base
  validates :user_id, :finished?, :title, :pomodoros, presence: true
  belongs_to :user
end
