require 'pry'
class PartsController < ApplicationController
    before_action :set_part, only: [:show, :update, :destroy, :create, :post]

  # GET /parts
  def index
    @parts = Parts.all

    render json: @parts
  end

  # GET /pcs/1
  def show
    render json: @part
  end

  # POST /pcs
  def create
    @part = Part.new(part_params)

    if @part.save
      render json: @part, status: :created, location: @part
    else
      render json: @part.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pcs/1
  def update
    if @part.update(part_params)
      render json: @part
    else
      render json: @part.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pcs/1
  def destroy
    @part.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_part
      @part = Part.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def part_params
      params.require(:part).permit(:name, :price, :pc_id)
    end
end
