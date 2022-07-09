class GroupsController < ApplicationController
  before_action :set_user, only: [:edit, :update]
  
  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      flash.now[:alert] = "グループを作成に失敗しました。"
      render :new
    end
  end
  
  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを更新しました'
    else
      flash.now[:alert] = "グループを更新に失敗しました。"
      render :edit
    end
  end

  private

  def group_find
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end
