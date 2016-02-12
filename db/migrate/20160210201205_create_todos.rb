class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :user_id, null: false
      t.boolean :finished?, null: false
      t.string :title, null: false
      t.integer :pomodoros, null: false
      t.timestamps null: false
    end

    add_index(:todos, :user_id)
    add_index(:todos, :title)
  end
end
