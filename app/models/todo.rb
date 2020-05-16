class Todo < ApplicationRecord
  belongs_to :user

  validates_presence_of :title
  
  scope :incomplete, -> { where(completed_at: nil) }
  scope :complete, -> { where.not(completed_at: nil) }

  def due_on
    due_at.to_date
  end
end
