# frozen_string_literal: true

class TodosReflex < ApplicationReflex
  delegate :current_user, to: :connection

  def toggle_completed_at
    todo = current_user.todos.find element.dataset[:id]
    todo.update completed_at: todo.completed_at? ? nil : Time.current
  end

  def validate
    @todo = current_user.todos.new(title: element[:value])
    @todo.valid?
  end
end
