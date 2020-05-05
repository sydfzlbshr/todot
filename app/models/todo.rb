class Todo < ApplicationRecord
  belongs_to :user

  acts_as_list scope: :user_id

  validates_presence_of :title
  
  default_scope { order(position: :asc) }

  scope :incomplete, -> { where(completed_at: nil) }
  scope :complete, -> { where.not(completed_at: nil) }

  def due_on
    due_at.to_date
  end
end
