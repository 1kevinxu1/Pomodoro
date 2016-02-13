class TodosController < ApplicationController
before_action :require_user

  def index
    @todos = current_user.todos
    render :index
  end

  def create
      @todo = Todo.new(todo_params)
      @todo.user_id = current_user.id
      if @todo.save
        render json: @todo
      else
        render json: @todo.errors, status: :unprocessable_entity
      end
    end

  def destroy
      @todo = Todo.find(params[:id])
      @todo.delete
      render json: @todo
  end

  def update
      @todo = Todo.find(params[:id])
      if @todo.update(todo_params)
        render json: @todo
      else
        render json: @todo.errors, status: :unprocessable_entity
      end
  end

    private

      def todo_params
        params.require(:todo).permit(:title, :pomodoros, :finished?)
      end

end
