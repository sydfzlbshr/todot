class TodoListPositionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo_list_position, only: :update

  # PATCH/PUT /todo_list_positions/1
  # PATCH/PUT /todo_list_positions/1.json
  def update
    respond_to do |format|
      if @todo_list_position.update(todo_list_position_params)
        format.html { redirect_to date_path(date: @todo_list_position.due_on), notice: 'Todo was successfully updated.' }
        format.json { render :show, status: :ok, location: @todo_list_position }
        format.js   { head :ok }
      else
        format.html { render :edit }
        format.json { render json: @todo_list_position.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo_list_position
      @todo_list_position = TodoListPosition.where(user_id: current_user.id).find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def todo_list_position_params
      params.require(:todo_list_position).permit(:position)
    end
end
