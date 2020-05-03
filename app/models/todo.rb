class Todo < ApplicationRecord
  belongs_to :user

  acts_as_list scope: :user_id
end
