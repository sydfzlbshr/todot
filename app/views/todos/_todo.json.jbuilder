json.extract! todo, :id, :title, :user_id, :due_at, :completed_at, :position, :created_at, :updated_at
json.url todo_url(todo, format: :json)
