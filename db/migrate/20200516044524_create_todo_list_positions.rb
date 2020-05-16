# frozen_string_literal: true

class CreateTodoListPositions < ActiveRecord::Migration[6.0]
  def up
    execute <<~SQL
      CREATE VIEW todo_list_positions AS
        SELECT id AS id,
               user_id AS user_id,
               date(due_at) AS due_on,
               position AS position
        FROM todos
    SQL
  end

  def down
    execute <<~SQL
      DROP VIEW todo_list_positions;
    SQL
  end
end
