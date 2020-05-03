# frozen_string_literal: true

class TodosReflex < ApplicationReflex
  def toggle_completed_at
    todo = Todo.find element.dataset[:id]
    todo.update completed_at: todo.completed_at? ? nil : Time.current
  end
end
