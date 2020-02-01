class Api::V1::ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]

  # respond_to :json

  # GET /contacts
  def index
    @contacts = Contact.page(params[:page])

    render json: @contacts
  end

  def show
    render json: @contact
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render json: @contact
    else
      render status: 503
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: { errors: @contact.errors.details }, status: 503
    end
  end

  def destroy
    @contact.destroy
    redirect_to contacts_url
  end

  private

    def set_contact
      @contact = Contact.find(params[:id])
    end

    def contact_params
      params.require(:contact).permit(:first_name, :last_name, :email, :phone)
    end
end
