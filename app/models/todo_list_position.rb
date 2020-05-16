class TodoListPosition < ApplicationRecord
  self.primary_key = :id

  acts_as_list scope: [:user_id, :due_on]
end
