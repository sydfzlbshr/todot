class AddIndexDueAtDateOnTodos < ActiveRecord::Migration[6.0]
  def change
    add_index :todos, 'DATE(due_at)', name: 'index_due_at_as_date_on_todos'
  end
end
