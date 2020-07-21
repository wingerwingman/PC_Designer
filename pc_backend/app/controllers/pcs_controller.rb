class PcsController < ApplicationController
  before_action :set_pc, only: [:show, :update, :destroy]

  # GET /pcs
  def index
    @pcs = Pc.all

    render json: @pcs
  end

  # GET /pcs/1
  def show
    render json: @pc
  end

  # POST /pcs
  def create
    @pc = Pc.new(pc_params)
    if @pc.save
      render json: @pc, status: :created, location: @pc
    else
      render json: @pc.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pcs/1
  def update
    if @pc.update(pc_params)
      render json: @pc
    else
      render json: @pc.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pcs/1
  def destroy
    @pc.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pc
      @pc = Pc.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pc_params
      params.require(:pc).permit(:name, :description)
    end
end
