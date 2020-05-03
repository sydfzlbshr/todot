class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.belongs_to :user, null: false, foreign_key: true
      t.datetime :due_at
      t.datetime :completed_at
      t.integer :position

      t.timestamps
    end
  end
end
