class TodosController < ApplicationController
  def index
    @todos = Todo.all
    render :index
  end

end
